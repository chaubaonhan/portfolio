// Newest first — the first item is shown as the active card.
// `to` links to a page inside the site (e.g. "/project/dart-vtc"); `href` opens an external link.

export interface Announcement {
  date: string;
  category: string;
  title: string;
  description: string;
  to?: string;
  href?: string;
  linkLabel?: string;
}

export const announcements: Announcement[] = [
  {
    date: "2026",
    category: "New paper",
    title: "DART-VTC: Drift-Aware Replay and Temporal Adaptation",
    description:
      "New first-author paper on keeping Vietnamese topic classifiers accurate on future years. DART-VTC recovers 40% of the temporal performance loss over a strong TF-IDF + SVM baseline.",
    to: "/project/dart-vtc",
    linkLabel: "Read summary",
  },
  {
    date: "2026",
    category: "Publication",
    title: "BN-VN3S paper published in IEEE Access",
    description:
      "A Large-Scale Vietnamese News Dataset for Text Classification: Construction and Evaluation — 946,696 articles, three publishers, ten categories, 2019–2025.",
    href: "https://doi.org/10.1109/ACCESS.2026.3711994",
    linkLabel: "View DOI",
  },
  {
    date: "2026",
    category: "Open dataset",
    title: "BN-VN3S available on Hugging Face",
    description:
      "The multi-source Vietnamese news benchmark behind both papers is openly available for text classification and temporal-drift research.",
    href: "https://huggingface.co/datasets/BaoNhan/Vietnam_News_3_Sources",
    linkLabel: "Open dataset",
  },
];
