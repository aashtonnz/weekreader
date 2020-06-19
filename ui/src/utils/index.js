const MAX_DESC_CHARS = 200;

export const trimValues = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      newObj[key] = obj[key].trim();
    }
  });
  return newObj;
};

export const truncateDesc = (string) =>
  string.length <= MAX_DESC_CHARS
    ? string
    : string.substring(0, MAX_DESC_CHARS).trimEnd() + "...";
