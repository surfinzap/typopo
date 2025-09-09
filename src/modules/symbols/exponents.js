import { base } from "../../const.js";

function fixExponent(string, originalExponent, fixedExponent) {
  let metrePrefixes = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  // prettier-ignore
  return string.replace(
    new RegExp(`([${base.spaces}${base.slash}])(${metrePrefixes})(${originalExponent})`, "g"),
    `$1$2${fixedExponent}`
  );
}

//

export function fixSquares(string) {
  return fixExponent(string, "2", "²");
}

//

export function fixCubes(string) {
  return fixExponent(string, "3", "³");
}

//

export function fixExponents(string) {
  string = fixSquares(string);
  string = fixCubes(string);
  return string;
}
