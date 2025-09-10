import { base } from "../../const.js";

export function fixPlusMinus(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\+\\-)|(\\-\\+)`, 
      "g"), 
    base.plusMinus
  );
}
