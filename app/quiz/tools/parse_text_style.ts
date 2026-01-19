type TextPart = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

/** 텍스트 볼드 등을 적용하는 함수 */
export const parseTextStyle = (text: string): TextPart[] => {
  const regex = /(\/\*.*?\*\/|\/_.*?_\/)/g;
  const result: TextPart[] = [];

  let lastIndex = 0;

  text.replace(regex, (match, _p1, offset) => {
    if (offset > lastIndex) {
      result.push({ text: text.slice(lastIndex, offset) });
    }

    if (match.startsWith("/*")) {
      result.push({
        text: match.slice(2, -2),
        bold: true,
      });
    } else if (match.startsWith("/_")) {
      result.push({
        text: match.slice(2, -2),
        italic: true,
      });
    }

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex) });
  }

  return result;
};
