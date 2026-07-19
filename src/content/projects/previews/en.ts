import paperPreview from "../../../assets/thumbnails/paper-preview.svg";
import chatbotPreview from "../../../assets/images/projects/enterprise/chatbot.gif";
import retrievalPreview from "../../../assets/thumbnails/retrieval-preview.svg";

import type { ProjectPreview } from "../../types";

export default [
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
