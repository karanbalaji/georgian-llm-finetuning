import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tokenize, sigmoid, vectorize } from "../src/lib/router-inference.ts";
import type { RouterLabel } from "../src/lib/router-inference.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATASET_PATH = join(__dirname, "../src/data/router-dataset.json");
const MODEL_OUTPUT_PATH = join(__dirname, "../src/lib/router-model.json");

const SEED = 42;
const VOCAB_SIZE = 250;
const MIN_DOC_FREQ = 2;
const LEARNING_RATE = 0.5;
const L2_LAMBDA = 0.01;
const EPOCHS = 500;
const HELD_OUT_FRACTION = 0.2;

interface Example {
  text: string;
  label: RouterLabel;
}

// Mulberry32 — small deterministic PRNG so the train/held-out split is reproducible.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildVocabulary(examples: Example[]): { vocabulary: string[]; idf: number[] } {
  const docFreq = new Map<string, number>();
  for (const ex of examples) {
    const uniqueTokens = new Set(tokenize(ex.text));
    for (const tok of uniqueTokens) {
      docFreq.set(tok, (docFreq.get(tok) ?? 0) + 1);
    }
  }

  const candidates = [...docFreq.entries()].filter(([, freq]) => freq >= MIN_DOC_FREQ);
  candidates.sort((a, b) => b[1] - a[1]);
  const top = candidates.slice(0, VOCAB_SIZE);

  const n = examples.length;
  const vocabulary = top.map(([term]) => term);
  const idf = top.map(([, freq]) => Math.log((n + 1) / (freq + 1)) + 1);

  return { vocabulary, idf };
}

function trainLogisticRegression(
  X: number[][],
  y: number[],
  numFeatures: number
): { weights: number[]; bias: number } {
  const weights = new Array(numFeatures).fill(0);
  let bias = 0;
  const n = X.length;

  for (let epoch = 0; epoch < EPOCHS; epoch++) {
    const gradW = new Array(numFeatures).fill(0);
    let gradB = 0;

    for (let i = 0; i < n; i++) {
      const z = bias + X[i].reduce((sum, x, j) => sum + x * weights[j], 0);
      const pred = sigmoid(z);
      const error = pred - y[i];

      for (let j = 0; j < numFeatures; j++) {
        gradW[j] += error * X[i][j];
      }
      gradB += error;
    }

    for (let j = 0; j < numFeatures; j++) {
      weights[j] -= LEARNING_RATE * (gradW[j] / n + L2_LAMBDA * weights[j]);
    }
    bias -= LEARNING_RATE * (gradB / n);
  }

  return { weights, bias };
}

function evaluate(
  examples: Example[],
  vocabulary: string[],
  idf: number[],
  weights: number[],
  bias: number
): { accuracy: number; precision: number; recall: number } {
  let correct = 0;
  let truePos = 0;
  let falsePos = 0;
  let falseNeg = 0;

  for (const ex of examples) {
    const vec = vectorize(ex.text, vocabulary, idf);
    const z = bias + vec.reduce((sum, x, j) => sum + x * weights[j], 0);
    const predLocal = sigmoid(z) >= 0.5;
    const actualLocal = ex.label === "local";

    if (predLocal === actualLocal) correct++;
    if (predLocal && actualLocal) truePos++;
    if (predLocal && !actualLocal) falsePos++;
    if (!predLocal && actualLocal) falseNeg++;
  }

  const accuracy = correct / examples.length;
  const precision = truePos / (truePos + falsePos || 1);
  const recall = truePos / (truePos + falseNeg || 1);

  return { accuracy, precision, recall };
}

function main() {
  const raw = readFileSync(DATASET_PATH, "utf-8");
  const dataset: Example[] = JSON.parse(raw);

  const rand = mulberry32(SEED);
  const shuffled = shuffle(dataset, rand);

  const heldOutSize = Math.round(shuffled.length * HELD_OUT_FRACTION);
  const heldOut = shuffled.slice(0, heldOutSize);
  const train = shuffled.slice(heldOutSize);

  const { vocabulary, idf } = buildVocabulary(train);
  console.log(`Vocabulary size: ${vocabulary.length}`);

  const X = train.map((ex) => vectorize(ex.text, vocabulary, idf));
  const y = train.map((ex) => (ex.label === "local" ? 1 : 0));

  console.log(`Training logistic regression on ${train.length} examples for ${EPOCHS} epochs...`);
  const { weights, bias } = trainLogisticRegression(X, y, vocabulary.length);

  const trainMetrics = evaluate(train, vocabulary, idf, weights, bias);
  const heldOutMetrics = evaluate(heldOut, vocabulary, idf, weights, bias);

  console.log("\n--- Results ---");
  console.log(`Train accuracy:    ${(trainMetrics.accuracy * 100).toFixed(1)}%`);
  console.log(
    `Held-out accuracy: ${(heldOutMetrics.accuracy * 100).toFixed(1)}% ` +
      `(precision ${(heldOutMetrics.precision * 100).toFixed(1)}%, recall ${(heldOutMetrics.recall * 100).toFixed(1)}%)`
  );

  console.log("\n--- Held-out spot check ---");
  for (const ex of heldOut.slice(0, 8)) {
    const vec = vectorize(ex.text, vocabulary, idf);
    const z = bias + vec.reduce((sum, x, j) => sum + x * weights[j], 0);
    const predicted = sigmoid(z) >= 0.5 ? "local" : "frontier";
    const mark = predicted === ex.label ? "OK" : "MISS";
    console.log(`[${mark}] predicted=${predicted} actual=${ex.label} :: ${ex.text.slice(0, 70)}`);
  }

  const model = {
    vocabulary,
    idf,
    weights,
    bias,
    meta: {
      datasetSize: dataset.length,
      trainSize: train.length,
      heldOutSize: heldOut.length,
      heldOutAccuracy: heldOutMetrics.accuracy,
      trainedAt: new Date().toISOString(),
    },
  };

  writeFileSync(MODEL_OUTPUT_PATH, JSON.stringify(model, null, 2) + "\n");
  console.log(`\nModel written to ${MODEL_OUTPUT_PATH}`);
}

main();
