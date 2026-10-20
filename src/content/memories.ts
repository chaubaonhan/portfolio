// Newest first — the first item is shown as the active card.
//
// Photos and videos are NOT stored in this public repo. src/assets/memories/ is a local clone of the
// private repo chaubaonhan/portfolio-media, which the deploy workflow fetches at build time.
//
// To add a memory:
//   1. Copy the photo or short video into src/assets/memories/ (jpg, png, webp, mp4, or webm),
//      then commit and push it from inside that folder (it pushes to the private repo).
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
    date: "2026",
    title: "Graduation Day",
    place: "Ton Duc Thang University · Ho Chi Minh City",
    story:
      "Receiving my Bachelor's degree in Computer Science from Ton Duc Thang University.\n\nThis stage closes the chapter where I built BN-VN3S, published my first-author paper in IEEE Access, and wrote DART-VTC, now accepted at PACLIC 40.",
    focus: "50% 45%",
  },
  {
    image: "graduation-ceremony-2026.mp4",
    alt: "Short video from the graduation ceremony at Ton Duc Thang University",
    date: "2026",
    title: "Graduation Ceremony",
    place: "Ton Duc Thang University · Ho Chi Minh City",
    story:
      "A short clip from the graduation ceremony at Ton Duc Thang University, the day I officially completed my Bachelor's degree in Computer Science.",
  },
];
