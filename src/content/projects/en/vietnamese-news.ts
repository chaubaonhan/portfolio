import paperPreview from "../../../assets/thumbnails/paper-preview.svg";
import paperShift from "../../../assets/images/projects/paper-shift.svg";

import type { ProjectContent } from "../../types";

export default {
  title: "Vietnamese News Dataset",
  theme: "dark",
  tags: ["nlp", "dataset", "transformers", "research"],
  live: "https://doi.org/10.1109/ACCESS.2026.3711994",
  description:
    "<strong>First-author paper in IEEE Access.</strong><br/><br/><em>A Large-Scale Vietnamese News Dataset for Text Classification: Construction and Evaluation</em>, by B. N. Chau, D. Duong, and P. Tran. The work connects dataset construction with Transformer evaluation under temporal shift and source bias.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: paperPreview,
        alt: "IEEE Access paper preview with title and authors",
        caption: "IEEE Access · DOI 10.1109/ACCESS.2026.3711994",
      },
    },
    {
      type: "text",
      props: {
        title: "Research snapshot",
        text: "Large-scale benchmarks for Vietnamese text classification need to reveal more than in-distribution accuracy. This research studies how model behavior changes across time and news sources—conditions that matter when NLP systems leave a controlled split and meet the real world.",
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "left",
        src: paperShift,
        alt: "Conceptual diagram of temporal shift and source bias evaluation",
        border: false,
        component: {
          type: "text",
          props: {
            title: "Evaluation lens",
            text: "Transformer-based classifiers are evaluated with attention to temporal shift and source bias. The aim is to make model limitations visible, not hide them behind one aggregate score.",
          },
        },
      },
    },
    {
      type: "list",
      props: {
        title: "Research signals",
        size: "md",
        items: [
          "Vietnamese natural language processing",
          "Large-scale dataset construction and labeling",
          "Text classification with Transformer architectures",
          "Robustness under temporal shift and source bias",
          "Open-access publication in IEEE Access, 2026",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
