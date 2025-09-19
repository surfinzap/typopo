import { base } from "../../const.js";
import { fixSpacingAroundSymbol } from "./symbol-utils.js";


export function fixSectionSign(string) {
  string = fixSpacingAroundSymbol(string, base.sectionSign);
  string = fixSpacingAroundSymbol(string, base.paragraphSign);

  return string;
}
