import { base } from "../../src/const.js";
import Locale from "../../src/locale/locale.js";
import { supportedLocales } from "../../src/locale/locale.js";
import { fixSpacingAroundSymbol } from "../../src/modules/symbols/symbol-utils.js";
import { describe, it, expect } from "vitest";
import { transformTestSet } from "../test-utils.js";
import { t } from "../test-utils.js";

export const symbolSet = {
  // Spaces around the symbol
  [`Company${t.symbol} 2017`]:            `Company ${t.symbol}${t.space}2017`,
  [`Company ${t.symbol} 2017`]:           `Company ${t.symbol}${t.space}2017`,
  [`Company ${t.symbol} 2017`]:           `Company ${t.symbol}${t.space}2017`,
  [`Company ${t.symbol}  2017`]:          `Company ${t.symbol}${t.space}2017`,
  [`Company ${t.symbol}   2017`]:         `Company ${t.symbol}${t.space}2017`,
  [`Company ${t.symbol} 2017`]:           `Company ${t.symbol}${t.space}2017`,
  [`Company ${t.symbol}2017`]:            `Company ${t.symbol}${t.space}2017`,
  [`Company ${t.symbol}${t.symbol}2017`]: `Company ${t.symbol}${t.symbol}${t.space}2017`,

  // Punctuation contexts
  [`text.${t.symbol}1`]: `text. ${t.symbol}${t.space}1`,
  [`text,${t.symbol}1`]: `text, ${t.symbol}${t.space}1`,
  [`text;${t.symbol}1`]: `text; ${t.symbol}${t.space}1`,
  [`text:${t.symbol}1`]: `text: ${t.symbol}${t.space}1`,
  [`text!${t.symbol}1`]: `text! ${t.symbol}${t.space}1`,
  [`text?${t.symbol}1`]: `text? ${t.symbol}${t.space}1`,

  // Special character contexts
  [`#${t.symbol}1`]:       `# ${t.symbol}${t.space}1`,
  [`@${t.symbol}section`]: `@ ${t.symbol}${t.space}section`,
  [`*${t.symbol}note`]:    `* ${t.symbol}${t.space}note`,
  [`&${t.symbol}clause`]:  `& ${t.symbol}${t.space}clause`,
  [`%${t.symbol}rate`]:    `% ${t.symbol}${t.space}rate`,
  [`$${t.symbol}cost`]:    `$ ${t.symbol}${t.space}cost`,

  // Bracket edge cases
  [`(${t.symbol}1)`]:            `(${t.symbol}${t.space}1)`,
  [`[${t.symbol}1]`]:            `[${t.symbol}${t.space}1]`,
  [`{${t.symbol}1}`]:            `{${t.symbol}${t.space}1}`,
  [`(${t.symbol}${t.symbol}1)`]: `(${t.symbol}${t.symbol}${t.space}1)`,

  // Start/end of string
  [`${t.symbol}text`]:   `${t.symbol}${t.space}text`,
  [`text ${t.symbol}1`]: `text ${t.symbol}${t.space}1`,

  // Already correct
  [`Article ${t.symbol}${t.space}1`]:    `Article ${t.symbol}${t.space}1`,
  [`Document ${t.symbol}${t.space}123`]: `Document ${t.symbol}${t.space}123`,
};

const symbolSetInclQuotes = {
  // Quote contexts
  [`"text"${t.symbol}1`]:   `"text" ${t.symbol}${t.space}1`,
  [`'text'${t.symbol}1`]:   `'text' ${t.symbol}${t.space}1`,
  [`\`code\`${t.symbol}1`]: `\`code\` ${t.symbol}${t.space}1`,
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
