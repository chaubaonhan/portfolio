import retrievalPreview from "../../../assets/thumbnails/retrieval-preview.svg";

import type { ProjectContent } from "../../types";

export default {
  title: "Knowledge Retrieval",
  theme: "dark",
  tags: ["nlp", "retrieval", "rag", "llm"],
  description:
    "A language-aware retrieval workflow for document understanding and grounded question answering.<br/><br/>The system connects document processing, semantic retrieval, ranking, and response generation so users can reach relevant information faster while preserving evidence.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: retrievalPreview,
        alt: "Knowledge retrieval pipeline from documents to grounded answers",
        caption: "Retrieval and grounding workflow",
      },
    },
    {
      type: "list",
      props: {
        title: "System path",
        size: "md",
        items: [
          "Document ingestion and language-aware chunking",
          "Semantic representation and candidate retrieval",
          "Relevance ranking and context selection",
          "Grounded response generation with source evidence",
          "Backend integration and production maintenance",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Why retrieval matters",
        text: "A fluent answer is not enough. Retrieval systems need to surface the right evidence, make uncertainty visible, and remain practical under real document and infrastructure constraints.",
      },
    },
  ],
} as const satisfies ProjectContent;
