// Newest first — the first item is shown as the active card.
// `to` links to a page inside the site (e.g. "/project/dart-vtc"); `href` opens an external link.
import dataForLifeLogo from "../media/images/data-for-life-logo.png";
import aiconBanner from "../media/images/eai-aicon-2026-banner.svg";

export interface Announcement {
  date: string;
  category: string;
  title: string;
  description: string;
  to?: string;
  href?: string;
  linkLabel?: string;
  banner?: {
    src: string;
    alt: string;
    variant?: "competition";
    label?: string;
    headline?: string;
    caption?: string;
  };
}

export const announcements: Announcement[] = [
  {
    date: "Oct 2026",
    category: "Accepted · To Appear",
    title: "ViSAQA accepted at EAI AICON 2026",
    description:
      "Our co-authored paper benchmarks evidence sufficiency and scope awareness in Vietnamese student-affairs question answering, with 15,879 examples across 21 topics. Accepted at the 6th EAI International Conference on Artificial Intelligence for Communications and Networks; proceedings to appear.",
    to: "/project/visaqa",
    linkLabel: "Read summary",
    banner: {
      src: aiconBanner,
      alt: "EAI AICON 2026 — Artificial Intelligence for Communications and Networks",
    },
  },
  {
    date: "2026",
    category: "Competition",
    title: "CareBridge reaches the Data for Life Top 60",
    description:
      "CareBridge has been selected among the Top 60 teams in Data for Life. Explore the project and follow what we are building next.",
    href: "https://carebridge-beige-kappa.vercel.app/coming-soon",
    linkLabel: "Discover CareBridge",
    banner: {
      src: dataForLifeLogo,
      alt: "Data for Life",
      variant: "competition",
      label: "Competition milestone",
      headline: "TOP 60",
      caption: "CareBridge · Data for Life",
    },
  },
  {
    date: "Dec 2026",
    category: "Accepted · Upcoming",
    title: "DART-VTC accepted at PACLIC 40",
    description:
      "My first-author paper on temporal drift in Vietnamese topic classification will appear at PACLIC 40 in Taipei, Taiwan (December 10–12, 2026). Proceedings upcoming.",
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
