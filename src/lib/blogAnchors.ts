type TextSpan = {
  _type?: string;
  text?: string;
};

type ContentBlock = {
  _type?: string;
  style?: string;
  children?: TextSpan[];
};

export function withHeadingAnchors<T extends ContentBlock>(
  content: T[],
): Array<T & { anchorId?: string }> {
  const occurrences = new Map<string, number>();

  return content.map((block) => {
    if (block._type !== "block" || !/^h[1-4]$/.test(block.style ?? ""))
      return block;

    const text = (block.children ?? [])
      .filter(
        (child) => child._type === "span" && typeof child.text === "string",
      )
      .map((child) => child.text)
      .join("");

    const base = text
      .normalize("NFC")
      .toLocaleLowerCase("es")
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/[\s-]+/g, "-");

    if (!base) return block;

    const count = (occurrences.get(base) ?? 0) + 1;
    occurrences.set(base, count);
    return { ...block, anchorId: count === 1 ? base : `${base}-${count}` };
  });
}
