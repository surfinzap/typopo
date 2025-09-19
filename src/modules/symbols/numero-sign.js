import { base } from "../../const.js";
import { fixSpacingAroundSymbol } from "./symbol-utils.js";


export function fixNumeroSign(string) {
  string = fixSpacingAroundSymbol(string, base.numeroSign);

  return string;
}
