import { NextRequest, NextResponse } from "next/server";
import { predict, type RouterModel } from "@/lib/router-inference";
import model from "@/lib/router-model.json";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const query = body?.query;

  if (typeof query !== "string" || !query.trim()) {
    return NextResponse.json(
      { error: "Body must include a non-empty string field 'query'." },
      { status: 400 }
    );
  }

  const result = predict(query, model as RouterModel);

  return NextResponse.json({
    query,
    ...result,
    modelMeta: model.meta,
  });
}
