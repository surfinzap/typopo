const quotes = {
  leftDoubleQuote : 				"«",
  rightDoubleQuote : 				"»",
  leftSingleQuote : 				"‹",
  rightSingleQuote : 				"›",
};

const numbers = {
  ordinalIndicator :				"\\.",
  romanOrdinalIndicator :		"\\.",
}


const singleWordAbbreviations = [
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
]

/*
  The list of common multi-word abbrevations that,
  stripped down of its micro-typography treatment.
*/ 
const multipleWordAbbreviations = [
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
]


export default {
  quotes,
  numbers,
  singleWordAbbreviations,
  multipleWordAbbreviations
}
