/*!
 * Typopo v2.6.0 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const w = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях", S = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ", B = "a-z" + w, k = "A-Z" + S, W = "a-z" + w + "A-Z" + S, N = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", q = "’", z = "′", I = "`", L = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}|´{2,}|`{2,}", M = "″", E = " ", y = " ", R = " ", _ = " ", T = E + y + R + _, A = "\\.\\!\\?", C = "\\,\\:\\;", O = C + A, j = "\\(\\[\\{", Z = "\\)\\]\\}", H = "…", U = "-", F = "–", X = "—", G = "/", V = "°", Y = "×", J = "&", K = "§", ee = "©", ne = "℗", ae = "®", te = "℠", oe = "™", pe = "+", re = "−", se = "±", ue = "%", ce = "‰", $e = "‱", le = "#", ie = "IVXLCDM", n = {
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
  hairSpace: R,
  narrowNbsp: _,
  spaces: T,
  /* Punctuation*/
  terminalPunctuation: A,
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
  copyright: ee,
  soundRecordingCopyright: ne,
  registeredTrademark: ae,
  serviceMark: te,
  trademark: oe,
  plus: pe,
  minus: re,
  plusMinus: se,
  percent: ue,
  permille: ce,
  permyriad: $e,
  numberSign: le,
  /* Numbers */
  romanNumerals: ie,
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
}, de = {
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
}, fe = {
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
}, he = {
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
}, be = {
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
  cs: de,
  "en-us": fe,
  rue: he,
  sk: be,
  "de-de": me
}, m = "en-us";
class ge {
  constructor(a) {
    l[a] || (console.warn(`Locale '${a}' not found, falling back to '${m}'`), a = m), this.ID = a, this.leftSingleQuote = l[a].quotes.leftSingleQuote, this.rightSingleQuote = l[a].quotes.rightSingleQuote, this.leftDoubleQuote = l[a].quotes.leftDoubleQuote, this.rightDoubleQuote = l[a].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.dashWords = l[a].dashWords, this.spaceBeforePercent = l[a].spaceBeforePercent, this.ordinalIndicator = l[a].numbers.ordinalIndicator, this.romanOrdinalIndicator = l[a].numbers.romanOrdinalIndicator, this.ordinalDate = l[a].ordinalDate, this.abbreviationSpace = l[a].abbreviationSpace, this.singleWordAbbreviations = [];
    for (const t in l)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        l[t].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const t in l)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        l[t].multipleWordAbbreviations
      );
  }
}
function xe(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function f(e, a, t) {
  let p = 0, r = e, u = "";
  for (; r !== u && p < 50; )
    u = r, r = r.replace(a, t), p++;
  return r;
}
function we(e) {
  return f(
    e,
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,})([${n.nbsp}${n.narrowNbsp}])([${n.lowercaseChars}${n.uppercaseChars}]{2,})`,
      "g"
    ),
    "$1 $3"
  );
}
function Q(e, a) {
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
  ), a.ID == "en-us" && (e = e.replace(
    new RegExp(
      `(^|[${n.spaces}])(I)([${n.spaces}])`,
      "g"
    ),
    `$1$2${n.nbsp}`
  )), e;
}
function Se(e) {
  return e.replace(
    new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"),
    ` $2${n.nbsp}`
  );
}
function Ee(e) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d]|^)(\\d{1,2})([${n.spaces}])([${n.allChars}])`,
      "g"
    ),
    `$1$2${n.nbsp}$4`
  );
}
function ye(e, a) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${a.ordinalIndicator})([${n.spaces}]?)([${n.allChars}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function Re(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)(\\.)([${n.spaces}]?)(\\d)(\\.)([${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1$2${a.ordinalDate.firstSpace}$4$5${a.ordinalDate.secondSpace}$7`
  );
}
function _e(e, a) {
  return a.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b)([${n.romanNumerals}]+)(${a.romanOrdinalIndicator})([${n.spaces}]?)([${n.allChars}\\d])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  ) : e;
}
function Ae(e, a) {
  let t = `(\\b[${n.uppercaseChars}][${n.lowercaseChars}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${a.romanOrdinalIndicator})([${n.nbsp}]?)`, o = new RegExp(t, "g");
  return e.replace(o, function(p, r, u, s, c, $) {
    return $ == "" && s == "I" ? r + n.space + s + c : $ == "" && s != "I" ? r + n.nbsp + s + c : $ == n.nbsp && s == "I" ? r + n.space + s + c + $ : r + n.nbsp + s + c + n.space;
  });
}
function Ce(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "g"
    ),
    `$1${a.spaceBeforePercent}$3`
  );
}
function Qe(e, a) {
  let t = n.uppercaseChars;
  a.ID == "en-us" && (t = t.replace(/A-Z/g, "A-HJ-Z"));
  let o = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${a.rightDoubleQuote}${a.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([${t}])(([${n.spaces}])|(\\.$|$))`, p = new RegExp(o, "g");
  return e.replace(p, function(r, u, s, c, $, i) {
    return a.ID == "en-us" ? u + n.nbsp + c + $ : c == "I" && (i == n.nbsp || i == n.hairSpace || i == n.narrowNbsp) ? u + n.nbsp + c + n.space : u + n.nbsp + c + $;
  });
}
function Pe(e, a) {
  return e.replace(
    new RegExp(`(${a})([^${n.spaces}])`, "g"),
    `$1${n.nbsp}$2`
  );
}
function De(e, a) {
  return e.replace(
    new RegExp(`(${a})([${n.spaces}])`, "g"),
    `$1${n.nbsp}`
  );
}
function ve(e, a) {
  return e = we(e), e = Q(e, a), e = Se(e), e = Ee(e), e = ye(e, a), e = Re(e, a), e = _e(e, a), e = Qe(e, a), e = Ae(e, a), e = Ce(e, a), e;
}
function Be(e) {
  return e.replace(
    new RegExp(
      `(\\S)([${n.spaces}]{2,})(\\S)`,
      "g"
    ),
    "$1 $3"
  );
}
function ke(e, a) {
  let t = e.split(/\r?\n/), o = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let p = 0; p < t.length; p++)
    t[p] = t[p].replace(o, function(r, u, s) {
      return a.removeWhitespacesBeforeMarkdownList == !1 && s != "" ? u + s : s;
    });
  return t.join(`
`);
}
function We(e) {
  let a = e.split(/\r?\n/), t = new RegExp("(\\s+$)", "g");
  for (let o = 0; o < a.length; o++)
    a[o] = a[o].replace(t, "");
  return a.join(`
`);
}
function Ne(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`,
      "g"
    ),
    "$2$3"
  );
}
function qe(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`,
      "g"
    ),
    "$2"
  );
}
function ze(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}]?)(${a.ordinalIndicator})([${n.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function Ie(e) {
  return e.replace(
    new RegExp(
      `([${n.openingBrackets}])([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function Le(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}])([${n.openingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}${n.closingBrackets}])`,
      "g"
    ),
    function(a, t, o, p, r) {
      return p == "s" | p == "S" | p + r == "es" | p + r == "ES" ? `${t}${o}${p}${r}` : `${t}${n.space}${o}${p}${r}`;
    }
  );
}
function Me(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function Te(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function Oe(e) {
  return e.replace(
    new RegExp(
      `([${n.closingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function je(e, a) {
  return e.replace(
    new RegExp(`([^${n.spaces}${n.openingBrackets}])(${a})`, "g"),
    `$1${n.space}$2`
  );
}
function Ze(e, a, t) {
  return e = Be(e), e = ke(e, t), e = We(e), e = Ne(e), e = qe(e), e = ze(e, a), e = Ie(e), e = Le(e), e = Me(e), e = Oe(e), e = Te(e), e;
}
function He(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function Ue(e) {
  return He(e);
}
function Fe(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function Xe(e) {
  return e.replace(
    new RegExp(
      `\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`,
      "g"
    ),
    n.ellipsis
  );
}
function Ge(e) {
  return e.replace(
    new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"),
    `${n.space}${n.ellipsis}${n.space}`
  );
}
function Ve(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${n.ellipsis}$5`
  );
}
function Ye(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function Je(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "gm"
    ),
    "$1$3"
  );
}
function Ke(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${a.terminalQuotes}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([${n.lowercaseChars}])`,
      "g"
    ),
    "$1 $3$5"
  );
}
function en(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$3 $5"
  );
}
function nn(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.ellipsis}])([${n.allChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function an(e, a) {
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
function on(e, a) {
  return e = Fe(e), e = Ve(e), e = Ye(e), e = Je(e), e = Ke(e, a), e = en(e), e = nn(e), e = an(e, a), e = tn(e, a), e = Xe(e), e = Ge(e), e;
}
function pn(e) {
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
function rn(e) {
  return e = pn(e), e;
}
function sn(e) {
  return e.replace(/(---)/g, "—");
}
function un(e) {
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
function $n(e, a) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.spaces}]?)(${n.hyphen})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}$5`
  );
}
function ln(e) {
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
function dn(e) {
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
function hn(e, a) {
  return e = sn(e), e = un(e), e = cn(e, a), e = $n(e, a), e = ln(e), e = dn(e), e = fn(e, a), e;
}
const d = "{{typopo__markdown_tick}}";
function P(e, a) {
  return a.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function D(e, a) {
  return a.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${d}`,
      "g"
    ),
    "`"
  ) : e;
}
function bn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function mn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function gn(e) {
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
function xn(e) {
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
function wn(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "{{typopo__left-double-quote--standalone}}$2"
  );
}
function Sn(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1{{typopo__right-double-quote--standalone}}"
  );
}
function En(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function yn(e) {
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
function _n(e, a) {
  return e.replace(/{{typopo__double-prime}}/g, n.doublePrime).replace(
    /({{typopo__left-double-quote}}|{{typopo__left-double-quote--standalone}})/g,
    a.leftDoubleQuote
  ).replace(
    /({{typopo__right-double-quote}}|{{typopo__right-double-quote--standalone}})/g,
    a.rightDoubleQuote
  );
}
function An(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}])([,])(${a.rightDoubleQuote})`,
      "g"
    ),
    "$1$3"
  );
}
function Cn(e, a) {
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
function Qn(e, a) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${n.allChars}])([${a.leftDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e = Q(e, a), e;
}
function Pn(e, a) {
  return e.replace(
    new RegExp(
      `([${a.rightDoubleQuote}])([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function Dn(e, a, t) {
  return e = P(e, t), e = bn(e), e = mn(e), e = gn(e), e = xn(e), e = wn(e), e = Sn(e), e = En(e), e = yn(e), e = _n(e, a), e = D(e, t), e = Cn(e, a), e = Qn(e, a), e = Pn(e, a), e = Rn(e, a), e = An(e, a), e;
}
function vn(e) {
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
  ].forEach((t) => {
    e = e.replace(
      new RegExp(
        `(${t[0]})([${n.spaces}]?)(${n.singleQuoteAdepts})(n)(${n.singleQuoteAdepts})([${n.spaces}]?)(${t[1]})`,
        "gi"
      ),
      `$1${n.nbsp}{{typopo__apostrophe}}$4{{typopo__apostrophe}}${n.nbsp}$7`
    );
  }), e;
}
function Bn(e) {
  let a = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${a})`,
      "gi"
    ),
    "{{typopo__apostrophe}}$2"
  );
}
function kn(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    "$1{{typopo__apostrophe}}"
  );
}
function Wn(e) {
  return e.replace(
    new RegExp(
      `([\\d${n.allChars}])(${n.singleQuoteAdepts})+([${n.allChars}])`,
      "g"
    ),
    "$1{{typopo__apostrophe}}$3"
  );
}
function Nn(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`,
      "g"
    ),
    "$1$2{{typopo__apostrophe}}$4"
  );
}
function qn(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}
function zn(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([${n.allChars}${n.ellipsis}])`,
      "g"
    ),
    "$1{{typopo__left-single-quote--standalone}}$3"
  );
}
function In(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "g"
    ),
    "$1$2{{typopo__right-single-quote--standalone}}$4"
  );
}
function Ln(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    function(a, t, o, p) {
      return o = zn(o), o = In(o), o = Mn(o), t + o + p;
    }
  );
}
function Mn(e) {
  return e.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  );
}
function Tn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([${n.allChars}]+)(${n.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__left-single-quote}}$3{{typopo__right-single-quote}}$5"
  );
}
function On(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__apostrophe}}"
  );
}
function jn(e) {
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
function Zn(e, a) {
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
function Hn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function Un(e, a) {
  return e = e.replace(/({{typopo__single-prime}})/g, n.singlePrime), e = e.replace(
    /{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g,
    n.apostrophe
  ), e = e.replace(/{{typopo__left-single-quote}}/g, a.leftSingleQuote), e = e.replace(/{{typopo__right-single-quote}}/g, a.rightSingleQuote), e = e.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), e;
}
function Fn(e, a, t) {
  return e = P(e, t), e = vn(e), e = Bn(e), e = Wn(e), e = Nn(e), e = kn(e), e = qn(e), e = Tn(e), e = Ln(e), e = jn(e), e = On(e), e = Un(e, a), e = D(e, t), e = Zn(e, a), e = Hn(e), e;
}
function Xn(e) {
  return f(
    e,
    new RegExp(
      `([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Gn(e) {
  return f(
    e,
    new RegExp(
      `([${n.allChars}]+)([${n.spaces}][x][${n.spaces}])([${n.allChars}]+)`,
      "g"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function Vn(e) {
  return e.replace(
    new RegExp(
      `([\\d])([${n.spaces}]?)([x|×])([${n.spaces}])([${n.lowercaseChars}]+)`,
      "gi"
    ),
    function(a, t, o, p, r, u) {
      return o == "" ? `${t}${o}${n.multiplicationSign}${n.nbsp}${u}` : `${t}${n.nbsp}${n.multiplicationSign}${n.nbsp}${u}`;
    }
  );
}
function Yn(e) {
  return e.replace(
    new RegExp(
      `([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Jn(e) {
  return e = Xn(e), e = Gn(e), e = Vn(e), e = Yn(e), e;
}
function Kn(e) {
  return e.replace(
    new RegExp(
      `([^${n.spaces}${n.sectionSign}${n.openingBrackets}])(${n.sectionSign})`,
      "g"
    ),
    `$1${n.space}$2`
  );
}
function ea(e) {
  return e.replace(
    new RegExp(
      `(${n.sectionSign})([^${n.spaces}${n.sectionSign}])`,
      "g"
    ),
    `$1${n.nbsp}$2`
  );
}
function na(e) {
  return e.replace(
    new RegExp(
      `(${n.sectionSign})([${n.spaces}])`,
      "g"
    ),
    `$1${n.nbsp}`
  );
}
function aa(e) {
  return e = Kn(e), e = ea(e), e = na(e), e;
}
function g(e, a, t) {
  return e.replace(
    new RegExp(
      `(\\(${a}\\))([${n.spaces}]*)(\\d)`,
      "gi"
    ),
    `${t}$2$3`
  );
}
function x(e, a) {
  return e = je(e, a), e = Pe(e, a), e = De(e, a), e;
}
function ta(e) {
  return e = g(e, "c", n.copyright), e = x(e, n.copyright), e = g(e, "p", n.soundRecordingCopyright), e = x(e, n.soundRecordingCopyright), e;
}
function oa(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function h(e, a, t) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${a}\\)|${t})`,
      "gi"
    ),
    `$1${t}`
  );
}
function pa(e) {
  return e = h(e, "r", n.registeredTrademark), e = h(e, "sm", n.serviceMark), e = h(e, "tm", n.trademark), e;
}
function v(e, a, t) {
  let o = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${o})(${a})`, "g"),
    `$1$2${t}`
  );
}
function ra(e) {
  return v(e, "2", "²");
}
function sa(e) {
  return v(e, "3", "³");
}
function ua(e) {
  return e = ra(e), e = sa(e), e;
}
function ca(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function $a(e) {
  return e = ca(e), e;
}
function la(e, a) {
  const t = `([${n.uppercaseChars}][${n.allChars}]?\\.)([${n.spaces}]?)`, o = `([${n.allChars}]{2,}[^\\.])`, p = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${t}${o}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${t}${t}${o}`,
      replacement: `$1${a.abbreviationSpace}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${t}${t}${t}${o}`,
      replacement: `$1${a.abbreviationSpace}$3${a.abbreviationSpace}$5${n.space}$7`
    }
  ];
  for (const { pattern: r, replacement: u } of p)
    e = e.replace(new RegExp(r, "g"), u);
  return e;
}
function ia(e, a) {
  let t = `([^${n.allChars}${n.enDash}${n.emDash}]|^)`, o = `([${n.allChars}]|\\D)`, p = `([^${n.allChars}${a.leftDoubleQuote}${a.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`, r = [];
  for (let u = 0; u < a.multipleWordAbbreviations.length; u++) {
    let s = a.multipleWordAbbreviations[u].split(" "), c = "";
    for (let $ = 0; $ < s.length; $++)
      c += `(${s[$]})(\\.)([${n.spaces}]?)`;
    r[u] = c;
  }
  for (let u = 0; u < r.length; u++) {
    let s = `${t}${r[u]}${o}`, c = "$1", $ = (r[u].match(/\(/g) || []).length / 3;
    for (let i = 0; i < $ - 1; i++)
      c += `$${i * 3 + 2}.${a.abbreviationSpace}`;
    c += `$${($ - 1) * 3 + 2}. $${$ * 3 + 2}`, e = e.replace(new RegExp(s, "gi"), c);
  }
  for (let u = 0; u < r.length; u++) {
    let s = `${t}${r[u]}${p}`, c = "$1", $ = (r[u].match(/\(/g) || []).length / 3;
    for (let i = 0; i < $ - 1; i++)
      c += `$${i * 3 + 2}.${a.abbreviationSpace}`;
    c += `$${($ - 1) * 3 + 2}.$${$ * 3 + 2}`, e = e.replace(new RegExp(s, "giu"), c);
  }
  return e;
}
function da(e, a) {
  let t = [];
  for (let s = 0; s < a.singleWordAbbreviations.length; s++)
    t[s] = `(${a.singleWordAbbreviations[s]})(\\.)([${n.spaces}]?)`;
  let o = `([^${n.allChars}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, p = `([${n.allChars}\\d]+)([^\\.]|$)`;
  for (let s = 0; s < t.length; s++)
    e = e.replace(
      new RegExp(
        `${o}${t[s]}${p}`,
        "gi"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let r = `([${n.allChars}\\d])([${n.spaces}])`, u = `([^${n.spaces}${n.allChars}\\d]|$)`;
  for (let s = 0; s < t.length; s++)
    e = e.replace(
      new RegExp(
        `${r}${t[s]}${u}`,
        "gi"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function fa(e, a) {
  return e = la(e, a), e = ia(e, a), e = da(e, a), e;
}
function ha(e) {
  return e = e.replace(
    new RegExp(
      `([^${n.allChars}]|^)([${n.uppercaseChars}]{2})([${n.lowercaseChars}]{2,})`,
      "g"
    ),
    function(a, t, o, p) {
      return `${t}${o.substring(0, 1)}${o.substring(1).toLowerCase()}${p}`;
    }
  ), e.replace(
    new RegExp(
      `(\\b)(?!iOS)([${n.lowercaseChars}])([${n.uppercaseChars}]{2,})`,
      "g"
    ),
    function(a, t, o, p) {
      return `${t}${o.toUpperCase()}${p.toLowerCase()}`;
    }
  );
}
function ba(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function ma(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function ga(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + a + "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function xa(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function wa(e) {
  return e = ba(e), e = ma(e), e = ga(e), e = xa(e), e;
}
function Sa(e) {
  let a = [];
  return b(e, n.emailPattern, a), b(e, n.urlPattern, a), b(e, n.filenamePattern, a), { processedText: Ea(e, a), exceptions: a };
}
function b(e, a, t) {
  const o = new RegExp(a, "gi"), p = e.match(o);
  return p && p.forEach((r) => t.push(r)), t;
}
function Ea(e, a) {
  return a.reduce((t, o, p) => {
    const r = `{{typopo__exception-${p}}}`;
    return t.replace(o, r);
  }, e);
}
function ya(e, a) {
  return a.reduce((t, o, p) => {
    const r = new RegExp(`{{typopo__exception-${p}}}`, "g");
    return t.replace(r, o);
  }, e);
}
/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
function Ra(e, a, t) {
  a = typeof a > "u" ? "en-us" : a;
  let o = new ge(a);
  t = typeof t > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : t;
  const { processedText: p, exceptions: r } = Sa(e);
  return e = p, t.removeLines && (e = xe(e)), e = on(e, o), e = Ze(e, o, t), e = Ue(e), e = hn(e, o), e = rn(e), e = Fn(e, o, t), e = Dn(e, o, t), e = Jn(e), e = aa(e), e = ta(e), e = oa(e), e = pa(e), e = ua(e), e = $a(e), e = ha(e), e = fa(e, o), e = wa(e), e = ve(e, o), e = ya(e, r), e;
}
export {
  Ra as fixTypos
};
