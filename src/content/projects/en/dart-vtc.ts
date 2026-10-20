import dartPreview from "../../../assets/thumbnails/dart-vtc-preview.svg";
import dartFramework from "../../../assets/images/projects/dart-vtc-framework.svg";

import type { ProjectContent } from "../../types";

export default {
  title: "DART-VTC",
  theme: "dark",
  tags: ["nlp", "research", "dataset"],
  description:
    "<strong>First-author paper accepted at PACLIC 40</strong> (The 40th Pacific Asia Conference on Language, Information and Computation, Taipei, Taiwan, December 10–12, 2026). Proceedings upcoming.<br/><br/><em>DART-VTC: Drift-Aware Replay and Temporal Adaptation for Large-Scale Vietnamese Topic Classification</em>, by B. N. Chau, T. K. Tran, and P. Tran. Building on the BN-VN3S benchmark, the paper asks whether a topic classifier trained on past news stays accurate on future years—and how to recover the accuracy it loses.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: dartPreview,
        alt: "DART-VTC paper preview with title, authors, PACLIC 40 acceptance, and headline results",
        caption: "Accepted at PACLIC 40 · Taipei, December 2026 · Proceedings upcoming",
      },
    },
    {
      type: "text",
      props: {
        title: "Abstract",
        text: "Text classifiers are commonly evaluated using random train-test splits, but real-world systems are often trained on historical documents and deployed on future data. This mismatch can lead to temporal degradation when events, named entities, lexical cues, and topic distributions change over time. This paper studies temporal accuracy recovery for Vietnamese topic classification using <strong>BN-VN3S</strong>, a large-scale multi-source Vietnamese news benchmark containing ten categories from 2019 to 2025.<br/><br/>We introduce a chronological evaluation protocol that compares random-split performance with past-to-future and rolling-year evaluation, and propose <strong>DART-VTC</strong>, a Drift-Aware Replay and Temporal Adaptation framework that combines year-aware modeling, replay learning, and drift-aware sample weighting.<br/><br/>TF-IDF + Linear SVM is a strong static baseline with an average future-year Macro-F1 of 91.10; DART-VTC improves this to <strong>91.69 (+0.59)</strong> and recovers <strong>40.00%</strong> of the temporal performance loss. High random-split accuracy does not necessarily guarantee future-year robustness.",
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "left",
        src: dartFramework,
        alt: "DART-VTC framework: drift analyzer feeding sample weighting and a replay buffer into a year-aware classifier",
        border: false,
        component: {
          type: "text",
          props: {
            title: "How DART-VTC works",
            text: "A temporal drift analyzer scores every topic-year pair by label distribution shift, lexical drift (Jensen-Shannon divergence over TF-IDF term distributions), and confusion shift. Those scores drive per-sample weights, while a label- and year-balanced replay buffer of prototype and boundary examples preserves older topic patterns. The classifier sees the normalized publication year as an extra feature.",
          },
        },
      },
    },
    {
      type: "list",
      props: {
        title: "Contributions",
        size: "md",
        items: [
          "<strong>Temporal evaluation protocol</strong> for large-scale Vietnamese topic classification from 2019 to 2025",
          "<strong>Drift analysis</strong> through year-wise performance, label distribution shift, lexical drift, and label-confusion shift",
          "<strong>DART-VTC</strong>, a model-agnostic framework combining year-aware modeling, replay learning, and drift-aware weighting",
          "<strong>Past-to-future and rolling-year</strong> comparison against static and temporal adaptation baselines",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Key results",
        size: "md",
        items: [
          "<strong>Strongest static baseline:</strong> TF-IDF + Linear SVM, 92.58 random-split vs. 91.10 future-year Macro-F1",
          "<strong>DART-VTC:</strong> 91.50 / 92.10 / 91.48 Macro-F1 on 2023 / 2024 / 2025, averaging 91.69",
          "<strong>Recovery:</strong> +0.59 Macro-F1 over the static baseline, recovering 40.00% of the temporal loss",
          "<strong>Ablation:</strong> removing any component drops below the static baseline—the gain comes from combining all three",
          "<strong>Other baselines:</strong> FastText 90.41 and PhoBERT 87.67 average future-year Macro-F1",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Index terms",
        text: "Vietnamese NLP · Topic classification · Temporal drift · Replay learning · Instance weighting · Chronological evaluation",
      },
    },
  ],
} as const satisfies ProjectContent;
