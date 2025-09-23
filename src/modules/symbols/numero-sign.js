import { base } from "../../const.js";
import { fixSpacingAroundSymbol } from "./symbol-utils.js";

export function fixNumeroSign(string, locale) {
  string = fixSpacingAroundSymbol(string, base.numeroSign, locale.spaceAfter.numeroSign);

  return string;
}
