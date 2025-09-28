import { addSpaceBeforeSymbol } from "../whitespace/spaces.js";
import { addNbspAfterSymbol, replaceSpacesWithNbspAfterSymbol } from "../whitespace/nbsp.js";

/**
 * Fixes spacing around a symbol by adding proper spaces and non-breaking spaces
 *
 * @param {string} string - The input string where spacing will be fixed
 * @param {string} symbol - The symbol around which to fix spacing
 * @returns {string} - The string with consolidated spacing around the symbol
 */
export function fixSpacingAroundSymbol(string, symbol, spaceAfter) {
  string = addSpaceBeforeSymbol(string, symbol);
  string = addNbspAfterSymbol(string, symbol, spaceAfter);
  string = replaceSpacesWithNbspAfterSymbol(string, symbol, spaceAfter);
  return string;
}
