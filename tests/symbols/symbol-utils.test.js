import { base } from "../../src/const.js";
import Locale from "../../src/locale/locale.js";
import { supportedLocales } from "../../src/locale/locale.js";
import { fixSpacingAroundSymbol } from "../../src/modules/symbols/symbol-utils.js";
import { describe, it, expect } from "vitest";

export const symbolSet = {
  // Spaces around the symbol
  "Company${symbol} 2017":          "Company ${symbol}${space}2017",
  "Company ${symbol} 2017":         "Company ${symbol}${space}2017",
  "Company ${symbol} 2017":         "Company ${symbol}${space}2017",
  "Company ${symbol}  2017":        "Company ${symbol}${space}2017",
  "Company ${symbol}   2017":       "Company ${symbol}${space}2017",
  "Company ${symbol} 2017":         "Company ${symbol}${space}2017",
  "Company ${symbol}2017":          "Company ${symbol}${space}2017",
  "Company ${symbol}${symbol}2017": "Company ${symbol}${symbol}${space}2017",

  // Punctuation contexts
  "text.${symbol}1": "text. ${symbol}${space}1",
  "text,${symbol}1": "text, ${symbol}${space}1",
  "text;${symbol}1": "text; ${symbol}${space}1",
  "text:${symbol}1": "text: ${symbol}${space}1",
  "text!${symbol}1": "text! ${symbol}${space}1",
  "text?${symbol}1": "text? ${symbol}${space}1",

  // Special character contexts
  "#${symbol}1":       "# ${symbol}${space}1",
  "@${symbol}section": "@ ${symbol}${space}section",
  "*${symbol}note":    "* ${symbol}${space}note",
  "&${symbol}clause":  "& ${symbol}${space}clause",
  "%${symbol}rate":    "% ${symbol}${space}rate",
  "$${symbol}cost":    "$ ${symbol}${space}cost",

  // Quote contexts
  '"text"${symbol}1': '"text" ${symbol}${space}1',
  "'text'${symbol}1": "'text' ${symbol}${space}1",
  "`code`${symbol}1": "`code` ${symbol}${space}1",

  // Bracket edge cases
  "(${symbol}1)":          "(${symbol}${space}1)",
  "[${symbol}1]":          "[${symbol}${space}1]",
  "{${symbol}1}":          "{${symbol}${space}1}",
  "(${symbol}${symbol}1)": "(${symbol}${symbol}${space}1)",

  // Start/end of string
  "${symbol}1 text": "${symbol}${space}1 text",
  "text ${symbol}1": "text ${symbol}${space}1",

  // Already correct
  "Article ${symbol}${space}1":    "Article ${symbol}${space}1",
  "Document ${symbol}${space}123": "Document ${symbol}${space}123",
};

const symbols = [
  "copyright",
  "soundRecordingCopyright",
  "sectionSign",
  "paragraphSign",
  "numeroSign",
];

export function transformSymbolSet(testSet, symbolValue, spaceValue) {
  const transformed = {};
  Object.keys(testSet).forEach((key) => {
    const transformedKey = key
      .replace(/\$\{symbol\}/g, symbolValue)
      .replace(/\$\{space\}/g, spaceValue);
    const transformedValue = testSet[key]
      .replace(/\$\{symbol\}/g, symbolValue)
      .replace(/\$\{space\}/g, spaceValue);
    transformed[transformedKey] = transformedValue;
  });
  return transformed;
}

describe("Fix symbol spacing:\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);

    symbols.forEach((symbolName) => {
      const symbolValue = base[symbolName];
      const spaceValue = locale.spaceAfter[symbolName];

      const transformedSymbolSet = transformSymbolSet(symbolSet, symbolValue, spaceValue);

      Object.keys(transformedSymbolSet).forEach((key) => {
        it(`module test, ${symbolValue}, ${localeName}`, () => {
          expect(fixSpacingAroundSymbol(key, symbolValue, spaceValue)).toBe(
            transformedSymbolSet[key]
          );
        });
      });
    });
  });
});
