import { base } from "../../const.js";
import { addSpaceBeforeSymbol } from "../whitespace/spaces.js";
import { addNbspAfterSymbol, replaceSpacesWithNbspAfterSymbol } from "../whitespace/nbsp.js";

export function fixSectionSign(string) {
  string = addSpaceBeforeSymbol(string, base.sectionSign);
  string = addNbspAfterSymbol(string, base.sectionSign);
  string = replaceSpacesWithNbspAfterSymbol(string, base.sectionSign);

  string = addSpaceBeforeSymbol(string, base.paragraphSign);
  string = addNbspAfterSymbol(string, base.paragraphSign);
  string = replaceSpacesWithNbspAfterSymbol(string, base.paragraphSign);

  return string;
}
