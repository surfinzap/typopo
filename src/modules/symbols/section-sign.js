import { base } from "../../const.js";
import { fixSpacingAroundSymbol } from "./symbol-utils.js";

export function fixSectionSign(string, locale) {
  string = fixSpacingAroundSymbol(string, base.sectionSign, locale.spaceAfter.sectionSign);
  string = fixSpacingAroundSymbol(string, base.paragraphSign, locale.spaceAfter.paragraphSign);

  return string;
}
