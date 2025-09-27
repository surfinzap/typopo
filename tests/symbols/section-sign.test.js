import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { symbolSet, transformSymbolSet } from "./symbol-utils.test.js";
import { fixSectionSign } from "../../src/modules/symbols/section-sign.js";
import { createTestSuite } from "../test-helpers.js";

supportedLocales.forEach((localeName) => {
  createTestSuite(
    `Fix section sign (§), ${localeName}:\n`,
    transformSymbolSet(symbolSet, "sectionSign", localeName),
    null,
    (text) => fixSectionSign(text, new Locale(localeName)),
    localeName
  );
});

supportedLocales.forEach((localeName) => {
  createTestSuite(
    `Fix paragraph sign (¶), ${localeName}:\n`,
    transformSymbolSet(symbolSet, "paragraphSign", localeName),
    null,
    (text) => fixSectionSign(text, new Locale(localeName)),
    localeName
  );
});
