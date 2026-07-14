export type RouterLabel = "local" | "frontier";

export interface RouterModel {
  vocabulary: string[];
  idf: number[];
  weights: number[];
  bias: number;
  meta: {
    datasetSize: number;
    trainSize: number;
    heldOutSize: number;
    heldOutAccuracy: number;
    trainedAt: string;
  };
}

export interface RouterPrediction {
  label: RouterLabel;
  probLocal: number;
  topFeatures: { token: string; contribution: number }[];
}

const STOPWORDS = new Set([
  "a", "an", "the", "this", "that", "these", "those", "is", "are", "was",
  "were", "be", "been", "being", "to", "of", "in", "on", "for", "with",
  "and", "or", "as", "at", "by", "it", "its", "into", "from", "your",
  "you", "i", "me", "my", "we", "our", "us", "do", "does", "did",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((tok) => tok.length > 2 && !STOPWORDS.has(tok));
}

export function vectorize(
  text: string,
  vocabulary: string[],
  idf: number[]
): number[] {
  const tokens = tokenize(text);
  const termCounts = new Map<string, number>();
  for (const tok of tokens) {
    termCounts.set(tok, (termCounts.get(tok) ?? 0) + 1);
  }
  const totalTerms = tokens.length || 1;

  return vocabulary.map((term, i) => {
    const count = termCounts.get(term) ?? 0;
    const tf = count / totalTerms;
    return tf * idf[i];
  });
}

export function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

export function predict(text: string, model: RouterModel): RouterPrediction {
  const vec = vectorize(text, model.vocabulary, model.idf);
  let z = model.bias;
  const contributions: { token: string; contribution: number }[] = [];

  for (let i = 0; i < vec.length; i++) {
    const contribution = vec[i] * model.weights[i];
    z += contribution;
    if (vec[i] !== 0) {
      contributions.push({ token: model.vocabulary[i], contribution });
    }
  }

  const probLocal = sigmoid(z);
  const topFeatures = contributions
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 5);

  return {
    label: probLocal >= 0.5 ? "local" : "frontier",
    probLocal,
    topFeatures,
  };
}
