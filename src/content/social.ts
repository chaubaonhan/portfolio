export const social = [
  { url: "mailto:chaubaonhan89@gmail.com", name: "mail" },
  { url: "https://github.com/chaubaonhan", name: "github" },
  { url: "https://www.linkedin.com/in/baonhan1704/", name: "linkedin" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
