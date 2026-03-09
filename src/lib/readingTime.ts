/** Strip markdown syntax before counting words */
const stripMarkdown = (md: string): string =>
  md
    .replace(/```[\s\S]*?```/g, " ")   // fenced code blocks
    .replace(/`[^`]+`/g, " ")          // inline code
    .replace(/!\[.*?\]\(.*?\)/g, " ")  // images
    .replace(/\[.*?\]\(.*?\)/g, " ")   // links
    .replace(/#{1,6}\s/g, " ")         // headings
    .replace(/[*_~>|]/g, " ");         // bold/italic/etc

/** Returns e.g. "4 min read" based on ~200 wpm average reading speed */
export const calculateReadingTime = (text: string): string => {
  const words = stripMarkdown(text).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};
