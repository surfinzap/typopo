/*!
 * Typopo v2.6.0 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const S = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях", E = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ", B = "a-z" + S, W = "A-Z" + E, q = "a-z" + S + "A-Z" + E, I = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", z = "’", L = "′", M = "`", T = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}|´{2,}|`{2,}", O = "″", _ = " ", y = " ", R = " ", A = " ", j = _ + y + R + A, C = "\\.\\!\\?", Q = "\\,\\:\\;", Z = Q + C, H = "\\(\\[\\{", U = "\\)\\]\\}", F = "…", X = "-", Y = "–", G = "—", V = "/", J = "°", K = "×", ee = "&", ne = "§", ae = "©", te = "℗", oe = "®", pe = "℠", re = "™", se = "+", $e = "−", ue = "±", ce = "%", le = "‰", ie = "‱", de = "#", he = "\\d", fe = "IVXLCDM", n = {
  lowercaseChars: B,
  uppercaseChars: W,
  allChars: q,
  singleQuoteAdepts: I,
  apostrophe: z,
  singlePrime: L,
  backtick: M,
  doubleQuoteAdepts: T,
  doublePrime: O,
  /* Spaces */
  space: _,
  nbsp: y,
  hairSpace: R,
  narrowNbsp: A,
  spaces: j,
  /* Punctuation*/
  terminalPunctuation: C,
  sentencePausePunctuation: Q,
  sentencePunctuation: Z,
  openingBrackets: H,
  closingBrackets: U,
  ellipsis: F,
  hyphen: X,
  enDash: Y,
  emDash: G,
  slash: V,
  /* Symbols*/
  degree: J,
  multiplicationSign: K,
  ampersand: ee,
  sectionSign: ne,
  copyright: ae,
  soundRecordingCopyright: te,
  registeredTrademark: oe,
  serviceMark: pe,
  trademark: re,
  plus: se,
  minus: $e,
  plusMinus: ue,
  percent: ce,
  permille: le,
  permyriad: ie,
  numberSign: de,
  /* Numbers */
  cardinalNumber: he,
  romanNumerals: fe,
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
}, be = {
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  quotes: {
    leftDoubleQuote: "„",
    rightDoubleQuote: "“",
    leftSingleQuote: "‚",
    rightSingleQuote: "‘"
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations: ["č", "s", "fol", "str", "r", "par", "odst", "např", "sv", "tj", "tzv"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["hl m", "n l", "p n l", "př n l"]
}, me = {
  // spacing
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
    Even though this is not a common date format in the U.S., it serves as a fallback for mixed language content.
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  // punctuation
  quotes: {
    leftDoubleQuote: "“",
    rightDoubleQuote: "”",
    leftSingleQuote: "‘",
    rightSingleQuote: "’"
  },
  numbers: {
    ordinalIndicator: "st|nd|rd|th",
    romanOrdinalIndicator: ""
  },
  // symbols
  // abbreviations
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
}, ge = {
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  quotes: {
    leftDoubleQuote: "«",
    rightDoubleQuote: "»",
    leftSingleQuote: "‹",
    rightSingleQuote: "›"
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
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
}, xe = {
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
  quotes: {
    leftDoubleQuote: "„",
    rightDoubleQuote: "“",
    leftSingleQuote: "‚",
    rightSingleQuote: "‘"
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
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
}, we = {
  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.space
  },
  quotes: {
    leftDoubleQuote: "„",
    rightDoubleQuote: "“",
    leftSingleQuote: "‚",
    rightSingleQuote: "‘"
  },
  numbers: {
    ordinalIndicator: "\\.",
    romanOrdinalIndicator: "\\."
  },
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
}, i = {
  cs: be,
  "en-us": me,
  rue: ge,
  sk: xe,
  "de-de": we
}, g = "en-us";
class Se {
  constructor(a) {
    i[a] || (console.warn(`Locale '${a}' not found, falling back to '${g}'`), a = g), this.ID = a, this.ordinalDate = i[a].ordinalDate, this.leftSingleQuote = i[a].quotes.leftSingleQuote, this.rightSingleQuote = i[a].quotes.rightSingleQuote, this.leftDoubleQuote = i[a].quotes.leftDoubleQuote, this.rightDoubleQuote = i[a].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.ordinalIndicator = i[a].numbers.ordinalIndicator, this.romanOrdinalIndicator = i[a].numbers.romanOrdinalIndicator, this.singleWordAbbreviations = [];
    for (const t in i)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        i[t].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const t in i)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        i[t].multipleWordAbbreviations
      );
  }
}
function Ee(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function f(e, a, t) {
  let r = 0, s = e, $ = "";
  for (; s !== $ && r < 50; )
    $ = s, s = s.replace(a, t), r++;
  return s;
}
function _e(e) {
  return f(
    e,
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,})([${n.nbsp}${n.narrowNbsp}])([${n.lowercaseChars}${n.uppercaseChars}]{2,})`,
      "g"
    ),
    "$1 $3"
  );
}
function D(e, a) {
  return e = f(
    e,
    new RegExp(
      `(^|[${n.space}]|[^${n.allChars}${n.cardinalNumber}${n.apostrophe}${n.plus}${n.minus}${n.hyphen}])([${n.lowercaseChars}])([${n.space}])`,
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
function ye(e) {
  return e.replace(
    new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"),
    ` $2${n.nbsp}`
  );
}
function Re(e) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}${n.cardinalNumber}]|^)(${n.cardinalNumber}{1,2})([${n.spaces}])([${n.allChars}])`,
      "g"
    ),
    `$1$2${n.nbsp}$4`
  );
}
function Ae(e, a) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}${n.cardinalNumber}_%\\-]|^)(${n.cardinalNumber}{1,2})(${a.ordinalIndicator})([${n.spaces}]?)([${n.allChars}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function Ce(e, a) {
  return e.replace(
    new RegExp(
      `(${n.cardinalNumber})(\\.)([${n.spaces}]?)(${n.cardinalNumber})(\\.)([${n.spaces}]?)(${n.cardinalNumber})`,
      "g"
    ),
    `$1$2${a.ordinalDate.firstSpace}$4$5${a.ordinalDate.secondSpace}$7`
  );
}
function Qe(e, a) {
  return a.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b)([${n.romanNumerals}]+)(${a.romanOrdinalIndicator})([${n.spaces}]?)([${n.allChars}${n.cardinalNumber}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  ) : e;
}
function De(e, a) {
  let t = `(\\b[${n.uppercaseChars}][${n.lowercaseChars}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${a.romanOrdinalIndicator})([${n.nbsp}]?)`, o = new RegExp(t, "g");
  return e.replace(o, function(r, s, $, p, c, u) {
    return u == "" && p == "I" ? s + n.space + p + c : u == "" && p != "I" ? s + n.nbsp + p + c : u == n.nbsp && p == "I" ? s + n.space + p + c + u : s + n.nbsp + p + c + n.space;
  });
}
function Pe(e, a) {
  const t = {
    "en-us": "",
    sk: `${n.nbsp}`,
    cs: `${n.nbsp}`,
    rue: `${n.nbsp}`,
    "de-de": `${n.narrowNbsp}`
  };
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "g"
    ),
    `$1${t[a.ID]}$3`
  );
}
function Ne(e, a) {
  let t = n.uppercaseChars;
  a.ID == "en-us" && (t = t.replace(/A-Z/g, "A-HJ-Z"));
  let o = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${a.rightDoubleQuote}${a.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([${t}])(([${n.spaces}])|(\\.$|$))`, r = new RegExp(o, "g");
  return e.replace(r, function(s, $, p, c, u, l) {
    return a.ID == "en-us" ? $ + n.nbsp + c + u : c == "I" && (l == n.nbsp || l == n.hairSpace || l == n.narrowNbsp) ? $ + n.nbsp + c + n.space : $ + n.nbsp + c + u;
  });
}
function ve(e, a) {
  return e.replace(
    new RegExp(`(${a})([^${n.spaces}])`, "g"),
    `$1${n.nbsp}$2`
  );
}
function ke(e, a) {
  return e.replace(
    new RegExp(`(${a})([${n.spaces}])`, "g"),
    `$1${n.nbsp}`
  );
}
function Be(e, a) {
  return e = _e(e), e = D(e, a), e = ye(e), e = Re(e), e = Ae(e, a), e = Ce(e, a), e = Qe(e, a), e = Ne(e, a), e = De(e, a), e = Pe(e, a), e;
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
function qe(e, a) {
  let t = e.split(/\r?\n/), o = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let r = 0; r < t.length; r++)
    t[r] = t[r].replace(o, function(s, $, p) {
      return a.removeWhitespacesBeforeMarkdownList == !1 && p != "" ? $ + p : p;
    });
  return t.join(`
`);
}
function Ie(e) {
  let a = e.split(/\r?\n/), t = new RegExp("(\\s+$)", "g");
  for (let o = 0; o < a.length; o++)
    a[o] = a[o].replace(t, "");
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
function Le(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`,
      "g"
    ),
    "$2"
  );
}
function Me(e, a) {
  return e.replace(
    new RegExp(
      `(${n.cardinalNumber})([${n.spaces}]?)(${a.ordinalIndicator})([${n.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function Te(e) {
  return e.replace(
    new RegExp(
      `([${n.openingBrackets}])([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function Oe(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}])([${n.openingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}${n.closingBrackets}])`,
      "g"
    ),
    function(a, t, o, r, s) {
      return r == "s" | r == "S" | r + s == "es" | r + s == "ES" ? `${t}${o}${r}${s}` : `${t}${n.space}${o}${r}${s}`;
    }
  );
}
function je(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function Ze(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function He(e) {
  return e.replace(
    new RegExp(
      `([${n.closingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function Ue(e, a) {
  return e.replace(
    new RegExp(`([^${n.spaces}${n.openingBrackets}])(${a})`, "g"),
    `$1${n.space}$2`
  );
}
function Fe(e, a, t) {
  return e = We(e), e = qe(e, t), e = Ie(e), e = ze(e), e = Le(e), e = Me(e, a), e = Te(e), e = Oe(e), e = je(e), e = He(e), e = Ze(e), e;
}
function Xe(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function Ye(e) {
  return Xe(e);
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
function Je(e) {
  return e.replace(
    new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"),
    `${n.space}${n.ellipsis}${n.space}`
  );
}
function Ke(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${n.ellipsis}$5`
  );
}
function en(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function nn(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "gm"
    ),
    "$1$3"
  );
}
function an(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${a.terminalQuotes}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([${n.lowercaseChars}])`,
      "g"
    ),
    "$1 $3$5"
  );
}
function tn(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$3 $5"
  );
}
function on(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.ellipsis}])([${n.allChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function pn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${a.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}
function rn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])+([${n.ellipsis}][${a.rightDoubleQuote}${a.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}
function sn(e, a) {
  return e = Ge(e), e = Ke(e), e = en(e), e = nn(e), e = an(e, a), e = tn(e), e = on(e), e = pn(e, a), e = rn(e, a), e = Ve(e), e = Je(e), e;
}
function $n(e) {
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
  return e = $n(e), e;
}
function cn(e) {
  return e.replace(/(---)/g, "—");
}
function ln(e) {
  return e.replace(/(--)/g, "–");
}
function dn(e, a) {
  const t = {
    "en-us": `${n.emDash}`,
    rue: `${n.hairSpace}${n.emDash}${n.hairSpace}`,
    sk: `${n.hairSpace}${n.emDash}${n.hairSpace}`,
    cs: `${n.nbsp}${n.enDash}${n.space}`,
    "de-de": `${n.hairSpace}${n.enDash}${n.hairSpace}`
  };
  return e.replace(
    new RegExp(
      `([${n.allChars}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}][${n.spaces}]*|[${n.spaces}]+[${n.hyphen}][${n.spaces}]+)([${n.allChars}\\d])`,
      "g"
    ),
    `$1${t[a.ID]}$3`
  );
}
function hn(e, a) {
  const t = {
    "en-us": `${n.emDash}`,
    rue: `${n.hairSpace}${n.emDash}`,
    sk: `${n.hairSpace}${n.emDash}`,
    cs: `${n.nbsp}${n.enDash}`,
    "de-de": `${n.hairSpace}${n.enDash}`
  };
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.spaces}]?)(${n.hyphen})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "g"
    ),
    `$1${t[a.ID]}$5`
  );
}
function fn(e) {
  return e = f(
    e,
    new RegExp(
      `(${n.cardinalNumber})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(${n.cardinalNumber})`,
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
function bn(e) {
  return e.replace(
    new RegExp(
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(${n.cardinalNumber})`,
      "g"
    ),
    `$1${n.enDash}$3`
  );
}
function mn(e, a) {
  return e.replace(
    new RegExp(
      `(${n.cardinalNumber})(${a.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(${n.cardinalNumber})(${a.ordinalIndicator})`,
      "gi"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function gn(e, a) {
  return e = cn(e), e = ln(e), e = dn(e, a), e = hn(e, a), e = fn(e), e = bn(e), e = mn(e, a), e;
}
const d = "{{typopo__markdown_tick}}";
function P(e, a) {
  return a.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function N(e, a) {
  return a.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${d}`,
      "g"
    ),
    "`"
  ) : e;
}
function xn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function wn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function Sn(e) {
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
function En(e) {
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
function _n(e) {
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
function Rn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function An(e) {
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
function Cn(e, a) {
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
function Qn(e, a) {
  return e.replace(/{{typopo__double-prime}}/g, n.doublePrime).replace(
    /({{typopo__left-double-quote}}|{{typopo__left-double-quote--standalone}})/g,
    a.leftDoubleQuote
  ).replace(
    /({{typopo__right-double-quote}}|{{typopo__right-double-quote--standalone}})/g,
    a.rightDoubleQuote
  );
}
function Dn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}])([,])(${a.rightDoubleQuote})`,
      "g"
    ),
    "$1$3"
  );
}
function Pn(e, a) {
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
function Nn(e, a) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${n.allChars}])([${a.leftDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e = D(e, a), e;
}
function vn(e, a) {
  return e.replace(
    new RegExp(
      `([${a.rightDoubleQuote}])([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function kn(e, a, t) {
  return e = P(e, t), e = xn(e), e = wn(e), e = Sn(e), e = En(e), e = _n(e), e = yn(e), e = Rn(e), e = An(e), e = Qn(e, a), e = N(e, t), e = Pn(e, a), e = Nn(e, a), e = vn(e, a), e = Cn(e, a), e = Dn(e, a), e;
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
function Wn(e) {
  let a = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${a})`,
      "gi"
    ),
    "{{typopo__apostrophe}}$2"
  );
}
function qn(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    "$1{{typopo__apostrophe}}"
  );
}
function In(e) {
  return e.replace(
    new RegExp(
      `([${n.cardinalNumber}${n.allChars}])(${n.singleQuoteAdepts})+([${n.allChars}])`,
      "g"
    ),
    "$1{{typopo__apostrophe}}$3"
  );
}
function zn(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([${n.cardinalNumber}]{2})`,
      "g"
    ),
    "$1$2{{typopo__apostrophe}}$4"
  );
}
function Ln(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}
function Mn(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([${n.allChars}${n.ellipsis}])`,
      "g"
    ),
    "$1{{typopo__left-single-quote--standalone}}$3"
  );
}
function Tn(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "g"
    ),
    "$1$2{{typopo__right-single-quote--standalone}}$4"
  );
}
function On(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    function(a, t, o, r) {
      return o = Mn(o), o = Tn(o), o = jn(o), t + o + r;
    }
  );
}
function jn(e) {
  return e.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  );
}
function Zn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([${n.allChars}]+)(${n.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__left-single-quote}}$3{{typopo__right-single-quote}}$5"
  );
}
function Hn(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__apostrophe}}"
  );
}
function Un(e) {
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
function Fn(e, a) {
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
function Xn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function Yn(e, a) {
  return e = e.replace(/({{typopo__single-prime}})/g, n.singlePrime), e = e.replace(
    /{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g,
    n.apostrophe
  ), e = e.replace(/{{typopo__left-single-quote}}/g, a.leftSingleQuote), e = e.replace(/{{typopo__right-single-quote}}/g, a.rightSingleQuote), e = e.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), e;
}
function Gn(e, a, t) {
  return e = P(e, t), e = Bn(e), e = Wn(e), e = In(e), e = zn(e), e = qn(e), e = Ln(e), e = Zn(e), e = On(e), e = Un(e), e = Hn(e), e = Yn(e, a), e = N(e, t), e = Fn(e, a), e = Xn(e), e;
}
function Vn(e) {
  return f(
    e,
    new RegExp(
      `([${n.cardinalNumber}]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([${n.cardinalNumber}]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Jn(e) {
  return f(
    e,
    new RegExp(
      `([${n.allChars}]+)([${n.spaces}][x][${n.spaces}])([${n.allChars}]+)`,
      "g"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function Kn(e) {
  return e.replace(
    new RegExp(
      `([${n.cardinalNumber}])([${n.spaces}]?)([x|×])([${n.spaces}])([${n.lowercaseChars}]+)`,
      "gi"
    ),
    function(a, t, o, r, s, $) {
      return o == "" ? `${t}${o}${n.multiplicationSign}${n.nbsp}${$}` : `${t}${n.nbsp}${n.multiplicationSign}${n.nbsp}${$}`;
    }
  );
}
function ea(e) {
  return e.replace(
    new RegExp(
      `([${n.cardinalNumber}]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([${n.cardinalNumber}]+)([${n.singlePrime}${n.doublePrime}])?`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function na(e) {
  return e = Vn(e), e = Jn(e), e = Kn(e), e = ea(e), e;
}
function aa(e) {
  return e.replace(
    new RegExp(
      `([^${n.spaces}${n.sectionSign}${n.openingBrackets}])(${n.sectionSign})`,
      "g"
    ),
    `$1${n.space}$2`
  );
}
function ta(e) {
  return e.replace(
    new RegExp(
      `(${n.sectionSign})([^${n.spaces}${n.sectionSign}])`,
      "g"
    ),
    `$1${n.nbsp}$2`
  );
}
function oa(e) {
  return e.replace(
    new RegExp(
      `(${n.sectionSign})([${n.spaces}])`,
      "g"
    ),
    `$1${n.nbsp}`
  );
}
function pa(e) {
  return e = aa(e), e = ta(e), e = oa(e), e;
}
function x(e, a, t) {
  return e.replace(
    new RegExp(
      `(\\(${a}\\))([${n.spaces}]*)(${n.cardinalNumber})`,
      "gi"
    ),
    `${t}$2$3`
  );
}
function w(e, a) {
  return e = Ue(e, a), e = ve(e, a), e = ke(e, a), e;
}
function ra(e) {
  return e = x(e, "c", n.copyright), e = w(e, n.copyright), e = x(e, "p", n.soundRecordingCopyright), e = w(e, n.soundRecordingCopyright), e;
}
function sa(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function b(e, a, t) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${a}\\)|${t})`,
      "gi"
    ),
    `$1${t}`
  );
}
function $a(e) {
  return e = b(e, "r", n.registeredTrademark), e = b(e, "sm", n.serviceMark), e = b(e, "tm", n.trademark), e;
}
function v(e, a, t) {
  let o = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${o})(${a})`, "g"),
    `$1$2${t}`
  );
}
function ua(e) {
  return v(e, "2", "²");
}
function ca(e) {
  return v(e, "3", "³");
}
function la(e) {
  return e = ua(e), e = ca(e), e;
}
function ia(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(${n.cardinalNumber})`,
      "g"
    ),
    "$1$2$4"
  );
}
function da(e) {
  return e = ia(e), e;
}
function k(e) {
  return {
    "en-us": "",
    rue: n.nbsp,
    sk: n.nbsp,
    cs: n.nbsp,
    "de-de": n.nbsp
  }[e.ID];
}
function ha(e, a) {
  const t = k(a), o = `([${n.uppercaseChars}][${n.allChars}]?\\.)([${n.spaces}]?)`, r = `([${n.allChars}]{2,}[^\\.])`, s = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${o}${r}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${o}${o}${r}`,
      replacement: `$1${t}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${o}${o}${o}${r}`,
      replacement: `$1${t}$3${t}$5${n.space}$7`
    }
  ];
  for (const { pattern: $, replacement: p } of s)
    e = e.replace(new RegExp($, "g"), p);
  return e;
}
function fa(e, a) {
  let t = `([^${n.allChars}${n.enDash}${n.emDash}]|^)`, o = `([${n.allChars}]|\\D)`, r = `([^${n.allChars}${a.leftDoubleQuote}${a.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`;
  const s = k(a);
  let $ = [];
  for (let p = 0; p < a.multipleWordAbbreviations.length; p++) {
    let c = a.multipleWordAbbreviations[p].split(" "), u = "";
    for (let l = 0; l < c.length; l++)
      u += `(${c[l]})(\\.)([${n.spaces}]?)`;
    $[p] = u;
  }
  for (let p = 0; p < $.length; p++) {
    let c = `${t}${$[p]}${o}`, u = "$1", l = ($[p].match(/\(/g) || []).length / 3;
    for (let h = 0; h < l - 1; h++)
      u += `$${h * 3 + 2}.${s}`;
    u += `$${(l - 1) * 3 + 2}. $${l * 3 + 2}`, e = e.replace(new RegExp(c, "gi"), u);
  }
  for (let p = 0; p < $.length; p++) {
    let c = `${t}${$[p]}${r}`, u = "$1", l = ($[p].match(/\(/g) || []).length / 3;
    for (let h = 0; h < l - 1; h++)
      u += `$${h * 3 + 2}.${s}`;
    u += `$${(l - 1) * 3 + 2}.$${l * 3 + 2}`, e = e.replace(new RegExp(c, "giu"), u);
  }
  return e;
}
function ba(e, a) {
  let t = [];
  for (let p = 0; p < a.singleWordAbbreviations.length; p++)
    t[p] = `(${a.singleWordAbbreviations[p]})(\\.)([${n.spaces}]?)`;
  let o = `([^${n.allChars}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, r = `([${n.allChars}\\d]+)([^\\.]|$)`;
  for (let p = 0; p < t.length; p++)
    e = e.replace(
      new RegExp(
        `${o}${t[p]}${r}`,
        "gi"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let s = `([${n.allChars}\\d])([${n.spaces}])`, $ = `([^${n.spaces}${n.allChars}\\d]|$)`;
  for (let p = 0; p < t.length; p++)
    e = e.replace(
      new RegExp(
        `${s}${t[p]}${$}`,
        "gi"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function ma(e, a) {
  return e = ha(e, a), e = fa(e, a), e = ba(e, a), e;
}
function ga(e) {
  return e = e.replace(
    new RegExp(
      `([^${n.allChars}]|^)([${n.uppercaseChars}]{2})([${n.lowercaseChars}]{2,})`,
      "g"
    ),
    function(a, t, o, r) {
      return `${t}${o.substring(0, 1)}${o.substring(1).toLowerCase()}${r}`;
    }
  ), e.replace(
    new RegExp(
      `(\\b)(?!iOS)([${n.lowercaseChars}])([${n.uppercaseChars}]{2,})`,
      "g"
    ),
    function(a, t, o, r) {
      return `${t}${o.toUpperCase()}${r.toLowerCase()}`;
    }
  );
}
function xa(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function wa(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function Sa(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + a + "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function Ea(e) {
  let a = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(\\d+)" + a + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function _a(e) {
  return e = xa(e), e = wa(e), e = Sa(e), e = Ea(e), e;
}
function ya(e) {
  let a = [];
  return m(e, n.emailPattern, a), m(e, n.urlPattern, a), m(e, n.filenamePattern, a), { processedText: Ra(e, a), exceptions: a };
}
function m(e, a, t) {
  const o = new RegExp(a, "gi"), r = e.match(o);
  return r && r.forEach((s) => t.push(s)), t;
}
function Ra(e, a) {
  return a.reduce((t, o, r) => {
    const s = `{{typopo__exception-${r}}}`;
    return t.replace(o, s);
  }, e);
}
function Aa(e, a) {
  return a.reduce((t, o, r) => {
    const s = new RegExp(`{{typopo__exception-${r}}}`, "g");
    return t.replace(s, o);
  }, e);
}
/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
function Ca(e, a, t) {
  a = typeof a > "u" ? "en-us" : a;
  let o = new Se(a);
  t = typeof t > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : t;
  const { processedText: r, exceptions: s } = ya(e);
  return e = r, t.removeLines && (e = Ee(e)), e = sn(e, o), e = Fe(e, o, t), e = Ye(e), e = gn(e, o), e = un(e), e = Gn(e, o, t), e = kn(e, o, t), e = na(e), e = pa(e), e = ra(e), e = sa(e), e = $a(e), e = la(e), e = da(e), e = ga(e), e = ma(e, o), e = _a(e), e = Be(e, o), e = Aa(e, s), e;
}
export {
  Ca as fixTypos
};
