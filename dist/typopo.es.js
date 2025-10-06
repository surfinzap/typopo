/*!
 * Typopo v2.7.1 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const w = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях", S = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ", v = "a-z" + w, k = "A-Z" + S, W = "a-z" + w + "A-Z" + S, N = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", q = "’", z = "′", I = "`", L = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’'‹›′´`]{2,}", M = "″", E = " ", y = " ", A = " ", R = " ", T = E + y + A + R, C = "\\.\\!\\?", _ = "\\,\\:\\;", O = _ + C, j = "\\(\\[\\{", Z = "\\)\\]\\}", U = "…", H = "-", F = "–", X = "—", G = "/", V = "°", Y = "×", J = "&", K = "§", ee = "¶", ne = "©", ae = "℗", pe = "®", re = "℠", oe = "™", se = "+", te = "−", $e = "±", ce = "%", ue = "‰", ie = "‱", le = "#", de = "№", he = "IVXLCDM", n = {
  lowercaseChars: v,
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
  terminalPunctuation: C,
  sentencePausePunctuation: _,
  sentencePunctuation: O,
  openingBrackets: j,
  closingBrackets: Z,
  ellipsis: U,
  hyphen: H,
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
  soundRecordingCopyright: ae,
  registeredTrademark: pe,
  serviceMark: re,
  trademark: oe,
  plus: se,
  minus: te,
  plusMinus: $e,
  percent: ce,
  permille: ue,
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
    paragraphSign: n.nbsp,
    // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation: n.nbsp
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
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
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
    paragraphSign: n.nbsp,
    // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation: ""
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
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
    Even though this is not a common date format in the U.S., it serves as a fallback for mixed language content.
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
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
    paragraphSign: n.narrowNbsp,
    // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation: n.nbsp
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
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
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
    paragraphSign: n.narrowNbsp,
    // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation: n.nbsp
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
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.nbsp
  },
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
    paragraphSign: n.nbsp,
    // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation: n.nbsp
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
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace: n.nbsp,
    secondSpace: n.space
  },
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
  constructor(a) {
    i[a] || (console.warn(`Locale '${a}' not found, falling back to '${g}'`), a = g), this.ID = a, this.leftSingleQuote = i[a].quotes.leftSingleQuote, this.rightSingleQuote = i[a].quotes.rightSingleQuote, this.leftDoubleQuote = i[a].quotes.leftDoubleQuote, this.rightDoubleQuote = i[a].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.dashWords = i[a].dashWords, this.spaceAfter = i[a].spaceAfter, this.spaceBefore = i[a].spaceBefore, this.ordinalIndicator = i[a].numbers.ordinalIndicator, this.romanOrdinalIndicator = i[a].numbers.romanOrdinalIndicator, this.ordinalDate = i[a].ordinalDate, this.singleWordAbbreviations = [];
    for (const p in i)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        i[p].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const p in i)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        i[p].multipleWordAbbreviations
      );
  }
}
function Se(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function f(e, a, p) {
  let o = 0, s = e, t = "";
  for (; s !== t && o < 50; )
    t = s, s = s.replace(a, p), o++;
  return s;
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
function Re(e, a) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${a.ordinalIndicator})([${n.spaces}]?)([${n.allChars}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function Ce(e, a) {
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
      `(\\b[${n.uppercaseChars}][${n.allChars}]?${a.romanOrdinalIndicator}[${n.spaces}]?)?(\\b)([${n.romanNumerals}]+)(${a.romanOrdinalIndicator})([${n.spaces}]?)([${n.allChars}\\d])`,
      "g"
    ),
    function(p, r, o, s, t, $, c) {
      return r ? p : `${o}${s}${t}${n.nbsp}${c}`;
    }
  ) : e;
}
function Qe(e, a) {
  let p = `(\\b[${n.uppercaseChars}][${n.lowercaseChars}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${a.romanOrdinalIndicator})([${n.nbsp}]?)`, r = new RegExp(p, "g");
  return e.replace(r, function(o, s, t, $, c, u) {
    return u == "" && $ == "I" ? s + n.space + $ + c : u == "" && $ != "I" ? s + n.nbsp + $ + c : u == n.nbsp && $ == "I" ? s + n.space + $ + c + u : s + n.nbsp + $ + c + n.space;
  });
}
function De(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "g"
    ),
    `$1${a.spaceBefore.percent}$3`
  );
}
function Pe(e, a) {
  let p = n.uppercaseChars;
  a.ID == "en-us" && (p = p.replace(/A-Z/g, "A-HJ-Z"));
  let r = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${a.rightDoubleQuote}${a.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([${p}])(([${n.spaces}])|(\\.$|$))`, o = new RegExp(r, "g");
  return e.replace(o, function(s, t, $, c, u, l) {
    return a.ID == "en-us" ? t + n.nbsp + c + u : c == "I" && (l == n.nbsp || l == n.hairSpace || l == n.narrowNbsp) ? t + n.nbsp + c + n.space : t + n.nbsp + c + u;
  });
}
function Be(e, a, p) {
  return p = p !== void 0 ? p : n.nbsp, e.replace(
    new RegExp(`(${a})([^${n.spaces}${a}])`, "g"),
    `$1${p}$2`
  );
}
function ve(e, a, p) {
  return p = p !== void 0 ? p : n.nbsp, e.replace(
    new RegExp(`(${a})([${n.spaces}]+)`, "g"),
    `$1${p}`
  );
}
function ke(e, a) {
  return e = Ee(e), e = Q(e, a), e = ye(e), e = Ae(e), e = Re(e, a), e = Ce(e, a), e = _e(e, a), e = Pe(e, a), e = Qe(e, a), e = De(e, a), e;
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
  let p = e.split(/\r?\n/), r = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let o = 0; o < p.length; o++)
    p[o] = p[o].replace(r, function(s, t, $) {
      return a.removeWhitespacesBeforeMarkdownList == !1 && $ != "" ? t + $ : $;
    });
  return p.join(`
`);
}
function qe(e) {
  let a = e.split(/\r?\n/), p = new RegExp("(\\s+$)", "g");
  for (let r = 0; r < a.length; r++)
    a[r] = a[r].replace(p, "");
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
    function(a, p, r, o, s) {
      return o == "s" | o == "S" | o + s == "es" | o + s == "ES" ? `${p}${r}${o}${s}` : `${p}${n.space}${r}${o}${s}`;
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
function Ue(e, a) {
  return e.replace(
    new RegExp(`([^${n.spaces}${n.openingBrackets}${a}])(${a})`, "g"),
    `$1${n.space}$2`
  );
}
function He(e, a, p) {
  return e = We(e), e = Ne(e, p), e = qe(e), e = ze(e), e = Ie(e), e = Le(e, a), e = Me(e), e = Te(e), e = Oe(e), e = Ze(e), e = je(e), e;
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
function nn(e, a) {
  return e.replace(
    new RegExp(
      `([^${a.terminalQuotes}])([${n.sentencePunctuation}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2 $4$6"
  );
}
function an(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$3 $5"
  );
}
function pn(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.ellipsis}])([${n.allChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function rn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${a.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}
function on(e, a) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])+([${n.ellipsis}][${a.rightDoubleQuote}${a.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}
function sn(e, a) {
  return e = Ge(e), e = Je(e), e = Ke(e), e = en(e), e = nn(e, a), e = an(e), e = pn(e), e = rn(e, a), e = on(e, a), e = Ve(e), e = Ye(e), e;
}
function tn(e) {
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
function $n(e) {
  return e = tn(e), e;
}
function cn(e, a) {
  return e.replace(
    new RegExp(
      `([${n.allChars}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*|[${n.spaces}]+[${n.hyphen}]{1,3}[${n.spaces}]+)([${n.allChars}\\d])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}${a.dashWords.spaceAfter}$3`
  );
}
function un(e, a) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.spaces}]?)([${n.hyphen}${n.enDash}${n.emDash}]{1,3})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}$5`
  );
}
function ln(e, a) {
  return e = e.replace(
    new RegExp(
      `([${n.openingBrackets}])[${n.spaces}]*([${n.hyphen}${n.enDash}${n.emDash}]+)[${n.spaces}]*([${n.closingBrackets}])`,
      "g"
    ),
    "$1$2$3"
  ), e = e.replace(
    new RegExp(
      `([${n.allChars}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.openingBrackets}])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}${a.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.allChars}])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}${a.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.allChars}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.closingBrackets}])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}${a.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.openingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.allChars}])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}${a.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]*([${n.openingBrackets}])`,
      "g"
    ),
    `$1${a.dashWords.spaceBefore}${a.dashWords.dash}${a.dashWords.spaceAfter}$2`
  ), e;
}
function dn(e) {
  return e = f(
    e,
    new RegExp(
      `(\\d)([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`,
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
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1${n.enDash}$3`
  );
}
function fn(e, a) {
  return e.replace(
    new RegExp(
      `(\\d)(${a.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)(${a.ordinalIndicator})`,
      "gi"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function bn(e, a) {
  return e = cn(e, a), e = un(e, a), e = ln(e, a), e = dn(e), e = hn(e), e = fn(e, a), e;
}
const d = "{{typopo__markdown_tick}}";
function D(e, a) {
  return a.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function P(e, a) {
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
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePausePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function gn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function xn(e) {
  return e = e.replace(
    new RegExp(
      `([^0-9]|^)(${n.doubleQuoteAdepts})(.+?)(\\d+)(${n.doubleQuoteAdepts})([${n.terminalPunctuation}${n.ellipsis}])`,
      "g"
    ),
    "$1$2$3$4$6$5"
  ), e = e.replace(
    new RegExp(
      `(\\b\\d{1,3})([${n.spaces}]?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2{{typopo__double-prime}}"
  ), e;
}
function wn(e) {
  return e = e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})(\\d+)({{typopo__double-prime}})`,
      "g"
    ),
    "{{typopo__ldq}}$2{{typopo__rdq}}"
  ), e = e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__ldq}}$2{{typopo__rdq}}"
  ), e;
}
function Sn(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "{{typopo__ldq--unpaired}}$2"
  );
}
function En(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1{{typopo__rdq--unpaired}}"
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
function An(e) {
  return e.replace(
    new RegExp(
      "({{typopo__ldq--unpaired}})(.*?)({{typopo__double-prime}})",
      "g"
    ),
    "{{typopo__ldq}}$2{{typopo__rdq}}"
  ).replace(
    new RegExp(
      "({{typopo__double-prime}})(.*?)({{typopo__rdq--unpaired}})",
      "g"
    ),
    "{{typopo__ldq}}$2{{typopo__rdq}}"
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
function Cn(e, a) {
  return e.replace(/{{typopo__double-prime}}/g, n.doublePrime).replace(/({{typopo__ldq}}|{{typopo__ldq--unpaired}})/g, a.leftDoubleQuote).replace(/({{typopo__rdq}}|{{typopo__rdq--unpaired}})/g, a.rightDoubleQuote);
}
function _n(e, a) {
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
function Dn(e, a) {
  return e.replace(
    new RegExp(
      `([${a.rightDoubleQuote}])([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function Pn(e, a, p) {
  return p = p || {}, e = D(e, p), e = mn(e), e = gn(e), e = xn(e), e = wn(e), e = Sn(e), e = En(e), e = yn(e), e = An(e), e = Cn(e, a), e = P(e, p), e = _n(e, a), e = Qn(e, a), e = Dn(e, a), e = Rn(e, a), e;
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
    e = e.replace(
      new RegExp(
        `(${p[0]})([${n.spaces}]?)(${n.singleQuoteAdepts})(n)(${n.singleQuoteAdepts})([${n.spaces}]?)(${p[1]})`,
        "gi"
      ),
      `$1${n.nbsp}{{typopo__apostrophe}}$4{{typopo__apostrophe}}${n.nbsp}$7`
    );
  }), e;
}
function vn(e) {
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
    "$1{{typopo__lsq--unpaired}}$3"
  );
}
function In(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "g"
    ),
    "$1$2{{typopo__rsq--unpaired}}$4"
  );
}
function Ln(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    function(a, p, r, o) {
      return r = zn(r), r = In(r), r = Mn(r), p + r + o;
    }
  );
}
function Mn(e) {
  return e.replace(
    new RegExp(
      "({{typopo__lsq--unpaired}})(.*)({{typopo__rsq--unpaired}})",
      "g"
    ),
    "{{typopo__lsq}}$2{{typopo__rsq}}"
  );
}
function Tn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([${n.allChars}]+)(${n.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__lsq}}$3{{typopo__rsq}}$5"
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
      "({{typopo__lsq--unpaired}})(.*?)({{typopo__single-prime}})",
      "g"
    ),
    "{{typopo__lsq}}$2{{typopo__rsq}}"
  ), e = e.replace(
    new RegExp(
      "({{typopo__single-prime}})(.*?)({{typopo__rsq--unpaired}})",
      "g"
    ),
    "{{typopo__lsq}}$2{{typopo__rsq}}"
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
function Un(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function Hn(e, a) {
  return e = e.replace(/({{typopo__single-prime}})/g, n.singlePrime), e = e.replace(
    /{{typopo__apostrophe}}|{{typopo__lsq--unpaired}}|{{typopo__rsq--unpaired}}/g,
    n.apostrophe
  ), e = e.replace(/{{typopo__lsq}}/g, a.leftSingleQuote), e = e.replace(/{{typopo__rsq}}/g, a.rightSingleQuote), e = e.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), e;
}
function Fn(e, a, p) {
  return p = p || {}, e = D(e, p), e = Bn(e), e = vn(e), e = Wn(e), e = Nn(e), e = kn(e), e = qn(e), e = Tn(e), e = Ln(e), e = jn(e), e = On(e), e = Hn(e, a), e = P(e, p), e = Zn(e, a), e = Un(e), e;
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
    function(a, p, r, o, s, t) {
      return r == "" ? `${p}${r}${n.multiplicationSign}${n.nbsp}${t}` : `${p}${n.nbsp}${n.multiplicationSign}${n.nbsp}${t}`;
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
function h(e, a, p) {
  return e = Ue(e, a), e = Be(e, a, p), e = ve(e, a, p), e;
}
function Kn(e, a) {
  return e = h(e, n.sectionSign, a.spaceAfter.sectionSign), e = h(e, n.paragraphSign, a.spaceAfter.paragraphSign), e;
}
function x(e, a, p) {
  return e.replace(
    new RegExp(
      `(\\(${a}\\))([${n.spaces}]*)(\\d)`,
      "gi"
    ),
    `${p}$2$3`
  );
}
function ea(e, a) {
  return e = x(e, "c", n.copyright), e = h(e, n.copyright, a.spaceAfter.copyright), e = x(e, "p", n.soundRecordingCopyright), e = h(
    e,
    n.soundRecordingCopyright,
    a.spaceAfter.soundRecordingCopyright
  ), e;
}
function na(e, a) {
  return e = h(e, n.numeroSign, a.spaceAfter.numeroSign), e;
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
function b(e, a, p) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${a}\\)|${p})`,
      "gi"
    ),
    `$1${p}`
  );
}
function pa(e) {
  return e = b(e, "r", n.registeredTrademark), e = b(e, "sm", n.serviceMark), e = b(e, "tm", n.trademark), e;
}
function B(e, a, p) {
  let r = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${r})(${a})`, "g"),
    `$1$2${p}`
  );
}
function ra(e) {
  return B(e, "2", "²");
}
function oa(e) {
  return B(e, "3", "³");
}
function sa(e) {
  return e = ra(e), e = oa(e), e;
}
function ta(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function $a(e) {
  return e = ta(e), e;
}
function ca(e, a) {
  const p = `([${n.uppercaseChars}][${n.allChars}]?\\.)([${n.spaces}]?)`, r = `([${n.allChars}]{2,}[^\\.])`, o = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${p}${r}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${p}${p}${r}`,
      replacement: `$1${a.spaceAfter.abbreviation}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${p}${p}${p}${r}`,
      replacement: `$1${a.spaceAfter.abbreviation}$3${a.spaceAfter.abbreviation}$5${n.space}$7`
    }
  ];
  for (const { pattern: s, replacement: t } of o)
    e = e.replace(new RegExp(s, "g"), t);
  return e;
}
function ua(e, a) {
  let p = `([^${n.allChars}${n.enDash}${n.emDash}]|^)`, r = `([${n.allChars}]|\\D)`, o = `([^${n.allChars}${a.leftDoubleQuote}${a.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`, s = [];
  for (let t = 0; t < a.multipleWordAbbreviations.length; t++) {
    let $ = a.multipleWordAbbreviations[t].split(" "), c = "";
    for (let u = 0; u < $.length; u++)
      c += `(${$[u]})(\\.)([${n.spaces}]?)`;
    s[t] = c;
  }
  for (let t = 0; t < s.length; t++) {
    let $ = `${p}${s[t]}${r}`, c = "$1", u = (s[t].match(/\(/g) || []).length / 3;
    for (let l = 0; l < u - 1; l++)
      c += `$${l * 3 + 2}.${a.spaceAfter.abbreviation}`;
    c += `$${(u - 1) * 3 + 2}. $${u * 3 + 2}`, e = e.replace(new RegExp($, "gi"), c);
  }
  for (let t = 0; t < s.length; t++) {
    let $ = `${p}${s[t]}${o}`, c = "$1", u = (s[t].match(/\(/g) || []).length / 3;
    for (let l = 0; l < u - 1; l++)
      c += `$${l * 3 + 2}.${a.spaceAfter.abbreviation}`;
    c += `$${(u - 1) * 3 + 2}.$${u * 3 + 2}`, e = e.replace(new RegExp($, "giu"), c);
  }
  return e;
}
function ia(e, a) {
  let p = [];
  for (let $ = 0; $ < a.singleWordAbbreviations.length; $++)
    p[$] = `(${a.singleWordAbbreviations[$]})(\\.)([${n.spaces}]?)`;
  let r = `([^${n.allChars}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, o = `([${n.allChars}\\d]+)([^\\.]|$)`;
  for (let $ = 0; $ < p.length; $++)
    e = e.replace(
      new RegExp(
        `${r}${p[$]}${o}`,
        "gi"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let s = `([${n.allChars}\\d])([${n.spaces}])`, t = `([^${n.spaces}${n.allChars}\\d]|$)`;
  for (let $ = 0; $ < p.length; $++)
    e = e.replace(
      new RegExp(
        `${s}${p[$]}${t}`,
        "gi"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function la(e, a) {
  return e = ca(e, a), e = ua(e, a), e = ia(e, a), e;
}
function da(e) {
  return e = e.replace(
    new RegExp(
      `([^${n.allChars}]|^)([${n.uppercaseChars}]{2})([${n.lowercaseChars}]{2,})`,
      "g"
    ),
    function(a, p, r, o) {
      return `${p}${r.substring(0, 1)}${r.substring(1).toLowerCase()}${o}`;
    }
  ), e.replace(
    new RegExp(
      `(\\b)(?!iOS)([${n.lowercaseChars}])([${n.uppercaseChars}]{2,})`,
      "g"
    ),
    function(a, p, r, o) {
      return `${p}${r.toUpperCase()}${o.toLowerCase()}`;
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
function ga(e) {
  return e = ha(e), e = fa(e), e = ba(e), e = ma(e), e;
}
function xa(e) {
  let a = [];
  return m(e, n.emailPattern, a), m(e, n.urlPattern, a), m(e, n.filenamePattern, a), { processedText: wa(e, a), exceptions: a };
}
function m(e, a, p) {
  const r = new RegExp(a, "gi"), o = e.match(r);
  return o && o.forEach((s) => p.push(s)), p;
}
function wa(e, a) {
  return a.reduce((p, r, o) => {
    const s = `{{typopo__exception-${o}}}`;
    return p.replace(r, s);
  }, e);
}
function Sa(e, a) {
  return a.reduce((p, r, o) => {
    const s = new RegExp(`{{typopo__exception-${o}}}`, "g");
    return p.replace(s, r);
  }, e);
}
/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
function Ea(e, a, p) {
  a = typeof a > "u" ? "en-us" : a;
  let r = new we(a);
  p = typeof p > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : p;
  const { processedText: o, exceptions: s } = xa(e);
  return e = o, p.removeLines && (e = Se(e)), e = sn(e, r), e = He(e, r, p), e = Xe(e), e = bn(e, r), e = $n(e), e = Fn(e, r, p), e = Pn(e, r, p), e = Jn(e), e = Kn(e, r), e = ea(e, r), e = na(e, r), e = aa(e), e = pa(e), e = sa(e), e = $a(e), e = da(e), e = ga(e), e = la(e, r), e = ke(e, r), e = Sa(e, s), e;
}
export {
  Ea as fixTypos
};
