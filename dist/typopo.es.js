/*!
 * Typopo v2.9.0 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const D = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›";
const P = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’ʼ'‹›′´`]{2,}";
const y = "    ", w = "\\.!?";
const B = ",:;" + w, L = "\\(\\[\\{", v = "\\)\\]\\}", k = "…", W = "-", q = "–", N = "—", I = "/", C = "°", z = "×", U = "&", M = "§", O = "¶", j = "©", T = "℗", _ = "®", Z = "℠", H = "™", F = "+", X = "−", G = "±", V = "%", Y = "‰", K = "‱", J = "#", ee = "№", ne = "IVXLCDM", n = {
  /* Quotes, primes, apostrophes */
  singleQuoteAdepts: D,
  apostrophe: "’",
  singlePrime: "′",
  backtick: "`",
  doubleQuoteAdepts: P,
  doublePrime: "″",
  /* Spaces */
  space: " ",
  nbsp: " ",
  hairSpace: " ",
  narrowNbsp: " ",
  spaces: y,
  /* Punctuation*/
  terminalPunctuation: w,
  sentencePausePunctuation: ",:;",
  sentencePunctuation: B,
  openingBrackets: L,
  closingBrackets: v,
  ellipsis: k,
  hyphen: W,
  enDash: q,
  emDash: N,
  slash: I,
  /* Symbols*/
  degree: C,
  multiplicationSign: z,
  ampersand: U,
  sectionSign: M,
  paragraphSign: O,
  copyright: j,
  soundRecordingCopyright: T,
  registeredTrademark: _,
  serviceMark: Z,
  trademark: H,
  plus: F,
  minus: X,
  plusMinus: G,
  percent: V,
  permille: Y,
  permyriad: K,
  numberSign: J,
  numeroSign: ee,
  /* Numbers */
  romanNumerals: ne,
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
}, pe = {
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
}, te = {
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
}, re = {
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
}, ae = {
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
}, se = {
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
  cs: pe,
  "en-us": te,
  rue: re,
  sk: ae,
  "de-de": se
}, x = "en-us";
class oe {
  constructor(p) {
    i[p] || (console.warn(`Locale '${p}' not found, falling back to '${x}'`), p = x), this.ID = p, this.leftSingleQuote = i[p].quotes.leftSingleQuote, this.rightSingleQuote = i[p].quotes.rightSingleQuote, this.leftDoubleQuote = i[p].quotes.leftDoubleQuote, this.rightDoubleQuote = i[p].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.directSpeechIntro = i[p].directSpeechIntro, this.dashWords = i[p].dashWords, this.spaceAfter = i[p].spaceAfter, this.spaceBefore = i[p].spaceBefore, this.ordinalIndicator = i[p].numbers.ordinalIndicator, this.romanOrdinalIndicator = i[p].numbers.romanOrdinalIndicator, this.ordinalDate = i[p].ordinalDate, this.singleWordAbbreviations = [];
    for (const r in i)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        i[r].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const r in i)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        i[r].multipleWordAbbreviations
      );
    const t = [];
    for (const r in i) {
      const s = i[r].directSpeechIntro;
      s && !t.includes(s) && t.push(s);
    }
    this.directSpeechIntroAdepts = t.join("");
  }
}
function ue(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function b(e, p, t) {
  let s = 0, o = e, $ = "";
  for (; o !== $ && s < 50; )
    $ = o, o = o.replace(p, t), s++;
  return o;
}
function $e(e) {
  return b(
    e,
    new RegExp(
      `([\\p{L}]{2,})([${n.nbsp}${n.narrowNbsp}])([\\p{L}]{2,})`,
      "gu"
    ),
    "$1 $3"
  );
}
function E(e, p) {
  return e = b(
    e,
    new RegExp(
      `(^|[${n.space}]|[^\\p{L}\\d${n.apostrophe}${n.plus}${n.minus}${n.hyphen}])([\\p{Ll}])([${n.space}])`,
      "gu"
    ),
    `$1$2${n.nbsp}`
  ), e = e.replace(
    new RegExp(
      `(^|[${n.sentencePunctuation}${n.ellipsis}${n.copyright}${n.registeredTrademark}${n.soundRecordingCopyright}])([${n.spaces}]?)([\\p{Lu}])([${n.spaces}])`,
      "gu"
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
function ce(e) {
  return e.replace(
    new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"),
    ` $2${n.nbsp}`
  );
}
function ie(e) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d]|^)(\\d{1,2})([${n.spaces}])([\\p{L}])`,
      "gu"
    ),
    `$1$2${n.nbsp}$4`
  );
}
function le(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${p.ordinalIndicator})([${n.spaces}]?)([\\p{L}])`,
      "gu"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function de(e, p) {
  return e.replace(
    new RegExp(
      `(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{4})`,
      "g"
    ),
    `$1$2${p.ordinalDate.firstSpace}$4$5${p.ordinalDate.secondSpace}$7`
  );
}
function fe(e, p) {
  return p.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b[\\p{Lu}][\\p{L}]?${p.romanOrdinalIndicator}[${n.spaces}]?)?(\\b)([${n.romanNumerals}]+)(${p.romanOrdinalIndicator})([${n.spaces}]?)([\\p{L}\\d])`,
      "gu"
    ),
    function(t, r, s, o, $, u, c) {
      return r ? t : `${s}${o}${$}${n.nbsp}${c}`;
    }
  ) : e;
}
function he(e, p) {
  let t = `(\\b[\\p{Lu}][\\p{Ll}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${p.romanOrdinalIndicator})([${n.nbsp}]?)`, r = new RegExp(t, "gu");
  return e.replace(r, function(s, o, $, u, c, l) {
    return l == "" && u == "I" ? o + n.space + u + c : l == "" && u != "I" ? o + n.nbsp + u + c : l == n.nbsp && u == "I" ? o + n.space + u + c + l : o + n.nbsp + u + c + n.space;
  });
}
function be(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "gu"
    ),
    `$1${p.spaceBefore.percent}$3`
  );
}
function me(e, p) {
  let t = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${p.rightDoubleQuote}${p.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([\\p{Lu}])([${n.spaces}]|\\.$|$)`, r = new RegExp(t, "gu");
  return e.replace(r, function(s, o, $, u, c) {
    return p.ID === "en-us" && u === "I" ? s : p.ID === "en-us" ? o + n.nbsp + u + c : u === "I" && c && n.spaces.includes(c) ? o + n.nbsp + u + n.space : o + n.nbsp + u + c;
  });
}
function ge(e, p, t) {
  return t = t !== void 0 ? t : n.nbsp, e.replace(
    new RegExp(`(${p})([^${n.spaces}${p}])`, "g"),
    `$1${t}$2`
  );
}
function xe(e, p, t) {
  return t = t !== void 0 ? t : n.nbsp, e.replace(
    new RegExp(`(${p})([${n.spaces}]+)`, "g"),
    `$1${t}`
  );
}
function Se(e, p) {
  return e = $e(e), e = E(e, p), e = ce(e), e = ie(e), e = le(e, p), e = de(e, p), e = fe(e, p), e = me(e, p), e = he(e, p), e = be(e, p), e;
}
function we(e) {
  return e.replace(
    new RegExp(
      `(\\S)([${n.spaces}]{2,})(\\S)`,
      "g"
    ),
    "$1 $3"
  );
}
function Ee(e, p) {
  let t = e.split(/\r?\n/), r = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let s = 0; s < t.length; s++)
    t[s] = t[s].replace(r, function(o, $, u) {
      return p.removeWhitespacesBeforeMarkdownList == !1 && u != "" ? $ + u : u;
    });
  return t.join(`
`);
}
function Ae(e) {
  let p = e.split(/\r?\n/), t = new RegExp("(\\s+$)", "g");
  for (let r = 0; r < p.length; r++)
    p[r] = p[r].replace(t, "");
  return p.join(`
`);
}
function Re(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`,
      "g"
    ),
    "$2$3"
  );
}
function Qe(e) {
  return e.replace(
    new RegExp(
      `([^${n.openingBrackets}])([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`,
      "g"
    ),
    "$1$3"
  );
}
function De(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}]?)(${p.ordinalIndicator})([${n.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function Pe(e) {
  return e.replace(
    new RegExp(
      `([${n.openingBrackets}])([${n.spaces}])([^${n.closingBrackets}])`,
      "g"
    ),
    "$1$3"
  );
}
function ye(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.openingBrackets}])([\\p{L}${n.ellipsis}])([\\p{L}${n.ellipsis}${n.closingBrackets}])`,
      "gu"
    ),
    function(p, t, r, s, o) {
      return s == "s" | s == "S" | s + o == "es" | s + o == "ES" ? `${t}${r}${s}${o}` : `${t}${n.space}${r}${s}${o}`;
    }
  );
}
function Be(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([\\p{Lu}])`,
      "gu"
    ),
    "$1$2 $3"
  );
}
function Le(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([\\p{L}])`,
      "gu"
    ),
    "$1$2 $3"
  );
}
function ve(e) {
  return e.replace(
    new RegExp(
      `([${n.closingBrackets}])([\\p{L}])`,
      "gu"
    ),
    "$1 $2"
  );
}
function ke(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.spaces}${n.openingBrackets}${p}])(${p})`,
      "g"
    ),
    `$1${n.space}$2`
  );
}
function We(e, p, t) {
  return e = we(e), e = Ee(e, t), e = Ae(e), e = Re(e), e = Qe(e), e = De(e, p), e = Pe(e), e = ye(e), e = Be(e), e = ve(e), e = Le(e), e;
}
function qe(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function Ne(e) {
  return qe(e);
}
function Ie(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function Ce(e) {
  return e.replace(
    new RegExp(
      `\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`,
      "g"
    ),
    n.ellipsis
  );
}
function ze(e) {
  return e.replace(
    new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"),
    `${n.space}${n.ellipsis}${n.space}`
  );
}
function Ue(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${n.ellipsis}$5`
  );
}
function Me(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function Oe(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([\\p{L}])`,
      "gmu"
    ),
    "$1$3"
  );
}
function je(e, p) {
  return e.replace(
    new RegExp(
      `([^${p.terminalQuotes}])([${n.sentencePunctuation}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([\\p{Ll}])`,
      "gu"
    ),
    "$1$2 $4$6"
  );
}
function Te(e) {
  return e.replace(
    new RegExp(
      `([\\p{Ll}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([\\p{Lu}])`,
      "gu"
    ),
    "$1$3 $5"
  );
}
function _e(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.ellipsis}])([\\p{L}])`,
      "gu"
    ),
    "$1$2 $3"
  );
}
function Ze(e, p) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${p.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([\\p{Lu}])`,
      "gu"
    ),
    "$1 $3 $5"
  );
}
function He(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{Ll}])([${n.spaces}])+([${n.ellipsis}][${p.rightDoubleQuote}${p.rightSingleQuote}]?$)`,
      "gmu"
    ),
    "$1$3"
  );
}
function Fe(e, p) {
  return e = Ie(e), e = Ue(e), e = Me(e), e = Oe(e), e = je(e, p), e = Te(e), e = _e(e), e = Ze(e, p), e = He(e, p), e = Ce(e), e = ze(e), e;
}
const a = {
  /* Quotes, primes, apostrophes - U+E100 range */
  apos: "",
  singlePrime: "",
  doublePrime: "",
  lsq: "",
  rsq: "",
  lsqUnpaired: "",
  rsqUnpaired: "",
  ldq: "",
  rdq: "",
  ldqUnpaired: "",
  rdqUnpaired: "",
  /* Punctuation */
  enDash: "",
  mdSyntaxHighlight: ""
};
function Xe(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{L}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*|[${n.spaces}]+[${n.hyphen}]{1,3}[${n.spaces}]+)([\\p{L}\\d])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$3`
  );
}
function Ge(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.spaces}]?)([${n.hyphen}${n.enDash}${n.emDash}]{1,3})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}$5`
  );
}
function Ve(e, p) {
  return e = e.replace(
    new RegExp(
      `([${n.openingBrackets}])[${n.spaces}]*([${n.hyphen}${n.enDash}${n.emDash}]+)[${n.spaces}]*([${n.closingBrackets}])`,
      "gu"
    ),
    "$1$2$3"
  ), e = e.replace(
    new RegExp(
      `([\\p{L}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.openingBrackets}])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([\\p{L}])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([\\p{L}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([${n.closingBrackets}])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.openingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*([\\p{L}])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e = e.replace(
    new RegExp(
      `([${n.closingBrackets}])[${n.spaces}]*[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]*([${n.openingBrackets}])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$2`
  ), e;
}
function Ye(e) {
  return e = b(
    e,
    new RegExp(
      `(\\d)([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`,
      "gu"
    ),
    `$1${a.enDash}$3`
  ), e.replace(
    new RegExp(
      `${a.enDash}`,
      "g"
    ),
    n.enDash
  );
}
function Ke(e) {
  return e.replace(
    new RegExp(
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`,
      "gu"
    ),
    `$1${n.enDash}$3`
  );
}
function Je(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)(${p.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)(${p.ordinalIndicator})`,
      "giu"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function en(e, p) {
  return e = Xe(e, p), e = Ge(e, p), e = Ve(e, p), e = Ye(e), e = Ke(e), e = Je(e, p), e;
}
const d = "{{typopo__markdown_tick}}";
function A(e, p) {
  return p.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function R(e, p) {
  return p.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${d}`,
      "g"
    ),
    "`"
  ) : e;
}
function nn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePausePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function pn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function tn(e) {
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
    `$1$2${a.doublePrime}`
  ), e;
}
function rn(e) {
  return e = e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})(\\d+)(${a.doublePrime})`,
      "g"
    ),
    `${a.ldq}$2${a.rdq}`
  ), e = e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    `${a.ldq}$2${a.rdq}`
  ), e;
}
function an(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9\\p{L}])`,
      "gu"
    ),
    `${a.ldqUnpaired}$2`
  );
}
function sn(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "gu"
    ),
    `$1${a.rdqUnpaired}`
  );
}
function on(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "gu"
    ),
    "$1"
  );
}
function un(e) {
  return e.replace(
    new RegExp(
      `(${a.ldqUnpaired})(.*?)(${a.doublePrime})`,
      "g"
    ),
    `${a.ldq}$2${a.rdq}`
  ).replace(
    new RegExp(
      `(${a.doublePrime})(.*?)(${a.rdqUnpaired})`,
      "g"
    ),
    `${a.ldq}$2${a.rdq}`
  );
}
function $n(e, p) {
  return e.replace(
    new RegExp(
      `(${p.leftDoubleQuote})([^${n.spaces}${p.rightDoubleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.rightDoubleQuote})`,
      "g"
    ),
    (t, r, s, o, $, u) => $.length === 1 && /[.,;:]/.test($) ? r + s + o + u + $ : t
  );
}
function cn(e, p) {
  return e = e.replace(
    new RegExp(
      `(${p.leftDoubleQuote})(.+)([${n.spaces}])(?!${p.leftDoubleQuote})([^${n.romanNumerals}]{2,})(${p.rightDoubleQuote})([${n.sentencePunctuation}${n.ellipsis}])`,
      "g"
    ),
    "$1$2$3$4$6$5"
  ), e = e.replace(
    new RegExp(
      `([:;])(${p.rightDoubleQuote})`,
      "g"
    ),
    "$2$1"
  ), e;
}
function ln(e, p) {
  return [
    { pattern: a.doublePrime, replacement: n.doublePrime },
    { pattern: `[${a.ldq}${a.ldqUnpaired}]`, replacement: p.leftDoubleQuote },
    { pattern: `[${a.rdq}${a.rdqUnpaired}]`, replacement: p.rightDoubleQuote }
  ].reduce(
    (r, { pattern: s, replacement: o }) => r.replace(new RegExp(s, "gu"), o),
    e
  );
}
function dn(e, p) {
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
function fn(e, p) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}\\p{L}])([${p.leftDoubleQuote}])`,
      "gu"
    ),
    "$1 $2"
  ), e = E(e, p), e;
}
function hn(e, p) {
  return e.replace(
    new RegExp(
      `([${p.rightDoubleQuote}])([\\p{L}])`,
      "gu"
    ),
    "$1 $2"
  );
}
function bn(e, p) {
  const t = `${n.hyphen}${n.enDash}${n.emDash}`;
  return e = e.replace(
    new RegExp(
      `([\\p{L}])[${p.directSpeechIntroAdepts}]?[${n.spaces}]*[${t}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "gu"
    ),
    `$1${p.directSpeechIntro} $2`
  ), e = e.replace(
    new RegExp(
      `([\\p{L}])[${p.directSpeechIntroAdepts}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "gu"
    ),
    `$1${p.directSpeechIntro} $2`
  ), e = e.replace(
    new RegExp(
      `([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])[${n.spaces}]*[${t}][${n.spaces}]*([\\p{L}])`,
      "gu"
    ),
    "$1 $2"
  ), e = e.replace(
    new RegExp(
      `^[${n.spaces}]*[${t}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.terminalPunctuation}${n.ellipsis}])[${n.spaces}]+[${t}][${n.spaces}]*([${p.leftDoubleQuote}].+?[${p.rightDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e;
}
function mn(e, p, t) {
  return t = t || {}, e = A(e, t), e = nn(e), e = pn(e), e = tn(e), e = rn(e), e = an(e), e = sn(e), e = on(e), e = un(e), e = ln(e, p), e = R(e, t), e = dn(e, p), e = fn(e, p), e = hn(e, p), e = bn(e, p), e = $n(e, p), e = cn(e, p), e;
}
function gn(e) {
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
      `$1${n.nbsp}${a.apos}$4${a.apos}${n.nbsp}$7`
    );
  }), e;
}
function xn(e) {
  let p = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${p})`,
      "gi"
    ),
    `${a.apos}$2`
  );
}
function Sn(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    `$1${a.apos}`
  );
}
function wn(e) {
  return e.replace(
    new RegExp(
      `([\\d\\p{L}])(${n.singleQuoteAdepts})+([\\p{L}])`,
      "gu"
    ),
    `$1${a.apos}$3`
  );
}
function En(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`,
      "gu"
    ),
    `$1$2${a.apos}$4`
  );
}
function An(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${a.singlePrime}`);
}
function Rn(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([\\p{L}${n.ellipsis}${n.openingBrackets}\\{])`,
      "gu"
    ),
    `$1${a.lsqUnpaired}$3`
  );
}
function Qn(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}${n.closingBrackets}\\}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "gu"
    ),
    `$1$2${a.rsqUnpaired}$4`
  );
}
function Dn(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "gu"
    ),
    function(p, t, r, s) {
      return r = Rn(r), r = Qn(r), r = Pn(r), t + r + s;
    }
  );
}
function Pn(e) {
  return e.replace(
    new RegExp(
      `(${a.lsqUnpaired})(.*)(${a.rsqUnpaired})`,
      "gu"
    ),
    `${a.lsq}$2${a.rsq}`
  );
}
function yn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([\\p{L}]+)(${n.singleQuoteAdepts})(\\B)`,
      "gu"
    ),
    `$1${a.lsq}$3${a.rsq}$5`
  );
}
function Bn(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    `${a.apos}`
  );
}
function Ln(e) {
  return e = e.replace(
    new RegExp(
      `(${a.lsqUnpaired})(.*?)(${a.singlePrime})`,
      "g"
    ),
    `${a.lsq}$2${a.rsq}`
  ), e = e.replace(
    new RegExp(
      `(${a.singlePrime})(.*?)(${a.rsqUnpaired})`,
      "g"
    ),
    `${a.lsq}$2${a.rsq}`
  ), e;
}
function vn(e, p) {
  return e.replace(
    new RegExp(
      `(${p.leftSingleQuote})([^${n.spaces}${p.rightSingleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.rightSingleQuote})`,
      "g"
    ),
    (t, r, s, o, $, u) => $.length === 1 && /[.,;:]/.test($) ? r + s + o + u + $ : t
  );
}
function kn(e, p) {
  return e = e.replace(
    new RegExp(
      `(${p.leftSingleQuote})(.+)([${n.spaces}])(?!${p.leftSingleQuote})([^${n.romanNumerals}]{2,})(${p.rightSingleQuote})([${n.sentencePunctuation}${n.ellipsis}])([^${p.rightDoubleQuote}])`,
      "g"
    ),
    "$1$2$3$4$6$5$7"
  ), e = e.replace(
    new RegExp(
      `([:;])(${p.rightSingleQuote})`,
      "g"
    ),
    "$2$1"
  ), e = e.replace(
    new RegExp(
      `([${n.terminalPunctuation}${n.ellipsis}])(${p.rightSingleQuote})(${p.rightDoubleQuote})`,
      "g"
    ),
    "$2$1$3"
  ), e;
}
function Wn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function qn(e, p) {
  return [
    { pattern: a.singlePrime, replacement: n.singlePrime },
    {
      pattern: `[${a.apos}${a.lsqUnpaired}${a.rsqUnpaired}]`,
      replacement: n.apostrophe
    },
    { pattern: a.lsq, replacement: p.leftSingleQuote },
    { pattern: a.rsq, replacement: p.rightSingleQuote },
    { pattern: a.mdSyntaxHighlight, replacement: "```" }
  ].reduce(
    (r, { pattern: s, replacement: o }) => r.replace(new RegExp(s, "gu"), o),
    e
  );
}
function Nn(e, p, t) {
  return t = t || {}, e = A(e, t), e = gn(e), e = xn(e), e = wn(e), e = En(e), e = Sn(e), e = An(e), e = yn(e), e = Dn(e), e = Ln(e), e = Bn(e), e = qn(e, p), e = R(e, t), e = vn(e, p), e = kn(e, p), e = Wn(e), e;
}
function In(e) {
  return b(
    e,
    new RegExp(
      `([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)`,
      "giu"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Cn(e) {
  return b(
    e,
    new RegExp(
      `([\\p{L}]+)([${n.spaces}][x][${n.spaces}])([\\p{L}]+)`,
      "gu"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function zn(e) {
  return e.replace(
    new RegExp(
      `([\\d])([${n.spaces}]?)([x|×])([${n.spaces}])([\\p{Ll}]+)`,
      "giu"
    ),
    function(p, t, r, s, o, $) {
      return r == "" ? `${t}${r}${n.multiplicationSign}${n.nbsp}${$}` : `${t}${n.nbsp}${n.multiplicationSign}${n.nbsp}${$}`;
    }
  );
}
function Un(e) {
  return e.replace(
    new RegExp(
      `([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`,
      "giu"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Mn(e) {
  return e = In(e), e = Cn(e), e = zn(e), e = Un(e), e;
}
function h(e, p, t) {
  return e = ke(e, p), e = ge(e, p, t), e = xe(e, p, t), e;
}
function On(e, p) {
  return e = h(e, n.sectionSign, p.spaceAfter.sectionSign), e = h(e, n.paragraphSign, p.spaceAfter.paragraphSign), e;
}
function S(e, p, t) {
  return e.replace(
    new RegExp(
      `(\\(${p}\\))([${n.spaces}]*)(\\d)`,
      "gi"
    ),
    `${t}$2$3`
  );
}
function jn(e, p) {
  return e = S(e, "c", n.copyright), e = h(e, n.copyright, p.spaceAfter.copyright), e = S(e, "p", n.soundRecordingCopyright), e = h(
    e,
    n.soundRecordingCopyright,
    p.spaceAfter.soundRecordingCopyright
  ), e;
}
function Tn(e, p) {
  return e = h(e, n.numeroSign, p.spaceAfter.numeroSign), e;
}
function _n(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function m(e, p, t) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${p}\\)|${t})`,
      "gi"
    ),
    `$1${t}`
  );
}
function Zn(e) {
  return e = m(e, "r", n.registeredTrademark), e = m(e, "sm", n.serviceMark), e = m(e, "tm", n.trademark), e;
}
function Q(e, p, t) {
  let r = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${r})(${p})`, "g"),
    `$1$2${t}`
  );
}
function Hn(e) {
  return Q(e, "2", "²");
}
function Fn(e) {
  return Q(e, "3", "³");
}
function Xn(e) {
  return e = Hn(e), e = Fn(e), e;
}
function Gn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function Vn(e) {
  return e = Gn(e), e;
}
function Yn(e, p) {
  const t = `([\\p{Lu}][\\p{L}]?\\.)([${n.spaces}]?)`, r = "([\\p{L}]{2,}[^\\.])", s = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${t}${r}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${t}${t}${r}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${t}${t}${t}${r}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${p.spaceAfter.abbreviation}$5${n.space}$7`
    }
  ];
  for (const { pattern: o, replacement: $ } of s)
    e = e.replace(new RegExp(o, "gu"), $);
  return e;
}
function Kn(e, p) {
  let t = `([^\\p{L}${n.enDash}${n.emDash}]|^)`, r = "([\\p{L}]|\\D)", s = `([^\\p{L}${p.leftDoubleQuote}${p.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`, o = [];
  for (let $ = 0; $ < p.multipleWordAbbreviations.length; $++) {
    let u = p.multipleWordAbbreviations[$].split(" "), c = "";
    for (let l = 0; l < u.length; l++)
      c += `(${u[l]})(\\.)([${n.spaces}]?)`;
    o[$] = c;
  }
  for (let $ = 0; $ < o.length; $++) {
    let u = `${t}${o[$]}${r}`, c = "$1", l = (o[$].match(/\(/g) || []).length / 3;
    for (let f = 0; f < l - 1; f++)
      c += `$${f * 3 + 2}.${p.spaceAfter.abbreviation}`;
    c += `$${(l - 1) * 3 + 2}. $${l * 3 + 2}`, e = e.replace(new RegExp(u, "giu"), c);
  }
  for (let $ = 0; $ < o.length; $++) {
    let u = `${t}${o[$]}${s}`, c = "$1", l = (o[$].match(/\(/g) || []).length / 3;
    for (let f = 0; f < l - 1; f++)
      c += `$${f * 3 + 2}.${p.spaceAfter.abbreviation}`;
    c += `$${(l - 1) * 3 + 2}.$${l * 3 + 2}`, e = e.replace(new RegExp(u, "giu"), c);
  }
  return e;
}
function Jn(e, p) {
  let t = [];
  for (let u = 0; u < p.singleWordAbbreviations.length; u++)
    t[u] = `(${p.singleWordAbbreviations[u]})(\\.)([${n.spaces}]?)`;
  let r = `([^\\p{L}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, s = "([\\p{L}\\d]+)([^\\.]|$)";
  for (let u = 0; u < t.length; u++)
    e = e.replace(
      new RegExp(
        `${r}${t[u]}${s}`,
        "giu"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let o = `([\\p{L}\\d])([${n.spaces}])`, $ = `([^${n.spaces}\\p{L}\\d]|$)`;
  for (let u = 0; u < t.length; u++)
    e = e.replace(
      new RegExp(
        `${o}${t[u]}${$}`,
        "giu"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function ep(e, p) {
  return e = Yn(e, p), e = Kn(e, p), e = Jn(e, p), e;
}
function np(e) {
  return e = e.replace(
    new RegExp(
      "([^\\p{L}]|^)([\\p{Lu}]{2})([\\p{Ll}]{2,})",
      "gu"
    ),
    function(p, t, r, s) {
      return `${t}${r.substring(0, 1)}${r.substring(1).toLowerCase()}${s}`;
    }
  ), e.replace(
    new RegExp(
      "(\\b)(?!iOS)([\\p{Ll}])([\\p{Lu}]{2,})",
      "gu"
    ),
    function(p, t, r, s) {
      return `${t}${r.toUpperCase()}${s.toLowerCase()}`;
    }
  );
}
function pp(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function tp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function rp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function ap(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function sp(e) {
  return e = pp(e), e = tp(e), e = rp(e), e = ap(e), e;
}
function op(e) {
  let p = [];
  return g(e, n.emailPattern, p), g(e, n.urlPattern, p), g(e, n.filenamePattern, p), { processedText: up(e, p), exceptions: p };
}
function g(e, p, t) {
  const r = new RegExp(p, "gi"), s = e.match(r);
  return s && s.forEach((o) => t.push(o)), t;
}
function up(e, p) {
  return p.reduce((t, r, s) => {
    const o = `{{typopo__exception-${s}}}`;
    return t.replace(r, o);
  }, e);
}
function $p(e, p) {
  return p.reduce((t, r, s) => {
    const o = new RegExp(`{{typopo__exception-${s}}}`, "g");
    return t.replace(o, r);
  }, e);
}
function cp(e, p, t) {
  p = typeof p > "u" ? "en-us" : p;
  let r = new oe(p);
  t = typeof t > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : t;
  const { processedText: s, exceptions: o } = op(e);
  return e = s, t.removeLines && (e = ue(e)), e = Fe(e, r), e = We(e, r, t), e = Ne(e), e = en(e, r), e = Nn(e, r, t), e = mn(e, r, t), e = Mn(e), e = On(e, r), e = jn(e, r), e = Tn(e, r), e = _n(e), e = Zn(e), e = Xn(e), e = Vn(e), e = np(e), e = sp(e), e = ep(e, r), e = Se(e, r), e = $p(e, o), e;
}
export {
  cp as fixTypos
};
