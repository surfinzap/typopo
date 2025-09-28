import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { symbolSet, transformSymbolSet } from "./symbol-utils.test.js";
import { fixNumeroSign } from "../../src/modules/symbols/numero-sign.js";
import { createTestSuite } from "../test-utils.js";

supportedLocales.forEach((localeName) => {
  createTestSuite(
    `Fix numero sign (№), ${localeName}:`,
    transformSymbolSet(symbolSet, "numeroSign", localeName),
    null,
    {},
    (text) => fixNumeroSign(text, new Locale(localeName)),
    localeName
  );
});
