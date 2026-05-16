/*!
 * Typopo v3.0.1 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
var L = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", W = "’", k = "′", q = "`", N = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’ʼ'‹›′´`]{2,}", I = "″", S = " ", w = " ", E = " ", A = " ", z = S + w + E + A, v = "\\.!?", R = ",:;", C = R + v, U = "\\(\\[\\{", O = "\\)\\]\\}", M = "…", T = "-", j = "–", Z = "—", _ = "/", X = "°", H = "×", F = "&", V = "§", G = "¶", J = "©", K = "℗", Y = "®", ee = "℠", ne = "™", pe = "+", ae = "−", oe = "±", re = "%", se = "‰", te = "‱", ie = "#", ue = "№", ce = "IVXLCDM", n = {
  singleQuoteAdepts: L,
  apostrophe: W,
  singlePrime: k,
  backtick: q,
  doubleQuoteAdepts: N,
  doublePrime: I,
  space: S,
  nbsp: w,
  hairSpace: E,
  narrowNbsp: A,
  spaces: z,
  terminalPunctuation: v,
  sentencePausePunctuation: R,
  sentencePunctuation: C,
  openingBrackets: U,
  closingBrackets: O,
  ellipsis: M,
  hyphen: T,
  enDash: j,
  emDash: Z,
  slash: _,
  degree: X,
  multiplicationSign: H,
  ampersand: F,
  sectionSign: V,
  paragraphSign: G,
  copyright: J,
  soundRecordingCopyright: K,
  registeredTrademark: Y,
  serviceMark: ee,
  trademark: ne,
  plus: pe,
  minus: ae,
  plusMinus: oe,
  percent: re,
  permille: se,
  permyriad: te,
  numberSign: ie,
  numeroSign: ue,
  romanNumerals: ce,
  urlPattern: "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+(?:(?:aero|arpa|asia|agency|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|cloud|com|company|coop|c[acdfghiklmnoruvxyz])|(?:dev|d[ejkmoz])|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|guide|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om|one)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|(?:shop|store|s[abcdeghijklmnortuvyz])|(?:tel|travel|team|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|(?:work|w[fs])|(?:xyz)|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\\:\\d{1,5})?)(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?(?:\\b|$)",
  emailPattern: "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}\\@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+",
  filenamePattern: "\\b[a-zA-Z0-9_%\\-]+\\.(ai|asm|bat|bmp|c|cpp|cs|css|csv|dart|doc|docx|exe|gif|go|html|ics|java|jpeg|jpg|js|json|key|kt|less|lua|log|md|mp4|odp|ods|odt|pdf|php|pl|png|ppt|pptx|psd|py|r|rar|rb|rs|scala|scss|sh|svg|sql|swift|tar.gz|tar|tex|tiff|ts|txt|vbs|xml|xls|xlsx|yaml|yml|zip)\\b"
}, $e = {
  quotes: {
    openingDoubleQuote: "„",
    closingDoubleQuote: "“",
    openingSingleQuote: "‚",
    closingSingleQuote: "‘"
  },
  directSpeechIntro: ":",
  dashWords: {
    spaceBefore: n.nbsp,
    dash: n.enDash,
    spaceAfter: n.space
  },
  spaceAfter: {
    copyright: n.space,
    soundRecordingCopyright: n.space,
    numeroSign: n.nbsp,
    sectionSign: n.nbsp,
    paragraphSign: n.nbsp,
    abbreviation: n.nbsp
  },
  spaceBefore: { percent: n.nbsp },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  singleWordAbbreviations: [
    "č",
    "fol",
    "např",
    "odst",
    "par",
    "r",
    "s",
    "str",
    "sv",
    "tj",
    "tzv"
  ],
  multipleWordAbbreviations: [
    "hl m",
    "n l",
    "p n l",
    "př n l"
  ]
}, de = {
  quotes: {
    openingDoubleQuote: "“",
    closingDoubleQuote: "”",
    openingSingleQuote: "‘",
    closingSingleQuote: "’"
  },
  directSpeechIntro: ",",
  dashWords: {
    spaceBefore: "",
    dash: n.emDash,
    spaceAfter: ""
  },
  spaceAfter: {
    copyright: n.nbsp,
    soundRecordingCopyright: n.nbsp,
    numeroSign: n.nbsp,
    sectionSign: n.nbsp,
    paragraphSign: n.nbsp,
    abbreviation: ""
  },
  spaceBefore: { percent: "" },
  numbers: {
    ordinalIndicator: "st|nd|rd|th",
    romanOrdinalIndicator: ""
  },
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  singleWordAbbreviations: [
    "p",
    "pp",
    "no",
    "vol"
  ],
  multipleWordAbbreviations: [
    "U S",
    "e g",
    "i e",
    "a m",
    "p m"
  ]
}, le = {
  quotes: {
    openingDoubleQuote: "«",
    closingDoubleQuote: "»",
    openingSingleQuote: "‹",
    closingSingleQuote: "›"
  },
  directSpeechIntro: ":",
  dashWords: {
    spaceBefore: n.hairSpace,
    dash: n.emDash,
    spaceAfter: n.hairSpace
  },
  spaceAfter: {
    copyright: n.nbsp,
    soundRecordingCopyright: n.nbsp,
    numeroSign: n.nbsp,
    sectionSign: n.narrowNbsp,
    paragraphSign: n.narrowNbsp,
    abbreviation: n.nbsp
  },
  spaceBefore: { percent: n.nbsp },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  singleWordAbbreviations: [
    "ціт",
    "ст",
    "канц",
    "абз",
    "тзв",
    "Зб",
    "ч",
    "напр"
  ],
  multipleWordAbbreviations: [
    "т зн",
    "Е Ч",
    "евід ч",
    "род ч",
    "т ч",
    "т д"
  ]
}, fe = {
  quotes: {
    openingDoubleQuote: "„",
    closingDoubleQuote: "“",
    openingSingleQuote: "‚",
    closingSingleQuote: "‘"
  },
  directSpeechIntro: ":",
  dashWords: {
    spaceBefore: n.hairSpace,
    dash: n.emDash,
    spaceAfter: n.hairSpace
  },
  spaceAfter: {
    copyright: n.nbsp,
    soundRecordingCopyright: n.nbsp,
    numeroSign: n.nbsp,
    sectionSign: n.narrowNbsp,
    paragraphSign: n.narrowNbsp,
    abbreviation: n.nbsp
  },
  spaceBefore: { percent: n.nbsp },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  singleWordAbbreviations: [
    "č",
    "cit",
    "čl",
    "fol",
    "napr",
    "odst",
    "par",
    "r",
    "roč",
    "s",
    "str",
    "sv",
    "tzv",
    "vyd"
  ],
  multipleWordAbbreviations: [
    "hl m",
    "n l",
    "p n l",
    "pr n l",
    "s a",
    "s l",
    "t č",
    "t j",
    "zodp red"
  ]
}, be = {
  quotes: {
    openingDoubleQuote: "„",
    closingDoubleQuote: "“",
    openingSingleQuote: "‚",
    closingSingleQuote: "‘"
  },
  directSpeechIntro: ":",
  dashWords: {
    spaceBefore: n.hairSpace,
    dash: n.enDash,
    spaceAfter: n.hairSpace
  },
  spaceAfter: {
    copyright: n.nbsp,
    soundRecordingCopyright: n.nbsp,
    numeroSign: n.nbsp,
    sectionSign: n.nbsp,
    paragraphSign: n.nbsp,
    abbreviation: n.nbsp
  },
  spaceBefore: { percent: n.narrowNbsp },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.space
  },
  singleWordAbbreviations: [
    "Bhf",
    "ca",
    "Di",
    "Do",
    "Fr",
    "geb",
    "gest",
    "Hbf",
    "Mi",
    "Mo",
    "Nr",
    "S",
    "Sa",
    "So",
    "St",
    "Stk",
    "u",
    "usw",
    "z"
  ],
  multipleWordAbbreviations: [
    "b w",
    "d h",
    "d i",
    "e V",
    "Ges m b H",
    "n Chr",
    "n u Z",
    "s a",
    "s o",
    "s u",
    "u a m",
    "u a",
    "u ä",
    "u Ä",
    "u dgl",
    "u U",
    "u z",
    "u zw",
    "v a",
    "v Chr",
    "v u Z",
    "z B",
    "z T",
    "z Zt"
  ]
}, he = {
  quotes: {
    openingDoubleQuote: "«",
    closingDoubleQuote: "»",
    openingSingleQuote: "‹",
    closingSingleQuote: "›"
  },
  directSpeechIntro: ":",
  dashWords: {
    spaceBefore: n.nbsp,
    dash: n.enDash,
    spaceAfter: n.space
  },
  spaceAfter: {
    copyright: n.nbsp,
    soundRecordingCopyright: n.nbsp,
    numeroSign: n.nbsp,
    sectionSign: n.nbsp,
    paragraphSign: n.nbsp,
    abbreviation: n.nbsp
  },
  spaceBefore: { percent: n.narrowNbsp },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  ordinalDate: {
    firstSpace: "",
    secondSpace: ""
  },
  singleWordAbbreviations: [
    "Abk",
    "Abs",
    "Abt",
    "abw",
    "allg",
    "Anh",
    "Anm",
    "Bd",
    "Bde",
    "Bem",
    "bes",
    "betr",
    "Bsp",
    "bzw",
    "dgl",
    "eidg",
    "Einl",
    "evtl",
    "exkl",
    "Ex",
    "frz",
    "geb",
    "ggf",
    "inkl",
    "int",
    "Jg",
    "Jh",
    "Kap",
    "Kt",
    "kt",
    "Lit",
    "lt",
    "mat",
    "Mio",
    "Mia",
    "Mrd",
    "öff",
    "ppa",
    "Prot",
    "Red",
    "Reg",
    "ref",
    "schweiz",
    "sog",
    "spez",
    "St",
    "usw",
    "Verf",
    "vgl",
    "vs",
    "Vw",
    "Ziff",
    "zzt"
  ],
  multipleWordAbbreviations: [
    "a A",
    "d h",
    "i V",
    "m E",
    "m W",
    "o Ä",
    "u a",
    "u Ä",
    "u a m",
    "u U",
    "z B",
    "z Hd",
    "z H",
    "z T"
  ]
}, $ = {
  cs: $e,
  "en-us": de,
  rue: le,
  sk: fe,
  "de-de": be,
  "de-ch": he
}, g = "en-us", me = class {
  constructor(e) {
    $[e] || (console.warn(`Locale '${e}' not found, falling back to '${g}'`), e = g), this.ID = e, this.openingSingleQuote = $[e].quotes.openingSingleQuote, this.closingSingleQuote = $[e].quotes.closingSingleQuote, this.openingDoubleQuote = $[e].quotes.openingDoubleQuote, this.closingDoubleQuote = $[e].quotes.closingDoubleQuote, this.terminalQuotes = this.closingSingleQuote + this.closingDoubleQuote, this.directSpeechIntro = $[e].directSpeechIntro, this.dashWords = $[e].dashWords, this.spaceAfter = $[e].spaceAfter, this.spaceBefore = $[e].spaceBefore, this.ordinalIndicator = $[e].numbers.ordinalIndicator, this.romanOrdinalIndicator = $[e].numbers.romanOrdinalIndicator, this.ordinalDate = $[e].ordinalDate, this.singleWordAbbreviations = [];
    for (const a in $) this.singleWordAbbreviations = this.singleWordAbbreviations.concat($[a].singleWordAbbreviations);
    this.multipleWordAbbreviations = [];
    for (const a in $) this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat($[a].multipleWordAbbreviations);
    const p = [];
    for (const a in $) {
      const o = $[a].directSpeechIntro;
      o && !p.includes(o) && p.push(o);
    }
    this.directSpeechIntroAdepts = p.join("");
  }
};
function ge(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function b(e, p, a) {
  let t = 0, s = e, i = "";
  for (; s !== i && t < 50; )
    i = s, s = s.replace(p, a), t++;
  return s;
}
function xe(e) {
  return b(e, new RegExp(`([\\p{L}]{2,})([${n.nbsp}${n.narrowNbsp}])([\\p{L}]{2,})`, "gu"), "$1 $3");
}
function Q(e, p) {
  return e = b(e, new RegExp(`(^|[${n.space}]|[^\\p{L}\\d${n.apostrophe}${n.plus}${n.minus}${n.hyphen}])([\\p{Ll}])([${n.space}])`, "gu"), `$1$2${n.nbsp}`), e = e.replace(new RegExp(`(^|[${n.sentencePunctuation}${n.ellipsis}${n.copyright}${n.registeredTrademark}${n.soundRecordingCopyright}])([${n.spaces}]?)([\\p{Lu}])([${n.spaces}])`, "gu"), `$1$2$3${n.nbsp}`), p.ID == "en-us" && (e = e.replace(new RegExp(`(^|[${n.spaces}])(I)([${n.spaces}])`, "g"), `$1$2${n.nbsp}`)), e;
}
function Se(e) {
  return e.replace(new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"), ` $2${n.nbsp}`);
}
function we(e) {
  return e.replace(new RegExp(`([^${n.nbsp}\\d]|^)(\\d{1,2})([${n.spaces}])([\\p{L}])`, "gu"), `$1$2${n.nbsp}$4`);
}
function Ee(e, p) {
  return e.replace(new RegExp(`([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${p.ordinalIndicator})([${n.spaces}]?)([\\p{L}])`, "gu"), `$1$2$3${n.nbsp}$5`);
}
function Ae(e, p) {
  return e.replace(new RegExp(`(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{4})`, "g"), `$1$2${p.ordinalDate.firstSpace}$4$5${p.ordinalDate.secondSpace}$7`);
}
function ve(e, p) {
  return p.romanOrdinalIndicator != "" ? e.replace(new RegExp(`(\\b[\\p{Lu}][\\p{L}]?${p.romanOrdinalIndicator}[${n.spaces}]?)?(\\b)([${n.romanNumerals}]+)(${p.romanOrdinalIndicator})([${n.spaces}]?)([\\p{L}\\d])`, "gu"), function(a, o, t, s, i, u, c) {
    return o ? a : `${t}${s}${i}${n.nbsp}${c}`;
  }) : e;
}
function Re(e, p) {
  let a = `(\\b[\\p{Lu}][\\p{Ll}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${p.romanOrdinalIndicator})([${n.nbsp}]?)`, o = new RegExp(a, "gu");
  return e.replace(o, function(t, s, i, u, c, d) {
    return d == "" && u == "I" ? s + n.space + u + c : d == "" && u != "I" ? s + n.nbsp + u + c : d == n.nbsp && u == "I" ? s + n.space + u + c + d : s + n.nbsp + u + c + n.space;
  });
}
function Qe(e, p) {
  return e.replace(new RegExp(`(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`, "gu"), `$1${p.spaceBefore.percent}$3`);
}
function De(e, p) {
  let a = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${p.closingDoubleQuote}${p.closingSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([\\p{Lu}])([${n.spaces}]|\\.$|$)`, o = new RegExp(a, "gu");
  return e.replace(o, function(t, s, i, u, c) {
    return p.ID === "en-us" && u === "I" ? t : p.ID === "en-us" ? s + n.nbsp + u + c : u === "I" && c && n.spaces.includes(c) ? s + n.nbsp + u + n.space : s + n.nbsp + u + c;
  });
}
function Pe(e, p, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(new RegExp(`(${p})([^${n.spaces}${p}])`, "g"), `$1${a}$2`);
}
function Be(e, p, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(new RegExp(`(${p})([${n.spaces}]+)`, "g"), `$1${a}`);
}
function ye(e, p) {
  return e = xe(e), e = Q(e, p), e = Se(e), e = we(e), e = Ee(e, p), e = Ae(e, p), e = ve(e, p), e = De(e, p), e = Re(e, p), e = Qe(e, p), e;
}
function Le(e) {
  return e.replace(new RegExp(`(\\S)([${n.spaces}]{2,})(\\S)`, "g"), "$1 $3");
}
function We(e) {
  return e.split(/\r?\n/).map((p) => p.replace(/^\s+/, "")).join(`
`);
}
function ke(e) {
  return e.split(/\r?\n/).map((p) => p.replace(/\s+$/, "")).join(`
`);
}
function qe(e) {
  return e.replace(new RegExp(`([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`, "g"), "$2$3");
}
function Ne(e) {
  return e.replace(new RegExp(`([^${n.openingBrackets}])([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`, "g"), "$1$3");
}
function Ie(e, p) {
  return e.replace(new RegExp(`(\\d)([${n.spaces}]?)(${p.ordinalIndicator})([${n.spaces}]|\\b)`, "g"), "$1$3$4");
}
function ze(e) {
  return e.replace(new RegExp(`([${n.openingBrackets}])([${n.spaces}])([^${n.closingBrackets}])`, "g"), "$1$3");
}
function Ce(e) {
  return e.replace(new RegExp(`([\\p{L}])([${n.openingBrackets}])([\\p{L}${n.ellipsis}])([\\p{L}${n.ellipsis}${n.closingBrackets}])`, "gu"), function(p, a, o, t, s) {
    return t == "s" | t == "S" | t + s == "es" | t + s == "ES" ? `${a}${o}${t}${s}` : `${a}${n.space}${o}${t}${s}`;
  });
}
function Ue(e) {
  return e.replace(new RegExp(`([\\p{L}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([\\p{Lu}])`, "gu"), "$1$2 $3");
}
function Oe(e) {
  return e.replace(new RegExp(`([\\p{L}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function Me(e) {
  return e.replace(new RegExp(`([${n.closingBrackets}])([\\p{L}])`, "gu"), "$1 $2");
}
function Te(e, p) {
  return e.replace(new RegExp(`([^${n.spaces}${n.openingBrackets}${p}])(${p})`, "g"), `$1${n.space}$2`);
}
function je(e, p) {
  return e = Le(e), e = We(e), e = ke(e), e = qe(e), e = Ne(e), e = Ie(e, p), e = ze(e), e = Ce(e), e = Ue(e), e = Me(e), e = Oe(e), e;
}
function Ze(e) {
  return e.replace(new RegExp("\\.{2}(?![\\\\/])", "g"), ".");
}
function _e(e) {
  return Ze(e);
}
function Xe(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function He(e) {
  return e.replace(new RegExp(`\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`, "g"), n.ellipsis);
}
function Fe(e) {
  return e.replace(new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"), `${n.space}${n.ellipsis}${n.space}`);
}
function Ve(e) {
  return e.replace(new RegExp(`(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`, "g"), `$1 ${n.ellipsis}$5`);
}
function Ge(e) {
  return e.replace(new RegExp(`(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`, "g"), "$1$3$5$6");
}
function Je(e) {
  return e.replace(new RegExp(`(^${n.ellipsis})([${n.spaces}])([\\p{L}])`, "gmu"), "$1$3");
}
function Ke(e, p) {
  return e.replace(new RegExp(`([^${p.terminalQuotes}])([${n.sentencePunctuation}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([\\p{Ll}])`, "gu"), "$1$2 $4$6");
}
function Ye(e) {
  return e.replace(new RegExp(`([\\p{Ll}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([\\p{Lu}])`, "gu"), "$1$3 $5");
}
function en(e) {
  return e.replace(new RegExp(`([\\p{L}])([${n.ellipsis}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function nn(e, p) {
  return e.replace(new RegExp(`([${n.sentencePunctuation}${p.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([\\p{Lu}])`, "gu"), "$1 $3 $5");
}
function pn(e, p) {
  return e.replace(new RegExp(`([\\p{Ll}])([${n.spaces}])+([${n.ellipsis}][${p.closingDoubleQuote}${p.closingSingleQuote}]?$)`, "gmu"), "$1$3");
}
function an(e, p) {
  return e = Xe(e), e = Ve(e), e = Ge(e), e = Je(e), e = Ke(e, p), e = Ye(e), e = en(e), e = nn(e, p), e = pn(e, p), e = He(e), e = Fe(e), e;
}
var r = {
  apos: "",
  singlePrime: "",
  doublePrime: "",
  osq: "",
  csq: "",
  osqUnpaired: "",
  csqUnpaired: "",
  odq: "",
  cdq: "",
  odqUnpaired: "",
  cdqUnpaired: "",
  enDash: "",
  tick: ""
}, D = 57856, P = 63743, on = P - D + 1;
function B(e) {
  const p = D + e;
  if (p > P) throw new Error(`Exception index ${e} exceeds PUA limit (max ${on}). Text contains too many exceptions (emails/URLs/filenames). Consider processing the text in smaller chunks.`);
  return String.fromCharCode(p);
}
function rn(e, p) {
  return e.replace(new RegExp(`([\\p{L}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*|[${n.spaces}]+[${n.hyphen}]{1,3}[${n.spaces}]+)([\\p{L}\\d])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$3`);
}
function sn(e, p) {
  return e.replace(new RegExp(`([\\p{L}])([${n.spaces}]?)([${n.hyphen}${n.enDash}${n.emDash}]{1,3})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}$5`);
}
function tn(e, p) {
  return e = e.replace(new RegExp(`([${n.openingBrackets}])[${n.spaces}]*([${n.hyphen}${n.enDash}${n.emDash}]+)[${n.spaces}]*([${n.closingBrackets}])`, "gu"), "$1$2$3"), e = e.replace(new RegExp(`([\\p{L}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.openingBrackets}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([\\p{L}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([\\p{L}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.closingBrackets}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([${n.openingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([\\p{L}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]*([${n.openingBrackets}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e;
}
function un(e) {
  return e = b(e, new RegExp(`(\\d)([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`, "gu"), `$1${r.enDash}$3`), e.replace(new RegExp(`${r.enDash}`, "g"), n.enDash);
}
function cn(e) {
  return e.replace(new RegExp(`([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`, "gu"), `$1${n.enDash}$3`);
}
function $n(e, p) {
  return e.replace(new RegExp(`(\\d)(${p.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)(${p.ordinalIndicator})`, "giu"), `$1$2${n.enDash}$4$5`);
}
function dn(e, p) {
  return e = rn(e, p), e = sn(e, p), e = tn(e, p), e = un(e), e = cn(e), e = $n(e, p), e;
}
function ln(e) {
  return e.replace(new RegExp(`([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePausePunctuation}])(${n.doubleQuoteAdepts})`, "g"), "$1$2$4");
}
function fn(e) {
  return e.replace(new RegExp(`([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`, "g"), "$1$2$3");
}
function bn(e) {
  return e = e.replace(new RegExp(`([^0-9]|^)(${n.doubleQuoteAdepts})(.+?)(\\d+)(${n.doubleQuoteAdepts})([${n.terminalPunctuation}${n.ellipsis}])`, "g"), "$1$2$3$4$6$5"), e = e.replace(new RegExp(`(\\b\\d{1,3})([${n.spaces}]?)(${n.doubleQuoteAdepts})([^\\p{L}]|\\B)`, "gu"), `$1$2${r.doublePrime}$4`), e;
}
function hn(e) {
  return e = e.replace(new RegExp(`(${n.doubleQuoteAdepts})(\\d+)(${r.doublePrime})`, "g"), `${r.odq}$2${r.cdq}`), e = e.replace(new RegExp(`(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`, "g"), `${r.odq}$2${r.cdq}`), e;
}
function mn(e) {
  return e.replace(new RegExp(`(${n.doubleQuoteAdepts})([0-9\\p{L}])`, "gu"), `${r.odqUnpaired}$2`);
}
function gn(e) {
  return e.replace(new RegExp(`([\\p{L}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`, "gu"), `$1${r.cdqUnpaired}`);
}
function xn(e) {
  return e.replace(new RegExp(`([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`, "gu"), "$1");
}
function Sn(e) {
  return e.replace(new RegExp(`(${r.odqUnpaired})(.*?)(${r.doublePrime})`, "g"), `${r.odq}$2${r.cdq}`).replace(new RegExp(`(${r.doublePrime})(.*?)(${r.cdqUnpaired})`, "g"), `${r.odq}$2${r.cdq}`);
}
function wn(e, p) {
  return e.replace(new RegExp(`(${p.openingDoubleQuote})([^${n.spaces}${p.closingDoubleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingDoubleQuote})`, "g"), (a, o, t, s, i, u) => i.length === 1 && /[.,;:]/.test(i) ? o + t + s + u + i : a);
}
function En(e, p) {
  return e = e.replace(new RegExp(`(${p.openingDoubleQuote})(.+)([${n.spaces}])(?!${p.openingDoubleQuote})([^${n.romanNumerals}]{2,})(${p.closingDoubleQuote})([${n.sentencePunctuation}${n.ellipsis}])`, "g"), "$1$2$3$4$6$5"), e = e.replace(new RegExp(`([:;])(${p.closingDoubleQuote})`, "g"), "$2$1"), e;
}
function An(e, p) {
  return [
    {
      pattern: r.doublePrime,
      replacement: n.doublePrime
    },
    {
      pattern: `[${r.odq}${r.odqUnpaired}]`,
      replacement: p.openingDoubleQuote
    },
    {
      pattern: `[${r.cdq}${r.cdqUnpaired}]`,
      replacement: p.closingDoubleQuote
    }
  ].reduce((a, { pattern: o, replacement: t }) => a.replace(new RegExp(o, "gu"), t), e);
}
function vn(e, p) {
  return e = e.replace(new RegExp(`(${p.openingDoubleQuote})([${n.spaces}])`, "g"), "$1"), e = e.replace(new RegExp(`([${n.spaces}])(${p.closingDoubleQuote})`, "g"), "$2"), e = e.replace(new RegExp(`([${n.spaces}])(${n.doublePrime})`, "g"), "$2"), e;
}
function Rn(e, p) {
  return e = e.replace(new RegExp(`([${n.sentencePunctuation}\\p{L}])([${p.openingDoubleQuote}])`, "gu"), "$1 $2"), e = Q(e, p), e;
}
function Qn(e, p) {
  return e.replace(new RegExp(`([${p.closingDoubleQuote}])([\\p{L}])`, "gu"), "$1 $2");
}
function Dn(e, p) {
  const a = `${n.hyphen}${n.enDash}${n.emDash}`;
  return e = e.replace(new RegExp(`([\\p{L}])[${p.directSpeechIntroAdepts}]?[${n.spaces}]*[${a}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "gu"), `$1${p.directSpeechIntro} $2`), e = e.replace(new RegExp(`([\\p{L}])[${p.directSpeechIntroAdepts}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "gu"), `$1${p.directSpeechIntro} $2`), e = e.replace(new RegExp(`([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])[${n.spaces}]*[${a}][${n.spaces}]*([\\p{L}])`, "gu"), "$1 $2"), e = e.replace(new RegExp(`^[${n.spaces}]*[${a}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "g"), "$1"), e = e.replace(new RegExp(`([${n.terminalPunctuation}${n.ellipsis}])[${n.spaces}]+[${a}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "g"), "$1 $2"), e;
}
function Pn(e, p) {
  return e = ln(e), e = fn(e), e = bn(e), e = hn(e), e = mn(e), e = gn(e), e = xn(e), e = Sn(e), e = An(e, p), e = vn(e, p), e = Rn(e, p), e = Qn(e, p), e = Dn(e, p), e = wn(e, p), e = En(e, p), e;
}
function Bn(e) {
  return [
    ["dead", "buried"],
    ["drill", "bass"],
    ["drum", "bass"],
    ["rock", "roll"],
    ["pick", "mix"],
    ["fish", "chips"],
    ["salt", "shake"],
    ["mac", "cheese"],
    ["pork", "beans"],
    ["drag", "drop"],
    ["rake", "scrape"],
    ["hook", "kill"]
  ].forEach((p) => {
    e = e.replace(new RegExp(`(${p[0]})([${n.spaces}]?)(${n.singleQuoteAdepts})(n)(${n.singleQuoteAdepts})([${n.spaces}]?)(${p[1]})`, "gi"), `$1${n.nbsp}${r.apos}$4${r.apos}${n.nbsp}$7`);
  }), e;
}
function yn(e) {
  return e.replace(new RegExp(`(${n.singleQuoteAdepts})(cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould)`, "gi"), `${r.apos}$2`);
}
function Ln(e) {
  return e.replace(new RegExp(`(\\Bin)(${n.singleQuoteAdepts})`, "gi"), `$1${r.apos}`);
}
function Wn(e) {
  return e.replace(new RegExp(`([\\d\\p{L}])(${n.singleQuoteAdepts})+([\\p{L}])`, "gu"), `$1${r.apos}$3`);
}
function kn(e) {
  return e.replace(new RegExp(`([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`, "gu"), `$1$2${r.apos}$4`);
}
function qn(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${r.singlePrime}`);
}
function Nn(e) {
  return e.replace(new RegExp(`(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([\\p{L}${n.ellipsis}${n.openingBrackets}\\{])`, "gu"), `$1${r.osqUnpaired}$3`);
}
function In(e) {
  return e.replace(new RegExp(`([\\p{L}\\d${n.closingBrackets}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`, "gu"), `$1$2${r.csqUnpaired}$4`);
}
function zn(e) {
  return e.replace(new RegExp(`(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`, "gu"), function(p, a, o, t) {
    return o = Nn(o), o = In(o), o = Cn(o), a + o + t;
  });
}
function Cn(e) {
  return e.replace(new RegExp(`(${r.osqUnpaired})(.*)(${r.csqUnpaired})`, "gu"), `${r.osq}$2${r.csq}`);
}
function Un(e) {
  return e.replace(new RegExp(`(\\B)(${n.singleQuoteAdepts})([\\p{L}]+)(${n.singleQuoteAdepts})(\\B)`, "gu"), `$1${r.osq}$3${r.csq}$5`);
}
function On(e) {
  return e.replace(new RegExp(`(${n.singleQuoteAdepts})`, "g"), `${r.apos}`);
}
function Mn(e) {
  return e = e.replace(new RegExp(`(${r.osqUnpaired})(.*?)(${r.singlePrime})`, "g"), `${r.osq}$2${r.csq}`), e = e.replace(new RegExp(`(${r.singlePrime})(.*?)(${r.csqUnpaired})`, "g"), `${r.osq}$2${r.csq}`), e;
}
function Tn(e, p) {
  return e.replace(new RegExp(`(${p.openingSingleQuote})([^${n.spaces}${p.closingSingleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingSingleQuote})`, "g"), (a, o, t, s, i, u) => i.length === 1 && /[.,;:]/.test(i) ? o + t + s + u + i : a);
}
function jn(e, p) {
  return e = e.replace(new RegExp(`(${p.openingSingleQuote})(.+)([${n.spaces}])(?!${p.openingSingleQuote})([^${n.romanNumerals}]{2,})(${p.closingSingleQuote})([${n.sentencePunctuation}${n.ellipsis}])([^${p.closingDoubleQuote}])`, "g"), "$1$2$3$4$6$5$7"), e = e.replace(new RegExp(`([:;])(${p.closingSingleQuote})`, "g"), "$2$1"), e = e.replace(new RegExp(`([${n.terminalPunctuation}${n.ellipsis}])(${p.closingSingleQuote})(${p.closingDoubleQuote})`, "g"), "$2$1$3"), e;
}
function Zn(e) {
  return e.replace(new RegExp(`([${n.spaces}])(${n.singlePrime})`, "g"), "$2");
}
function _n(e, p) {
  return [
    {
      pattern: r.singlePrime,
      replacement: n.singlePrime
    },
    {
      pattern: `[${r.apos}${r.osqUnpaired}${r.csqUnpaired}]`,
      replacement: n.apostrophe
    },
    {
      pattern: r.osq,
      replacement: p.openingSingleQuote
    },
    {
      pattern: r.csq,
      replacement: p.closingSingleQuote
    }
  ].reduce((a, { pattern: o, replacement: t }) => a.replace(new RegExp(o, "gu"), t), e);
}
function Xn(e, p) {
  return e = Bn(e), e = yn(e), e = Wn(e), e = kn(e), e = Ln(e), e = qn(e), e = Un(e), e = zn(e), e = Mn(e), e = On(e), e = _n(e, p), e = Tn(e, p), e = jn(e, p), e = Zn(e), e;
}
function Hn(e) {
  return b(e, new RegExp(`([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)`, "giu"), `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`);
}
function Fn(e) {
  return b(e, new RegExp(`([\\p{L}]+)([${n.spaces}][x][${n.spaces}])([\\p{L}]+)`, "gu"), `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`);
}
function Vn(e) {
  return e.replace(new RegExp(`([\\d])([${n.spaces}]?)([x×])([${n.spaces}])([\\p{Ll}]+)`, "giu"), function(p, a, o, t, s, i) {
    return o == "" ? `${a}${o}${n.multiplicationSign}${n.nbsp}${i}` : `${a}${n.nbsp}${n.multiplicationSign}${n.nbsp}${i}`;
  });
}
function Gn(e) {
  return e.replace(new RegExp(`([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`, "giu"), `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`);
}
function Jn(e) {
  return e = Hn(e), e = Fn(e), e = Vn(e), e = Gn(e), e;
}
function f(e, p, a) {
  return e = Te(e, p), e = Pe(e, p, a), e = Be(e, p, a), e;
}
function Kn(e, p) {
  return e = f(e, n.sectionSign, p.spaceAfter.sectionSign), e = f(e, n.paragraphSign, p.spaceAfter.paragraphSign), e;
}
function x(e, p, a) {
  return e.replace(new RegExp(`(\\(${p}\\))([${n.spaces}]*)(\\d)`, "gi"), `${a}$2$3`);
}
function Yn(e, p) {
  return e = x(e, "c", n.copyright), e = f(e, n.copyright, p.spaceAfter.copyright), e = x(e, "p", n.soundRecordingCopyright), e = f(e, n.soundRecordingCopyright, p.spaceAfter.soundRecordingCopyright), e;
}
function ep(e, p) {
  return e = f(e, n.numeroSign, p.spaceAfter.numeroSign), e;
}
function np(e) {
  return e.replace(new RegExp("(\\+\\-)|(\\-\\+)", "g"), n.plusMinus);
}
function h(e, p, a) {
  return e.replace(new RegExp(`([^0-9]|^)([${n.spaces}]*)(\\(${p}\\)|${a})`, "gi"), `$1${a}`);
}
function pp(e) {
  return e = h(e, "r", n.registeredTrademark), e = h(e, "sm", n.serviceMark), e = h(e, "tm", n.trademark), e;
}
function y(e, p, a) {
  return e.replace(new RegExp(`([${n.spaces}${n.slash}])(m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym)(${p})`, "g"), `$1$2${a}`);
}
function ap(e) {
  return y(e, "2", "²");
}
function op(e) {
  return y(e, "3", "³");
}
function rp(e) {
  return e = ap(e), e = op(e), e;
}
function sp(e) {
  return e.replace(new RegExp(`([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`, "g"), "$1$2$4");
}
function tp(e) {
  return e = sp(e), e;
}
function ip(e, p) {
  const a = `([\\p{Lu}][\\p{L}]?\\.)([${n.spaces}]?)`, o = "([\\p{L}]{2,}[^\\.])", t = [
    {
      pattern: `${a}${o}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      pattern: `${a}${a}${o}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${n.space}$5`
    },
    {
      pattern: `${a}${a}${a}${o}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${p.spaceAfter.abbreviation}$5${n.space}$7`
    }
  ];
  for (const { pattern: s, replacement: i } of t) e = e.replace(new RegExp(s, "gu"), i);
  return e;
}
function up(e, p) {
  let a = `([^\\p{L}${n.enDash}${n.emDash}]|^)`, o = "([\\p{L}]|\\D)", t = `([^\\p{L}${p.openingDoubleQuote}${p.openingSingleQuote}${n.backtick}\\p{Emoji}]|$)`, s = [];
  for (let i = 0; i < p.multipleWordAbbreviations.length; i++) {
    let u = p.multipleWordAbbreviations[i].split(" "), c = "";
    for (let d = 0; d < u.length; d++) c += `(${u[d]})(\\.)([${n.spaces}]?)`;
    s[i] = c;
  }
  for (let i = 0; i < s.length; i++) {
    let u = `${a}${s[i]}${o}`, c = "$1", d = (s[i].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++) c += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    c += `$${(d - 1) * 3 + 2}. $${d * 3 + 2}`, e = e.replace(new RegExp(u, "giu"), c);
  }
  for (let i = 0; i < s.length; i++) {
    let u = `${a}${s[i]}${t}`, c = "$1", d = (s[i].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++) c += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    c += `$${(d - 1) * 3 + 2}.$${d * 3 + 2}`, e = e.replace(new RegExp(u, "giu"), c);
  }
  return e;
}
function cp(e, p) {
  let a = [];
  for (let u = 0; u < p.singleWordAbbreviations.length; u++) a[u] = `(${p.singleWordAbbreviations[u]})(\\.)([${n.spaces}]?)`;
  let o = `([^\\p{L}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, t = "([\\p{L}\\d]+)([^\\.]|$)";
  for (let u = 0; u < a.length; u++) e = e.replace(new RegExp(`${o}${a[u]}${t}`, "giu"), `$1$2$3${n.nbsp}$5$6`);
  let s = `([\\p{L}\\d])([${n.spaces}])`, i = `([^${n.spaces}\\p{L}\\d]|$)`;
  for (let u = 0; u < a.length; u++) e = e.replace(new RegExp(`${s}${a[u]}${i}`, "giu"), `$1${n.nbsp}$3$4$5$6`);
  return e;
}
function $p(e, p) {
  return e = ip(e, p), e = up(e, p), e = cp(e, p), e;
}
function dp(e) {
  return e = e.replace(new RegExp("([^\\p{L}]|^)([\\p{Lu}]{2})([\\p{Ll}]{2,})", "gu"), function(p, a, o, t) {
    return `${a}${o.substring(0, 1)}${o.substring(1).toLowerCase()}${t}`;
  }), e.replace(new RegExp("(\\b)(?!iOS)([\\p{Ll}])([\\p{Lu}]{2,})", "gu"), function(p, a, o, t) {
    return `${a}${o.toUpperCase()}${t.toLowerCase()}`;
  });
}
function lp(e) {
  return e.replace(new RegExp(`(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`, "gi"), `ISSN$2${n.nbsp}$4-$6`);
}
function fp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(new RegExp(`(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)", "gi"), `ISBN$2${n.nbsp}$4-$6-$8-$10`);
}
function bp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(new RegExp(`(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)", "gi"), `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`);
}
function hp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(new RegExp("(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+?)", "g"), "$1-$3-$5-$7-$9");
}
function mp(e) {
  return e = lp(e), e = fp(e), e = bp(e), e = hp(e), e;
}
function gp(e) {
  let p = [];
  return m(e, n.emailPattern, p), m(e, n.urlPattern, p), m(e, n.filenamePattern, p), {
    processedText: xp(e, p),
    exceptions: p
  };
}
function m(e, p, a) {
  const o = new RegExp(p, "gi"), t = e.match(o);
  return t && t.forEach((s) => a.push(s)), a;
}
function xp(e, p) {
  return p.reduce((a, o, t) => {
    const s = B(t);
    return a.replace(o, s);
  }, e);
}
function Sp(e, p) {
  return p.reduce((a, o, t) => {
    const s = B(t), i = new RegExp(s, "g");
    return a.replace(i, o);
  }, e);
}
function wp(e, p, a) {
  p = typeof p > "u" ? "en-us" : p;
  let o = new me(p);
  a = typeof a > "u" ? { removeLines: !0 } : a;
  const { processedText: t, exceptions: s } = gp(e);
  return e = t, a.removeLines && (e = ge(e)), e = an(e, o), e = je(e, o), e = _e(e), e = dn(e, o), e = Xn(e, o), e = Pn(e, o), e = Jn(e), e = Kn(e, o), e = Yn(e, o), e = ep(e, o), e = np(e), e = pp(e), e = rp(e), e = tp(e), e = dp(e), e = mp(e), e = $p(e, o), e = ye(e, o), e = Sp(e, s), e;
}
export {
  wp as fixTypos
};
