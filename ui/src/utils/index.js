const MAX_DESC_CHARS = 200;

export const truncateDesc = (string) =>
  string.length <= MAX_DESC_CHARS
    ? string
    : string.substring(0, MAX_DESC_CHARS).trimEnd() + "...";
