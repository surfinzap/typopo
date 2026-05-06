/*!
 * Typopo v3.0.1 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
var k = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", q = "’", N = "′", I = "`", C = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’ʼ'‹›′´`]{2,}", z = "″", w = " ", E = " ", A = " ", v = " ", U = w + E + A + v, R = "\\.!?", Q = ",:;", O = Q + R, M = "\\(\\[\\{", T = "\\)\\]\\}", j = "…", Z = "-", _ = "–", X = "—", F = "/", H = "°", G = "×", V = "&", Y = "§", J = "¶", K = "©", ee = "℗", ne = "®", pe = "℠", ae = "™", oe = "+", re = "−", se = "±", te = "%", $e = "‰", ie = "‱", ue = "#", ce = "№", de = "IVXLCDM", n = {
  singleQuoteAdepts: k,
  apostrophe: q,
  singlePrime: N,
  backtick: I,
  doubleQuoteAdepts: C,
  doublePrime: z,
  space: w,
  nbsp: E,
  hairSpace: A,
  narrowNbsp: v,
  spaces: U,
  terminalPunctuation: R,
  sentencePausePunctuation: Q,
  sentencePunctuation: O,
  openingBrackets: M,
  closingBrackets: T,
  ellipsis: j,
  hyphen: Z,
  enDash: _,
  emDash: X,
  slash: F,
  degree: H,
  multiplicationSign: G,
  ampersand: V,
  sectionSign: Y,
  paragraphSign: J,
  copyright: K,
  soundRecordingCopyright: ee,
  registeredTrademark: ne,
  serviceMark: pe,
  trademark: ae,
  plus: oe,
  minus: re,
  plusMinus: se,
  percent: te,
  permille: $e,
  permyriad: ie,
  numberSign: ue,
  numeroSign: ce,
  romanNumerals: de,
  urlPattern: "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+(?:(?:aero|arpa|asia|agency|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|cloud|com|company|coop|c[acdfghiklmnoruvxyz])|(?:dev|d[ejkmoz])|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|guide|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om|one)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|(?:shop|store|s[abcdeghijklmnortuvyz])|(?:tel|travel|team|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|(?:work|w[fs])|(?:xyz)|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\\:\\d{1,5})?)(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?(?:\\b|$)",
  emailPattern: "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}\\@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+",
  filenamePattern: "\\b[a-zA-Z0-9_%\\-]+\\.(ai|asm|bat|bmp|c|cpp|cs|css|csv|dart|doc|docx|exe|gif|go|html|ics|java|jpeg|jpg|js|json|key|kt|less|lua|log|md|mp4|odp|ods|odt|pdf|php|pl|png|ppt|pptx|psd|py|r|rar|rb|rs|scala|scss|sh|svg|sql|swift|tar.gz|tar|tex|tiff|ts|txt|vbs|xml|xls|xlsx|yaml|yml|zip)\\b"
}, le = {
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
}, fe = {
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
}, be = {
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
}, he = {
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
}, me = {
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
}, c = {
  cs: le,
  "en-us": fe,
  rue: be,
  sk: he,
  "de-de": me
}, x = "en-us", ge = class {
  constructor(e) {
    c[e] || (console.warn(`Locale '${e}' not found, falling back to '${x}'`), e = x), this.ID = e, this.openingSingleQuote = c[e].quotes.openingSingleQuote, this.closingSingleQuote = c[e].quotes.closingSingleQuote, this.openingDoubleQuote = c[e].quotes.openingDoubleQuote, this.closingDoubleQuote = c[e].quotes.closingDoubleQuote, this.terminalQuotes = this.closingSingleQuote + this.closingDoubleQuote, this.directSpeechIntro = c[e].directSpeechIntro, this.dashWords = c[e].dashWords, this.spaceAfter = c[e].spaceAfter, this.spaceBefore = c[e].spaceBefore, this.ordinalIndicator = c[e].numbers.ordinalIndicator, this.romanOrdinalIndicator = c[e].numbers.romanOrdinalIndicator, this.ordinalDate = c[e].ordinalDate, this.singleWordAbbreviations = [];
    for (const a in c) this.singleWordAbbreviations = this.singleWordAbbreviations.concat(c[a].singleWordAbbreviations);
    this.multipleWordAbbreviations = [];
    for (const a in c) this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(c[a].multipleWordAbbreviations);
    const p = [];
    for (const a in c) {
      const o = c[a].directSpeechIntro;
      o && !p.includes(o) && p.push(o);
    }
    this.directSpeechIntroAdepts = p.join("");
  }
};
function xe(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function b(e, p, a) {
  let t = 0, s = e, $ = "";
  for (; s !== $ && t < 50; )
    $ = s, s = s.replace(p, a), t++;
  return s;
}
function Se(e) {
  return b(e, new RegExp(`([\\p{L}]{2,})([${n.nbsp}${n.narrowNbsp}])([\\p{L}]{2,})`, "gu"), "$1 $3");
}
function D(e, p) {
  return e = b(e, new RegExp(`(^|[${n.space}]|[^\\p{L}\\d${n.apostrophe}${n.plus}${n.minus}${n.hyphen}])([\\p{Ll}])([${n.space}])`, "gu"), `$1$2${n.nbsp}`), e = e.replace(new RegExp(`(^|[${n.sentencePunctuation}${n.ellipsis}${n.copyright}${n.registeredTrademark}${n.soundRecordingCopyright}])([${n.spaces}]?)([\\p{Lu}])([${n.spaces}])`, "gu"), `$1$2$3${n.nbsp}`), p.ID == "en-us" && (e = e.replace(new RegExp(`(^|[${n.spaces}])(I)([${n.spaces}])`, "g"), `$1$2${n.nbsp}`)), e;
}
function we(e) {
  return e.replace(new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"), ` $2${n.nbsp}`);
}
function Ee(e) {
  return e.replace(new RegExp(`([^${n.nbsp}\\d]|^)(\\d{1,2})([${n.spaces}])([\\p{L}])`, "gu"), `$1$2${n.nbsp}$4`);
}
function Ae(e, p) {
  return e.replace(new RegExp(`([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${p.ordinalIndicator})([${n.spaces}]?)([\\p{L}])`, "gu"), `$1$2$3${n.nbsp}$5`);
}
function ve(e, p) {
  return e.replace(new RegExp(`(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{4})`, "g"), `$1$2${p.ordinalDate.firstSpace}$4$5${p.ordinalDate.secondSpace}$7`);
}
function Re(e, p) {
  return p.romanOrdinalIndicator != "" ? e.replace(new RegExp(`(\\b[\\p{Lu}][\\p{L}]?${p.romanOrdinalIndicator}[${n.spaces}]?)?(\\b)([${n.romanNumerals}]+)(${p.romanOrdinalIndicator})([${n.spaces}]?)([\\p{L}\\d])`, "gu"), function(a, o, t, s, $, i, u) {
    return o ? a : `${t}${s}${$}${n.nbsp}${u}`;
  }) : e;
}
function Qe(e, p) {
  let a = `(\\b[\\p{Lu}][\\p{Ll}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${p.romanOrdinalIndicator})([${n.nbsp}]?)`, o = new RegExp(a, "gu");
  return e.replace(o, function(t, s, $, i, u, d) {
    const l = i.startsWith("M") || i.startsWith("D") || i.startsWith("C"), W = i === "I", g = d === n.nbsp;
    return l ? s + n.space + i + u + d : W ? s + n.space + i + u + (g ? d : "") : s + n.nbsp + i + u + (g ? n.space : "");
  });
}
function De(e, p) {
  return e.replace(new RegExp(`(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`, "gu"), `$1${p.spaceBefore.percent}$3`);
}
function Pe(e, p) {
  let a = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${p.closingDoubleQuote}${p.closingSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([\\p{Lu}])([${n.spaces}]|\\.$|$)`, o = new RegExp(a, "gu");
  return e.replace(o, function(t, s, $, i, u) {
    return p.ID === "en-us" && i === "I" ? t : p.ID === "en-us" ? s + n.nbsp + i + u : i === "I" && u && n.spaces.includes(u) ? s + n.nbsp + i + n.space : s + n.nbsp + i + u;
  });
}
function Le(e, p, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(new RegExp(`(${p})([^${n.spaces}${p}])`, "g"), `$1${a}$2`);
}
function ye(e, p, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(new RegExp(`(${p})([${n.spaces}]+)`, "g"), `$1${a}`);
}
function Be(e, p) {
  return e = Se(e), e = D(e, p), e = we(e), e = Ee(e), e = Ae(e, p), e = ve(e, p), e = Re(e, p), e = Pe(e, p), e = Qe(e, p), e = De(e, p), e;
}
function We(e) {
  return e.replace(new RegExp(`(\\S)([${n.spaces}]{2,})(\\S)`, "g"), "$1 $3");
}
function ke(e) {
  return e.split(/\r?\n/).map((p) => p.replace(/^\s+/, "")).join(`
`);
}
function qe(e) {
  return e.split(/\r?\n/).map((p) => p.replace(/\s+$/, "")).join(`
`);
}
function Ne(e) {
  return e.replace(new RegExp(`([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`, "g"), "$2$3");
}
function Ie(e) {
  return e.replace(new RegExp(`([^${n.openingBrackets}])([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`, "g"), "$1$3");
}
function Ce(e, p) {
  return e.replace(new RegExp(`(\\d)([${n.spaces}]?)(${p.ordinalIndicator})([${n.spaces}]|\\b)`, "g"), "$1$3$4");
}
function ze(e) {
  return e.replace(new RegExp(`([${n.openingBrackets}])([${n.spaces}])([^${n.closingBrackets}])`, "g"), "$1$3");
}
function Ue(e) {
  return e.replace(new RegExp(`([\\p{L}])([${n.openingBrackets}])([\\p{L}${n.ellipsis}])([\\p{L}${n.ellipsis}${n.closingBrackets}])`, "gu"), function(p, a, o, t, s) {
    return t == "s" | t == "S" | t + s == "es" | t + s == "ES" ? `${a}${o}${t}${s}` : `${a}${n.space}${o}${t}${s}`;
  });
}
function Oe(e) {
  return e.replace(new RegExp(`([\\p{L}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([\\p{Lu}])`, "gu"), "$1$2 $3");
}
function Me(e) {
  return e.replace(new RegExp(`([\\p{L}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function Te(e) {
  return e.replace(new RegExp(`([${n.closingBrackets}])([\\p{L}])`, "gu"), "$1 $2");
}
function je(e, p) {
  return e.replace(new RegExp(`([^${n.spaces}${n.openingBrackets}${p}])(${p})`, "g"), `$1${n.space}$2`);
}
function Ze(e, p) {
  return e = We(e), e = ke(e), e = qe(e), e = Ne(e), e = Ie(e), e = Ce(e, p), e = ze(e), e = Ue(e), e = Oe(e), e = Te(e), e = Me(e), e;
}
function _e(e) {
  return e.replace(new RegExp("\\.{2}(?![\\\\/])", "g"), ".");
}
function Xe(e) {
  return _e(e);
}
function Fe(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function He(e) {
  return e.replace(new RegExp(`\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`, "g"), n.ellipsis);
}
function Ge(e) {
  return e.replace(new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"), `${n.space}${n.ellipsis}${n.space}`);
}
function Ve(e) {
  return e.replace(new RegExp(`(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`, "g"), `$1 ${n.ellipsis}$5`);
}
function Ye(e) {
  return e.replace(new RegExp(`(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`, "g"), "$1$3$5$6");
}
function Je(e) {
  return e.replace(new RegExp(`(^${n.ellipsis})([${n.spaces}])([\\p{L}])`, "gmu"), "$1$3");
}
function Ke(e, p) {
  return e.replace(new RegExp(`([^${p.terminalQuotes}])([${n.sentencePunctuation}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([\\p{Ll}])`, "gu"), "$1$2 $4$6");
}
function en(e) {
  return e.replace(new RegExp(`([\\p{Ll}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([\\p{Lu}])`, "gu"), "$1$3 $5");
}
function nn(e) {
  return e.replace(new RegExp(`([\\p{L}])([${n.ellipsis}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function pn(e, p) {
  return e.replace(new RegExp(`([${n.sentencePunctuation}${p.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([\\p{Lu}])`, "gu"), "$1 $3 $5");
}
function an(e, p) {
  return e.replace(new RegExp(`([\\p{Ll}])([${n.spaces}])+([${n.ellipsis}][${p.closingDoubleQuote}${p.closingSingleQuote}]?$)`, "gmu"), "$1$3");
}
function on(e, p) {
  return e = Fe(e), e = Ve(e), e = Ye(e), e = Je(e), e = Ke(e, p), e = en(e), e = nn(e), e = pn(e, p), e = an(e, p), e = He(e), e = Ge(e), e;
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
}, P = 57856, L = 63743, rn = L - P + 1;
function y(e) {
  const p = P + e;
  if (p > L) throw new Error(`Exception index ${e} exceeds PUA limit (max ${rn}). Text contains too many exceptions (emails/URLs/filenames). Consider processing the text in smaller chunks.`);
  return String.fromCharCode(p);
}
function sn(e, p) {
  return e.replace(new RegExp(`([\\p{L}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*|[${n.spaces}]+[${n.hyphen}]{1,3}[${n.spaces}]+)([\\p{L}\\d])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$3`);
}
function tn(e, p) {
  return e.replace(new RegExp(`([\\p{L}])([${n.spaces}]?)([${n.hyphen}${n.enDash}${n.emDash}]{1,3})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}$5`);
}
function $n(e, p) {
  return e = e.replace(new RegExp(`([${n.openingBrackets}])[${n.spaces}]*([${n.hyphen}${n.enDash}${n.emDash}]+)[${n.spaces}]*([${n.closingBrackets}])`, "gu"), "$1$2$3"), e = e.replace(new RegExp(`([\\p{L}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.openingBrackets}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([\\p{L}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([\\p{L}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.closingBrackets}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([${n.openingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([\\p{L}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e = e.replace(new RegExp(`([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]*([${n.openingBrackets}])`, "gu"), `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`), e;
}
function un(e) {
  return e = b(e, new RegExp(`(\\d)([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`, "gu"), `$1${r.enDash}$3`), e.replace(new RegExp(`${r.enDash}`, "g"), n.enDash);
}
function cn(e) {
  return e.replace(new RegExp(`([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`, "gu"), `$1${n.enDash}$3`);
}
function dn(e, p) {
  return e.replace(new RegExp(`(\\d)(${p.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)(${p.ordinalIndicator})`, "giu"), `$1$2${n.enDash}$4$5`);
}
function ln(e, p) {
  return e = sn(e, p), e = tn(e, p), e = $n(e, p), e = un(e), e = cn(e), e = dn(e, p), e;
}
function fn(e) {
  return e.replace(new RegExp(`([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePausePunctuation}])(${n.doubleQuoteAdepts})`, "g"), "$1$2$4");
}
function bn(e) {
  return e.replace(new RegExp(`([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`, "g"), "$1$2$3");
}
function hn(e) {
  return e = e.replace(new RegExp(`([^0-9]|^)(${n.doubleQuoteAdepts})(.+?)(\\d+)(${n.doubleQuoteAdepts})([${n.terminalPunctuation}${n.ellipsis}])`, "g"), "$1$2$3$4$6$5"), e = e.replace(new RegExp(`(\\b\\d{1,3})([${n.spaces}]?)(${n.doubleQuoteAdepts})([^\\p{L}]|\\B)`, "gu"), `$1$2${r.doublePrime}$4`), e;
}
function mn(e) {
  return e = e.replace(new RegExp(`(${n.doubleQuoteAdepts})(\\d+)(${r.doublePrime})`, "g"), `${r.odq}$2${r.cdq}`), e = e.replace(new RegExp(`(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`, "g"), `${r.odq}$2${r.cdq}`), e;
}
function gn(e) {
  return e.replace(new RegExp(`(${n.doubleQuoteAdepts})([0-9\\p{L}])`, "gu"), `${r.odqUnpaired}$2`);
}
function xn(e) {
  return e.replace(new RegExp(`([\\p{L}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`, "gu"), `$1${r.cdqUnpaired}`);
}
function Sn(e) {
  return e.replace(new RegExp(`([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`, "gu"), "$1");
}
function wn(e) {
  return e.replace(new RegExp(`(${r.odqUnpaired})(.*?)(${r.doublePrime})`, "g"), `${r.odq}$2${r.cdq}`).replace(new RegExp(`(${r.doublePrime})(.*?)(${r.cdqUnpaired})`, "g"), `${r.odq}$2${r.cdq}`);
}
function En(e, p) {
  return e.replace(new RegExp(`(${p.openingDoubleQuote})([^${n.spaces}${p.closingDoubleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingDoubleQuote})`, "g"), (a, o, t, s, $, i) => $.length === 1 && /[.,;:]/.test($) ? o + t + s + i + $ : a);
}
function An(e, p) {
  return e = e.replace(new RegExp(`(${p.openingDoubleQuote})(.+)([${n.spaces}])(?!${p.openingDoubleQuote})([^${n.romanNumerals}]{2,})(${p.closingDoubleQuote})([${n.sentencePunctuation}${n.ellipsis}])`, "g"), "$1$2$3$4$6$5"), e = e.replace(new RegExp(`([:;])(${p.closingDoubleQuote})`, "g"), "$2$1"), e;
}
function vn(e, p) {
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
function Rn(e, p) {
  return e = e.replace(new RegExp(`(${p.openingDoubleQuote})([${n.spaces}])`, "g"), "$1"), e = e.replace(new RegExp(`([${n.spaces}])(${p.closingDoubleQuote})`, "g"), "$2"), e = e.replace(new RegExp(`([${n.spaces}])(${n.doublePrime})`, "g"), "$2"), e;
}
function Qn(e, p) {
  return e = e.replace(new RegExp(`([${n.sentencePunctuation}\\p{L}])([${p.openingDoubleQuote}])`, "gu"), "$1 $2"), e = D(e, p), e;
}
function Dn(e, p) {
  return e.replace(new RegExp(`([${p.closingDoubleQuote}])([\\p{L}])`, "gu"), "$1 $2");
}
function Pn(e, p) {
  const a = `${n.hyphen}${n.enDash}${n.emDash}`;
  return e = e.replace(new RegExp(`([\\p{L}])[${p.directSpeechIntroAdepts}]?[${n.spaces}]*[${a}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "gu"), `$1${p.directSpeechIntro} $2`), e = e.replace(new RegExp(`([\\p{L}])[${p.directSpeechIntroAdepts}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "gu"), `$1${p.directSpeechIntro} $2`), e = e.replace(new RegExp(`([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])[${n.spaces}]*[${a}][${n.spaces}]*([\\p{L}])`, "gu"), "$1 $2"), e = e.replace(new RegExp(`^[${n.spaces}]*[${a}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "g"), "$1"), e = e.replace(new RegExp(`([${n.terminalPunctuation}${n.ellipsis}])[${n.spaces}]+[${a}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`, "g"), "$1 $2"), e;
}
function Ln(e, p) {
  return e = fn(e), e = bn(e), e = hn(e), e = mn(e), e = gn(e), e = xn(e), e = Sn(e), e = wn(e), e = vn(e, p), e = Rn(e, p), e = Qn(e, p), e = Dn(e, p), e = Pn(e, p), e = En(e, p), e = An(e, p), e;
}
function yn(e) {
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
function Bn(e) {
  return e.replace(new RegExp(`(${n.singleQuoteAdepts})(cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould)`, "gi"), `${r.apos}$2`);
}
function Wn(e) {
  return e.replace(new RegExp(`(\\Bin)(${n.singleQuoteAdepts})`, "gi"), `$1${r.apos}`);
}
function kn(e) {
  return e.replace(new RegExp(`([\\d\\p{L}])(${n.singleQuoteAdepts})+([\\p{L}])`, "gu"), `$1${r.apos}$3`);
}
function qn(e) {
  return e.replace(new RegExp(`([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`, "gu"), `$1$2${r.apos}$4`);
}
function Nn(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${r.singlePrime}`);
}
function In(e) {
  return e.replace(new RegExp(`(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([\\p{L}${n.ellipsis}${n.openingBrackets}\\{])`, "gu"), `$1${r.osqUnpaired}$3`);
}
function Cn(e) {
  return e.replace(new RegExp(`([\\p{L}\\d${n.closingBrackets}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`, "gu"), `$1$2${r.csqUnpaired}$4`);
}
function zn(e) {
  return e.replace(new RegExp(`(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`, "gu"), function(p, a, o, t) {
    return o = In(o), o = Cn(o), o = Un(o), a + o + t;
  });
}
function Un(e) {
  return e.replace(new RegExp(`(${r.osqUnpaired})(.*)(${r.csqUnpaired})`, "gu"), `${r.osq}$2${r.csq}`);
}
function On(e) {
  return e.replace(new RegExp(`(\\B)(${n.singleQuoteAdepts})([\\p{L}]+)(${n.singleQuoteAdepts})(\\B)`, "gu"), `$1${r.osq}$3${r.csq}$5`);
}
function Mn(e) {
  return e.replace(new RegExp(`(${n.singleQuoteAdepts})`, "g"), `${r.apos}`);
}
function Tn(e) {
  return e = e.replace(new RegExp(`(${r.osqUnpaired})(.*?)(${r.singlePrime})`, "g"), `${r.osq}$2${r.csq}`), e = e.replace(new RegExp(`(${r.singlePrime})(.*?)(${r.csqUnpaired})`, "g"), `${r.osq}$2${r.csq}`), e;
}
function jn(e, p) {
  return e.replace(new RegExp(`(${p.openingSingleQuote})([^${n.spaces}${p.closingSingleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingSingleQuote})`, "g"), (a, o, t, s, $, i) => $.length === 1 && /[.,;:]/.test($) ? o + t + s + i + $ : a);
}
function Zn(e, p) {
  return e = e.replace(new RegExp(`(${p.openingSingleQuote})(.+)([${n.spaces}])(?!${p.openingSingleQuote})([^${n.romanNumerals}]{2,})(${p.closingSingleQuote})([${n.sentencePunctuation}${n.ellipsis}])([^${p.closingDoubleQuote}])`, "g"), "$1$2$3$4$6$5$7"), e = e.replace(new RegExp(`([:;])(${p.closingSingleQuote})`, "g"), "$2$1"), e = e.replace(new RegExp(`([${n.terminalPunctuation}${n.ellipsis}])(${p.closingSingleQuote})(${p.closingDoubleQuote})`, "g"), "$2$1$3"), e;
}
function _n(e) {
  return e.replace(new RegExp(`([${n.spaces}])(${n.singlePrime})`, "g"), "$2");
}
function Xn(e, p) {
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
function Fn(e, p) {
  return e = yn(e), e = Bn(e), e = kn(e), e = qn(e), e = Wn(e), e = Nn(e), e = On(e), e = zn(e), e = Tn(e), e = Mn(e), e = Xn(e, p), e = jn(e, p), e = Zn(e, p), e = _n(e), e;
}
function Hn(e) {
  return b(e, new RegExp(`([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)`, "giu"), `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`);
}
function Gn(e) {
  return b(e, new RegExp(`([\\p{L}]+)([${n.spaces}][x][${n.spaces}])([\\p{L}]+)`, "gu"), `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`);
}
function Vn(e) {
  return e.replace(new RegExp(`([\\d])([${n.spaces}]?)([x×])([${n.spaces}])([\\p{Ll}]+)`, "giu"), function(p, a, o, t, s, $) {
    return o == "" ? `${a}${o}${n.multiplicationSign}${n.nbsp}${$}` : `${a}${n.nbsp}${n.multiplicationSign}${n.nbsp}${$}`;
  });
}
function Yn(e) {
  return e.replace(new RegExp(`([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`, "giu"), `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`);
}
function Jn(e) {
  return e = Hn(e), e = Gn(e), e = Vn(e), e = Yn(e), e;
}
function f(e, p, a) {
  return e = je(e, p), e = Le(e, p, a), e = ye(e, p, a), e;
}
function Kn(e, p) {
  return e = f(e, n.sectionSign, p.spaceAfter.sectionSign), e = f(e, n.paragraphSign, p.spaceAfter.paragraphSign), e;
}
function S(e, p, a) {
  return e.replace(new RegExp(`(\\(${p}\\))([${n.spaces}]*)(\\d)`, "gi"), `${a}$2$3`);
}
function ep(e, p) {
  return e = S(e, "c", n.copyright), e = f(e, n.copyright, p.spaceAfter.copyright), e = S(e, "p", n.soundRecordingCopyright), e = f(e, n.soundRecordingCopyright, p.spaceAfter.soundRecordingCopyright), e;
}
function np(e, p) {
  return e = f(e, n.numeroSign, p.spaceAfter.numeroSign), e;
}
function pp(e) {
  return e.replace(new RegExp("(\\+\\-)|(\\-\\+)", "g"), n.plusMinus);
}
function h(e, p, a) {
  return e.replace(new RegExp(`([^0-9]|^)([${n.spaces}]*)(\\(${p}\\)|${a})`, "gi"), `$1${a}`);
}
function ap(e) {
  return e = h(e, "r", n.registeredTrademark), e = h(e, "sm", n.serviceMark), e = h(e, "tm", n.trademark), e;
}
function B(e, p, a) {
  return e.replace(new RegExp(`([${n.spaces}${n.slash}])(m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym)(${p})`, "g"), `$1$2${a}`);
}
function op(e) {
  return B(e, "2", "²");
}
function rp(e) {
  return B(e, "3", "³");
}
function sp(e) {
  return e = op(e), e = rp(e), e;
}
function tp(e) {
  return e.replace(new RegExp(`([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`, "g"), "$1$2$4");
}
function $p(e) {
  return e = tp(e), e;
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
  for (const { pattern: s, replacement: $ } of t) e = e.replace(new RegExp(s, "gu"), $);
  return e;
}
function up(e, p) {
  let a = `([^\\p{L}${n.enDash}${n.emDash}]|^)`, o = "([\\p{L}]|\\D)", t = `([^\\p{L}${p.openingDoubleQuote}${p.openingSingleQuote}${n.backtick}\\p{Emoji}]|$)`, s = [];
  for (let $ = 0; $ < p.multipleWordAbbreviations.length; $++) {
    let i = p.multipleWordAbbreviations[$].split(" "), u = "";
    for (let d = 0; d < i.length; d++) u += `(${i[d]})(\\.)([${n.spaces}]?)`;
    s[$] = u;
  }
  for (let $ = 0; $ < s.length; $++) {
    let i = `${a}${s[$]}${o}`, u = "$1", d = (s[$].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++) u += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    u += `$${(d - 1) * 3 + 2}. $${d * 3 + 2}`, e = e.replace(new RegExp(i, "giu"), u);
  }
  for (let $ = 0; $ < s.length; $++) {
    let i = `${a}${s[$]}${t}`, u = "$1", d = (s[$].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++) u += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    u += `$${(d - 1) * 3 + 2}.$${d * 3 + 2}`, e = e.replace(new RegExp(i, "giu"), u);
  }
  return e;
}
function cp(e, p) {
  let a = [];
  for (let i = 0; i < p.singleWordAbbreviations.length; i++) a[i] = `(${p.singleWordAbbreviations[i]})(\\.)([${n.spaces}]?)`;
  let o = `([^\\p{L}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, t = "([\\p{L}\\d]+)([^\\.]|$)";
  for (let i = 0; i < a.length; i++) e = e.replace(new RegExp(`${o}${a[i]}${t}`, "giu"), `$1$2$3${n.nbsp}$5$6`);
  let s = `([\\p{L}\\d])([${n.spaces}])`, $ = `([^${n.spaces}\\p{L}\\d]|$)`;
  for (let i = 0; i < a.length; i++) e = e.replace(new RegExp(`${s}${a[i]}${$}`, "giu"), `$1${n.nbsp}$3$4$5$6`);
  return e;
}
function dp(e, p) {
  return e = ip(e, p), e = up(e, p), e = cp(e, p), e;
}
function lp(e) {
  return e = e.replace(new RegExp("([^\\p{L}]|^)([\\p{Lu}]{2})([\\p{Ll}]{2,})", "gu"), function(p, a, o, t) {
    return `${a}${o.substring(0, 1)}${o.substring(1).toLowerCase()}${t}`;
  }), e.replace(new RegExp("(\\b)(?!iOS)([\\p{Ll}])([\\p{Lu}]{2,})", "gu"), function(p, a, o, t) {
    return `${a}${o.toUpperCase()}${t.toLowerCase()}`;
  });
}
function fp(e) {
  return e.replace(new RegExp(`(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`, "gi"), `ISSN$2${n.nbsp}$4-$6`);
}
function bp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(new RegExp(`(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)", "gi"), `ISBN$2${n.nbsp}$4-$6-$8-$10`);
}
function hp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(new RegExp(`(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)", "gi"), `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`);
}
function mp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(new RegExp("(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+?)", "g"), "$1-$3-$5-$7-$9");
}
function gp(e) {
  return e = fp(e), e = bp(e), e = hp(e), e = mp(e), e;
}
function xp(e) {
  let p = [];
  return m(e, n.emailPattern, p), m(e, n.urlPattern, p), m(e, n.filenamePattern, p), {
    processedText: Sp(e, p),
    exceptions: p
  };
}
function m(e, p, a) {
  const o = new RegExp(p, "gi"), t = e.match(o);
  return t && t.forEach((s) => a.push(s)), a;
}
function Sp(e, p) {
  return p.reduce((a, o, t) => {
    const s = y(t);
    return a.replace(o, s);
  }, e);
}
function wp(e, p) {
  return p.reduce((a, o, t) => {
    const s = y(t), $ = new RegExp(s, "g");
    return a.replace($, o);
  }, e);
}
function Ep(e, p, a) {
  p = typeof p > "u" ? "en-us" : p;
  let o = new ge(p);
  a = typeof a > "u" ? { removeLines: !0 } : a;
  const { processedText: t, exceptions: s } = xp(e);
  return e = t, a.removeLines && (e = xe(e)), e = on(e, o), e = Ze(e, o), e = Xe(e), e = ln(e, o), e = Fn(e, o), e = Ln(e, o), e = Jn(e), e = Kn(e, o), e = ep(e, o), e = np(e, o), e = pp(e), e = ap(e), e = sp(e), e = $p(e), e = lp(e), e = gp(e), e = dp(e, o), e = Be(e, o), e = wp(e, s), e;
}
export {
  Ep as fixTypos
};
