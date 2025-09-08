function fixExponent(string, locale, originalExponent, fixedExponent) {
  let metrePrefixes = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  // prettier-ignore
  return string.replace(
    new RegExp(`([${locale.spaces}${locale.slash}])(${metrePrefixes})(${originalExponent})`, "g"),
    `$1$2${fixedExponent}`
  );
}

//

export function fixSquares(string, locale) {
  return fixExponent(string, locale, "2", "²");
}

//

export function fixCubes(string, locale) {
  return fixExponent(string, locale, "3", "³");
}

//

export function fixExponents(string, locale) {
  string = fixSquares(string, locale);
  string = fixCubes(string, locale);
  return string;
}
