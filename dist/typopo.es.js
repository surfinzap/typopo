/*!
 * Typopo v3.0.0 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const D = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›";
const P = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’ʼ'‹›′´`]{2,}";
const y = "    ", S = "\\.!?";
const B = ",:;" + S, L = "\\(\\[\\{", v = "\\)\\]\\}", W = "…", k = "-", N = "–", q = "—", I = "/", C = "°", z = "×", U = "&", O = "§", M = "¶", T = "©", j = "℗", Z = "®", _ = "℠", X = "™", F = "+", H = "−", G = "±", V = "%", Y = "‰", J = "‱", K = "#", ee = "№", ne = "IVXLCDM", n = {
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
  terminalPunctuation: S,
  sentencePausePunctuation: ",:;",
  sentencePunctuation: B,
  openingBrackets: L,
  closingBrackets: v,
  ellipsis: W,
  hyphen: k,
  enDash: N,
  emDash: q,
  slash: I,
  /* Symbols*/
  degree: C,
  multiplicationSign: z,
  ampersand: U,
  sectionSign: O,
  paragraphSign: M,
  copyright: T,
  soundRecordingCopyright: j,
  registeredTrademark: Z,
  serviceMark: _,
  trademark: X,
  plus: F,
  minus: H,
  plusMinus: G,
  percent: V,
  permille: Y,
  permyriad: J,
  numberSign: K,
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
}, oe = {
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
}, se = {
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
}, ae = {
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
}, te = {
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
  cs: pe,
  "en-us": oe,
  rue: se,
  sk: ae,
  "de-de": te
}, g = "en-us";
class re {
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
      const r = $[s].directSpeechIntro;
      r && !o.includes(r) && o.push(r);
    }
    this.directSpeechIntroAdepts = o.join("");
  }
}
function ce(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function b(e, p, o) {
  let r = 0, t = e, c = "";
  for (; t !== c && r < 50; )
    c = t, t = t.replace(p, o), r++;
  return t;
}
function ue(e) {
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
function ie(e) {
  return e.replace(
    new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"),
    ` $2${n.nbsp}`
  );
}
function $e(e) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d]|^)(\\d{1,2})([${n.spaces}])([\\p{L}])`,
      "gu"
    ),
    `$1$2${n.nbsp}$4`
  );
}
function de(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}\\d_%\\-]|^)(\\d{1,2})(${p.ordinalIndicator})([${n.spaces}]?)([\\p{L}])`,
      "gu"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function le(e, p) {
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
    function(o, s, r, t, c, u, i) {
      return s ? o : `${r}${t}${c}${n.nbsp}${i}`;
    }
  ) : e;
}
function be(e, p) {
  let o = `(\\b[\\p{Lu}][\\p{Ll}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${p.romanOrdinalIndicator})([${n.nbsp}]?)`, s = new RegExp(o, "gu");
  return e.replace(s, function(r, t, c, u, i, d) {
    return d == "" && u == "I" ? t + n.space + u + i : d == "" && u != "I" ? t + n.nbsp + u + i : d == n.nbsp && u == "I" ? t + n.space + u + i + d : t + n.nbsp + u + i + n.space;
  });
}
function me(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)([${n.spaces}])([${n.percent}${n.permille}${n.permyriad}])`,
      "gu"
    ),
    `$1${p.spaceBefore.percent}$3`
  );
}
function he(e, p) {
  let o = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${p.closingDoubleQuote}${p.closingSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([\\p{Lu}])([${n.spaces}]|\\.$|$)`, s = new RegExp(o, "gu");
  return e.replace(s, function(r, t, c, u, i) {
    return p.ID === "en-us" && u === "I" ? r : p.ID === "en-us" ? t + n.nbsp + u + i : u === "I" && i && n.spaces.includes(i) ? t + n.nbsp + u + n.space : t + n.nbsp + u + i;
  });
}
function ge(e, p, o) {
  return o = o !== void 0 ? o : n.nbsp, e.replace(
    new RegExp(`(${p})([^${n.spaces}${p}])`, "g"),
    `$1${o}$2`
  );
}
function xe(e, p, o) {
  return o = o !== void 0 ? o : n.nbsp, e.replace(
    new RegExp(`(${p})([${n.spaces}]+)`, "g"),
    `$1${o}`
  );
}
function Se(e, p) {
  return e = ue(e), e = E(e, p), e = ie(e), e = $e(e), e = de(e, p), e = le(e, p), e = fe(e, p), e = he(e, p), e = be(e, p), e = me(e, p), e;
}
function Ee(e) {
  return e.replace(
    new RegExp(
      `(\\S)([${n.spaces}]{2,})(\\S)`,
      "g"
    ),
    "$1 $3"
  );
}
function we(e) {
  return e.split(/\r?\n/).map((p) => p.replace(/^\s+/, "")).join(`
`);
}
function Ae(e) {
  return e.split(/\r?\n/).map((p) => p.replace(/\s+$/, "")).join(`
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
    function(p, o, s, r, t) {
      return r == "s" | r == "S" | r + t == "es" | r + t == "ES" ? `${o}${s}${r}${t}` : `${o}${n.space}${s}${r}${t}`;
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
function We(e, p) {
  return e.replace(
    new RegExp(
      `([^${n.spaces}${n.openingBrackets}${p}])(${p})`,
      "g"
    ),
    `$1${n.space}$2`
  );
}
function ke(e, p) {
  return e = Ee(e), e = we(e), e = Ae(e), e = Re(e), e = Qe(e), e = De(e, p), e = Pe(e), e = ye(e), e = Be(e), e = ve(e), e = Le(e), e;
}
function Ne(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function qe(e) {
  return Ne(e);
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
function Oe(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function Me(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([\\p{L}])`,
      "gmu"
    ),
    "$1$3"
  );
}
function Te(e, p) {
  return e.replace(
    new RegExp(
      `([^${p.terminalQuotes}])([${n.sentencePunctuation}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([\\p{Ll}])`,
      "gu"
    ),
    "$1$2 $4$6"
  );
}
function je(e) {
  return e.replace(
    new RegExp(
      `([\\p{Ll}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([\\p{Lu}])`,
      "gu"
    ),
    "$1$3 $5"
  );
}
function Ze(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.ellipsis}])([\\p{L}])`,
      "gu"
    ),
    "$1$2 $3"
  );
}
function _e(e, p) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${p.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([\\p{Lu}])`,
      "gu"
    ),
    "$1 $3 $5"
  );
}
function Xe(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{Ll}])([${n.spaces}])+([${n.ellipsis}][${p.closingDoubleQuote}${p.closingSingleQuote}]?$)`,
      "gmu"
    ),
    "$1$3"
  );
}
function Fe(e, p) {
  return e = Ie(e), e = Ue(e), e = Oe(e), e = Me(e), e = Te(e, p), e = je(e), e = Ze(e), e = _e(e, p), e = Xe(e, p), e = Ce(e), e = ze(e), e;
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
  enDash: ""
}, w = 57856, A = 63743, He = A - w + 1;
function R(e) {
  const p = w + e;
  if (p > A)
    throw new Error(
      `Exception index ${e} exceeds PUA limit (max ${He}). Text contains too many exceptions (emails/URLs/filenames). Consider processing the text in smaller chunks.`
    );
  return String.fromCharCode(p);
}
function Ge(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{L}\\d])([${n.spaces}]*[${n.enDash}${n.emDash}]{1,3}[${n.spaces}]*|[${n.spaces}]+[${n.hyphen}]{1,3}[${n.spaces}]+)([\\p{L}\\d])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}${p.dashWords.spaceAfter}$3`
  );
}
function Ve(e, p) {
  return e.replace(
    new RegExp(
      `([\\p{L}])([${n.spaces}]?)([${n.hyphen}${n.enDash}${n.emDash}]{1,3})([${n.spaces}]?)([${n.sentencePunctuation}\\n\\r])`,
      "gu"
    ),
    `$1${p.dashWords.spaceBefore}${p.dashWords.dash}$5`
  );
}
function Ye(e, p) {
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
function Je(e) {
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
function en(e, p) {
  return e.replace(
    new RegExp(
      `(\\d)(${p.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}]{1,3}[${n.spaces}]?)(\\d)(${p.ordinalIndicator})`,
      "giu"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function nn(e, p) {
  return e = Ge(e, p), e = Ve(e, p), e = Ye(e, p), e = Je(e), e = Ke(e), e = en(e, p), e;
}
function pn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePausePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function on(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function sn(e) {
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
function an(e) {
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
function tn(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9\\p{L}])`,
      "gu"
    ),
    `${a.odqUnpaired}$2`
  );
}
function rn(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "gu"
    ),
    `$1${a.cdqUnpaired}`
  );
}
function cn(e) {
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
function $n(e, p) {
  return e.replace(
    new RegExp(
      `(${p.openingDoubleQuote})([^${n.spaces}${p.closingDoubleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingDoubleQuote})`,
      "g"
    ),
    (o, s, r, t, c, u) => c.length === 1 && /[.,;:]/.test(c) ? s + r + t + u + c : o
  );
}
function dn(e, p) {
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
function ln(e, p) {
  return [
    { pattern: a.doublePrime, replacement: n.doublePrime },
    { pattern: `[${a.odq}${a.odqUnpaired}]`, replacement: p.openingDoubleQuote },
    { pattern: `[${a.cdq}${a.cdqUnpaired}]`, replacement: p.closingDoubleQuote }
  ].reduce(
    (s, { pattern: r, replacement: t }) => s.replace(new RegExp(r, "gu"), t),
    e
  );
}
function fn(e, p) {
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
function bn(e, p) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}\\p{L}])([${p.openingDoubleQuote}])`,
      "gu"
    ),
    "$1 $2"
  ), e = E(e, p), e;
}
function mn(e, p) {
  return e.replace(
    new RegExp(
      `([${p.closingDoubleQuote}])([\\p{L}])`,
      "gu"
    ),
    "$1 $2"
  );
}
function hn(e, p) {
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
function gn(e, p) {
  return e = pn(e), e = on(e), e = sn(e), e = an(e), e = tn(e), e = rn(e), e = cn(e), e = un(e), e = ln(e, p), e = fn(e, p), e = bn(e, p), e = mn(e, p), e = hn(e, p), e = $n(e, p), e = dn(e, p), e;
}
function xn(e) {
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
function Sn(e) {
  let p = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${p})`,
      "gi"
    ),
    `${a.apos}$2`
  );
}
function En(e) {
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
function An(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([\\d]{2})`,
      "gu"
    ),
    `$1$2${a.apos}$4`
  );
}
function Rn(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${a.singlePrime}`);
}
function Qn(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([\\p{L}${n.ellipsis}${n.openingBrackets}\\{])`,
      "gu"
    ),
    `$1${a.osqUnpaired}$3`
  );
}
function Dn(e) {
  return e.replace(
    new RegExp(
      `([\\p{L}\\d${n.closingBrackets}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "gu"
    ),
    `$1$2${a.csqUnpaired}$4`
  );
}
function Pn(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "gu"
    ),
    function(p, o, s, r) {
      return s = Qn(s), s = Dn(s), s = yn(s), o + s + r;
    }
  );
}
function yn(e) {
  return e.replace(
    new RegExp(
      `(${a.osqUnpaired})(.*)(${a.csqUnpaired})`,
      "gu"
    ),
    `${a.osq}$2${a.csq}`
  );
}
function Bn(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([\\p{L}]+)(${n.singleQuoteAdepts})(\\B)`,
      "gu"
    ),
    `$1${a.osq}$3${a.csq}$5`
  );
}
function Ln(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    `${a.apos}`
  );
}
function vn(e) {
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
function Wn(e, p) {
  return e.replace(
    new RegExp(
      `(${p.openingSingleQuote})([^${n.spaces}${p.closingSingleQuote}]+?)([^${n.romanNumerals}${n.sentencePunctuation}])([${n.sentencePunctuation}]{1,})(${p.closingSingleQuote})`,
      "g"
    ),
    (o, s, r, t, c, u) => c.length === 1 && /[.,;:]/.test(c) ? s + r + t + u + c : o
  );
}
function kn(e, p) {
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
function Nn(e) {
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
      pattern: `[${a.apos}${a.osqUnpaired}${a.csqUnpaired}]`,
      replacement: n.apostrophe
    },
    { pattern: a.osq, replacement: p.openingSingleQuote },
    { pattern: a.csq, replacement: p.closingSingleQuote }
  ].reduce(
    (s, { pattern: r, replacement: t }) => s.replace(new RegExp(r, "gu"), t),
    e
  );
}
function In(e, p) {
  return e = xn(e), e = Sn(e), e = wn(e), e = An(e), e = En(e), e = Rn(e), e = Bn(e), e = Pn(e), e = vn(e), e = Ln(e), e = qn(e, p), e = Wn(e, p), e = kn(e, p), e = Nn(e), e;
}
function Cn(e) {
  return b(
    e,
    new RegExp(
      `([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([\\d]+)([${n.spaces}]?[\\p{Ll}${n.singlePrime}${n.doublePrime}]*)`,
      "giu"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function zn(e) {
  return b(
    e,
    new RegExp(
      `([\\p{L}]+)([${n.spaces}][x][${n.spaces}])([\\p{L}]+)`,
      "gu"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function Un(e) {
  return e.replace(
    new RegExp(
      `([\\d])([${n.spaces}]?)([x×])([${n.spaces}])([\\p{Ll}]+)`,
      "giu"
    ),
    function(p, o, s, r, t, c) {
      return s == "" ? `${o}${s}${n.multiplicationSign}${n.nbsp}${c}` : `${o}${n.nbsp}${n.multiplicationSign}${n.nbsp}${c}`;
    }
  );
}
function On(e) {
  return e.replace(
    new RegExp(
      `([\\d]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([\\d]+)([${n.singlePrime}${n.doublePrime}])?`,
      "giu"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Mn(e) {
  return e = Cn(e), e = zn(e), e = Un(e), e = On(e), e;
}
function f(e, p, o) {
  return e = We(e, p), e = ge(e, p, o), e = xe(e, p, o), e;
}
function Tn(e, p) {
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
function jn(e, p) {
  return e = x(e, "c", n.copyright), e = f(e, n.copyright, p.spaceAfter.copyright), e = x(e, "p", n.soundRecordingCopyright), e = f(
    e,
    n.soundRecordingCopyright,
    p.spaceAfter.soundRecordingCopyright
  ), e;
}
function Zn(e, p) {
  return e = f(e, n.numeroSign, p.spaceAfter.numeroSign), e;
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
function m(e, p, o) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${p}\\)|${o})`,
      "gi"
    ),
    `$1${o}`
  );
}
function Xn(e) {
  return e = m(e, "r", n.registeredTrademark), e = m(e, "sm", n.serviceMark), e = m(e, "tm", n.trademark), e;
}
function Q(e, p, o) {
  let s = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${s})(${p})`, "g"),
    `$1$2${o}`
  );
}
function Fn(e) {
  return Q(e, "2", "²");
}
function Hn(e) {
  return Q(e, "3", "³");
}
function Gn(e) {
  return e = Fn(e), e = Hn(e), e;
}
function Vn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(\\d)`,
      "g"
    ),
    "$1$2$4"
  );
}
function Yn(e) {
  return e = Vn(e), e;
}
function Jn(e, p) {
  const o = `([\\p{Lu}][\\p{L}]?\\.)([${n.spaces}]?)`, s = "([\\p{L}]{2,}[^\\.])", r = [
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
  for (const { pattern: t, replacement: c } of r)
    e = e.replace(new RegExp(t, "gu"), c);
  return e;
}
function Kn(e, p) {
  let o = `([^\\p{L}${n.enDash}${n.emDash}]|^)`, s = "([\\p{L}]|\\D)", r = `([^\\p{L}${p.openingDoubleQuote}${p.openingSingleQuote}${n.backtick}\\p{Emoji}]|$)`, t = [];
  for (let c = 0; c < p.multipleWordAbbreviations.length; c++) {
    let u = p.multipleWordAbbreviations[c].split(" "), i = "";
    for (let d = 0; d < u.length; d++)
      i += `(${u[d]})(\\.)([${n.spaces}]?)`;
    t[c] = i;
  }
  for (let c = 0; c < t.length; c++) {
    let u = `${o}${t[c]}${s}`, i = "$1", d = (t[c].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++)
      i += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    i += `$${(d - 1) * 3 + 2}. $${d * 3 + 2}`, e = e.replace(new RegExp(u, "giu"), i);
  }
  for (let c = 0; c < t.length; c++) {
    let u = `${o}${t[c]}${r}`, i = "$1", d = (t[c].match(/\(/g) || []).length / 3;
    for (let l = 0; l < d - 1; l++)
      i += `$${l * 3 + 2}.${p.spaceAfter.abbreviation}`;
    i += `$${(d - 1) * 3 + 2}.$${d * 3 + 2}`, e = e.replace(new RegExp(u, "giu"), i);
  }
  return e;
}
function ep(e, p) {
  let o = [];
  for (let u = 0; u < p.singleWordAbbreviations.length; u++)
    o[u] = `(${p.singleWordAbbreviations[u]})(\\.)([${n.spaces}]?)`;
  let s = `([^\\p{L}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, r = "([\\p{L}\\d]+)([^\\.]|$)";
  for (let u = 0; u < o.length; u++)
    e = e.replace(
      new RegExp(
        `${s}${o[u]}${r}`,
        "giu"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let t = `([\\p{L}\\d])([${n.spaces}])`, c = `([^${n.spaces}\\p{L}\\d]|$)`;
  for (let u = 0; u < o.length; u++)
    e = e.replace(
      new RegExp(
        `${t}${o[u]}${c}`,
        "giu"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function np(e, p) {
  return e = Jn(e, p), e = Kn(e, p), e = ep(e, p), e;
}
function pp(e) {
  return e = e.replace(
    new RegExp(
      "([^\\p{L}]|^)([\\p{Lu}]{2})([\\p{Ll}]{2,})",
      "gu"
    ),
    function(p, o, s, r) {
      return `${o}${s.substring(0, 1)}${s.substring(1).toLowerCase()}${r}`;
    }
  ), e.replace(
    new RegExp(
      "(\\b)(?!iOS)([\\p{Ll}])([\\p{Lu}]{2,})",
      "gu"
    ),
    function(p, o, s, r) {
      return `${o}${s.toUpperCase()}${r.toLowerCase()}`;
    }
  );
}
function op(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function sp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function ap(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function tp(e) {
  let p = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(\\d+)" + p + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function rp(e) {
  return e = op(e), e = sp(e), e = ap(e), e = tp(e), e;
}
function cp(e) {
  let p = [];
  return h(e, n.emailPattern, p), h(e, n.urlPattern, p), h(e, n.filenamePattern, p), { processedText: up(e, p), exceptions: p };
}
function h(e, p, o) {
  const s = new RegExp(p, "gi"), r = e.match(s);
  return r && r.forEach((t) => o.push(t)), o;
}
function up(e, p) {
  return p.reduce((o, s, r) => {
    const t = R(r);
    return o.replace(s, t);
  }, e);
}
function ip(e, p) {
  return p.reduce((o, s, r) => {
    const t = R(r), c = new RegExp(t, "g");
    return o.replace(c, s);
  }, e);
}
function $p(e, p, o) {
  p = typeof p > "u" ? "en-us" : p;
  let s = new re(p);
  o = typeof o > "u" ? {
    removeLines: !0
  } : o;
  const { processedText: r, exceptions: t } = cp(e);
  return e = r, o.removeLines && (e = ce(e)), e = Fe(e, s), e = ke(e, s), e = qe(e), e = nn(e, s), e = In(e, s), e = gn(e, s), e = Mn(e), e = Tn(e, s), e = jn(e, s), e = Zn(e, s), e = _n(e), e = Xn(e), e = Gn(e), e = Yn(e), e = pp(e), e = rp(e), e = np(e, s), e = Se(e, s), e = ip(e, t), e;
}
export {
  $p as fixTypos
};
