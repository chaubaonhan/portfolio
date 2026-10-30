import aiconBanner from "../../../media/images/eai-aicon-2026-banner.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "ViSAQA",
  theme: "dark",
  tags: ["nlp", "dataset", "research", "transformers"],
  source: "https://github.com/chaubaonhan/ViSAQA",
  live: "https://huggingface.co/spaces/BaoNhan/tra-cuu-ctsv",
  description:
    "<strong>Co-authored paper accepted at EAI AICON 2026.</strong> Proceedings to appear.<br/><br/><em>ViSAQA: Benchmarking Evidence Sufficiency and Scope Awareness in Vietnamese Student Affairs Question Answering</em>, by Huu Dung Nguyen, Phuoc Tran, Van Thinh Nguyen, Bao Nhan Chau, Hoang Kiet Duong, and Van Dung Nguyen. The study asks when a Vietnamese question-answering system has enough evidence to answer—and when it should abstain.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: aiconBanner,
        fit: "contain",
        alt: "6th EAI International Conference on Artificial Intelligence for Communications and Networks",
        caption: "EAI AICON 2026 · Accepted · Proceedings to appear",
      },
    },
    {
      type: "text",
      props: {
        title: "Research overview",
        text: "ViSAQA evaluates Vietnamese student-affairs question answering with <strong>15,879 examples across 21 topics</strong>. Questions fall into three groups: answerable, insufficient information, and out of scope. Topic-disjoint and random splits separate generalization to unseen topics from performance within a familiar topic distribution.<br/><br/>The paper evaluates ViT5, BARTpho, mBART, mT5-base, and mT5-small with question-only, BM25, dense, and hybrid retrieval inputs. It reports retrieval quality, answer quality on answerable questions, and abstention behavior separately: a strong aggregate score can conceal excessive refusal or unsupported answers.",
      },
    },
    {
      type: "list",
      props: {
        title: "Evaluation design",
        size: "md",
        items: [
          "<strong>Two protocols:</strong> topic-disjoint and random splits; three seeds (22, 42, 202)",
          "<strong>Retrieval:</strong> BM25, E5-base dense retrieval, and reciprocal-rank fusion, followed by BGE reranking and top-3 selection",
          "<strong>Answer quality:</strong> exact match, Token-F1, ROUGE-L, and false refusal on answerable questions",
          "<strong>Abstention:</strong> binary refusal precision, recall, and F1, plus out-of-scope F1",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Key findings",
        size: "md",
        items: [
          "<strong>Random-test retrieval:</strong> reranked Hybrid Hit@3 is 74.23%, versus 74.12% for Dense; the paper does not interpret this small gap as a ranking of methods",
          "<strong>Topic-test answers:</strong> mBART with Dense retrieval reaches 18.88 Token-F1 and 16.26 ROUGE-L, with 30.09% false refusal",
          "<strong>Refusal caution:</strong> the highest model Binary F1 (66.05%) remains below the always-insufficient-information baseline (66.22%)",
          "<strong>Interpretation:</strong> retrieval gains depend on the model and split; answer quality and refusal behavior need separate evaluation",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Paper and application",
        text: "The repository contains the author-provided paper, experiment configurations, training and evaluation code, and bilingual reproduction notes. Benchmark data and trained checkpoints are not distributed.<br/><br/>The student-affairs demo uses <strong>Qwen3-4B with LoRA and hybrid BM25 + BGE-M3 retrieval</strong>, with reranking and scope/evidence checks. Its configuration differs from the sequence-to-sequence experiments in the paper; demo outputs are illustrative, not benchmark results. A demo access code is required.<br/><br/>Publication status: <strong>To Appear</strong>. DOI, volume, and page numbers are pending the proceedings release.",
      },
    },
  ],
} as const satisfies ProjectContent;
