// Newest first — the first item is shown as the active card.
//
// Photos and videos are NOT stored in this public repo. src/media/ is a local clone of the
// private repo chaubaonhan/portfolio-media, which the deploy workflow fetches at build time.
//
// To add a memory:
//   1. Copy the photo or short video into src/media/memories/ (jpg, png, webp, mp4, or webm),
//      then commit and push it from inside src/media/ (it pushes to the private repo).
//      Videos play muted on loop — keep them short and small (ideally under 10 MB).
//   2. Add an entry below with `image` set to that exact file name, then commit and push this repo.
// Entries whose file is missing are skipped, so the order of the two pushes never breaks the build.
//
// `story` is the back of the card; separate paragraphs with a blank line (\n\n).
// `focus` (optional) moves the visible part of the photo, e.g. "50% 20%" keeps faces near the top.

export interface Memory {
  image: string;
  alt: string;
  date: string;
  title: string;
  place?: string;
  story: string;
  focus?: string;
}

export const memories: Memory[] = [
  {
    image: "graduation-2026.jpg",
    alt: "Chau Bao Nhan receiving a Bachelor of Computer Science diploma on stage at Ton Duc Thang University",
    date: "Oct 17, 2026",
    title: "Receiving My Degree",
    place: "Ton Duc Thang University · Ho Chi Minh City",
    story:
      "I officially graduated with a Bachelor's degree in Computer Science from Ton Duc Thang University in September 2026, and received my diploma on stage at the graduation ceremony on October 17, 2026.\n\nThis stage closes the chapter where I built BN-VN3S, published my first-author paper in IEEE Access, and wrote DART-VTC, now accepted at PACLIC 40.",
    focus: "50% 45%",
  },
  {
    image: "graduation-ceremony-2026.mp4",
    alt: "Short video from the graduation ceremony at Ton Duc Thang University",
    date: "Oct 17, 2026",
    title: "Graduation Ceremony",
    place: "Ton Duc Thang University · Ho Chi Minh City",
    story:
      "A short clip from the graduation ceremony at Ton Duc Thang University on October 17, 2026, a month after completing my Bachelor's degree in Computer Science in September.",
  },
];
