import { base } from "../../const.js";

/*
  Remove extra space, nbsp, hairSpace, narrowNbsp
  after number sign (octothorpe) and before number

  Exceptions
  Do not remove spaces, when number sign is at the beginning of the paragraph and probably works as Markdown headline.

  @param {string} string — input text for identification
  @returns {string} — output without extra spaces
*/
export function removeExtraSpacesAfterNumberSign(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `([${base.spaces}]+)` +
        `(${base.numberSign})` +
        `([${base.spaces}]+)` +
        `(\\d)`, 
        "g"
    ),
    `$1$2$4`
  );
}

//

/*
  Consolidates the use of number sign (#)

  @param {string} string — input text for identification
  @returns {string} — output with properly used number sign
*/
export function fixNumberSign(string) {
  string = removeExtraSpacesAfterNumberSign(string);
  return string;
}
