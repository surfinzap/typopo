import { base } from "../../src/const.js";
import Locale from "../../src/locale/locale.js";
import { supportedLocales } from "../../src/locale/locale.js";
import { fixSpacingAroundSymbol } from "../../src/modules/symbols/symbol-utils.js";
import { describe, it, expect } from "vitest";
import { transformTestSet } from "../test-utils.js";

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

  // Bracket edge cases
  "(${symbol}1)":          "(${symbol}${space}1)",
  "[${symbol}1]":          "[${symbol}${space}1]",
  "{${symbol}1}":          "{${symbol}${space}1}",
  "(${symbol}${symbol}1)": "(${symbol}${symbol}${space}1)",

  // Start/end of string
  "${symbol}text":   "${symbol}${space}text",
  "text ${symbol}1": "text ${symbol}${space}1",

  // Already correct
  "Article ${symbol}${space}1":    "Article ${symbol}${space}1",
  "Document ${symbol}${space}123": "Document ${symbol}${space}123",
};

const symbolSetInclQuotes = {
  // Quote contexts
  '"text"${symbol}1': '"text" ${symbol}${space}1',
  "'text'${symbol}1": "'text' ${symbol}${space}1",
  "`code`${symbol}1": "`code` ${symbol}${space}1",
};

const symbols = [
  "copyright",
  "soundRecordingCopyright",
  "sectionSign",
  "paragraphSign",
  "numeroSign",
];

export function transformSymbolSet(testSet, symbolName, localeName) {
  return transformTestSet(testSet, localeName, { symbolName });
}

describe("Fix symbol spacing", () => {
  supportedLocales.forEach((localeName) => {
    symbols.forEach((symbolName) => {
      const locale = new Locale(localeName);

      const transformedSymbolSet = transformSymbolSet(
        { ...symbolSet, ...symbolSetInclQuotes },
        symbolName,
        localeName
      );

      Object.keys(transformedSymbolSet).forEach((key) => {
        it(`module test, ${base[symbolName]}, ${localeName}`, () => {
          expect(fixSpacingAroundSymbol(key, base[symbolName], locale.spaceAfter[symbolName])).toBe(
            transformedSymbolSet[key]
          );
        });
      });
    });
  });
});
