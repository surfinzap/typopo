import { base } from "../../const.js";

export function fixSpaceAroundHyphen(string) {
  // Fix hyphen with space after: "word- word" → "word-word"
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.allChars}])` + 
      `(-)` + 
      `([${base.spaces}])` + 
      `([${base.allChars}])`,
      "g"
    ), 
    `$1-$4`
  );

  // Fix hyphen with space before: "word -word" → "word-word"
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.allChars}])` + 
      `([${base.spaces}])` + 
      `(-)` + 
      `([${base.allChars}])`,
      "g"
    ), 
    `$1-$4`
  );

  return string;
}

//

export function fixHyphen(string) {
  string = fixSpaceAroundHyphen(string);
  return string;
}
