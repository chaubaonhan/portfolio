import paperPreview from "../../../assets/thumbnails/paper-preview.svg";
import paperShift from "../../../assets/images/projects/paper-shift.svg";

import type { ProjectContent } from "../../types";

export default {
  title: "Vietnamese News Dataset",
  theme: "dark",
  tags: ["nlp", "dataset", "transformers", "research"],
  live: "https://doi.org/10.1109/ACCESS.2026.3711994",
  description:
    "<strong>First-author paper in IEEE Access.</strong><br/><br/><em>A Large-Scale Vietnamese News Dataset for Text Classification: Construction and Evaluation</em>, by B. N. Chau, D. Duong, and P. Tran. The paper introduces BN-VN3S: 946,696 processed Vietnamese news articles spanning 2019–2025, three publishers, and ten topical categories.",
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
        title: "Abstract",
        text: "The Vietnamese language presents distinctive natural language processing (NLP) challenges, compounded by a critical shortage of standard benchmark datasets. To address this gap, this paper introduces <strong>BN-VN3S</strong>, a large-scale Vietnamese news dataset containing 946,696 final processed articles derived from 1,042,295 articles initially collected from VnExpress, VietNamNet, and Dân Trí. Spanning 2019 to 2025 across 10 topical categories, the dataset provides exceptional temporal and source diversity.<br/><br/>Using this resource, we evaluate ten models across three paradigms: Traditional Machine Learning (Naïve Bayes, Logistic Regression, LinearSVC, SGDClassifier), Deep Learning (TextCNN, BiGRU, TextRCNN), and Transformers (mBERT, XLM-R, PhoBERT). The study examines four dimensions: model architecture, temporal data shift, source-origin bias, and training data scale.<br/><br/>BiGRU achieved the highest macro F1-score of 92.42%, closely followed by LinearSVC at 92.33%, while PhoBERT reached 87.98% and mBERT 78.73%. Under temporal shifts on 2023–2025 data, however, PhoBERT demonstrated the strongest stability. Cross-source evaluation exposed substantial source sensitivity: BiGRU dropped by up to 9.71 F1 points, whereas Naïve Bayes and mBERT were more resilient. Transformers benefited increasingly from larger training sets, while the strongest traditional and deep learning baselines remained competitive across the evaluated range. These findings offer practical guidance for building Vietnamese news classification systems in real-world environments.",
      },
    },
    {
      type: "list",
      props: {
        title: "Dataset at a glance",
        size: "md",
        items: [
          "<strong>946,696</strong> final processed articles from 1,042,295 initially collected articles",
          "<strong>Three publishers:</strong> VnExpress, VietNamNet, and Dân Trí",
          "<strong>2019–2025</strong> publication window across 10 topical categories",
          "<strong>Ten models</strong> spanning traditional ML, deep learning, and Transformers",
          "Four evaluation dimensions: architecture, temporal shift, source bias, and training scale",
        ],
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
            title: "Beyond one benchmark score",
            text: "The evaluation separates in-distribution performance from robustness over time, across publishers, and at different training scales. This reveals where a high aggregate score transfers to deployment—and where it does not.",
          },
        },
      },
    },
    {
      type: "list",
      props: {
        title: "Key findings",
        size: "md",
        items: [
          "<strong>Best overall:</strong> BiGRU at 92.42% macro F1, followed by LinearSVC at 92.33%",
          "<strong>Transformer results:</strong> PhoBERT at 87.98% and mBERT at 78.73% macro F1",
          "<strong>Temporal robustness:</strong> PhoBERT remained the most stable on 2023–2025 data",
          "<strong>Source bias:</strong> BiGRU lost up to 9.71 F1 points cross-source; Naïve Bayes and mBERT were more resilient",
          "<strong>Scale behavior:</strong> Transformers continued benefiting from more data, with no consistent crossover under the evaluated setup",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Index terms",
        text: "Vietnamese NLP · Text classification · Large-scale dataset · Temporal shift · Source bias · Transformer",
      },
    },
  ],
} as const satisfies ProjectContent;
