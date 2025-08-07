export function fixPlusMinus(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\+\\-)|(\\-\\+)`, 
      "g"), 
    locale.plusMinus
  );
}
