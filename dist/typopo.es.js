/*!
 * Typopo v2.6.0 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const y = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях", _ = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ", N = "a-z" + y, q = "A-Z" + _, z = "a-z" + y + "A-Z" + _, I = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", L = "’", M = "′", T = "`", O = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}|´{2,}|`{2,}", j = "″", R = " ", A = " ", C = " ", Q = " ", Z = R + A + C + Q, P = "\\.\\!\\?", D = "\\,\\:\\;", H = D + P, U = "\\(\\[\\{", F = "\\)\\]\\}", X = "…", G = "-", V = "–", Y = "—", J = "/", K = "°", ee = "×", ne = "&", ae = "§", oe = "¶", te = "©", pe = "℗", re = "®", se = "℠", ue = "™", $e = "+", ce = "−", le = "±", ie = "%", de = "‰", he = "‱", fe = "#", be = "IVXLCDM", n = {
  lowercaseChars: N,
  uppercaseChars: q,
  allChars: z,
  singleQuoteAdepts: I,
  apostrophe: L,
  singlePrime: M,
  backtick: T,
  doubleQuoteAdepts: O,
  doublePrime: j,
  /* Spaces */
  space: R,
  nbsp: A,
  hairSpace: C,
  narrowNbsp: Q,
  spaces: Z,
  /* Punctuation*/
  terminalPunctuation: P,
  sentencePausePunctuation: D,
  sentencePunctuation: H,
  openingBrackets: U,
  closingBrackets: F,
  ellipsis: X,
  hyphen: G,
  enDash: V,
  emDash: Y,
  slash: J,
  /* Symbols*/
  degree: K,
  multiplicationSign: ee,
  ampersand: ne,
  sectionSign: ae,
  paragraphSign: oe,
  copyright: te,
  soundRecordingCopyright: pe,
  registeredTrademark: re,
  serviceMark: se,
  trademark: ue,
  plus: $e,
  minus: ce,
  plusMinus: le,
  percent: ie,
  permille: de,
  permyriad: he,
  numberSign: fe,
  /* Numbers */
  romanNumerals: be,
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
}, me = {
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
  /*
    A space between a digit and a percent sign 
  */
  spaceBeforePercent: n.nbsp,
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
    "s",
    "fol",
    "str",
    "r",
    "par",
    "odst",
    "např",
    "sv",
    "tj",
    "tzv"
  ],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["hl m", "n l", "p n l", "př n l"]
}, xe = {
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
  /*
    A space between a digit and a percent sign 
  */
  spaceBeforePercent: "",
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
}, we = {
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
  /*
    A space between a digit and a percent sign 
  */
  spaceBeforePercent: n.nbsp,
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
  /*
    A space between a digit and a percent sign 
  */
  spaceBeforePercent: n.nbsp,
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
    "s",
    "fol",
    "str",
    "r",
    "par",
    "odst",
    "napr",
    "sv",
    "tzv",
    "čl",
    "cit",
    "roč",
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
    "t j",
    "zodp red",
    "t č"
  ]
}, Se = {
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
  /*
    A space between a digit and a percent sign 
  */
  spaceBeforePercent: n.narrowNbsp,
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
    "S",
    "z",
    "St",
    "Stk",
    "Mo",
    "Di",
    "Mi",
    "Do",
    "Fr",
    "Sa",
    "So",
    "Bhf",
    "Hbf",
    "Nr",
    "ca",
    "usw",
    "geb",
    "gest",
    "u"
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
    "n Chr",
    "s a",
    "s o",
    "s u",
    "u a",
    "u ä",
    "u Ä",
    "u dgl",
    "u U",
    "u z",
    "u zw",
    "v a",
    "v Chr",
    "z B",
    "z T",
    "z Zt",
    "n u Z",
    "u a m",
    "v u Z",
    "Ges m b H"
  ]
}, l = {
  cs: me,
  "en-us": xe,
  rue: we,
  sk: ge,
  "de-de": Se
}, g = "en-us";
class Ee {
  constructor(a) {
    l[a] || (console.warn(`Locale '${a}' not found, falling back to '${g}'`), a = g), this.ID = a, this.leftSingleQuote = l[a].quotes.leftSingleQuote, this.rightSingleQuote = l[a].quotes.rightSingleQuote, this.leftDoubleQuote = l[a].quotes.leftDoubleQuote, this.rightDoubleQuote = l[a].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.dashWords = l[a].dashWords, this.spaceBeforePercent = l[a].spaceBeforePercent, this.ordinalIndicator = l[a].numbers.ordinalIndicator, this.romanOrdinalIndicator = l[a].numbers.romanOrdinalIndicator, this.ordinalDate = l[a].ordinalDate, this.abbreviationSpace = l[a].abbreviationSpace, this.singleWordAbbreviations = [];
    for (const o in l)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        l[o].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const o in l)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        l[o].multipleWordAbbreviations
      );
  }
}
function ye(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function h(e, a, o) {
  let p = 0, r = e, u = "";
  for (; r !== u && p < 50; )
    u = r, r = r.replace(a, o), p++;
  return r;
}
function _e(e) {
  return h(
    e,
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,})([${n.nbsp}${n.narrowNbsp}])([${n.lowercaseChars}${n.uppercaseChars}]{2,})`,
      "g"
    ),
    "$1 $3"
  );
}
function v(e, a) {
  return e = h(
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
  ), a.ID == "en-us" && (e = e.replace(
    new RegExp(
      `(^|[${n.spaces}])(I)([${n.spaces}])`,
      "g"
    ),
    `$1$2${n.nbsp}`
  )), e;
}
function Re(e) {
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
function Ce(e, a) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${a.ordinalIndicator})([${n.spaces}]?)([${n.allChars}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function Qe(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)(\\.)([${n.spaces}]?)(\\d)(\\.)([${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1$2${a.ordinalDate.firstSpace}$4$5${a.ordinalDate.secondSpace}$7`
  );
}
function Pe(e, a) {
  return a.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b)([${n.romanNumerals}]+)(${a.romanOrdinalIndicator})([${n.spaces}]?)([${n.allChars}\\d])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  ) : e;
}
function De(e, a) {
  let o = `(\\b[${n.uppercaseChars}][${n.lowercaseChars}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${a.romanOrdinalIndicator})([${n.nbsp}]?)`, t = new RegExp(o, "g");
  return e.replace(t, function(p, r, u, s, $, c) {
    return c == "" && s == "I" ? r + n.space + s + $ : c == "" && s != "I" ? r + n.nbsp + s + $ : c == n.nbsp && s == "I" ? r + n.space + s + $ + c : r + n.nbsp + s + $ + n.space;
  });
}
function ve(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "g"
    ),
    `$1${a.spaceBeforePercent}$3`
  );
}
function Be(e, a) {
  let o = n.uppercaseChars;
  a.ID == "en-us" && (o = o.replace(/A-Z/g, "A-HJ-Z"));
  let t = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${a.rightDoubleQuote}${a.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([${o}])(([${n.spaces}])|(\\.$|$))`, p = new RegExp(t, "g");
  return e.replace(p, function(r, u, s, $, c, i) {
    return a.ID == "en-us" ? u + n.nbsp + $ + c : $ == "I" && (i == n.nbsp || i == n.hairSpace || i == n.narrowNbsp) ? u + n.nbsp + $ + n.space : u + n.nbsp + $ + c;
  });
}
function m(e, a) {
  return e.replace(
    new RegExp(`(${a})([^${n.spaces}${a}])`, "g"),
    `$1${n.nbsp}$2`
  );
}
function x(e, a) {
  return e.replace(
    new RegExp(`(${a})([${n.spaces}])`, "g"),
    `$1${n.nbsp}`
  );
}
function ke(e, a) {
  return e = _e(e), e = v(e, a), e = Re(e), e = Ae(e), e = Ce(e, a), e = Qe(e, a), e = Pe(e, a), e = Be(e, a), e = De(e, a), e = ve(e, a), e;
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
function Ne(e, a) {
  let o = e.split(/\r?\n/), t = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let p = 0; p < o.length; p++)
    o[p] = o[p].replace(t, function(r, u, s) {
      return a.removeWhitespacesBeforeMarkdownList == !1 && s != "" ? u + s : s;
    });
  return o.join(`
`);
}
function qe(e) {
  let a = e.split(/\r?\n/), o = new RegExp("(\\s+$)", "g");
  for (let t = 0; t < a.length; t++)
    a[t] = a[t].replace(o, "");
  return a.join(`
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
function Le(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}]?)(${a.ordinalIndicator})([${n.spaces}]|\\b)`,
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
    function(a, o, t, p, r) {
      return p == "s" | p == "S" | p + r == "es" | p + r == "ES" ? `${o}${t}${p}${r}` : `${o}${n.space}${t}${p}${r}`;
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
function w(e, a) {
  return e.replace(
    new RegExp(`([^${n.spaces}${n.openingBrackets}${a}])(${a})`, "g"),
    `$1${n.space}$2`
  );
}
function He(e, a, o) {
  return e = We(e), e = Ne(e, o), e = qe(e), e = ze(e), e = Ie(e), e = Le(e, a), e = Me(e), e = Te(e), e = Oe(e), e = Ze(e), e = je(e), e;
}
function Ue(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function Fe(e) {
  return Ue(e);
}
function Xe(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function Ge(e) {
  return e.replace(
    new RegExp(
      `\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`,
      "g"
    ),
    n.ellipsis
  );
}
function Ve(e) {
  return e.replace(
    new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"),
    `${n.space}${n.ellipsis}${n.space}`
  );
}
function Ye(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${n.ellipsis}$5`
  );
}
function Je(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function Ke(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "gm"
    ),
    "$1$3"
  );
}
function en(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${a.terminalQuotes}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([${n.lowercaseChars}])`,
      "g"
    ),
    "$1 $3$5"
  );
}
function nn(e) {
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
function on(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${a.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}
function tn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])+([${n.ellipsis}][${a.rightDoubleQuote}${a.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}
function pn(e, a) {
  return e = Xe(e), e = Ye(e), e = Je(e), e = Ke(e), e = en(e, a), e = nn(e), e = an(e), e = on(e, a), e = tn(e, a), e = Ge(e), e = Ve(e), e;
}
function rn(e) {
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
function sn(e) {
  return e = rn(e), e;
}
function un(e) {
  return e.replace(/(---)/g, "—");
}
function $n(e) {
  return e.replace(/(--)/g, "–");
}
function cn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.allChars}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}][${n.spaces}]*|[${n.spaces}]+[${n.hyphen}][${n.spaces}]+)([${n.allChars}\\d])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}${a.dashWords.spaceAfter}$3`
  );
}
function ln(e, a) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.spaces}]?)(${n.hyphen})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}$5`
  );
}
function dn(e) {
  return e = h(
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
function hn(e) {
  return e.replace(
    new RegExp(
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1${n.enDash}$3`
  );
}
function fn(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)(${a.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d)(${a.ordinalIndicator})`,
      "gi"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function bn(e, a) {
  return e = un(e), e = $n(e), e = cn(e, a), e = ln(e, a), e = dn(e), e = hn(e), e = fn(e, a), e;
}
const d = "{{typopo__markdown_tick}}";
function B(e, a) {
  return a.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function k(e, a) {
  return a.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${d}`,
      "g"
    ),
    "`"
  ) : e;
}
function mn(e) {
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
function gn(e) {
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
function Sn(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "{{typopo__left-double-quote--standalone}}$2"
  );
}
function En(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1{{typopo__right-double-quote--standalone}}"
  );
}
function yn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function _n(e) {
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
function Rn(e, a) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${a.leftDoubleQuote})([^${a.rightDoubleQuote}]+?)([^${n.romanNumerals}${n.closingBrackets}])([${n.terminalPunctuation}${n.ellipsis}])(${a.rightDoubleQuote})`,
      // 7
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${a.leftDoubleQuote})(.+?)([^${n.romanNumerals}])(${a.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `(^${a.leftDoubleQuote}[^${a.rightDoubleQuote}]+?[^${n.romanNumerals}])(${a.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "gm"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]${a.leftDoubleQuote}[^${a.rightDoubleQuote}]+?[^${n.romanNumerals}])(${a.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${a.rightDoubleQuote}][${n.spaces}]${a.leftDoubleQuote}[^${a.rightDoubleQuote}]+?[^${n.romanNumerals}])(${a.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e;
}
function An(e, a) {
  return e.replace(/{{typopo__double-prime}}/g, n.doublePrime).replace(
    /({{typopo__left-double-quote}}|{{typopo__left-double-quote--standalone}})/g,
    a.leftDoubleQuote
  ).replace(
    /({{typopo__right-double-quote}}|{{typopo__right-double-quote--standalone}})/g,
    a.rightDoubleQuote
  );
}
function Cn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}])([,])(${a.rightDoubleQuote})`,
      "g"
    ),
    "$1$3"
  );
}
function Qn(e, a) {
  return e = e.replace(
    new RegExp(
      `(${a.leftDoubleQuote})([${n.spaces}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.spaces}])(${a.rightDoubleQuote})`,
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
function Pn(e, a) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${n.allChars}])([${a.leftDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e = v(e, a), e;
}
function Dn(e, a) {
  return e.replace(
    new RegExp(
      `([${a.rightDoubleQuote}])([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function vn(e, a, o) {
  return e = B(e, o), e = mn(e), e = xn(e), e = wn(e), e = gn(e), e = Sn(e), e = En(e), e = yn(e), e = _n(e), e = An(e, a), e = k(e, o), e = Qn(e, a), e = Pn(e, a), e = Dn(e, a), e = Rn(e, a), e = Cn(e, a), e;
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
  ].forEach((o) => {
    e = e.replace(
      new RegExp(
        `(${o[0]})([${n.spaces}]?)(${n.singleQuoteAdepts})(n)(${n.singleQuoteAdepts})([${n.spaces}]?)(${o[1]})`,
        "gi"
      ),
      `$1${n.nbsp}{{typopo__apostrophe}}$4{{typopo__apostrophe}}${n.nbsp}$7`
    );
  }), e;
}
function kn(e) {
  let a = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${a})`,
      "gi"
    ),
    "{{typopo__apostrophe}}$2"
  );
}
function Wn(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    "$1{{typopo__apostrophe}}"
  );
}
function Nn(e) {
  return e.replace(
    new RegExp(
      `([\\d${n.allChars}])(${n.singleQuoteAdepts})+([${n.allChars}])`,
      "g"
    ),
    "$1{{typopo__apostrophe}}$3"
  );
}
function qn(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`,
      "g"
    ),
    "$1$2{{typopo__apostrophe}}$4"
  );
}
function zn(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}
function In(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([${n.allChars}${n.ellipsis}])`,
      "g"
    ),
    "$1{{typopo__left-single-quote--standalone}}$3"
  );
}
function Ln(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "g"
    ),
    "$1$2{{typopo__right-single-quote--standalone}}$4"
  );
}
function Mn(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    function(a, o, t, p) {
      return t = In(t), t = Ln(t), t = Tn(t), o + t + p;
    }
  );
}
function Tn(e) {
  return e.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  );
}
function On(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([${n.allChars}]+)(${n.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__left-single-quote}}$3{{typopo__right-single-quote}}$5"
  );
}
function jn(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__apostrophe}}"
  );
}
function Zn(e) {
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
function Hn(e, a) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${a.leftSingleQuote})([^${a.rightSingleQuote}]+?)([^${n.romanNumerals}])([${n.terminalPunctuation}${n.ellipsis}])(${a.rightSingleQuote})`,
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${a.leftSingleQuote})(.+?)([^${n.romanNumerals}])(${a.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]|^)(${a.leftSingleQuote})([^${a.rightSingleQuote}]+?)([^${n.romanNumerals}])(${a.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$2$3$4$6$5$7"
  ), e;
}
function Un(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function Fn(e, a) {
  return e = e.replace(/({{typopo__single-prime}})/g, n.singlePrime), e = e.replace(
    /{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g,
    n.apostrophe
  ), e = e.replace(/{{typopo__left-single-quote}}/g, a.leftSingleQuote), e = e.replace(/{{typopo__right-single-quote}}/g, a.rightSingleQuote), e = e.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), e;
}
function Xn(e, a, o) {
  return e = B(e, o), e = Bn(e), e = kn(e), e = Nn(e), e = qn(e), e = Wn(e), e = zn(e), e = On(e), e = Mn(e), e = Zn(e), e = jn(e), e = Fn(e, a), e = k(e, o), e = Hn(e, a), e = Un(e), e;
}
function Gn(e) {
  return h(
    e,
    new RegExp(
      `([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Vn(e) {
  return h(
    e,
    new RegExp(
      `([${n.allChars}]+)([${n.spaces}][x][${n.spaces}])([${n.allChars}]+)`,
      "g"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function Yn(e) {
  return e.replace(
    new RegExp(
      `([\\d])([${n.spaces}]?)([x|×])([${n.spaces}])([${n.lowercaseChars}]+)`,
      "gi"
    ),
    function(a, o, t, p, r, u) {
      return t == "" ? `${o}${t}${n.multiplicationSign}${n.nbsp}${u}` : `${o}${n.nbsp}${n.multiplicationSign}${n.nbsp}${u}`;
    }
  );
}
function Jn(e) {
  return e.replace(
    new RegExp(
      `([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Kn(e) {
  return e = Gn(e), e = Vn(e), e = Yn(e), e = Jn(e), e;
}
function ea(e) {
  return e = w(e, n.sectionSign), e = m(e, n.sectionSign), e = x(e, n.sectionSign), e = w(e, n.paragraphSign), e = m(e, n.paragraphSign), e = x(e, n.paragraphSign), e;
}
function S(e, a, o) {
  return e.replace(
    new RegExp(
      `(\\(${a}\\))([${n.spaces}]*)(\\d)`,
      "gi"
    ),
    `${o}$2$3`
  );
}
function E(e, a) {
  return e = w(e, a), e = m(e, a), e = x(e, a), e;
}
function na(e) {
  return e = S(e, "c", n.copyright), e = E(e, n.copyright), e = S(e, "p", n.soundRecordingCopyright), e = E(e, n.soundRecordingCopyright), e;
}
function aa(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function f(e, a, o) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${a}\\)|${o})`,
      "gi"
    ),
    `$1${o}`
  );
}
function oa(e) {
  return e = f(e, "r", n.registeredTrademark), e = f(e, "sm", n.serviceMark), e = f(e, "tm", n.trademark), e;
}
function W(e, a, o) {
  let t = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${t})(${a})`, "g"),
    `$1$2${o}`
  );
}
function ta(e) {
  return W(e, "2", "²");
}
function pa(e) {
  return W(e, "3", "³");
}
function ra(e) {
  return e = ta(e), e = pa(e), e;
}
function sa(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function ua(e) {
  return e = sa(e), e;
}
function $a(e, a) {
  const o = `([${n.uppercaseChars}][${n.allChars}]?\\.)([${n.spaces}]?)`, t = `([${n.allChars}]{2,}[^\\.])`, p = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${o}${t}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${o}${o}${t}`,
      replacement: `$1${a.abbreviationSpace}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${o}${o}${o}${t}`,
      replacement: `$1${a.abbreviationSpace}$3${a.abbreviationSpace}$5${n.space}$7`
    }
  ];
  for (const { pattern: r, replacement: u } of p)
    e = e.replace(new RegExp(r, "g"), u);
  return e;
}
function ca(e, a) {
  let o = `([^${n.allChars}${n.enDash}${n.emDash}]|^)`, t = `([${n.allChars}]|\\D)`, p = `([^${n.allChars}${a.leftDoubleQuote}${a.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`, r = [];
  for (let u = 0; u < a.multipleWordAbbreviations.length; u++) {
    let s = a.multipleWordAbbreviations[u].split(" "), $ = "";
    for (let c = 0; c < s.length; c++)
      $ += `(${s[c]})(\\.)([${n.spaces}]?)`;
    r[u] = $;
  }
  for (let u = 0; u < r.length; u++) {
    let s = `${o}${r[u]}${t}`, $ = "$1", c = (r[u].match(/\(/g) || []).length / 3;
    for (let i = 0; i < c - 1; i++)
      $ += `$${i * 3 + 2}.${a.abbreviationSpace}`;
    $ += `$${(c - 1) * 3 + 2}. $${c * 3 + 2}`, e = e.replace(new RegExp(s, "gi"), $);
  }
  for (let u = 0; u < r.length; u++) {
    let s = `${o}${r[u]}${p}`, $ = "$1", c = (r[u].match(/\(/g) || []).length / 3;
    for (let i = 0; i < c - 1; i++)
      $ += `$${i * 3 + 2}.${a.abbreviationSpace}`;
    $ += `$${(c - 1) * 3 + 2}.$${c * 3 + 2}`, e = e.replace(new RegExp(s, "giu"), $);
  }
  return e;
}
function la(e, a) {
  let o = [];
  for (let s = 0; s < a.singleWordAbbreviations.length; s++)
    o[s] = `(${a.singleWordAbbreviations[s]})(\\.)([${n.spaces}]?)`;
  let t = `([^${n.allChars}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, p = `([${n.allChars}\\d]+)([^\\.]|$)`;
  for (let s = 0; s < o.length; s++)
    e = e.replace(
      new RegExp(
        `${t}${o[s]}${p}`,
        "gi"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let r = `([${n.allChars}\\d])([${n.spaces}])`, u = `([^${n.spaces}${n.allChars}\\d]|$)`;
  for (let s = 0; s < o.length; s++)
    e = e.replace(
      new RegExp(
        `${r}${o[s]}${u}`,
        "gi"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function ia(e, a) {
  return e = $a(e, a), e = ca(e, a), e = la(e, a), e;
}
function da(e) {
  return e = e.replace(
    new RegExp(
      `([^${n.allChars}]|^)([${n.uppercaseChars}]{2})([${n.lowercaseChars}]{2,})`,
      "g"
    ),
    function(a, o, t, p) {
      return `${o}${t.substring(0, 1)}${t.substring(1).toLowerCase()}${p}`;
    }
  ), e.replace(
    new RegExp(
      `(\\b)(?!iOS)([${n.lowercaseChars}])([${n.uppercaseChars}]{2,})`,
      "g"
    ),
    function(a, o, t, p) {
      return `${o}${t.toUpperCase()}${p.toLowerCase()}`;
    }
  );
}
function ha(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function fa(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function ba(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + a + "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function ma(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function xa(e) {
  return e = ha(e), e = fa(e), e = ba(e), e = ma(e), e;
}
function wa(e) {
  let a = [];
  return b(e, n.emailPattern, a), b(e, n.urlPattern, a), b(e, n.filenamePattern, a), { processedText: ga(e, a), exceptions: a };
}
function b(e, a, o) {
  const t = new RegExp(a, "gi"), p = e.match(t);
  return p && p.forEach((r) => o.push(r)), o;
}
function ga(e, a) {
  return a.reduce((o, t, p) => {
    const r = `{{typopo__exception-${p}}}`;
    return o.replace(t, r);
  }, e);
}
function Sa(e, a) {
  return a.reduce((o, t, p) => {
    const r = new RegExp(`{{typopo__exception-${p}}}`, "g");
    return o.replace(r, t);
  }, e);
}
/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
function Ea(e, a, o) {
  a = typeof a > "u" ? "en-us" : a;
  let t = new Ee(a);
  o = typeof o > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : o;
  const { processedText: p, exceptions: r } = wa(e);
  return e = p, o.removeLines && (e = ye(e)), e = pn(e, t), e = He(e, t, o), e = Fe(e), e = bn(e, t), e = sn(e), e = Xn(e, t, o), e = vn(e, t, o), e = Kn(e), e = ea(e), e = na(e), e = aa(e), e = oa(e), e = ra(e), e = ua(e), e = da(e), e = ia(e, t), e = xa(e), e = ke(e, t), e = Sa(e, r), e;
}
export {
  Ea as fixTypos
};
