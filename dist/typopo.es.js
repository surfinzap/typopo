/*!
 * Typopo v2.6.0 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const w = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях", S = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ", B = "a-z" + w, k = "A-Z" + S, W = "a-z" + w + "A-Z" + S, N = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", q = "’", z = "′", I = "`", L = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}|´{2,}|`{2,}", M = "″", E = " ", y = " ", A = " ", R = " ", T = E + y + A + R, _ = "\\.\\!\\?", C = "\\,\\:\\;", O = C + _, j = "\\(\\[\\{", Z = "\\)\\]\\}", H = "…", U = "-", F = "–", X = "—", G = "/", V = "°", Y = "×", J = "&", K = "§", ee = "¶", ne = "©", oe = "℗", ae = "®", te = "℠", pe = "™", re = "+", se = "−", ue = "±", ce = "%", $e = "‰", ie = "‱", le = "#", de = "№", he = "IVXLCDM", n = {
  lowercaseChars: B,
  uppercaseChars: k,
  allChars: W,
  singleQuoteAdepts: N,
  apostrophe: q,
  singlePrime: z,
  backtick: I,
  doubleQuoteAdepts: L,
  doublePrime: M,
  /* Spaces */
  space: E,
  nbsp: y,
  hairSpace: A,
  narrowNbsp: R,
  spaces: T,
  /* Punctuation*/
  terminalPunctuation: _,
  sentencePausePunctuation: C,
  sentencePunctuation: O,
  openingBrackets: j,
  closingBrackets: Z,
  ellipsis: H,
  hyphen: U,
  enDash: F,
  emDash: X,
  slash: G,
  /* Symbols*/
  degree: V,
  multiplicationSign: Y,
  ampersand: J,
  sectionSign: K,
  paragraphSign: ee,
  copyright: ne,
  soundRecordingCopyright: oe,
  registeredTrademark: ae,
  serviceMark: te,
  trademark: pe,
  plus: re,
  minus: se,
  plusMinus: ue,
  percent: ce,
  permille: $e,
  permyriad: ie,
  numberSign: le,
  numeroSign: de,
  /* Numbers */
  romanNumerals: he,
  /*
    Source for urlPattern, emailPattern
    http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
    urlPattern has been adjusted
  */
  urlPattern: "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+(?:(?:aero|arpa|asia|agency|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|cloud|com|company|coop|c[acdfghiklmnoruvxyz])|(?:dev|d[ejkmoz])|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|guide|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om|one)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|(?:shop|store|s[abcdeghijklmnortuvyz])|(?:tel|travel|team|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|(?:work|w[fs])|(?:xyz)|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\\:\\d{1,5})?)(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?(?:\\b|$)",
  /* Email pattern */
  emailPattern: "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}\\@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+",
  /* Filename pattern */
  filenamePattern: "\\b[a-zA-Z0-9_%\\-]+\\.(ai|asm|bat|bmp|c|cpp|cs|css|csv|dart|doc|docx|exe|gif|go|html|ics|java|jpeg|jpg|js|json|key|kt|less|lua|log|md|mp4|odp|ods|odt|pdf|php|pl|png|ppt|pptx|psd|py|r|rar|rb|rs|scala|scss|sh|svg|sql|swift|tar.gz|tar|tex|tiff|ts|txt|vbs|xml|xls|xlsx|yaml|yml|zip)\\b"
}, fe = {
  quotes: {
    leftDoubleQuote: "„",
    rightDoubleQuote: "“",
    leftSingleQuote: "‚",
    rightSingleQuote: "‘"
  },
  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: n.nbsp,
    dash: n.enDash,
    spaceAfter: n.space
  },
  spaceAfter: {
    copyright: n.space,
    // ©⎵2025
    soundRecordingCopyright: n.space,
    // ℗⎵2025
    numeroSign: n.nbsp,
    // №⎵1234
    sectionSign: n.nbsp,
    // §⎵38
    paragraphSign: n.nbsp
    // ¶⎵38
  },
  spaceBefore: {
    percent: n.nbsp
    // 12⎵%
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  /* 
    (n-1) abbreviation space.
    Examples:
    J.{abbreviationSpace}Novak
    F.{abbreviationSpace}X.{nbsp}Šalda
    Ch.{abbreviationSpace}G.{abbreviationSpace}D.{nbsp}Lambert
    e.{abbreviationSpace}g.
  */
  abbreviationSpace: n.nbsp,
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations: ["č", "fol", "např", "odst", "par", "r", "s", "str", "sv", "tj", "tzv"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["hl m", "n l", "p n l", "př n l"]
}, be = {
  quotes: {
    leftDoubleQuote: "“",
    rightDoubleQuote: "”",
    leftSingleQuote: "‘",
    rightSingleQuote: "’"
  },
  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: "",
    dash: n.emDash,
    spaceAfter: ""
  },
  spaceAfter: {
    copyright: n.nbsp,
    // ©⎵2025
    soundRecordingCopyright: n.nbsp,
    // ℗⎵2025
    numeroSign: n.nbsp,
    // №⎵1234
    sectionSign: n.nbsp,
    // §⎵38
    paragraphSign: n.nbsp
    // ¶⎵38
  },
  spaceBefore: {
    percent: ""
    // 12%
  },
  numbers: {
    ordinalIndicator: "st|nd|rd|th",
    romanOrdinalIndicator: ""
  },
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
    Even though this is not a common date format in the U.S., it serves as a fallback for mixed language content.
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  /* 
    (n-1) abbreviation space.
    Examples:
    J.{abbreviationSpace}Novak
    F.{abbreviationSpace}X.{nbsp}Šalda
    Ch.{abbreviationSpace}G.{abbreviationSpace}D.{nbsp}Lambert
    e.{abbreviationSpace}g.
  */
  abbreviationSpace: "",
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations: ["p", "pp", "no", "vol"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["U S", "e g", "i e", "a m", "p m"]
}, me = {
  quotes: {
    leftDoubleQuote: "«",
    rightDoubleQuote: "»",
    leftSingleQuote: "‹",
    rightSingleQuote: "›"
  },
  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: n.hairSpace,
    dash: n.emDash,
    spaceAfter: n.hairSpace
  },
  spaceAfter: {
    copyright: n.nbsp,
    // ©⎵2025
    soundRecordingCopyright: n.nbsp,
    // ℗⎵2025
    numeroSign: n.nbsp,
    // №⎵1234
    sectionSign: n.narrowNbsp,
    // §⎵38
    paragraphSign: n.narrowNbsp
    // ¶⎵38
  },
  spaceBefore: {
    percent: n.nbsp
    // 12⎵%
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  /* 
    (n-1) abbreviation space.
    Examples:
    J.{abbreviationSpace}Novak
    F.{abbreviationSpace}X.{nbsp}Šalda
    Ch.{abbreviationSpace}G.{abbreviationSpace}D.{nbsp}Lambert
    e.{abbreviationSpace}g.
  */
  abbreviationSpace: n.nbsp,
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations: ["ціт", "ст", "канц", "абз", "тзв", "Зб", "ч", "напр"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["т зн", "Е Ч", "евід ч", "род ч", "т ч", "т д"]
}, ge = {
  quotes: {
    leftDoubleQuote: "„",
    rightDoubleQuote: "“",
    leftSingleQuote: "‚",
    rightSingleQuote: "‘"
  },
  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: n.hairSpace,
    dash: n.emDash,
    spaceAfter: n.hairSpace
  },
  spaceAfter: {
    copyright: n.nbsp,
    // ©⎵2025
    soundRecordingCopyright: n.nbsp,
    // ℗⎵2025
    numeroSign: n.nbsp,
    // №⎵1234
    sectionSign: n.narrowNbsp,
    // §⎵38
    paragraphSign: n.narrowNbsp
    // ¶⎵38
  },
  spaceBefore: {
    percent: n.nbsp
    // 12⎵%
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  /* 
    (n-1) abbreviation space.
    Examples:
    J.{abbreviationSpace}Novak
    F.{abbreviationSpace}X.{nbsp}Šalda
    Ch.{abbreviationSpace}G.{abbreviationSpace}D.{nbsp}Lambert
    e.{abbreviationSpace}g.
  */
  abbreviationSpace: n.nbsp,
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
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
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
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
}, xe = {
  quotes: {
    leftDoubleQuote: "„",
    rightDoubleQuote: "“",
    leftSingleQuote: "‚",
    rightSingleQuote: "‘"
  },
  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: n.hairSpace,
    dash: n.enDash,
    spaceAfter: n.hairSpace
  },
  spaceAfter: {
    copyright: n.nbsp,
    // ©⎵2025
    soundRecordingCopyright: n.nbsp,
    // ℗⎵2025
    numeroSign: n.nbsp,
    // №⎵1234
    sectionSign: n.nbsp,
    // §⎵38
    paragraphSign: n.nbsp
    // ¶⎵38
  },
  spaceBefore: {
    percent: n.narrowNbsp
    // 12⎵%
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.space
  },
  /* 
    (n-1) abbreviation space.
    Examples:
    J.{abbreviationSpace}Novak
    F.{abbreviationSpace}X.{nbsp}Šalda
    Ch.{abbreviationSpace}G.{abbreviationSpace}D.{nbsp}Lambert
    e.{abbreviationSpace}g.
  */
  abbreviationSpace: n.nbsp,
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
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
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
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
}, i = {
  cs: fe,
  "en-us": be,
  rue: me,
  sk: ge,
  "de-de": xe
}, g = "en-us";
class we {
  constructor(o) {
    i[o] || (console.warn(`Locale '${o}' not found, falling back to '${g}'`), o = g), this.ID = o, this.leftSingleQuote = i[o].quotes.leftSingleQuote, this.rightSingleQuote = i[o].quotes.rightSingleQuote, this.leftDoubleQuote = i[o].quotes.leftDoubleQuote, this.rightDoubleQuote = i[o].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.dashWords = i[o].dashWords, this.spaceAfter = i[o].spaceAfter, this.spaceBefore = i[o].spaceBefore, this.ordinalIndicator = i[o].numbers.ordinalIndicator, this.romanOrdinalIndicator = i[o].numbers.romanOrdinalIndicator, this.ordinalDate = i[o].ordinalDate, this.abbreviationSpace = i[o].abbreviationSpace, this.singleWordAbbreviations = [];
    for (const a in i)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        i[a].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const a in i)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        i[a].multipleWordAbbreviations
      );
  }
}
function Se(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function f(e, o, a) {
  let p = 0, r = e, u = "";
  for (; r !== u && p < 50; )
    u = r, r = r.replace(o, a), p++;
  return r;
}
function Ee(e) {
  return f(
    e,
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,})([${n.nbsp}${n.narrowNbsp}])([${n.lowercaseChars}${n.uppercaseChars}]{2,})`,
      "g"
    ),
    "$1 $3"
  );
}
function Q(e, o) {
  return e = f(
    e,
    new RegExp(
      `(^|[${n.space}]|[^${n.allChars}\\d${n.apostrophe}${n.plus}${n.minus}${n.hyphen}])([${n.lowercaseChars}])([${n.space}])`,
      "g"
    ),
    `$1$2${n.nbsp}`
  ), e = e.replace(
    new RegExp(
      `(^|[${n.sentencePunctuation}${n.ellipsis}${n.copyright}${n.registeredTrademark}${n.soundRecordingCopyright}])([${n.spaces}]?)([${n.uppercaseChars}])([${n.spaces}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}`
  ), o.ID == "en-us" && (e = e.replace(
    new RegExp(
      `(^|[${n.spaces}])(I)([${n.spaces}])`,
      "g"
    ),
    `$1$2${n.nbsp}`
  )), e;
}
function ye(e) {
  return e.replace(
    new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"),
    ` $2${n.nbsp}`
  );
}
function Ae(e) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d]|^)(\\d{1,2})([${n.spaces}])([${n.allChars}])`,
      "g"
    ),
    `$1$2${n.nbsp}$4`
  );
}
function Re(e, o) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${o.ordinalIndicator})([${n.spaces}]?)([${n.allChars}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function _e(e, o) {
  return e.replace(
    new RegExp(
      `(\\d)(\\.)([${n.spaces}]?)(\\d)(\\.)([${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1$2${o.ordinalDate.firstSpace}$4$5${o.ordinalDate.secondSpace}$7`
  );
}
function Ce(e, o) {
  return o.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b)([${n.romanNumerals}]+)(${o.romanOrdinalIndicator})([${n.spaces}]?)([${n.allChars}\\d])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  ) : e;
}
function Qe(e, o) {
  let a = `(\\b[${n.uppercaseChars}][${n.lowercaseChars}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${o.romanOrdinalIndicator})([${n.nbsp}]?)`, t = new RegExp(a, "g");
  return e.replace(t, function(p, r, u, s, c, $) {
    return $ == "" && s == "I" ? r + n.space + s + c : $ == "" && s != "I" ? r + n.nbsp + s + c : $ == n.nbsp && s == "I" ? r + n.space + s + c + $ : r + n.nbsp + s + c + n.space;
  });
}
function Pe(e, o) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "g"
    ),
    `$1${o.spaceBefore.percent}$3`
  );
}
function De(e, o) {
  let a = n.uppercaseChars;
  o.ID == "en-us" && (a = a.replace(/A-Z/g, "A-HJ-Z"));
  let t = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${o.rightDoubleQuote}${o.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([${a}])(([${n.spaces}])|(\\.$|$))`, p = new RegExp(t, "g");
  return e.replace(p, function(r, u, s, c, $, l) {
    return o.ID == "en-us" ? u + n.nbsp + c + $ : c == "I" && (l == n.nbsp || l == n.hairSpace || l == n.narrowNbsp) ? u + n.nbsp + c + n.space : u + n.nbsp + c + $;
  });
}
function ve(e, o, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(
    new RegExp(`(${o})([^${n.spaces}${o}])`, "g"),
    `$1${a}$2`
  );
}
function Be(e, o, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(
    new RegExp(`(${o})([${n.spaces}]+)`, "g"),
    `$1${a}`
  );
}
function ke(e, o) {
  return e = Ee(e), e = Q(e, o), e = ye(e), e = Ae(e), e = Re(e, o), e = _e(e, o), e = Ce(e, o), e = De(e, o), e = Qe(e, o), e = Pe(e, o), e;
}
function We(e) {
  return e.replace(
    new RegExp(
      `(\\S)([${n.spaces}]{2,})(\\S)`,
      "g"
    ),
    "$1 $3"
  );
}
function Ne(e, o) {
  let a = e.split(/\r?\n/), t = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let p = 0; p < a.length; p++)
    a[p] = a[p].replace(t, function(r, u, s) {
      return o.removeWhitespacesBeforeMarkdownList == !1 && s != "" ? u + s : s;
    });
  return a.join(`
`);
}
function qe(e) {
  let o = e.split(/\r?\n/), a = new RegExp("(\\s+$)", "g");
  for (let t = 0; t < o.length; t++)
    o[t] = o[t].replace(a, "");
  return o.join(`
`);
}
function ze(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`,
      "g"
    ),
    "$2$3"
  );
}
function Ie(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`,
      "g"
    ),
    "$2"
  );
}
function Le(e, o) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}]?)(${o.ordinalIndicator})([${n.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function Me(e) {
  return e.replace(
    new RegExp(
      `([${n.openingBrackets}])([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function Te(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}])([${n.openingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}${n.closingBrackets}])`,
      "g"
    ),
    function(o, a, t, p, r) {
      return p == "s" | p == "S" | p + r == "es" | p + r == "ES" ? `${a}${t}${p}${r}` : `${a}${n.space}${t}${p}${r}`;
    }
  );
}
function Oe(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function je(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function Ze(e) {
  return e.replace(
    new RegExp(
      `([${n.closingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function He(e, o) {
  return e.replace(
    new RegExp(`([^${n.spaces}${n.openingBrackets}${o}])(${o})`, "g"),
    `$1${n.space}$2`
  );
}
function Ue(e, o, a) {
  return e = We(e), e = Ne(e, a), e = qe(e), e = ze(e), e = Ie(e), e = Le(e, o), e = Me(e), e = Te(e), e = Oe(e), e = Ze(e), e = je(e), e;
}
function Fe(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function Xe(e) {
  return Fe(e);
}
function Ge(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function Ve(e) {
  return e.replace(
    new RegExp(
      `\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`,
      "g"
    ),
    n.ellipsis
  );
}
function Ye(e) {
  return e.replace(
    new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"),
    `${n.space}${n.ellipsis}${n.space}`
  );
}
function Je(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${n.ellipsis}$5`
  );
}
function Ke(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function en(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "gm"
    ),
    "$1$3"
  );
}
function nn(e, o) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${o.terminalQuotes}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([${n.lowercaseChars}])`,
      "g"
    ),
    "$1 $3$5"
  );
}
function on(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$3 $5"
  );
}
function an(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.ellipsis}])([${n.allChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function tn(e, o) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${o.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}
function pn(e, o) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])+([${n.ellipsis}][${o.rightDoubleQuote}${o.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}
function rn(e, o) {
  return e = Ge(e), e = Je(e), e = Ke(e), e = en(e), e = nn(e, o), e = on(e), e = an(e), e = tn(e, o), e = pn(e, o), e = Ve(e), e = Ye(e), e;
}
function sn(e) {
  return e = e.replace(
    new RegExp(
      `([${n.allChars}])(-)([${n.spaces}])([${n.allChars}])`,
      "g"
    ),
    "$1-$4"
  ), e = e.replace(
    new RegExp(
      `([${n.allChars}])([${n.spaces}])(-)([${n.allChars}])`,
      "g"
    ),
    "$1-$4"
  ), e;
}
function un(e) {
  return e = sn(e), e;
}
function cn(e) {
  return e.replace(/(---)/g, "—");
}
function $n(e) {
  return e.replace(/(--)/g, "–");
}
function ln(e, o) {
  return e.replace(
    new RegExp(
      `([${n.allChars}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}][${n.spaces}]*|[${n.spaces}]+[${n.hyphen}][${n.spaces}]+)([${n.allChars}\\d])`,
      "g"
    ),
    `$1${o.dashWords.spaceBefore}${o.dashWords.dash}${o.dashWords.spaceAfter}$3`
  );
}
function dn(e, o) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.spaces}]?)(${n.hyphen})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "g"
    ),
    `$1${o.dashWords.spaceBefore}${o.dashWords.dash}$5`
  );
}
function hn(e) {
  return e = f(
    e,
    new RegExp(
      `(\\d)([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d)`,
      "g"
    ),
    "$1{{typopo__endash}}$3"
  ), e.replace(
    new RegExp(
      "{{typopo__endash}}",
      "g"
    ),
    n.enDash
  );
}
function fn(e) {
  return e.replace(
    new RegExp(
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1${n.enDash}$3`
  );
}
function bn(e, o) {
  return e.replace(
    new RegExp(
      `(\\d)(${o.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d)(${o.ordinalIndicator})`,
      "gi"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function mn(e, o) {
  return e = cn(e), e = $n(e), e = ln(e, o), e = dn(e, o), e = hn(e), e = fn(e), e = bn(e, o), e;
}
const d = "{{typopo__markdown_tick}}";
function P(e, o) {
  return o.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function D(e, o) {
  return o.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${d}`,
      "g"
    ),
    "`"
  ) : e;
}
function gn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function xn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function wn(e) {
  return e = e.replace(
    new RegExp(
      `([^0-9]|^)(${n.doubleQuoteAdepts})(.+?)(\\d+)(${n.doubleQuoteAdepts})([${n.terminalPunctuation}${n.ellipsis}])`,
      "g"
    ),
    "$1$2$3$4$6$5"
  ), e = e.replace(
    new RegExp(
      `(\\b\\d{1,3})([${n.spaces}]?)(“|”|\\"|″|‘{2,}|’{2,}|'{2,}|′{2,})`,
      "g"
    ),
    "$1$2{{typopo__double-prime}}"
  ), e;
}
function Sn(e) {
  return e = e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})(\\d+)({{typopo__double-prime}})`,
      "g"
    ),
    "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}"
  ), e = e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}"
  ), e;
}
function En(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "{{typopo__left-double-quote--standalone}}$2"
  );
}
function yn(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1{{typopo__right-double-quote--standalone}}"
  );
}
function An(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function Rn(e) {
  return e.replace(
    new RegExp(
      "({{typopo__left-double-quote--standalone}})(.*?)({{typopo__double-prime}})",
      "g"
    ),
    "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}"
  ).replace(
    new RegExp(
      "({{typopo__double-prime}})(.*?)({{typopo__right-double-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}"
  );
}
function _n(e, o) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${o.leftDoubleQuote})([^${o.rightDoubleQuote}]+?)([^${n.romanNumerals}${n.closingBrackets}])([${n.terminalPunctuation}${n.ellipsis}])(${o.rightDoubleQuote})`,
      // 7
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${o.leftDoubleQuote})(.+?)([^${n.romanNumerals}])(${o.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `(^${o.leftDoubleQuote}[^${o.rightDoubleQuote}]+?[^${n.romanNumerals}])(${o.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "gm"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]${o.leftDoubleQuote}[^${o.rightDoubleQuote}]+?[^${n.romanNumerals}])(${o.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${o.rightDoubleQuote}][${n.spaces}]${o.leftDoubleQuote}[^${o.rightDoubleQuote}]+?[^${n.romanNumerals}])(${o.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e;
}
function Cn(e, o) {
  return e.replace(/{{typopo__double-prime}}/g, n.doublePrime).replace(
    /({{typopo__left-double-quote}}|{{typopo__left-double-quote--standalone}})/g,
    o.leftDoubleQuote
  ).replace(
    /({{typopo__right-double-quote}}|{{typopo__right-double-quote--standalone}})/g,
    o.rightDoubleQuote
  );
}
function Qn(e, o) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}])([,])(${o.rightDoubleQuote})`,
      "g"
    ),
    "$1$3"
  );
}
function Pn(e, o) {
  return e = e.replace(
    new RegExp(
      `(${o.leftDoubleQuote})([${n.spaces}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.spaces}])(${o.rightDoubleQuote})`,
      "g"
    ),
    "$2"
  ), e = e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doublePrime})`,
      "g"
    ),
    "$2"
  ), e;
}
function Dn(e, o) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${n.allChars}])([${o.leftDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e = Q(e, o), e;
}
function vn(e, o) {
  return e.replace(
    new RegExp(
      `([${o.rightDoubleQuote}])([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function Bn(e, o, a) {
  return e = P(e, a), e = gn(e), e = xn(e), e = wn(e), e = Sn(e), e = En(e), e = yn(e), e = An(e), e = Rn(e), e = Cn(e, o), e = D(e, a), e = Pn(e, o), e = Dn(e, o), e = vn(e, o), e = _n(e, o), e = Qn(e, o), e;
}
function kn(e) {
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
  ].forEach((a) => {
    e = e.replace(
      new RegExp(
        `(${a[0]})([${n.spaces}]?)(${n.singleQuoteAdepts})(n)(${n.singleQuoteAdepts})([${n.spaces}]?)(${a[1]})`,
        "gi"
      ),
      `$1${n.nbsp}{{typopo__apostrophe}}$4{{typopo__apostrophe}}${n.nbsp}$7`
    );
  }), e;
}
function Wn(e) {
  let o = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${o})`,
      "gi"
    ),
    "{{typopo__apostrophe}}$2"
  );
}
function Nn(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    "$1{{typopo__apostrophe}}"
  );
}
function qn(e) {
  return e.replace(
    new RegExp(
      `([\\d${n.allChars}])(${n.singleQuoteAdepts})+([${n.allChars}])`,
      "g"
    ),
    "$1{{typopo__apostrophe}}$3"
  );
}
function zn(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`,
      "g"
    ),
    "$1$2{{typopo__apostrophe}}$4"
  );
}
function In(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}
function Ln(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([${n.allChars}${n.ellipsis}])`,
      "g"
    ),
    "$1{{typopo__left-single-quote--standalone}}$3"
  );
}
function Mn(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "g"
    ),
    "$1$2{{typopo__right-single-quote--standalone}}$4"
  );
}
function Tn(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    function(o, a, t, p) {
      return t = Ln(t), t = Mn(t), t = On(t), a + t + p;
    }
  );
}
function On(e) {
  return e.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  );
}
function jn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([${n.allChars}]+)(${n.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__left-single-quote}}$3{{typopo__right-single-quote}}$5"
  );
}
function Zn(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__apostrophe}}"
  );
}
function Hn(e) {
  return e = e.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*?)({{typopo__single-prime}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  ), e = e.replace(
    new RegExp(
      "({{typopo__single-prime}})(.*?)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  ), e;
}
function Un(e, o) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${o.leftSingleQuote})([^${o.rightSingleQuote}]+?)([^${n.romanNumerals}])([${n.terminalPunctuation}${n.ellipsis}])(${o.rightSingleQuote})`,
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${o.leftSingleQuote})(.+?)([^${n.romanNumerals}])(${o.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]|^)(${o.leftSingleQuote})([^${o.rightSingleQuote}]+?)([^${n.romanNumerals}])(${o.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$2$3$4$6$5$7"
  ), e;
}
function Fn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function Xn(e, o) {
  return e = e.replace(/({{typopo__single-prime}})/g, n.singlePrime), e = e.replace(
    /{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g,
    n.apostrophe
  ), e = e.replace(/{{typopo__left-single-quote}}/g, o.leftSingleQuote), e = e.replace(/{{typopo__right-single-quote}}/g, o.rightSingleQuote), e = e.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), e;
}
function Gn(e, o, a) {
  return e = P(e, a), e = kn(e), e = Wn(e), e = qn(e), e = zn(e), e = Nn(e), e = In(e), e = jn(e), e = Tn(e), e = Hn(e), e = Zn(e), e = Xn(e, o), e = D(e, a), e = Un(e, o), e = Fn(e), e;
}
function Vn(e) {
  return f(
    e,
    new RegExp(
      `([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Yn(e) {
  return f(
    e,
    new RegExp(
      `([${n.allChars}]+)([${n.spaces}][x][${n.spaces}])([${n.allChars}]+)`,
      "g"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function Jn(e) {
  return e.replace(
    new RegExp(
      `([\\d])([${n.spaces}]?)([x|×])([${n.spaces}])([${n.lowercaseChars}]+)`,
      "gi"
    ),
    function(o, a, t, p, r, u) {
      return t == "" ? `${a}${t}${n.multiplicationSign}${n.nbsp}${u}` : `${a}${n.nbsp}${n.multiplicationSign}${n.nbsp}${u}`;
    }
  );
}
function Kn(e) {
  return e.replace(
    new RegExp(
      `([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function eo(e) {
  return e = Vn(e), e = Yn(e), e = Jn(e), e = Kn(e), e;
}
function h(e, o, a) {
  return e = He(e, o), e = ve(e, o, a), e = Be(e, o, a), e;
}
function no(e, o) {
  return e = h(e, n.sectionSign, o.spaceAfter.sectionSign), e = h(e, n.paragraphSign, o.spaceAfter.paragraphSign), e;
}
function x(e, o, a) {
  return e.replace(
    new RegExp(
      `(\\(${o}\\))([${n.spaces}]*)(\\d)`,
      "gi"
    ),
    `${a}$2$3`
  );
}
function oo(e, o) {
  return e = x(e, "c", n.copyright), e = h(e, n.copyright, o.spaceAfter.copyright), e = x(e, "p", n.soundRecordingCopyright), e = h(e, n.soundRecordingCopyright, o.spaceAfter.soundRecordingCopyright), e;
}
function ao(e, o) {
  return e = h(e, n.numeroSign, o.spaceAfter.numeroSign), e;
}
function to(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function b(e, o, a) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${o}\\)|${a})`,
      "gi"
    ),
    `$1${a}`
  );
}
function po(e) {
  return e = b(e, "r", n.registeredTrademark), e = b(e, "sm", n.serviceMark), e = b(e, "tm", n.trademark), e;
}
function v(e, o, a) {
  let t = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${t})(${o})`, "g"),
    `$1$2${a}`
  );
}
function ro(e) {
  return v(e, "2", "²");
}
function so(e) {
  return v(e, "3", "³");
}
function uo(e) {
  return e = ro(e), e = so(e), e;
}
function co(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function $o(e) {
  return e = co(e), e;
}
function io(e, o) {
  const a = `([${n.uppercaseChars}][${n.allChars}]?\\.)([${n.spaces}]?)`, t = `([${n.allChars}]{2,}[^\\.])`, p = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${a}${t}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${a}${a}${t}`,
      replacement: `$1${o.abbreviationSpace}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${a}${a}${a}${t}`,
      replacement: `$1${o.abbreviationSpace}$3${o.abbreviationSpace}$5${n.space}$7`
    }
  ];
  for (const { pattern: r, replacement: u } of p)
    e = e.replace(new RegExp(r, "g"), u);
  return e;
}
function lo(e, o) {
  let a = `([^${n.allChars}${n.enDash}${n.emDash}]|^)`, t = `([${n.allChars}]|\\D)`, p = `([^${n.allChars}${o.leftDoubleQuote}${o.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`, r = [];
  for (let u = 0; u < o.multipleWordAbbreviations.length; u++) {
    let s = o.multipleWordAbbreviations[u].split(" "), c = "";
    for (let $ = 0; $ < s.length; $++)
      c += `(${s[$]})(\\.)([${n.spaces}]?)`;
    r[u] = c;
  }
  for (let u = 0; u < r.length; u++) {
    let s = `${a}${r[u]}${t}`, c = "$1", $ = (r[u].match(/\(/g) || []).length / 3;
    for (let l = 0; l < $ - 1; l++)
      c += `$${l * 3 + 2}.${o.abbreviationSpace}`;
    c += `$${($ - 1) * 3 + 2}. $${$ * 3 + 2}`, e = e.replace(new RegExp(s, "gi"), c);
  }
  for (let u = 0; u < r.length; u++) {
    let s = `${a}${r[u]}${p}`, c = "$1", $ = (r[u].match(/\(/g) || []).length / 3;
    for (let l = 0; l < $ - 1; l++)
      c += `$${l * 3 + 2}.${o.abbreviationSpace}`;
    c += `$${($ - 1) * 3 + 2}.$${$ * 3 + 2}`, e = e.replace(new RegExp(s, "giu"), c);
  }
  return e;
}
function ho(e, o) {
  let a = [];
  for (let s = 0; s < o.singleWordAbbreviations.length; s++)
    a[s] = `(${o.singleWordAbbreviations[s]})(\\.)([${n.spaces}]?)`;
  let t = `([^${n.allChars}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, p = `([${n.allChars}\\d]+)([^\\.]|$)`;
  for (let s = 0; s < a.length; s++)
    e = e.replace(
      new RegExp(
        `${t}${a[s]}${p}`,
        "gi"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let r = `([${n.allChars}\\d])([${n.spaces}])`, u = `([^${n.spaces}${n.allChars}\\d]|$)`;
  for (let s = 0; s < a.length; s++)
    e = e.replace(
      new RegExp(
        `${r}${a[s]}${u}`,
        "gi"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function fo(e, o) {
  return e = io(e, o), e = lo(e, o), e = ho(e, o), e;
}
function bo(e) {
  return e = e.replace(
    new RegExp(
      `([^${n.allChars}]|^)([${n.uppercaseChars}]{2})([${n.lowercaseChars}]{2,})`,
      "g"
    ),
    function(o, a, t, p) {
      return `${a}${t.substring(0, 1)}${t.substring(1).toLowerCase()}${p}`;
    }
  ), e.replace(
    new RegExp(
      `(\\b)(?!iOS)([${n.lowercaseChars}])([${n.uppercaseChars}]{2,})`,
      "g"
    ),
    function(o, a, t, p) {
      return `${a}${t.toUpperCase()}${p.toLowerCase()}`;
    }
  );
}
function mo(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function go(e) {
  let o = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + o + "(\\d+)" + o + "(\\d+)" + o + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function xo(e) {
  let o = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + o + "(\\d+)" + o + "(\\d+)" + o + "(\\d+)" + o + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function wo(e) {
  let o = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + o + "(\\d+)" + o + "(\\d+)" + o + "(\\d+)" + o + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function So(e) {
  return e = mo(e), e = go(e), e = xo(e), e = wo(e), e;
}
function Eo(e) {
  let o = [];
  return m(e, n.emailPattern, o), m(e, n.urlPattern, o), m(e, n.filenamePattern, o), { processedText: yo(e, o), exceptions: o };
}
function m(e, o, a) {
  const t = new RegExp(o, "gi"), p = e.match(t);
  return p && p.forEach((r) => a.push(r)), a;
}
function yo(e, o) {
  return o.reduce((a, t, p) => {
    const r = `{{typopo__exception-${p}}}`;
    return a.replace(t, r);
  }, e);
}
function Ao(e, o) {
  return o.reduce((a, t, p) => {
    const r = new RegExp(`{{typopo__exception-${p}}}`, "g");
    return a.replace(r, t);
  }, e);
}
/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
function Ro(e, o, a) {
  o = typeof o > "u" ? "en-us" : o;
  let t = new we(o);
  a = typeof a > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : a;
  const { processedText: p, exceptions: r } = Eo(e);
  return e = p, a.removeLines && (e = Se(e)), e = rn(e, t), e = Ue(e, t, a), e = Xe(e), e = mn(e, t), e = un(e), e = Gn(e, t, a), e = Bn(e, t, a), e = eo(e), e = no(e, t), e = oo(e, t), e = ao(e, t), e = to(e), e = po(e), e = uo(e), e = $o(e), e = bo(e), e = fo(e, t), e = So(e), e = ke(e, t), e = Ao(e, r), e;
}
export {
  Ro as fixTypos
};
