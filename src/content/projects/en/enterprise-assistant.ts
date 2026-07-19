import chatbotPreview from "../../../assets/images/projects/enterprise/chatbot.gif";

import type { ProjectContent } from "../../types";

export default {
  title: "Enterprise AI Assistant",
  theme: "light",
  tags: ["ai", "backend", "deployment", "systems"],
  videoBorder: true,
  description:
    "A production chatbot supporting internal work management and employee operations across a company of approximately 5,000 people.<br/><br/>I owned the full lifecycle—from system design and AI backend work through deployment, maintenance, real-time experience, and ongoing support.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: chatbotPreview,
        alt: "Enterprise AI assistant interface in production",
        caption: "Production assistant experience",
      },
    },
    {
      type: "list",
      props: {
        title: "End-to-end ownership",
        size: "md",
        items: [
          "AI backend and service architecture",
          "Real-time conversational interface",
          "Deployment and production operations",
          "Maintenance, support, and iterative improvement",
          "Enterprise context at approximately 5,000 employees",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Engineering principle",
        text: "A useful AI system is more than its model response. Reliability depends on the surrounding product: latency, failure handling, maintainability, user experience, and a clear operational path after launch.",
      },
    },
  ],
} as const satisfies ProjectContent;
