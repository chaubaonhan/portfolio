import dartPreview from "../../../media/thumbnails/dart-vtc-preview.svg";
import paperPreview from "../../../media/thumbnails/paper-preview.svg";
import chatbotPreview from "../../../media/images/projects/enterprise/chatbot.gif";
import retrievalPreview from "../../../media/thumbnails/retrieval-preview.svg";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "DART-VTC",
    slug: "dart-vtc",
    thumbnail: dartPreview,
    description: "First-author paper accepted at PACLIC 40 (upcoming)",
  },
  {
    title: "Vietnamese News Dataset",
    slug: "vietnamese-news",
    thumbnail: paperPreview,
    description: "First-author IEEE Access publication",
  },
  {
    title: "Enterprise AI Assistant",
    slug: "enterprise-assistant",
    thumbnail: chatbotPreview,
    description: "Production system serving ≈5,000 employees",
  },
  {
    title: "Knowledge Retrieval",
    slug: "knowledge-retrieval",
    thumbnail: retrievalPreview,
    description: "Grounded search, ranking, and question answering",
  },
] as const satisfies ProjectPreview[];
