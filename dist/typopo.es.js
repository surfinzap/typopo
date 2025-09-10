/*!
 * Typopo v2.6.0 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const B = {
  leftDoubleQuote: "„",
  rightDoubleQuote: "“",
  leftSingleQuote: "‚",
  rightSingleQuote: "‘"
}, W = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, q = [
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
], I = ["hl m", "n l", "p n l", "př n l"], z = {
  quotes: B,
  numbers: W,
  singleWordAbbreviations: q,
  multipleWordAbbreviations: I
}, L = {
  leftDoubleQuote: "“",
  rightDoubleQuote: "”",
  leftSingleQuote: "‘",
  rightSingleQuote: "’"
}, M = {
  ordinalIndicator: "st|nd|rd|th",
  romanOrdinalIndicator: ""
}, T = ["p", "pp", "no", "vol"], O = ["U S", "e g", "i e", "a m", "p m"], j = {
  quotes: L,
  numbers: M,
  singleWordAbbreviations: T,
  multipleWordAbbreviations: O
}, Z = {
  leftDoubleQuote: "«",
  rightDoubleQuote: "»",
  leftSingleQuote: "‹",
  rightSingleQuote: "›"
}, H = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, U = ["ціт", "ст", "канц", "абз", "тзв", "Зб", "ч", "напр"], F = ["т зн", "Е Ч", "евід ч", "род ч", "т ч", "т д"], X = {
  quotes: Z,
  numbers: H,
  singleWordAbbreviations: U,
  multipleWordAbbreviations: F
}, Y = {
  leftDoubleQuote: "„",
  rightDoubleQuote: "“",
  leftSingleQuote: "‚",
  rightSingleQuote: "‘"
}, G = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, V = [
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
], J = [
  "hl m",
  "n l",
  "p n l",
  "pr n l",
  "s a",
  "s l",
  "t j",
  "zodp red",
  "t č"
], K = {
  quotes: Y,
  numbers: G,
  singleWordAbbreviations: V,
  multipleWordAbbreviations: J
}, ee = {
  leftDoubleQuote: "„",
  rightDoubleQuote: "“",
  leftSingleQuote: "‚",
  rightSingleQuote: "‘"
}, ne = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, te = [
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
], oe = [
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
], ae = {
  quotes: ee,
  numbers: ne,
  singleWordAbbreviations: te,
  multipleWordAbbreviations: oe
}, i = {
  cs: z,
  "en-us": j,
  rue: X,
  sk: K,
  "de-de": ae
}, g = "en-us";
class pe {
  constructor(t) {
    i[t] || (console.warn(`Locale '${t}' not found, falling back to '${g}'`), t = g), this.ID = t, this.leftSingleQuote = i[t].quotes.leftSingleQuote, this.rightSingleQuote = i[t].quotes.rightSingleQuote, this.leftDoubleQuote = i[t].quotes.leftDoubleQuote, this.rightDoubleQuote = i[t].quotes.rightDoubleQuote, this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote, this.ordinalIndicator = i[t].numbers.ordinalIndicator, this.romanOrdinalIndicator = i[t].numbers.romanOrdinalIndicator, this.singleWordAbbreviations = [];
    for (const o in i)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        i[o].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (const o in i)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        i[o].multipleWordAbbreviations
      );
  }
}
function re(e) {
  return e.replace(/[\n\r]{2,}/gm, `
`);
}
function f(e, t, o) {
  let r = 0, s = e, $ = "";
  for (; s !== $ && r < 50; )
    $ = s, s = s.replace(t, o), r++;
  return s;
}
const E = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях", S = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ", se = "a-z" + E, $e = "A-Z" + S, ue = "a-z" + E + "A-Z" + S, ce = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", le = "’", ie = "′", de = "`", he = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}|´{2,}|`{2,}", fe = "″", A = " ", _ = " ", y = " ", R = " ", be = A + _ + y + R, C = "\\.\\!\\?", Q = "\\,\\:\\;", me = Q + C, ge = "\\(\\[\\{", xe = "\\)\\]\\}", we = "…", Ee = "-", Se = "–", Ae = "—", _e = "/", ye = "°", Re = "×", Ce = "&", Qe = "§", Pe = "©", De = "℗", ve = "®", Ne = "℠", ke = "™", Be = "+", We = "−", qe = "±", Ie = "%", ze = "‰", Le = "‱", Me = "#", Te = "\\d", Oe = "IVXLCDM", n = {
  lowercaseChars: se,
  uppercaseChars: $e,
  allChars: ue,
  singleQuoteAdepts: ce,
  apostrophe: le,
  singlePrime: ie,
  backtick: de,
  doubleQuoteAdepts: he,
  doublePrime: fe,
  /* Spaces */
  space: A,
  nbsp: _,
  hairSpace: y,
  narrowNbsp: R,
  spaces: be,
  /* Punctuation*/
  terminalPunctuation: C,
  sentencePausePunctuation: Q,
  sentencePunctuation: me,
  openingBrackets: ge,
  closingBrackets: xe,
  ellipsis: we,
  hyphen: Ee,
  enDash: Se,
  emDash: Ae,
  slash: _e,
  /* Symbols*/
  degree: ye,
  multiplicationSign: Re,
  ampersand: Ce,
  sectionSign: Qe,
  copyright: Pe,
  soundRecordingCopyright: De,
  registeredTrademark: ve,
  serviceMark: Ne,
  trademark: ke,
  plus: Be,
  minus: We,
  plusMinus: qe,
  percent: Ie,
  permille: ze,
  permyriad: Le,
  numberSign: Me,
  /* Numbers */
  cardinalNumber: Te,
  romanNumerals: Oe,
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
};
function je(e) {
  return f(
    e,
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,})([${n.nbsp}${n.narrowNbsp}])([${n.lowercaseChars}${n.uppercaseChars}]{2,})`,
      "g"
    ),
    "$1 $3"
  );
}
function P(e, t) {
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
  ), t.ID == "en-us" && (e = e.replace(
    new RegExp(
      `(^|[${n.spaces}])(I)([${n.spaces}])`,
      "g"
    ),
    `$1$2${n.nbsp}`
  )), e;
}
function Ze(e) {
  return e.replace(
    new RegExp(`([${n.spaces}])(${n.ampersand})([${n.spaces}])`, "g"),
    ` $2${n.nbsp}`
  );
}
function He(e) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}${n.cardinalNumber}]|^)(${n.cardinalNumber}{1,2})([${n.spaces}])([${n.allChars}])`,
      "g"
    ),
    `$1$2${n.nbsp}$4`
  );
}
function Ue(e, t) {
  return e.replace(
    new RegExp(
      `([^${n.nbsp}${n.cardinalNumber}_%\\-]|^)(${n.cardinalNumber}{1,2})(${t.ordinalIndicator})([${n.spaces}]?)([${n.allChars}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  );
}
function Fe(e, t) {
  let o = "";
  switch (t.ID) {
    case "en-us":
    case "rue":
    case "sk":
    case "cs":
      o = `$1$2${n.nbsp}$4$5${n.nbsp}$7`;
      break;
    case "de-de":
      o = `$1$2${n.nbsp}$4$5${n.space}$7`;
      break;
  }
  return e.replace(
    new RegExp(
      `(${n.cardinalNumber})(${t.ordinalIndicator})([${n.spaces}]?)(${n.cardinalNumber})(${t.ordinalIndicator})([${n.spaces}]?)(${n.cardinalNumber})`,
      "g"
    ),
    o
  );
}
function Xe(e, t) {
  return t.romanOrdinalIndicator != "" ? e.replace(
    new RegExp(
      `(\\b)([${n.romanNumerals}]+)(${t.romanOrdinalIndicator})([${n.spaces}]?)([${n.allChars}${n.cardinalNumber}])`,
      "g"
    ),
    `$1$2$3${n.nbsp}$5`
  ) : e;
}
function Ye(e, t) {
  let o = `(\\b[${n.uppercaseChars}][${n.lowercaseChars}]+?)([${n.spaces}])([${n.romanNumerals}]+\\b)(${t.romanOrdinalIndicator})([${n.nbsp}]?)`, a = new RegExp(o, "g");
  return e.replace(a, function(r, s, $, p, c, u) {
    return u == "" && p == "I" ? s + n.space + p + c : u == "" && p != "I" ? s + n.nbsp + p + c : u == n.nbsp && p == "I" ? s + n.space + p + c + u : s + n.nbsp + p + c + n.space;
  });
}
function Ge(e, t) {
  const o = {
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
    `$1${o[t.ID]}$3`
  );
}
function Ve(e, t) {
  let o = n.uppercaseChars;
  t.ID == "en-us" && (o = o.replace(/A-Z/g, "A-HJ-Z"));
  let a = `([^${n.sentencePunctuation}${n.ellipsis}${n.closingBrackets}${t.rightDoubleQuote}${t.rightSingleQuote}${n.apostrophe}${n.multiplicationSign}${n.emDash}${n.enDash}])([${n.spaces}])([${o}])(([${n.spaces}])|(\\.$|$))`, r = new RegExp(a, "g");
  return e.replace(r, function(s, $, p, c, u, l) {
    return t.ID == "en-us" ? $ + n.nbsp + c + u : c == "I" && (l == n.nbsp || l == n.hairSpace || l == n.narrowNbsp) ? $ + n.nbsp + c + n.space : $ + n.nbsp + c + u;
  });
}
function Je(e, t) {
  return e.replace(
    new RegExp(`(${t})([^${n.spaces}])`, "g"),
    `$1${n.nbsp}$2`
  );
}
function Ke(e, t) {
  return e.replace(
    new RegExp(`(${t})([${n.spaces}])`, "g"),
    `$1${n.nbsp}`
  );
}
function en(e, t) {
  return e = je(e), e = P(e, t), e = Ze(e), e = He(e), e = Ue(e, t), e = Fe(e, t), e = Xe(e, t), e = Ve(e, t), e = Ye(e, t), e = Ge(e, t), e;
}
function nn(e) {
  return e.replace(
    new RegExp(
      `(\\S)([${n.spaces}]{2,})(\\S)`,
      "g"
    ),
    "$1 $3"
  );
}
function tn(e, t) {
  let o = e.split(/\r?\n/), a = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let r = 0; r < o.length; r++)
    o[r] = o[r].replace(a, function(s, $, p) {
      return t.removeWhitespacesBeforeMarkdownList == !1 && p != "" ? $ + p : p;
    });
  return o.join(`
`);
}
function on(e) {
  let t = e.split(/\r?\n/), o = new RegExp("(\\s+$)", "g");
  for (let a = 0; a < t.length; a++)
    t[a] = t[a].replace(o, "");
  return t.join(`
`);
}
function an(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.sentencePausePunctuation}])([^\\-\\)]|$)`,
      "g"
    ),
    "$2$3"
  );
}
function pn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])([${n.terminalPunctuation}${n.closingBrackets}${n.degree}])`,
      "g"
    ),
    "$2"
  );
}
function rn(e, t) {
  return e.replace(
    new RegExp(
      `(${n.cardinalNumber})([${n.spaces}]?)(${t.ordinalIndicator})([${n.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function sn(e) {
  return e.replace(
    new RegExp(
      `([${n.openingBrackets}])([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function $n(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}])([${n.openingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}])([${n.lowercaseChars}${n.uppercaseChars}${n.ellipsis}${n.closingBrackets}])`,
      "g"
    ),
    function(t, o, a, r, s) {
      return r == "s" | r == "S" | r + s == "es" | r + s == "ES" ? `${o}${a}${r}${s}` : `${o}${n.space}${a}${r}${s}`;
    }
  );
}
function un(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.terminalPunctuation}])([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function cn(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}]{2,}|[${n.ellipsis}])([${n.sentencePausePunctuation}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function ln(e) {
  return e.replace(
    new RegExp(
      `([${n.closingBrackets}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function dn(e, t) {
  return e.replace(
    new RegExp(`([^${n.spaces}${n.openingBrackets}])(${t})`, "g"),
    `$1${n.space}$2`
  );
}
function hn(e, t, o) {
  return e = nn(e), e = tn(e, o), e = on(e), e = an(e), e = pn(e), e = rn(e, t), e = sn(e), e = $n(e), e = un(e), e = ln(e), e = cn(e), e;
}
function fn(e) {
  return e.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function bn(e) {
  return fn(e);
}
function mn(e) {
  return e.replace(new RegExp(`[${n.ellipsis}\\.]{3,}`, "g"), n.ellipsis);
}
function gn(e) {
  return e.replace(
    new RegExp(
      `\\.${n.ellipsis}|${n.ellipsis}{2,}|${n.ellipsis}\\.`,
      "g"
    ),
    n.ellipsis
  );
}
function xn(e) {
  return e.replace(
    new RegExp(`[${n.spaces}]\\.{2}[${n.spaces}]`, "g"),
    `${n.space}${n.ellipsis}${n.space}`
  );
}
function wn(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${n.ellipsis}$5`
  );
}
function En(e) {
  return e.replace(
    new RegExp(
      `(,)([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)(\\B|[${n.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function Sn(e) {
  return e.replace(
    new RegExp(
      `(^${n.ellipsis})([${n.spaces}])([${n.lowercaseChars}${n.uppercaseChars}])`,
      "gm"
    ),
    "$1$3"
  );
}
function An(e, t) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${t.terminalQuotes}])([${n.spaces}]?)([${n.ellipsis}])([${n.spaces}]?)([${n.lowercaseChars}])`,
      "g"
    ),
    "$1 $3$5"
  );
}
function _n(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])([${n.ellipsis}])([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1$3 $5"
  );
}
function yn(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.ellipsis}])([${n.allChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function Rn(e, t) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${t.terminalQuotes}])([${n.spaces}]?)(${n.ellipsis})([${n.spaces}]?)([${n.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}
function Cn(e, t) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}])([${n.spaces}])+([${n.ellipsis}][${t.rightDoubleQuote}${t.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}
function Qn(e, t) {
  return e = mn(e), e = wn(e), e = En(e), e = Sn(e), e = An(e, t), e = _n(e), e = yn(e), e = Rn(e, t), e = Cn(e, t), e = gn(e), e = xn(e), e;
}
function Pn(e) {
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
function Dn(e) {
  return e = Pn(e), e;
}
function vn(e) {
  return e.replace(/(---)/g, "—");
}
function Nn(e) {
  return e.replace(/(--)/g, "–");
}
function kn(e, t) {
  const o = {
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
    `$1${o[t.ID]}$3`
  );
}
function Bn(e, t) {
  const o = {
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
    `$1${o[t.ID]}$5`
  );
}
function Wn(e) {
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
function qn(e) {
  return e.replace(
    new RegExp(
      `([${n.percent}${n.permille}${n.permyriad}])([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(${n.cardinalNumber})`,
      "g"
    ),
    `$1${n.enDash}$3`
  );
}
function In(e, t) {
  return e.replace(
    new RegExp(
      `(${n.cardinalNumber})(${t.ordinalIndicator})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(${n.cardinalNumber})(${t.ordinalIndicator})`,
      "gi"
    ),
    `$1$2${n.enDash}$4$5`
  );
}
function zn(e, t) {
  return e = vn(e), e = Nn(e), e = kn(e, t), e = Bn(e, t), e = Wn(e), e = qn(e), e = In(e, t), e;
}
const d = "{{typopo__markdown_tick}}";
function D(e, t) {
  return t.keepMarkdownCodeBlocks ? e.replace(/(\s*)(```)/g, `$1${d}${d}${d}`).replace(/(``)(.*?)(``)/g, `${d}${d}$2${d}${d}`).replace(/(`)(.*?)(`)/g, `${d}$2${d}`) : e;
}
function v(e, t) {
  return t.keepMarkdownCodeBlocks ? e.replace(
    new RegExp(
      `${d}`,
      "g"
    ),
    "`"
  ) : e;
}
function Ln(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function Mn(e) {
  return e.replace(
    new RegExp(
      `([^${n.romanNumerals}])([${n.sentencePunctuation}])(${n.doubleQuoteAdepts})([${n.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function Tn(e) {
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
function On(e) {
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
function jn(e) {
  return e.replace(
    new RegExp(
      `(${n.doubleQuoteAdepts})([0-9${n.lowercaseChars}${n.uppercaseChars}])`,
      "g"
    ),
    "{{typopo__left-double-quote--standalone}}$2"
  );
}
function Zn(e) {
  return e.replace(
    new RegExp(
      `([${n.lowercaseChars}${n.uppercaseChars}${n.sentencePunctuation}${n.ellipsis}])(${n.doubleQuoteAdepts})`,
      "g"
    ),
    "$1{{typopo__right-double-quote--standalone}}"
  );
}
function Hn(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.doubleQuoteAdepts})([${n.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function Un(e) {
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
function Fn(e, t) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${t.leftDoubleQuote})([^${t.rightDoubleQuote}]+?)([^${n.romanNumerals}${n.closingBrackets}])([${n.terminalPunctuation}${n.ellipsis}])(${t.rightDoubleQuote})`,
      // 7
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${t.leftDoubleQuote})(.+?)([^${n.romanNumerals}])(${t.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `(^${t.leftDoubleQuote}[^${t.rightDoubleQuote}]+?[^${n.romanNumerals}])(${t.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "gm"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]${t.leftDoubleQuote}[^${t.rightDoubleQuote}]+?[^${n.romanNumerals}])(${t.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${t.rightDoubleQuote}][${n.spaces}]${t.leftDoubleQuote}[^${t.rightDoubleQuote}]+?[^${n.romanNumerals}])(${t.rightDoubleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), e;
}
function Xn(e, t) {
  return e.replace(/{{typopo__double-prime}}/g, n.doublePrime).replace(
    /({{typopo__left-double-quote}}|{{typopo__left-double-quote--standalone}})/g,
    t.leftDoubleQuote
  ).replace(
    /({{typopo__right-double-quote}}|{{typopo__right-double-quote--standalone}})/g,
    t.rightDoubleQuote
  );
}
function Yn(e, t) {
  return e.replace(
    new RegExp(
      `([${n.sentencePunctuation}])([,])(${t.rightDoubleQuote})`,
      "g"
    ),
    "$1$3"
  );
}
function Gn(e, t) {
  return e = e.replace(
    new RegExp(
      `(${t.leftDoubleQuote})([${n.spaces}])`,
      "g"
    ),
    "$1"
  ), e = e.replace(
    new RegExp(
      `([${n.spaces}])(${t.rightDoubleQuote})`,
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
function Vn(e, t) {
  return e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}${n.allChars}])([${t.leftDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), e = P(e, t), e;
}
function Jn(e, t) {
  return e.replace(
    new RegExp(
      `([${t.rightDoubleQuote}])([${n.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function Kn(e, t, o) {
  return e = D(e, o), e = Ln(e), e = Mn(e), e = Tn(e), e = On(e), e = jn(e), e = Zn(e), e = Hn(e), e = Un(e), e = Xn(e, t), e = v(e, o), e = Gn(e, t), e = Vn(e, t), e = Jn(e, t), e = Fn(e, t), e = Yn(e, t), e;
}
function et(e) {
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
function nt(e) {
  let t = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})(${t})`,
      "gi"
    ),
    "{{typopo__apostrophe}}$2"
  );
}
function tt(e) {
  return e.replace(
    new RegExp(
      `(\\Bin)(${n.singleQuoteAdepts})`,
      "gi"
    ),
    "$1{{typopo__apostrophe}}"
  );
}
function ot(e) {
  return e.replace(
    new RegExp(
      `([${n.cardinalNumber}${n.allChars}])(${n.singleQuoteAdepts})+([${n.allChars}])`,
      "g"
    ),
    "$1{{typopo__apostrophe}}$3"
  );
}
function at(e) {
  return e.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${n.spaces}])(${n.singleQuoteAdepts})([${n.cardinalNumber}]{2})`,
      "g"
    ),
    "$1$2{{typopo__apostrophe}}$4"
  );
}
function pt(e) {
  return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}
function rt(e) {
  return e.replace(
    new RegExp(
      `(^|[${n.spaces}${n.emDash}${n.enDash}])(${n.singleQuoteAdepts}|,)([${n.allChars}${n.ellipsis}])`,
      "g"
    ),
    "$1{{typopo__left-single-quote--standalone}}$3"
  );
}
function st(e) {
  return e.replace(
    new RegExp(
      `([${n.allChars}])([${n.sentencePunctuation}${n.ellipsis}])?(${n.singleQuoteAdepts})([ ${n.sentencePunctuation}])?`,
      "g"
    ),
    "$1$2{{typopo__right-single-quote--standalone}}$4"
  );
}
function $t(e) {
  return e.replace(
    // prettier-ignore
    new RegExp(
      `(${n.doubleQuoteAdepts})(.*?)(${n.doubleQuoteAdepts})`,
      "g"
    ),
    function(t, o, a, r) {
      return a = rt(a), a = st(a), a = ut(a), o + a + r;
    }
  );
}
function ut(e) {
  return e.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  );
}
function ct(e) {
  return e.replace(
    new RegExp(
      `(\\B)(${n.singleQuoteAdepts})([${n.allChars}]+)(${n.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__left-single-quote}}$3{{typopo__right-single-quote}}$5"
  );
}
function lt(e) {
  return e.replace(
    new RegExp(
      `(${n.singleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__apostrophe}}"
  );
}
function it(e) {
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
function dt(e, t) {
  return e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${t.leftSingleQuote})([^${t.rightSingleQuote}]+?)([^${n.romanNumerals}])([${n.terminalPunctuation}${n.ellipsis}])(${t.rightSingleQuote})`,
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), e = e.replace(
    new RegExp(
      `([^${n.sentencePunctuation}])([${n.spaces}])(${t.leftSingleQuote})(.+?)([^${n.romanNumerals}])(${t.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])([${n.spaces}])([${n.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), e = e.replace(
    new RegExp(
      `([${n.sentencePunctuation}][${n.spaces}]|^)(${t.leftSingleQuote})([^${t.rightSingleQuote}]+?)([^${n.romanNumerals}])(${t.rightSingleQuote})([${n.terminalPunctuation}${n.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$2$3$4$6$5$7"
  ), e;
}
function ht(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}])(${n.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function ft(e, t) {
  return e = e.replace(/({{typopo__single-prime}})/g, n.singlePrime), e = e.replace(
    /{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g,
    n.apostrophe
  ), e = e.replace(/{{typopo__left-single-quote}}/g, t.leftSingleQuote), e = e.replace(/{{typopo__right-single-quote}}/g, t.rightSingleQuote), e = e.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), e;
}
function bt(e, t, o) {
  return e = D(e, o), e = et(e), e = nt(e), e = ot(e), e = at(e), e = tt(e), e = pt(e), e = ct(e), e = $t(e), e = it(e), e = lt(e), e = ft(e, t), e = v(e, o), e = dt(e, t), e = ht(e), e;
}
function mt(e) {
  return f(
    e,
    new RegExp(
      `([${n.cardinalNumber}]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)([${n.spaces}][x][${n.spaces}])([${n.cardinalNumber}]+)([${n.spaces}]?[${n.lowercaseChars}${n.singlePrime}${n.doublePrime}]*)`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function gt(e) {
  return f(
    e,
    new RegExp(
      `([${n.allChars}]+)([${n.spaces}][x][${n.spaces}])([${n.allChars}]+)`,
      "g"
    ),
    `$1${n.nbsp}${n.multiplicationSign}${n.nbsp}$3`
  );
}
function xt(e) {
  return e.replace(
    new RegExp(
      `([${n.cardinalNumber}])([${n.spaces}]?)([x|×])([${n.spaces}])([${n.lowercaseChars}]+)`,
      "gi"
    ),
    function(t, o, a, r, s, $) {
      return a == "" ? `${o}${a}${n.multiplicationSign}${n.nbsp}${$}` : `${o}${n.nbsp}${n.multiplicationSign}${n.nbsp}${$}`;
    }
  );
}
function wt(e) {
  return e.replace(
    new RegExp(
      `([${n.cardinalNumber}]+)([${n.singlePrime}${n.doublePrime}])?([x|×])([${n.cardinalNumber}]+)([${n.singlePrime}${n.doublePrime}])?`,
      "gi"
    ),
    `$1$2${n.nbsp}${n.multiplicationSign}${n.nbsp}$4$5`
  );
}
function Et(e) {
  return e = mt(e), e = gt(e), e = xt(e), e = wt(e), e;
}
function St(e) {
  return e.replace(
    new RegExp(
      `([^${n.spaces}${n.sectionSign}${n.openingBrackets}])(${n.sectionSign})`,
      "g"
    ),
    `$1${n.space}$2`
  );
}
function At(e) {
  return e.replace(
    new RegExp(
      `(${n.sectionSign})([^${n.spaces}${n.sectionSign}])`,
      "g"
    ),
    `$1${n.nbsp}$2`
  );
}
function _t(e) {
  return e.replace(
    new RegExp(
      `(${n.sectionSign})([${n.spaces}])`,
      "g"
    ),
    `$1${n.nbsp}`
  );
}
function yt(e) {
  return e = St(e), e = At(e), e = _t(e), e;
}
function x(e, t, o) {
  return e.replace(
    new RegExp(
      `(\\(${t}\\))([${n.spaces}]*)(${n.cardinalNumber})`,
      "gi"
    ),
    `${o}$2$3`
  );
}
function w(e, t) {
  return e = dn(e, t), e = Je(e, t), e = Ke(e, t), e;
}
function Rt(e, t) {
  return e = x(e, "c", n.copyright), e = w(e, n.copyright), e = x(e, "p", n.soundRecordingCopyright), e = w(e, n.soundRecordingCopyright), e;
}
function Ct(e) {
  return e.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    n.plusMinus
  );
}
function b(e, t, o) {
  return e.replace(
    new RegExp(
      `([^0-9]|^)([${n.spaces}]*)(\\(${t}\\)|${o})`,
      "gi"
    ),
    `$1${o}`
  );
}
function Qt(e) {
  return e = b(e, "r", n.registeredTrademark), e = b(e, "sm", n.serviceMark), e = b(e, "tm", n.trademark), e;
}
function N(e, t, o) {
  let a = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return e.replace(
    new RegExp(`([${n.spaces}${n.slash}])(${a})(${t})`, "g"),
    `$1$2${o}`
  );
}
function Pt(e) {
  return N(e, "2", "²");
}
function Dt(e) {
  return N(e, "3", "³");
}
function vt(e) {
  return e = Pt(e), e = Dt(e), e;
}
function Nt(e) {
  return e.replace(
    new RegExp(
      `([${n.spaces}]+)(${n.numberSign})([${n.spaces}]+)(${n.cardinalNumber})`,
      "g"
    ),
    "$1$2$4"
  );
}
function kt(e) {
  return e = Nt(e), e;
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
function Bt(e, t) {
  const o = k(t), a = `([${n.uppercaseChars}][${n.allChars}]?\\.)([${n.spaces}]?)`, r = `([${n.allChars}]{2,}[^\\.])`, s = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${a}${r}`,
      replacement: `$1${n.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${a}${a}${r}`,
      replacement: `$1${o}$3${n.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${a}${a}${a}${r}`,
      replacement: `$1${o}$3${o}$5${n.space}$7`
    }
  ];
  for (const { pattern: $, replacement: p } of s)
    e = e.replace(new RegExp($, "g"), p);
  return e;
}
function Wt(e, t) {
  let o = `([^${n.allChars}${n.enDash}${n.emDash}]|^)`, a = `([${n.allChars}]|\\D)`, r = `([^${n.allChars}${t.leftDoubleQuote}${t.leftSingleQuote}${n.backtick}\\p{Emoji}]|$)`;
  const s = k(t);
  let $ = [];
  for (let p = 0; p < t.multipleWordAbbreviations.length; p++) {
    let c = t.multipleWordAbbreviations[p].split(" "), u = "";
    for (let l = 0; l < c.length; l++)
      u += `(${c[l]})(\\.)([${n.spaces}]?)`;
    $[p] = u;
  }
  for (let p = 0; p < $.length; p++) {
    let c = `${o}${$[p]}${a}`, u = "$1", l = ($[p].match(/\(/g) || []).length / 3;
    for (let h = 0; h < l - 1; h++)
      u += `$${h * 3 + 2}.${s}`;
    u += `$${(l - 1) * 3 + 2}. $${l * 3 + 2}`, e = e.replace(new RegExp(c, "gi"), u);
  }
  for (let p = 0; p < $.length; p++) {
    let c = `${o}${$[p]}${r}`, u = "$1", l = ($[p].match(/\(/g) || []).length / 3;
    for (let h = 0; h < l - 1; h++)
      u += `$${h * 3 + 2}.${s}`;
    u += `$${(l - 1) * 3 + 2}.$${l * 3 + 2}`, e = e.replace(new RegExp(c, "giu"), u);
  }
  return e;
}
function qt(e, t) {
  let o = [];
  for (let p = 0; p < t.singleWordAbbreviations.length; p++)
    o[p] = `(${t.singleWordAbbreviations[p]})(\\.)([${n.spaces}]?)`;
  let a = `([^${n.allChars}${n.enDash}${n.emDash}${n.nbsp}\\.]|^)`, r = `([${n.allChars}\\d]+)([^\\.]|$)`;
  for (let p = 0; p < o.length; p++)
    e = e.replace(
      new RegExp(
        `${a}${o[p]}${r}`,
        "gi"
      ),
      `$1$2$3${n.nbsp}$5$6`
    );
  let s = `([${n.allChars}\\d])([${n.spaces}])`, $ = `([^${n.spaces}${n.allChars}\\d]|$)`;
  for (let p = 0; p < o.length; p++)
    e = e.replace(
      new RegExp(
        `${s}${o[p]}${$}`,
        "gi"
      ),
      `$1${n.nbsp}$3$4$5$6`
    );
  return e;
}
function It(e, t) {
  return e = Bt(e, t), e = Wt(e, t), e = qt(e, t), e;
}
function zt(e) {
  return e = e.replace(
    new RegExp(
      `([^${n.allChars}]|^)([${n.uppercaseChars}]{2})([${n.lowercaseChars}]{2,})`,
      "g"
    ),
    function(t, o, a, r) {
      return `${o}${a.substring(0, 1)}${a.substring(1).toLowerCase()}${r}`;
    }
  ), e.replace(
    new RegExp(
      `(\\b)(?!iOS)([${n.lowercaseChars}])([${n.uppercaseChars}]{2,})`,
      "g"
    ),
    function(t, o, a, r) {
      return `${o}${a.toUpperCase()}${r.toLowerCase()}`;
    }
  );
}
function Lt(e) {
  return e.replace(
    new RegExp(
      `(issn)(:?)([${n.spaces}]?)(\\d{4})([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${n.nbsp}$4-$6`
  );
}
function Mt(e) {
  let t = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10`
  );
}
function Tt(e) {
  let t = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      `(isbn)(:?)([${n.spaces}]?)(\\d+)` + t + "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${n.nbsp}$4-$6-$8-$10-$12`
  );
}
function Ot(e) {
  let t = `([${n.spaces}]?[${n.hyphen}${n.enDash}${n.emDash}][${n.spaces}]?)`;
  return e.replace(
    new RegExp(
      "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function jt(e) {
  return e = Lt(e), e = Mt(e), e = Tt(e), e = Ot(e), e;
}
function Zt(e) {
  let t = [];
  return m(e, n.emailPattern, t), m(e, n.urlPattern, t), m(e, n.filenamePattern, t), { processedText: Ht(e, t), exceptions: t };
}
function m(e, t, o) {
  const a = new RegExp(t, "gi"), r = e.match(a);
  return r && r.forEach((s) => o.push(s)), o;
}
function Ht(e, t) {
  return t.reduce((o, a, r) => {
    const s = `{{typopo__exception-${r}}}`;
    return o.replace(a, s);
  }, e);
}
function Ut(e, t) {
  return t.reduce((o, a, r) => {
    const s = new RegExp(`{{typopo__exception-${r}}}`, "g");
    return o.replace(s, a);
  }, e);
}
/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
function Ft(e, t, o) {
  t = typeof t > "u" ? "en-us" : t;
  let a = new pe(t);
  o = typeof o > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : o;
  const { processedText: r, exceptions: s } = Zt(e);
  return e = r, o.removeLines && (e = re(e)), e = Qn(e, a), e = hn(e, a, o), e = bn(e), e = zn(e, a), e = Dn(e), e = bt(e, a, o), e = Kn(e, a, o), e = Et(e), e = yt(e), e = Rt(e), e = Ct(e), e = Qt(e), e = vt(e), e = kt(e), e = zt(e), e = It(e, a), e = jt(e), e = en(e, a), e = Ut(e, s), e;
}
export {
  Ft as fixTypos
};
