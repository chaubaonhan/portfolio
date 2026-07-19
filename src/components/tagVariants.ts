export type TagVariant =
  | "ai"
  | "backend"
  | "dataset"
  | "deployment"
  | "llm"
  | "nlp"
  | "rag"
  | "research"
  | "retrieval"
  | "systems"
  | "transformers";

export const tagLabels = {
  ai: "Applied AI",
  backend: "Backend",
  dataset: "Dataset",
  deployment: "Deployment",
  llm: "LLMs",
  nlp: "NLP",
  rag: "RAG",
  research: "Research",
  retrieval: "Retrieval",
  systems: "AI Systems",
  transformers: "Transformers",
} as const satisfies Record<TagVariant, string>;
