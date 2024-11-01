/* replace 2 periods at the end of the sentence with a single period */
export function removeExtraPeriod(string) {


  return string.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}

export function fixPeriod(string) {
  return removeExtraPeriod(string);
}
