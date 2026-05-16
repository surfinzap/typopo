/* Swiss Standard German */
import { base } from "../const.js";

export const deCH = {
  quotes: {
    openingDoubleQuote: "«",
    closingDoubleQuote: "»",
    openingSingleQuote: "‹",
    closingSingleQuote: "›",
  },

  /* 
    …sentence: „Direct speech…“
  */
  directSpeechIntro: ":",

  /*
    Dash and spacing between words 
  */
  // TBD double-check
  dashWords: {
    spaceBefore: base.nbsp,
    dash:        base.enDash,
    spaceAfter:  base.space,
  },

  spaceAfter: {
    copyright:               base.nbsp, // ©⎵2025
    soundRecordingCopyright: base.nbsp, // ℗⎵2025
    numeroSign:              base.nbsp, // №⎵1234
    sectionSign:             base.nbsp, // §⎵38
    paragraphSign:           base.nbsp, // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation:            base.nbsp,
  },

  spaceBefore: {
    percent: base.narrowNbsp, // 12⎵%
  },

  numbers: {
    ordinalIndicator:      "\\.",
    romanOrdinalIndicator: "\\.",
  },

  /* 
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
  */
  // TBD double-check
  ordinalDate: {
    firstSpace:  "",
    secondSpace: "",
  },

  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations: [
    "Abk", // Abkommen, Abkürzung
    "Abs", // Absatz
    "Abt", // Abteilung
    "abw", // abweichend
    "allg", // allgemein
    "Anh", // Anhang
    "Anm", // Anmerkung
    "Bd", // Band
    "Bde", // Bände
    "Bem", // Bemerkung(en)
    "bes", // besonders
    "betr", // betreffend
    "Bsp", // Beispiel
    "bzw", // beziehungsweise
    "dgl", // dergleichen
    "eidg", // eidgenössisch
    "Einl", // Einleitung
    "evtl", // eventuell
    "exkl", // exklusive
    "Ex", // Exemplar
    "frz", // französisch
    "geb", // geboren, gebunden
    "ggf", // gegebenenfalls
    "inkl", // inklusive
    "int", // international
    "Jg", // Jahrgang
    "Jh", // Jahrhundert
    "Kap", // Kapitel
    "Kt", // Kanton
    "kt", // kantonal
    "Lit", // Literatur
    "lt", // laut
    "mat", // materiell
    "Mio", // Million
    "Mia", // Milliarde
    "Mrd", // Milliarde
    "öff", // öffentlich
    "ppa", // per procura
    "Prot", // Protokoll(e)
    "Red", // Redaktion, Redaktor
    "Reg", // Register, Regierung
    "ref", // reformiert
    "schweiz", // schweizerisch
    "sog", // sogenannt
    "spez", // speziell
    "St", // Stück, Sankt
    "usw", // und so weiter
    "Verf", // Verfasser, Verfassung
    "vgl", // vergleiche
    "vs", // versus = gegen
    "Vw", // Verwaltung
    "Ziff", // Ziffer
    "zzt", // zurzeit
  ],

  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: [
    "a A", // am Anfang, anderer Ansicht
    "d h", // das heisst
    "i V", // in Vertretung
    "m E", // meines Erachtens
    "m W", // meines Wissens
    "o Ä", // oder Ähnliche(s)
    "u a", // und andere(s), unter anderem(anderen)
    "u Ä", // und Ähnliche(s)
    "u a m", // und andere(s) mehr
    "u U", // unter Umständen
    "z B", // zum Beispiel
    "z Hd", // zu Handen
    "z H", // zu Handen
    "z T", // zum Teil
  ],
};
