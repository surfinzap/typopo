export function fixSpaceAroundHyphen(string, locale) {
  // Fix hyphen with space after: "word- word" → "word-word"
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${locale.allChars}])` + 
      `(-)` + 
      `([${locale.spaces}])` + 
      `([${locale.allChars}])`,
      "g"
    ), 
    `$1-$4`
  );

  // Fix hyphen with space before: "word -word" → "word-word"
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${locale.allChars}])` + 
      `([${locale.spaces}])` + 
      `(-)` + 
      `([${locale.allChars}])`,
      "g"
    ), 
    `$1-$4`
  );

  return string;
}

//

export function fixHyphen(string, locale) {
  string = fixSpaceAroundHyphen(string, locale);
  return string;
}
