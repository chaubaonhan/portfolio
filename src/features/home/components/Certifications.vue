<script setup lang="ts">
import Banner from "../../../components/Banner.vue";
import Link from "../../../components/Link.vue";
import NotchSection from "../../../components/NotchSection.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import aptisLogo from "../../../assets/certifications/aptis.png";
import ibmLogo from "../../../assets/certifications/ibm.svg";
import microsoftLogo from "../../../assets/certifications/microsoft.svg";

const certifications = [
  {
    issuer: "IBM · Coursera",
    title: "IBM Data Science Professional Certificate",
    description: "Data science foundations, practical workflows, applied analytics, and model-driven problem solving.",
    meta: "Professional certificate",
    logo: ibmLogo,
    logoAlt: "IBM",
    href: "https://www.coursera.org/account/accomplishments/specialization/8H6W2P606BUU",
  },
  {
    issuer: "Microsoft · Coursera",
    title: "Microsoft Power BI Data Analyst Professional Certificate",
    description: "Data analysis, dashboard storytelling, and business intelligence with Microsoft Power BI.",
    meta: "Professional certificate",
    logo: microsoftLogo,
    logoAlt: "Microsoft",
    href: "https://www.coursera.org/account/accomplishments/specialization/CZHKD4JMN3L2",
  },
  {
    issuer: "British Council · 2023",
    title: "Aptis ESOL — CEFR B2",
    description: "Upper-intermediate English communication across listening, reading, speaking, and writing.",
    meta: "International certificate",
    logo: aptisLogo,
    logoAlt: "British Council Aptis",
    href: null,
  },
] as const;
</script>

<template>
  <section class="certifications">
    <NotchSection class="certifications-notch-end" />

    <div class="grid certifications-heading-grid">
      <div class="certifications-heading">
        <Banner class="certifications-heading-banner" copy="Verified learning" size="sm" animated />
        <h2 class="certifications-heading-title">Certifications</h2>
        <p class="certifications-heading-copy">
          Selected credentials supporting my work across data, analytics, and international communication.
        </p>
      </div>
    </div>

    <div class="grid certifications-grid">
      <div class="certifications-cards">
        <article v-for="(certification, index) in certifications" :key="certification.title" class="certification-card">
          <div class="certification-card-top">
            <span class="certification-card-index">0{{ index + 1 }}</span>
            <div class="certification-card-logo">
              <img :src="certification.logo" :alt="certification.logoAlt" />
            </div>
          </div>

          <div class="certification-card-content">
            <p class="certification-card-issuer">{{ certification.issuer }}</p>
            <h3 class="certification-card-title">{{ certification.title }}</h3>
            <p class="certification-card-description">{{ certification.description }}</p>
          </div>

          <div class="certification-card-footer">
            <span class="certification-card-meta">{{ certification.meta }}</span>
            <Link
              v-if="certification.href"
              external
              :href="certification.href"
              class="certification-card-link"
              data-hoversound="hover"
              data-sound="click"
            >
              View credential
              <ArrowRightLong class="certification-card-link-icon" />
            </Link>
            <span v-else class="certification-card-private">Available on request</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.certifications {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  width: 100%;
  min-height: calc(var(--lvh) * 100 + var(--radius-xxl));
  padding: 112px var(--space-outer) 128px;
  background-color: var(--color-beige-600);
  overflow: hidden;

  @include mixins.mq("md") {
    gap: var(--space-xxl);
    padding-top: 152px;
    padding-bottom: 168px;
  }

  @include mixins.mq("lg") {
    gap: var(--space-xxxl);
  }

  &::before {
    content: "CREDENTIAL ARCHIVE / 03";
    position: absolute;
    top: calc(var(--height-header) + 10px);
    right: var(--space-outer);
    color: var(--color-text-300);
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    letter-spacing: 0.08em;
  }

  &-notch-end {
    position: absolute;
    bottom: 0;
    left: 0;
    color: var(--color-beige-400);
    --icon-color: var(--color-beige-400);
  }

  &-heading {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 10;
    }

    &-grid {
      width: 100%;
    }

    &-title {
      font-size: var(--font-size-title-md);
      font-weight: 900;
      letter-spacing: 0.02em;

      @include mixins.mq("sm") {
        font-size: var(--font-size-title-lg);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xl);
      }
    }

    &-copy {
      max-width: 680px;
      color: var(--color-text-300);
      font-size: var(--font-size-lg);
      line-height: var(--line-height-copy);
    }

    &-banner {
      position: absolute;
      top: 0;
      left: -8px;
      transform: translate(0, -20%) rotate(-4deg);

      @include mixins.mq("lg") {
        left: -16px;
        transform: translate(0, -20%) rotate(-6deg);
      }
    }
  }

  &-grid {
    width: 100%;
  }

  &-cards {
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-lg);

    @include mixins.mq("md") {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}

.certification-card {
  --card-accent: var(--color-dark-blue-500);

  display: flex;
  flex-direction: column;
  min-height: 410px;
  border: var(--stroke-md) solid var(--color-black-400);
  border-radius: var(--radius-xl);
  background: var(--color-beige-400);
  overflow: hidden;
  transition:
    transform 0.35s var(--ease-smooth),
    box-shadow 0.35s var(--ease-smooth);

  &:nth-child(2) {
    --card-accent: var(--color-orange-400);
  }

  &:nth-child(3) {
    --card-accent: #a83f3f;
  }

  @include mixins.hover {
    &:hover {
      transform: translateY(-10px) rotate(-0.4deg);
      box-shadow: 0 18px 0 rgba(45, 42, 36, 0.12);
    }
  }

  &-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 116px;
    padding: var(--space-md);
    border-bottom: var(--stroke-md) solid var(--color-black-400);
    background-image: linear-gradient(rgba(45, 42, 36, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45, 42, 36, 0.06) 1px, transparent 1px);
    background-size: 18px 18px;
  }

  &-index {
    color: var(--card-accent);
    font-family: "ProFontWindows";
    font-size: var(--font-size-title-xs);
    font-weight: 700;
  }

  &-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 148px;
    height: 74px;
    padding: var(--space-sm);
    border: var(--stroke-md) solid var(--color-black-400);
    border-radius: var(--radius-md);
    background: var(--color-white-400);
    transform: rotate(2deg);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-lg);
  }

  &-issuer,
  &-meta,
  &-private {
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &-issuer {
    color: var(--card-accent);
    font-weight: 700;
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 900;
    line-height: var(--line-height-title);
  }

  &-description {
    color: var(--color-text-300);
    line-height: var(--line-height-copy);
  }

  &-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    min-height: 68px;
    padding: var(--space-md) var(--space-lg);
    border-top: var(--stroke-md) solid var(--color-black-400);
  }

  &-meta {
    color: var(--color-text-300);
  }

  &-private {
    color: var(--card-accent);
    font-weight: 700;
  }

  &-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--card-accent);
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-transform: uppercase;

    &-icon {
      width: var(--icon-size-sm);
      --icon-color: currentColor;
    }
  }
}
</style>
