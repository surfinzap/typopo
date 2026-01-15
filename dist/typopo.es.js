/*!
 * Typopo v2.9.0 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const k = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›";
const B = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’ʼ'‹›′´`]{2,}";
const L = "    ", S = "\\.!?";
const y = ",:;" + S, v = "\\(\\[\\{", W = "\\)\\]\\}", N = "…", q = "-", I = "–", C = "—", z = "/", U = "°", M = "×", O = "&", T = "§", j = "¶", Z = "©", _ = "℗", X = "®", F = "℠", H = "™", G = "+", V = "−", Y = "±", J = "%", K = "‰", ee = "‱", ne = "#", pe = "№", oe = "IVXLCDM", n = {
  /* Quotes, primes, apostrophes */
  singleQuoteAdepts: k,
  apostrophe: "’",
  singlePrime: "′",
  backtick: "`",
  doubleQuoteAdepts: B,
  doublePrime: "″",
  /* Spaces */
  space: " ",
  nbsp: " ",
  hairSpace: " ",
  narrowNbsp: " ",
  spaces: L,
  /* Punctuation*/
  terminalPunctuation: S,
  sentencePausePunctuation: ",:;",
  sentencePunctuation: y,
  openingBrackets: v,
  closingBrackets: W,
  ellipsis: N,
  hyphen: q,
  enDash: I,
  emDash: C,
  slash: z,
  /* Symbols*/
  degree: U,
  multiplicationSign: M,
  ampersand: O,
  sectionSign: T,
  paragraphSign: j,
  copyright: Z,
  soundRecordingCopyright: _,
  registeredTrademark: X,
  serviceMark: F,
  trademark: H,
  plus: G,
  minus: V,
  plusMinus: Y,
  percent: J,
  permille: K,
  permyriad: ee,
  numberSign: ne,
  numeroSign: pe,
  /* Numbers */
  romanNumerals: oe,
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
}, se = {
  quotes: {
    openingDoubleQuote: "„",
    closingDoubleQuote: "“",
    openingSingleQuote: "‚",
    closingSingleQuote: "‘"
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
  singleWordAbbreviations: ["č", "fol", "např", "odst", "par", "r", "s", "str", "sv", "tj", "tzv"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["hl m", "n l", "p n l", "př n l"]
}, ae = {
  quotes: {
    openingDoubleQuote: "“",
    closingDoubleQuote: "”",
    openingSingleQuote: "‘",
    closingSingleQuote: "’"
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
}, te = {
  quotes: {
    openingDoubleQuote: "«",
    closingDoubleQuote: "»",
    openingSingleQuote: "‹",
    closingSingleQuote: "›"
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
}, re = {
  quotes: {
    openingDoubleQuote: "„",
    closingDoubleQuote: "“",
    openingSingleQuote: "‚",
    closingSingleQuote: "‘"
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
}, ce = {
  quotes: {
    openingDoubleQuote: "„",
    closingDoubleQuote: "“",
    openingSingleQuote: "‚",
    closingSingleQuote: "‘"
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
}, $ = {
  cs: se,
  "en-us": ae,
  rue: te,
  sk: re,
  "de-de": ce
}, g = "en-us";
class ue {
  constructor(p) {
    $[p] || (console.warn(`Locale '${p}' not found, falling back to '${g}'`), p = g), this.ID = p, this.openingSingleQuote = $[p].quotes.openingSingleQuote, this.closingSingleQuote = $[p].quotes.closingSingleQuote, this.openingDoubleQuote = $[p].quotes.openingDoubleQuote, this.closingDoubleQuote = $[p].quotes.closingDoubleQuote, this.terminalQuotes = this.closingSingleQuote + this.closingDoubleQuote, this.directSpeechIntro = $[p].directSpeechIntro, this.dashWords = $[p].dashWords, this.spaceAfter = $[p].spaceAfter, this.spaceBefore = $[p].spaceBefore, this.ordinalIndicator = $[p].numbers.ordinalIndicator, this.romanOrdinalIndicator = $[p].numbers.romanOrdinalIndicator, this.ordinalDate = $[p].ordinalDate, this.singleWordAbbreviations = [];
    for (const s in $)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        $[s].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const s in $)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        $[s].multipleWordAbbreviations
      );
    const o = [];
    for (const s in $) {
      const t = $[s].directSpeechIntro;
      t && !o.includes(t) && o.push(t);
    }
    this.directSpeechIntroAdepts = o.join("");
  }
}
function ie(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function b(e, p, o) {
  let t = 0, r = e, u = "";
  for (; r !== u && t < 50; )
    u = r, r = r.replace(p, o), t++;
  return r;
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
function w(e, p) {
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
function de(e) {
  return e.replace(
    new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"),
    ` $2${n.nbsp}`
  );
}
function le(e) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d]|^)(\\d{1,2})([${n.spaces}])([\\p{L}])`,
      "gu"
    ),
    `$1$2${n.nbsp}$4`
  );
}
function fe(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${p.ordinalIndicator})([${n.spaces}]?)([\\p{L}])`,
      "gu"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function be(e, p) {
  return e.replace(
    new RegExp(
      `(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{1,2})(\\.)([${n.spaces}]?)(\\d{4})`,
      "g"
    ),
    `$1$2${p.ordinalDate.firstSpace}$4$5${p.ordinalDate.secondSpace}$7`
  );
}
function he(e, p) {
  return p.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b[\\p{Lu}][\\p{L}]?${p.romanOrdinalIndicator}[${n.spaces}]?)?(\\b)([${n.romanNumerals}]+)(${p.romanOrdinalIndicator})([${n.spaces}]?)([\\p{L}\\d])`,
      "gu"
    ),
    function(o, s, t, r, u, c, i) {
      return s ? o : `${t}${r}${u}${n.nbsp}${i}`;
    }
  ) : e;
}
function me(e, p) {
  let o = `(\\b[\\p{Lu}][\\p{Ll}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${p.romanOrdinalIndicator})([${n.nbsp}]?)`, s = new RegExp(o, "gu");
  return e.replace(s, function(t, r, u, c, i, d) {
    return d == "" && c == "I" ? r + n.space + c + i : d == "" && c != "I" ? r + n.nbsp + c + i : d == n.nbsp && c == "I" ? r + n.space + c + i + d : r + n.nbsp + c + i + n.space;
  });
}
function ge(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "gu"
    ),
    `$1${p.spaceBefore.percent}$3`
  );
}
function xe(e, p) {
  let o = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${p.closingDoubleQuote}${p.closingSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([\\p{Lu}])([${n.spaces}]|\\.$|$)`, s = new RegExp(o, "gu");
  return e.replace(s, function(t, r, u, c, i) {
    return p.ID === "en-us" && c === "I" ? t : p.ID === "en-us" ? r + n.nbsp + c + i : c === "I" && i && n.spaces.includes(i) ? r + n.nbsp + c + n.space : r + n.nbsp + c + i;
  });
}
function Se(e, p, o) {
  return o = o !== void 0 ? o : n.nbsp, e.replace(
    new RegExp(`(${p})([^${n.spaces}${p}])`, "g"),
    `$1${o}$2`
  );
}
function we(e, p, o) {
  return o = o !== void 0 ? o : n.nbsp, e.replace(
    new RegExp(`(${p})([${n.spaces}]+)`, "g"),
    `$1${o}`
  );
}
function Ee(e, p) {
  return e = $e(e), e = w(e, p), e = de(e), e = le(e), e = fe(e, p), e = be(e, p), e = he(e, p), e = xe(e, p), e = me(e, p), e = ge(e, p), e;
}
function Ae(e) {
  return e.replace(
    new RegExp(
      `(\\S)([${n.spaces}]{2,})(\\S)`,
      "g"
    ),
    "$1 $3"
  );
}
function Re(e, p) {
  let o = e.split(/\r?\n/), s = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let t = 0; t < o.length; t++)
    o[t] = o[t].replace(s, function(r, u, c) {
      return p.removeWhitespacesBeforeMarkdownList == !1 && c != "" ? u + c : c;
    });
  return o.join(`
`);
}
function Qe(e) {
  let p = e.split(/\r?\n/), o = new RegExp("(\\s+$)", "g");
  for (let s = 0; s < p.length; s++)
    p[s] = p[s].replace(o, "");
  return p.join(`
`);
}
function De(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`,
      "g"
    ),
    "$2$3"
  );
}
function Pe(e) {
  return e.replace(
    new RegExp(
      `([^${n.openingBrackets}])([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`,
      "g"
    ),
    "$1$3"
  );
}
function ke(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}]?)(${p.ordinalIndicator})([${n.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function Be(e) {
  return e.replace(
    new RegExp(
      `([${n.openingBrackets}])([${n.spaces}])([^${n.closingBrackets}])`,
      "g"
    ),
    "$1$3"
  );
}
function Le(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.openingBrackets}])([\\p{L}${n.ellipsis}])([\\p{L}${n.ellipsis}${n.closingBrackets}])`,
      "gu"
    ),
    function(p, o, s, t, r) {
      return t == "s" | t == "S" | t + r == "es" | t + r == "ES" ? `${o}${s}${t}${r}` : `${o}${n.space}${s}${t}${r}`;
    }
  );
}
function ye(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([\\p{Lu}])`,
      "gu"
    ),
    "$1$2 $3"
  );
}
function ve(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([\\p{L}])`,
      "gu"
    ),
    "$1$2 $3"
  );
}
function We(e) {
  return e.replace(
    new RegExp(
      `([${n.closingBrackets}])([\\p{L}])`,
      "gu"
    ),
    "$1 $2"
  );
}
function Ne(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.spaces}${n.openingBrackets}${p}])(${p})`,
      "g"
    ),
    `$1${n.space}$2`
  );
}
function qe(e, p, o) {
  return e = Ae(e), e = Re(e, o), e = Qe(e), e = De(e), e = Pe(e), e = ke(e, p), e = Be(e), e = Le(e), e = ye(e), e = We(e), e = ve(e), e;
}
function Ie(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function Ce(e) {
  return Ie(e);
}
function ze(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function Ue(e) {
  return e.replace(
    new RegExp(
      `\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`,
      "g"
    ),
    n.ellipsis
  );
}
function Me(e) {
  return e.replace(
    new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"),
    `${n.space}${n.ellipsis}${n.space}`
  );
}
function Oe(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${n.ellipsis}$5`
  );
}
function Te(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function je(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([\\p{L}])`,
      "gmu"
    ),
    "$1$3"
  );
}
function Ze(e, p) {
  return e.replace(
    new RegExp(
      `([^${p.terminalQuotes}])([${n.sentencePunctuation}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([\\p{Ll}])`,
      "gu"
    ),
    "$1$2 $4$6"
  );
}
function _e(e) {
  return e.replace(
    new RegExp(
      `([\\p{Ll}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([\\p{Lu}])`,
      "gu"
    ),
    "$1$3 $5"
  );
}
function Xe(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.ellipsis}])([\\p{L}])`,
      "gu"
    ),
    "$1$2 $3"
  );
}
function Fe(e, p) {
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
      `([\\p{Ll}])([${n.spaces}])+([${n.ellipsis}][${p.closingDoubleQuote}${p.closingSingleQuote}]?$)`,
      "gmu"
    ),
    "$1$3"
  );
}
function Ge(e, p) {
  return e = ze(e), e = Oe(e), e = Te(e), e = je(e), e = Ze(e, p), e = _e(e), e = Xe(e), e = Fe(e, p), e = He(e, p), e = Ue(e), e = Me(e), e;
}
const a = {
  /* Quotes, primes, apostrophes - U+E100 range */
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
  /* Punctuation */
  enDash: "",
  /* Markdown markers */
  tick: ""
}, E = 57856, A = 63743, Ve = A - E + 1;
function R(e) {
  const p = E + e;
  if (p > A)
    throw new Error(
      `Exception index ${e} exceeds PUA limit (max ${Ve}). Text contains too many exceptions (emails/URLs/filenames). Consider processing the text in smaller chunks.`
    );
  return String.fromCharCode(p);
}
function Ye(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{L}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*|[${n.spaces}]+[${n.hyphen}]{1,3}[${n.spaces}]+)([\\p{L}\\d])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$3`
  );
}
function Je(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.spaces}]?)([${n.hyphen}${n.enDash}${n.emDash}]{1,3})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}$5`
  );
}
function Ke(e, p) {
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
function en(e) {
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
function nn(e) {
  return e.replace(
    new RegExp(
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)`,
      "gu"
    ),
    `$1${n.enDash}$3`
  );
}
function pn(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)(${p.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)(${p.ordinalIndicator})`,
      "giu"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function on(e, p) {
  return e = Ye(e, p), e = Je(e, p), e = Ke(e, p), e = en(e), e = nn(e), e = pn(e, p), e;
}
function Q(e, p) {
  return p.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${a.tick}${a.tick}${a.tick}`).replace(/(``)(.*?)(``)/g, `${a.tick}${a.tick}$2${a.tick}${a.tick}`).replace(/(`)(.*?)(`)/g, `${a.tick}$2${a.tick}`) : e;
}
function D(e, p) {
  return p.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${a.tick}`,
      "g"
    ),
    "`"
  ) : e;
}
function sn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePausePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function an(e) {
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
    `${a.odq}$2${a.cdq}`
  ), e = e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    `${a.odq}$2${a.cdq}`
  ), e;
}
function cn(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9\\p{L}])`,
      "gu"
    ),
    `${a.odqUnpaired}$2`
  );
}
function un(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "gu"
    ),
    `$1${a.cdqUnpaired}`
  );
}
function $n(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "gu"
    ),
    "$1"
  );
}
function dn(e) {
  return e.replace(
    new RegExp(
      `(${a.odqUnpaired})(.*?)(${a.doublePrime})`,
      "g"
    ),
    `${a.odq}$2${a.cdq}`
  ).replace(
    new RegExp(
      `(${a.doublePrime})(.*?)(${a.cdqUnpaired})`,
      "g"
    ),
    `${a.odq}$2${a.cdq}`
  );
}
function ln(e, p) {
  return e.replace(
    new RegExp(
      `(${p.openingDoubleQuote})([^${n.spaces}${p.closingDoubleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingDoubleQuote})`,
      "g"
    ),
    (o, s, t, r, u, c) => u.length === 1 && /[.,;:]/.test(u) ? s + t + r + c + u : o
  );
}
function fn(e, p) {
  return e = e.replace(
    new RegExp(
      `(${p.openingDoubleQuote})(.+)([${n.spaces}])(?!${p.openingDoubleQuote})([^${n.romanNumerals}]{2,})(${p.closingDoubleQuote})([${n.sentencePunctuation}${n.ellipsis}])`,
      "g"
    ),
    "$1$2$3$4$6$5"
  ), e = e.replace(
    new RegExp(
      `([:;])(${p.closingDoubleQuote})`,
      "g"
    ),
    "$2$1"
  ), e;
}
function bn(e, p) {
  return [
    { pattern: a.doublePrime, replacement: n.doublePrime },
    { pattern: `[${a.odq}${a.odqUnpaired}]`, replacement: p.openingDoubleQuote },
    { pattern: `[${a.cdq}${a.cdqUnpaired}]`, replacement: p.closingDoubleQuote }
  ].reduce(
    (s, { pattern: t, replacement: r }) => s.replace(new RegExp(t, "gu"), r),
    e
  );
}
function hn(e, p) {
  return e = e.replace(
    new RegExp(
      `(${p.openingDoubleQuote})([${n.spaces}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.spaces}])(${p.closingDoubleQuote})`,
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
function mn(e, p) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}\\p{L}])([${p.openingDoubleQuote}])`,
      "gu"
    ),
    "$1 $2"
  ), e = w(e, p), e;
}
function gn(e, p) {
  return e.replace(
    new RegExp(
      `([${p.closingDoubleQuote}])([\\p{L}])`,
      "gu"
    ),
    "$1 $2"
  );
}
function xn(e, p) {
  const o = `${n.hyphen}${n.enDash}${n.emDash}`;
  return e = e.replace(
    new RegExp(
      `([\\p{L}])[${p.directSpeechIntroAdepts}]?[${n.spaces}]*[${o}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`,
      "gu"
    ),
    `$1${p.directSpeechIntro} $2`
  ), e = e.replace(
    new RegExp(
      `([\\p{L}])[${p.directSpeechIntroAdepts}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`,
      "gu"
    ),
    `$1${p.directSpeechIntro} $2`
  ), e = e.replace(
    new RegExp(
      `([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])[${n.spaces}]*[${o}][${n.spaces}]*([\\p{L}])`,
      "gu"
    ),
    "$1 $2"
  ), e = e.replace(
    new RegExp(
      `^[${n.spaces}]*[${o}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.terminalPunctuation}${n.ellipsis}])[${n.spaces}]+[${o}][${n.spaces}]*([${p.openingDoubleQuote}].+?[${p.closingDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e;
}
function Sn(e, p, o) {
  return o = o || {}, e = Q(e, o), e = sn(e), e = an(e), e = tn(e), e = rn(e), e = cn(e), e = un(e), e = $n(e), e = dn(e), e = bn(e, p), e = D(e, o), e = hn(e, p), e = mn(e, p), e = gn(e, p), e = xn(e, p), e = ln(e, p), e = fn(e, p), e;
}
function wn(e) {
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
      `$1${n.nbsp}${a.apos}$4${a.apos}${n.nbsp}$7`
    );
  }), e;
}
function En(e) {
  let p = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${p})`,
      "gi"
    ),
    `${a.apos}$2`
  );
}
function An(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    `$1${a.apos}`
  );
}
function Rn(e) {
  return e.replace(
    new RegExp(
      `([\\d\\p{L}])(${n.singleQuoteAdepts})+([\\p{L}])`,
      "gu"
    ),
    `$1${a.apos}$3`
  );
}
function Qn(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`,
      "gu"
    ),
    `$1$2${a.apos}$4`
  );
}
function Dn(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${a.singlePrime}`);
}
function Pn(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([\\p{L}${n.ellipsis}${n.openingBrackets}\\{])`,
      "gu"
    ),
    `$1${a.osqUnpaired}$3`
  );
}
function kn(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}${n.closingBrackets}\\}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "gu"
    ),
    `$1$2${a.csqUnpaired}$4`
  );
}
function Bn(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "gu"
    ),
    function(p, o, s, t) {
      return s = Pn(s), s = kn(s), s = Ln(s), o + s + t;
    }
  );
}
function Ln(e) {
  return e.replace(
    new RegExp(
      `(${a.osqUnpaired})(.*)(${a.csqUnpaired})`,
      "gu"
    ),
    `${a.osq}$2${a.csq}`
  );
}
function yn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([\\p{L}]+)(${n.singleQuoteAdepts})(\\B)`,
      "gu"
    ),
    `$1${a.osq}$3${a.csq}$5`
  );
}
function vn(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    `${a.apos}`
  );
}
function Wn(e) {
  return e = e.replace(
    new RegExp(
      `(${a.osqUnpaired})(.*?)(${a.singlePrime})`,
      "g"
    ),
    `${a.osq}$2${a.csq}`
  ), e = e.replace(
    new RegExp(
      `(${a.singlePrime})(.*?)(${a.csqUnpaired})`,
      "g"
    ),
    `${a.osq}$2${a.csq}`
  ), e;
}
function Nn(e, p) {
  return e.replace(
    new RegExp(
      `(${p.openingSingleQuote})([^${n.spaces}${p.closingSingleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingSingleQuote})`,
      "g"
    ),
    (o, s, t, r, u, c) => u.length === 1 && /[.,;:]/.test(u) ? s + t + r + c + u : o
  );
}
function qn(e, p) {
  return e = e.replace(
    new RegExp(
      `(${p.openingSingleQuote})(.+)([${n.spaces}])(?!${p.openingSingleQuote})([^${n.romanNumerals}]{2,})(${p.closingSingleQuote})([${n.sentencePunctuation}${n.ellipsis}])([^${p.closingDoubleQuote}])`,
      "g"
    ),
    "$1$2$3$4$6$5$7"
  ), e = e.replace(
    new RegExp(
      `([:;])(${p.closingSingleQuote})`,
      "g"
    ),
    "$2$1"
  ), e = e.replace(
    new RegExp(
      `([${n.terminalPunctuation}${n.ellipsis}])(${p.closingSingleQuote})(${p.closingDoubleQuote})`,
      "g"
    ),
    "$2$1$3"
  ), e;
}
function In(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function Cn(e, p) {
  return [
    { pattern: a.singlePrime, replacement: n.singlePrime },
    {
      pattern: `[${a.apos}${a.osqUnpaired}${a.csqUnpaired}]`,
      replacement: n.apostrophe
    },
    { pattern: a.osq, replacement: p.openingSingleQuote },
    { pattern: a.csq, replacement: p.closingSingleQuote }
  ].reduce(
    (s, { pattern: t, replacement: r }) => s.replace(new RegExp(t, "gu"), r),
    e
  );
}
function zn(e, p, o) {
  return o = o || {}, e = Q(e, o), e = wn(e), e = En(e), e = Rn(e), e = Qn(e), e = An(e), e = Dn(e), e = yn(e), e = Bn(e), e = Wn(e), e = vn(e), e = Cn(e, p), e = D(e, o), e = Nn(e, p), e = qn(e, p), e = In(e), e;
}
function Un(e) {
  return b(
    e,
    new RegExp(
      `([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)`,
      "giu"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Mn(e) {
  return b(
    e,
    new RegExp(
      `([\\p{L}]+)([${n.spaces}][x][${n.spaces}])([\\p{L}]+)`,
      "gu"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function On(e) {
  return e.replace(
    new RegExp(
      `([\\d])([${n.spaces}]?)([x|×])([${n.spaces}])([\\p{Ll}]+)`,
      "giu"
    ),
    function(p, o, s, t, r, u) {
      return s == "" ? `${o}${s}${n.multiplicationSign}${n.nbsp}${u}` : `${o}${n.nbsp}${n.multiplicationSign}${n.nbsp}${u}`;
    }
  );
}
function Tn(e) {
  return e.replace(
    new RegExp(
      `([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`,
      "giu"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function jn(e) {
  return e = Un(e), e = Mn(e), e = On(e), e = Tn(e), e;
}
function f(e, p, o) {
  return e = Ne(e, p), e = Se(e, p, o), e = we(e, p, o), e;
}
function Zn(e, p) {
  return e = f(e, n.sectionSign, p.spaceAfter.sectionSign), e = f(e, n.paragraphSign, p.spaceAfter.paragraphSign), e;
}
function x(e, p, o) {
  return e.replace(
    new RegExp(
      `(\\(${p}\\))([${n.spaces}]*)(\\d)`,
      "gi"
    ),
    `${o}$2$3`
  );
}
function _n(e, p) {
  return e = x(e, "c", n.copyright), e = f(e, n.copyright, p.spaceAfter.copyright), e = x(e, "p", n.soundRecordingCopyright), e = f(
    e,
    n.soundRecordingCopyright,
    p.spaceAfter.soundRecordingCopyright
  ), e;
}
function Xn(e, p) {
  return e = f(e, n.numeroSign, p.spaceAfter.numeroSign), e;
}
function Fn(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function h(e, p, o) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${p}\\)|${o})`,
      "gi"
    ),
    `$1${o}`
  );
}
function Hn(e) {
  return e = h(e, "r", n.registeredTrademark), e = h(e, "sm", n.serviceMark), e = h(e, "tm", n.trademark), e;
}
function P(e, p, o) {
  let s = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${s})(${p})`, "g"),
    `$1$2${o}`
  );
}
function Gn(e) {
  return P(e, "2", "²");
}
function Vn(e) {
  return P(e, "3", "³");
}
function Yn(e) {
  return e = Gn(e), e = Vn(e), e;
}
function Jn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function Kn(e) {
  return e = Jn(e), e;
}
function ep(e, p) {
  const o = `([\\p{Lu}][\\p{L}]?\\.)([${n.spaces}]?)`, s = "([\\p{L}]{2,}[^\\.])", t = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${o}${s}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${o}${o}${s}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${o}${o}${o}${s}`,
      replacement: `$1${p.spaceAfter.abbreviation}$3${p.spaceAfter.abbreviation}$5${n.space}$7`
    }
  ];
  for (const { pattern: r, replacement: u } of t)
    e = e.replace(new RegExp(r, "gu"), u);
  return e;
}
function np(e, p) {
  let o = `([^\\p{L}${n.enDash}${n.emDash}]|^)`, s = "([\\p{L}]|\\D)", t = `([^\\p{L}${p.openingDoubleQuote}${p.openingSingleQuote}${n.backtick}\\p{Emoji}]|$)`, r = [];
  for (let u = 0; u < p.multipleWordAbbreviations.length; u++) {
    let c = p.multipleWordAbbreviations[u].split(" "), i = "";
    for (let d = 0; d < c.length; d++)
      i += `(${c[d]})(\\.)([${n.spaces}]?)`;
    r[u] = i;
  }
  for (let u = 0; u < r.length; u++) {
    let c = `${o}${r[u]}${s}`, i = "$1", d = (r[u].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++)
      i += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    i += `$${(d - 1) * 3 + 2}. $${d * 3 + 2}`, e = e.replace(new RegExp(c, "giu"), i);
  }
  for (let u = 0; u < r.length; u++) {
    let c = `${o}${r[u]}${t}`, i = "$1", d = (r[u].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++)
      i += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    i += `$${(d - 1) * 3 + 2}.$${d * 3 + 2}`, e = e.replace(new RegExp(c, "giu"), i);
  }
  return e;
}
function pp(e, p) {
  let o = [];
  for (let c = 0; c < p.singleWordAbbreviations.length; c++)
    o[c] = `(${p.singleWordAbbreviations[c]})(\\.)([${n.spaces}]?)`;
  let s = `([^\\p{L}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, t = "([\\p{L}\\d]+)([^\\.]|$)";
  for (let c = 0; c < o.length; c++)
    e = e.replace(
      new RegExp(
        `${s}${o[c]}${t}`,
        "giu"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let r = `([\\p{L}\\d])([${n.spaces}])`, u = `([^${n.spaces}\\p{L}\\d]|$)`;
  for (let c = 0; c < o.length; c++)
    e = e.replace(
      new RegExp(
        `${r}${o[c]}${u}`,
        "giu"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function op(e, p) {
  return e = ep(e, p), e = np(e, p), e = pp(e, p), e;
}
function sp(e) {
  return e = e.replace(
    new RegExp(
      "([^\\p{L}]|^)([\\p{Lu}]{2})([\\p{Ll}]{2,})",
      "gu"
    ),
    function(p, o, s, t) {
      return `${o}${s.substring(0, 1)}${s.substring(1).toLowerCase()}${t}`;
    }
  ), e.replace(
    new RegExp(
      "(\\b)(?!iOS)([\\p{Ll}])([\\p{Lu}]{2,})",
      "gu"
    ),
    function(p, o, s, t) {
      return `${o}${s.toUpperCase()}${t.toLowerCase()}`;
    }
  );
}
function ap(e) {
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
function cp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function up(e) {
  return e = ap(e), e = tp(e), e = rp(e), e = cp(e), e;
}
function ip(e) {
  let p = [];
  return m(e, n.emailPattern, p), m(e, n.urlPattern, p), m(e, n.filenamePattern, p), { processedText: $p(e, p), exceptions: p };
}
function m(e, p, o) {
  const s = new RegExp(p, "gi"), t = e.match(s);
  return t && t.forEach((r) => o.push(r)), o;
}
function $p(e, p) {
  return p.reduce((o, s, t) => {
    const r = R(t);
    return o.replace(s, r);
  }, e);
}
function dp(e, p) {
  return p.reduce((o, s, t) => {
    const r = R(t), u = new RegExp(r, "g");
    return o.replace(u, s);
  }, e);
}
function lp(e, p, o) {
  p = typeof p > "u" ? "en-us" : p;
  let s = new ue(p);
  o = typeof o > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : o;
  const { processedText: t, exceptions: r } = ip(e);
  return e = t, o.removeLines && (e = ie(e)), e = Ge(e, s), e = qe(e, s, o), e = Ce(e), e = on(e, s), e = zn(e, s, o), e = Sn(e, s, o), e = jn(e), e = Zn(e, s), e = _n(e, s), e = Xn(e, s), e = Fn(e), e = Hn(e), e = Yn(e), e = Kn(e), e = sp(e), e = up(e), e = op(e, s), e = Ee(e, s), e = dp(e, r), e;
}
export {
  lp as fixTypos
};
