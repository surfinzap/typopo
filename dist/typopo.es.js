/*!
 * Typopo v2.8.2 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const x = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях", S = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ", v = "a-z" + x, k = "A-Z" + S, W = "a-z" + x + "A-Z" + S, N = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", q = "’", I = "′", z = "`", L = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’'‹›′´`]{2,}", M = "″", E = " ", y = " ", A = " ", R = " ", T = E + y + A + R, C = "\\.\\!\\?", Q = "\\,\\:\\;", O = Q + C, j = "\\(\\[\\{", Z = "\\)\\]\\}", U = "…", F = "-", H = "–", X = "—", G = "/", V = "°", Y = "×", J = "&", K = "§", ee = "¶", ne = "©", pe = "℗", ae = "®", re = "℠", oe = "™", te = "+", se = "−", $e = "±", ce = "%", ue = "‰", ie = "‱", le = "#", de = "№", he = "IVXLCDM", n = {
  lowercaseChars: v,
  uppercaseChars: k,
  allChars: W,
  singleQuoteAdepts: N,
  apostrophe: q,
  singlePrime: I,
  backtick: z,
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
  sentencePausePunctuation: Q,
  sentencePunctuation: O,
  openingBrackets: j,
  closingBrackets: Z,
  ellipsis: U,
  hyphen: F,
  enDash: H,
  emDash: X,
  slash: G,
  /* Symbols*/
  degree: V,
  multiplicationSign: Y,
  ampersand: J,
  sectionSign: K,
  paragraphSign: ee,
  copyright: ne,
  soundRecordingCopyright: pe,
  registeredTrademark: ae,
  serviceMark: re,
  trademark: oe,
  plus: te,
  minus: se,
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
    …sentence: „Direct speech…“
  */
  directSpeechIntro: ":",
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
    …sentence, “Direct speech…” 
  */
  directSpeechIntro: ",",
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
    …sentence: «Direct speech…»
  */
  directSpeechIntro: ":",
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
    …sentence: „Direct speech…“
  */
  directSpeechIntro: ":",
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
}, we = {
  quotes: {
    leftDoubleQuote: "„",
    rightDoubleQuote: "“",
    leftSingleQuote: "‚",
    rightSingleQuote: "‘"
  },
  /* 
    …sentence: „Direct speech…“
  */
  directSpeechIntro: ":",
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
  "de-de": we
}, g = "en-us";
class xe {
  constructor(p) {
    i[p] || (console.warn(`Locale '${p}' not found, falling back to '${g}'`), p = g), this.ID = p, this.leftSingleQuote = i[p].quotes.leftSingleQuote, this.rightSingleQuote = i[p].quotes.rightSingleQuote, this.leftDoubleQuote = i[p].quotes.leftDoubleQuote, this.rightDoubleQuote = i[p].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.directSpeechIntro = i[p].directSpeechIntro, this.dashWords = i[p].dashWords, this.spaceAfter = i[p].spaceAfter, this.spaceBefore = i[p].spaceBefore, this.ordinalIndicator = i[p].numbers.ordinalIndicator, this.romanOrdinalIndicator = i[p].numbers.romanOrdinalIndicator, this.ordinalDate = i[p].ordinalDate, this.singleWordAbbreviations = [];
    for (const r in i)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        i[r].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const r in i)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        i[r].multipleWordAbbreviations
      );
    const a = [];
    for (const r in i) {
      const o = i[r].directSpeechIntro;
      o && !a.includes(o) && a.push(o);
    }
    this.directSpeechIntroAdepts = a.join("");
  }
}
function Se(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function f(e, p, a) {
  let o = 0, t = e, s = "";
  for (; t !== s && o < 50; )
    s = t, t = t.replace(p, a), o++;
  return t;
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
function _(e, p) {
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
  ), p.ID == "en-us" && (e = e.replace(
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
function Re(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${p.ordinalIndicator})([${n.spaces}]?)([${n.allChars}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function Ce(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)(\\.)([${n.spaces}]?)(\\d)(\\.)([${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1$2${p.ordinalDate.firstSpace}$4$5${p.ordinalDate.secondSpace}$7`
  );
}
function Qe(e, p) {
  return p.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b[${n.uppercaseChars}][${n.allChars}]?${p.romanOrdinalIndicator}[${n.spaces}]?)?(\\b)([${n.romanNumerals}]+)(${p.romanOrdinalIndicator})([${n.spaces}]?)([${n.allChars}\\d])`,
      "g"
    ),
    function(a, r, o, t, s, $, c) {
      return r ? a : `${o}${t}${s}${n.nbsp}${c}`;
    }
  ) : e;
}
function _e(e, p) {
  let a = `(\\b[${n.uppercaseChars}][${n.lowercaseChars}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${p.romanOrdinalIndicator})([${n.nbsp}]?)`, r = new RegExp(a, "g");
  return e.replace(r, function(o, t, s, $, c, u) {
    return u == "" && $ == "I" ? t + n.space + $ + c : u == "" && $ != "I" ? t + n.nbsp + $ + c : u == n.nbsp && $ == "I" ? t + n.space + $ + c + u : t + n.nbsp + $ + c + n.space;
  });
}
function De(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "g"
    ),
    `$1${p.spaceBefore.percent}$3`
  );
}
function Pe(e, p) {
  let a = n.uppercaseChars;
  p.ID == "en-us" && (a = a.replace(/A-Z/g, "A-HJ-Z"));
  let r = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${p.rightDoubleQuote}${p.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([${a}])(([${n.spaces}])|(\\.$|$))`, o = new RegExp(r, "g");
  return e.replace(o, function(t, s, $, c, u, l) {
    return p.ID == "en-us" ? s + n.nbsp + c + u : c == "I" && (l == n.nbsp || l == n.hairSpace || l == n.narrowNbsp) ? s + n.nbsp + c + n.space : s + n.nbsp + c + u;
  });
}
function Be(e, p, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(
    new RegExp(`(${p})([^${n.spaces}${p}])`, "g"),
    `$1${a}$2`
  );
}
function ve(e, p, a) {
  return a = a !== void 0 ? a : n.nbsp, e.replace(
    new RegExp(`(${p})([${n.spaces}]+)`, "g"),
    `$1${a}`
  );
}
function ke(e, p) {
  return e = Ee(e), e = _(e, p), e = ye(e), e = Ae(e), e = Re(e, p), e = Ce(e, p), e = Qe(e, p), e = Pe(e, p), e = _e(e, p), e = De(e, p), e;
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
function Ne(e, p) {
  let a = e.split(/\r?\n/), r = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let o = 0; o < a.length; o++)
    a[o] = a[o].replace(r, function(t, s, $) {
      return p.removeWhitespacesBeforeMarkdownList == !1 && $ != "" ? s + $ : $;
    });
  return a.join(`
`);
}
function qe(e) {
  let p = e.split(/\r?\n/), a = new RegExp("(\\s+$)", "g");
  for (let r = 0; r < p.length; r++)
    p[r] = p[r].replace(a, "");
  return p.join(`
`);
}
function Ie(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`,
      "g"
    ),
    "$2$3"
  );
}
function ze(e) {
  return e.replace(
    new RegExp(
      `([^${n.openingBrackets}])([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`,
      "g"
    ),
    "$1$3"
  );
}
function Le(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}]?)(${p.ordinalIndicator})([${n.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function Me(e) {
  return e.replace(
    new RegExp(
      `([${n.openingBrackets}])([${n.spaces}])([^${n.closingBrackets}])`,
      "g"
    ),
    "$1$3"
  );
}
function Te(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}])([${n.openingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}${n.closingBrackets}])`,
      "g"
    ),
    function(p, a, r, o, t) {
      return o == "s" | o == "S" | o + t == "es" | o + t == "ES" ? `${a}${r}${o}${t}` : `${a}${n.space}${r}${o}${t}`;
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
function Ue(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.spaces}${n.openingBrackets}${p}])(${p})`,
      "g"
    ),
    `$1${n.space}$2`
  );
}
function Fe(e, p, a) {
  return e = We(e), e = Ne(e, a), e = qe(e), e = Ie(e), e = ze(e), e = Le(e, p), e = Me(e), e = Te(e), e = Oe(e), e = Ze(e), e = je(e), e;
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
function Xe(e) {
  return He(e);
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
function nn(e, p) {
  return e.replace(
    new RegExp(
      `([^${p.terminalQuotes}])([${n.sentencePunctuation}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2 $4$6"
  );
}
function pn(e) {
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
function rn(e, p) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${p.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}
function on(e, p) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])+([${n.ellipsis}][${p.rightDoubleQuote}${p.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}
function tn(e, p) {
  return e = Ge(e), e = Je(e), e = Ke(e), e = en(e), e = nn(e, p), e = pn(e), e = an(e), e = rn(e, p), e = on(e, p), e = Ve(e), e = Ye(e), e;
}
function sn(e, p) {
  return e.replace(
    new RegExp(
      `([${n.allChars}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*|[${n.spaces}]+[${n.hyphen}]{1,3}[${n.spaces}]+)([${n.allChars}\\d])`,
      "g"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$3`
  );
}
function $n(e, p) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.spaces}]?)([${n.hyphen}${n.enDash}${n.emDash}]{1,3})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "g"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}$5`
  );
}
function cn(e, p) {
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
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.allChars}])`,
      "g"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.allChars}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.closingBrackets}])`,
      "g"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.openingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.allChars}])`,
      "g"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]*([${n.openingBrackets}])`,
      "g"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e;
}
function un(e) {
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
function ln(e) {
  return e.replace(
    new RegExp(
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`,
      "g"
    ),
    `$1${n.enDash}$3`
  );
}
function dn(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)(${p.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)(${p.ordinalIndicator})`,
      "gi"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function hn(e, p) {
  return e = sn(e, p), e = $n(e, p), e = cn(e, p), e = un(e), e = ln(e), e = dn(e, p), e;
}
const d = "{{typopo__markdown_tick}}";
function D(e, p) {
  return p.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function P(e, p) {
  return p.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${d}`,
      "g"
    ),
    "`"
  ) : e;
}
function fn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePausePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function bn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function mn(e) {
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
function gn(e) {
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
function wn(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "{{typopo__ldq--unpaired}}$2"
  );
}
function xn(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1{{typopo__rdq--unpaired}}"
  );
}
function Sn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function En(e) {
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
function yn(e, p) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${p.leftDoubleQuote})([^${p.rightDoubleQuote}]+?)([^${n.romanNumerals}${n.closingBrackets}])([${n.terminalPunctuation}${n.ellipsis}])(${p.rightDoubleQuote})`,
      // 7
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${p.leftDoubleQuote})(.+?)([^${n.romanNumerals}])(${p.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `(^${p.leftDoubleQuote}[^${p.rightDoubleQuote}]+?[^${n.romanNumerals}])(${p.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "gm"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]${p.leftDoubleQuote}[^${p.rightDoubleQuote}]+?[^${n.romanNumerals}])(${p.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${p.rightDoubleQuote}][${n.spaces}]${p.leftDoubleQuote}[^${p.rightDoubleQuote}]+?[^${n.romanNumerals}])(${p.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e;
}
function An(e, p) {
  return e.replace(/{{typopo__double-prime}}/g, n.doublePrime).replace(/({{typopo__ldq}}|{{typopo__ldq--unpaired}})/g, p.leftDoubleQuote).replace(/({{typopo__rdq}}|{{typopo__rdq--unpaired}})/g, p.rightDoubleQuote);
}
function Rn(e, p) {
  return e = e.replace(
    new RegExp(
      `(${p.leftDoubleQuote})([${n.spaces}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.spaces}])(${p.rightDoubleQuote})`,
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
function Cn(e, p) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${n.allChars}])([${p.leftDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e = _(e, p), e;
}
function Qn(e, p) {
  return e.replace(
    new RegExp(
      `([${p.rightDoubleQuote}])([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function _n(e, p) {
  const a = `${n.hyphen}${n.enDash}${n.emDash}`;
  return e = e.replace(
    new RegExp(
      `([${n.allChars}])[${p.directSpeechIntroAdepts}]?[${n.spaces}]*[${a}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "g"
    ),
    `$1${p.directSpeechIntro} $2`
  ), e = e.replace(
    new RegExp(
      `([${n.allChars}])[${p.directSpeechIntroAdepts}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "g"
    ),
    `$1${p.directSpeechIntro} $2`
  ), e = e.replace(
    new RegExp(
      `([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])[${n.spaces}]*[${a}][${n.spaces}]*([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  ), e = e.replace(
    new RegExp(
      `^[${n.spaces}]*[${a}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.terminalPunctuation}${n.ellipsis}])[${n.spaces}]+[${a}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e;
}
function Dn(e, p, a) {
  return a = a || {}, e = D(e, a), e = fn(e), e = bn(e), e = mn(e), e = gn(e), e = wn(e), e = xn(e), e = Sn(e), e = En(e), e = An(e, p), e = P(e, a), e = Rn(e, p), e = Cn(e, p), e = Qn(e, p), e = _n(e, p), e = yn(e, p), e;
}
function Pn(e) {
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
function Bn(e) {
  let p = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${p})`,
      "gi"
    ),
    "{{typopo__apostrophe}}$2"
  );
}
function vn(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    "$1{{typopo__apostrophe}}"
  );
}
function kn(e) {
  return e.replace(
    new RegExp(
      `([\\d${n.allChars}])(${n.singleQuoteAdepts})+([${n.allChars}])`,
      "g"
    ),
    "$1{{typopo__apostrophe}}$3"
  );
}
function Wn(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`,
      "g"
    ),
    "$1$2{{typopo__apostrophe}}$4"
  );
}
function Nn(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}
function qn(e) {
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
function zn(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    function(p, a, r, o) {
      return r = qn(r), r = In(r), r = Ln(r), a + r + o;
    }
  );
}
function Ln(e) {
  return e.replace(
    new RegExp(
      "({{typopo__lsq--unpaired}})(.*)({{typopo__rsq--unpaired}})",
      "g"
    ),
    "{{typopo__lsq}}$2{{typopo__rsq}}"
  );
}
function Mn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([${n.allChars}]+)(${n.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__lsq}}$3{{typopo__rsq}}$5"
  );
}
function Tn(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__apostrophe}}"
  );
}
function On(e) {
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
function jn(e, p) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${p.leftSingleQuote})([^${p.rightSingleQuote}]+?)([^${n.romanNumerals}])([${n.terminalPunctuation}${n.ellipsis}])(${p.rightSingleQuote})`,
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${p.leftSingleQuote})(.+?)([^${n.romanNumerals}])(${p.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]|^)(${p.leftSingleQuote})([^${p.rightSingleQuote}]+?)([^${n.romanNumerals}])(${p.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$2$3$4$6$5$7"
  ), e;
}
function Zn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function Un(e, p) {
  return e = e.replace(/({{typopo__single-prime}})/g, n.singlePrime), e = e.replace(
    /{{typopo__apostrophe}}|{{typopo__lsq--unpaired}}|{{typopo__rsq--unpaired}}/g,
    n.apostrophe
  ), e = e.replace(/{{typopo__lsq}}/g, p.leftSingleQuote), e = e.replace(/{{typopo__rsq}}/g, p.rightSingleQuote), e = e.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), e;
}
function Fn(e, p, a) {
  return a = a || {}, e = D(e, a), e = Pn(e), e = Bn(e), e = kn(e), e = Wn(e), e = vn(e), e = Nn(e), e = Mn(e), e = zn(e), e = On(e), e = Tn(e), e = Un(e, p), e = P(e, a), e = jn(e, p), e = Zn(e), e;
}
function Hn(e) {
  return f(
    e,
    new RegExp(
      `([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Xn(e) {
  return f(
    e,
    new RegExp(
      `([${n.allChars}]+)([${n.spaces}][x][${n.spaces}])([${n.allChars}]+)`,
      "g"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function Gn(e) {
  return e.replace(
    new RegExp(
      `([\\d])([${n.spaces}]?)([x|×])([${n.spaces}])([${n.lowercaseChars}]+)`,
      "gi"
    ),
    function(p, a, r, o, t, s) {
      return r == "" ? `${a}${r}${n.multiplicationSign}${n.nbsp}${s}` : `${a}${n.nbsp}${n.multiplicationSign}${n.nbsp}${s}`;
    }
  );
}
function Vn(e) {
  return e.replace(
    new RegExp(
      `([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Yn(e) {
  return e = Hn(e), e = Xn(e), e = Gn(e), e = Vn(e), e;
}
function h(e, p, a) {
  return e = Ue(e, p), e = Be(e, p, a), e = ve(e, p, a), e;
}
function Jn(e, p) {
  return e = h(e, n.sectionSign, p.spaceAfter.sectionSign), e = h(e, n.paragraphSign, p.spaceAfter.paragraphSign), e;
}
function w(e, p, a) {
  return e.replace(
    new RegExp(
      `(\\(${p}\\))([${n.spaces}]*)(\\d)`,
      "gi"
    ),
    `${a}$2$3`
  );
}
function Kn(e, p) {
  return e = w(e, "c", n.copyright), e = h(e, n.copyright, p.spaceAfter.copyright), e = w(e, "p", n.soundRecordingCopyright), e = h(
    e,
    n.soundRecordingCopyright,
    p.spaceAfter.soundRecordingCopyright
  ), e;
}
function ep(e, p) {
  return e = h(e, n.numeroSign, p.spaceAfter.numeroSign), e;
}
function np(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function b(e, p, a) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${p}\\)|${a})`,
      "gi"
    ),
    `$1${a}`
  );
}
function pp(e) {
  return e = b(e, "r", n.registeredTrademark), e = b(e, "sm", n.serviceMark), e = b(e, "tm", n.trademark), e;
}
function B(e, p, a) {
  let r = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${r})(${p})`, "g"),
    `$1$2${a}`
  );
}
function ap(e) {
  return B(e, "2", "²");
}
function rp(e) {
  return B(e, "3", "³");
}
function op(e) {
  return e = ap(e), e = rp(e), e;
}
function tp(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function sp(e) {
  return e = tp(e), e;
}
function $p(e, p) {
  const a = `([${n.uppercaseChars}][${n.allChars}]?\\.)([${n.spaces}]?)`, r = `([${n.allChars}]{2,}[^\\.])`, o = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${a}${r}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${a}${a}${r}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${a}${a}${a}${r}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${p.spaceAfter.abbreviation}$5${n.space}$7`
    }
  ];
  for (const { pattern: t, replacement: s } of o)
    e = e.replace(new RegExp(t, "g"), s);
  return e;
}
function cp(e, p) {
  let a = `([^${n.allChars}${n.enDash}${n.emDash}]|^)`, r = `([${n.allChars}]|\\D)`, o = `([^${n.allChars}${p.leftDoubleQuote}${p.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`, t = [];
  for (let s = 0; s < p.multipleWordAbbreviations.length; s++) {
    let $ = p.multipleWordAbbreviations[s].split(" "), c = "";
    for (let u = 0; u < $.length; u++)
      c += `(${$[u]})(\\.)([${n.spaces}]?)`;
    t[s] = c;
  }
  for (let s = 0; s < t.length; s++) {
    let $ = `${a}${t[s]}${r}`, c = "$1", u = (t[s].match(/\(/g) || []).length / 3;
    for (let l = 0; l < u - 1; l++)
      c += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    c += `$${(u - 1) * 3 + 2}. $${u * 3 + 2}`, e = e.replace(new RegExp($, "gi"), c);
  }
  for (let s = 0; s < t.length; s++) {
    let $ = `${a}${t[s]}${o}`, c = "$1", u = (t[s].match(/\(/g) || []).length / 3;
    for (let l = 0; l < u - 1; l++)
      c += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    c += `$${(u - 1) * 3 + 2}.$${u * 3 + 2}`, e = e.replace(new RegExp($, "giu"), c);
  }
  return e;
}
function up(e, p) {
  let a = [];
  for (let $ = 0; $ < p.singleWordAbbreviations.length; $++)
    a[$] = `(${p.singleWordAbbreviations[$]})(\\.)([${n.spaces}]?)`;
  let r = `([^${n.allChars}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, o = `([${n.allChars}\\d]+)([^\\.]|$)`;
  for (let $ = 0; $ < a.length; $++)
    e = e.replace(
      new RegExp(
        `${r}${a[$]}${o}`,
        "gi"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let t = `([${n.allChars}\\d])([${n.spaces}])`, s = `([^${n.spaces}${n.allChars}\\d]|$)`;
  for (let $ = 0; $ < a.length; $++)
    e = e.replace(
      new RegExp(
        `${t}${a[$]}${s}`,
        "gi"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function ip(e, p) {
  return e = $p(e, p), e = cp(e, p), e = up(e, p), e;
}
function lp(e) {
  return e = e.replace(
    new RegExp(
      `([^${n.allChars}]|^)([${n.uppercaseChars}]{2})([${n.lowercaseChars}]{2,})`,
      "g"
    ),
    function(p, a, r, o) {
      return `${a}${r.substring(0, 1)}${r.substring(1).toLowerCase()}${o}`;
    }
  ), e.replace(
    new RegExp(
      `(\\b)(?!iOS)([${n.lowercaseChars}])([${n.uppercaseChars}]{2,})`,
      "g"
    ),
    function(p, a, r, o) {
      return `${a}${r.toUpperCase()}${o.toLowerCase()}`;
    }
  );
}
function dp(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function hp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function fp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function bp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function mp(e) {
  return e = dp(e), e = hp(e), e = fp(e), e = bp(e), e;
}
function gp(e) {
  let p = [];
  return m(e, n.emailPattern, p), m(e, n.urlPattern, p), m(e, n.filenamePattern, p), { processedText: wp(e, p), exceptions: p };
}
function m(e, p, a) {
  const r = new RegExp(p, "gi"), o = e.match(r);
  return o && o.forEach((t) => a.push(t)), a;
}
function wp(e, p) {
  return p.reduce((a, r, o) => {
    const t = `{{typopo__exception-${o}}}`;
    return a.replace(r, t);
  }, e);
}
function xp(e, p) {
  return p.reduce((a, r, o) => {
    const t = new RegExp(`{{typopo__exception-${o}}}`, "g");
    return a.replace(t, r);
  }, e);
}
function Sp(e, p, a) {
  p = typeof p > "u" ? "en-us" : p;
  let r = new xe(p);
  a = typeof a > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : a;
  const { processedText: o, exceptions: t } = gp(e);
  return e = o, a.removeLines && (e = Se(e)), e = tn(e, r), e = Fe(e, r, a), e = Xe(e), e = hn(e, r), e = Fn(e, r, a), e = Dn(e, r, a), e = Yn(e), e = Jn(e, r), e = Kn(e, r), e = ep(e, r), e = np(e), e = pp(e), e = op(e), e = sp(e), e = lp(e), e = mp(e), e = ip(e, r), e = ke(e, r), e = xp(e, t), e;
}
export {
  Sp as fixTypos
};
