/*!
 * Typopo v2.6.0 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
const Q = {
  leftDoubleQuote: "„",
  rightDoubleQuote: "“",
  leftSingleQuote: "‚",
  rightSingleQuote: "‘"
}, y = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, C = [
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
], A = ["hl m", "n l", "p n l", "př n l"], D = {
  quotes: Q,
  numbers: y,
  singleWordAbbreviations: C,
  multipleWordAbbreviations: A
}, P = {
  leftDoubleQuote: "“",
  rightDoubleQuote: "”",
  leftSingleQuote: "‘",
  rightSingleQuote: "’"
}, v = {
  ordinalIndicator: "st|nd|rd|th",
  romanOrdinalIndicator: ""
}, N = ["p", "pp", "no", "vol"], B = ["U S", "e g", "i e", "a m", "p m"], W = {
  quotes: P,
  numbers: v,
  singleWordAbbreviations: N,
  multipleWordAbbreviations: B
}, k = {
  leftDoubleQuote: "«",
  rightDoubleQuote: "»",
  leftSingleQuote: "‹",
  rightSingleQuote: "›"
}, q = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, I = ["ціт", "ст", "канц", "абз", "тзв", "Зб", "ч", "напр"], M = ["т зн", "Е Ч", "евід ч", "род ч", "т ч", "т д"], L = {
  quotes: k,
  numbers: q,
  singleWordAbbreviations: I,
  multipleWordAbbreviations: M
}, O = {
  leftDoubleQuote: "„",
  rightDoubleQuote: "“",
  leftSingleQuote: "‚",
  rightSingleQuote: "‘"
}, T = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, z = [
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
], j = [
  "hl m",
  "n l",
  "p n l",
  "pr n l",
  "s a",
  "s l",
  "t j",
  "zodp red",
  "t č"
], Z = {
  quotes: O,
  numbers: T,
  singleWordAbbreviations: z,
  multipleWordAbbreviations: j
}, H = {
  leftDoubleQuote: "„",
  rightDoubleQuote: "“",
  leftSingleQuote: "‚",
  rightSingleQuote: "‘"
}, X = {
  ordinalIndicator: "\\.",
  romanOrdinalIndicator: "\\."
}, U = [
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
], F = [
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
], G = {
  quotes: H,
  numbers: X,
  singleWordAbbreviations: U,
  multipleWordAbbreviations: F
}, d = {
  cs: D,
  "en-us": W,
  rue: L,
  sk: Z,
  "de-de": G
};
class J {
  constructor(e) {
    this.locale = e, this.leftSingleQuote = d[e].quotes.leftSingleQuote, this.rightSingleQuote = d[e].quotes.rightSingleQuote, this.leftDoubleQuote = d[e].quotes.leftDoubleQuote, this.rightDoubleQuote = d[e].quotes.rightDoubleQuote, this.ordinalIndicator = d[e].numbers.ordinalIndicator, this.romanOrdinalIndicator = d[e].numbers.romanOrdinalIndicator, this.singleWordAbbreviations = [];
    for (e in d)
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        d[e].singleWordAbbreviations
      );
    this.multipleWordAbbreviations = [];
    for (e in d)
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        d[e].multipleWordAbbreviations
      );
  }
}
function K(n) {
  return n.replace(/[\n\r]{2,}/gm, `
`);
}
function b(n, e, t) {
  let p = 0, $ = n, s = "";
  for (; $ !== s && p < 50; )
    s = $, $ = $.replace(e, t), p++;
  return $;
}
function V(n, e) {
  return b(
    n,
    new RegExp(
      `([${e.lowercaseChars}${e.uppercaseChars}]{2,})([${e.nbsp}${e.narrowNbsp}])([${e.lowercaseChars}${e.uppercaseChars}]{2,})`,
      "g"
    ),
    "$1 $3"
  );
}
function g(n, e) {
  return n = b(
    n,
    new RegExp(
      `(^|[${e.space}]|[^${e.allChars}${e.cardinalNumber}${e.apostrophe}${e.plus}${e.minus}${e.hyphen}])([${e.lowercaseChars}])([${e.space}])`,
      "g"
    ),
    `$1$2${e.nbsp}`
  ), n = n.replace(
    new RegExp(
      `(^|[${e.sentencePunctuation}${e.ellipsis}${e.copyright}${e.registeredTrademark}${e.soundRecordingCopyright}])([${e.spaces}]?)([${e.uppercaseChars}])([${e.spaces}])`,
      "g"
    ),
    `$1$2$3${e.nbsp}`
  ), e.locale == "en-us" && (n = n.replace(
    new RegExp(
      `(^|[${e.spaces}])(I)([${e.spaces}])`,
      "g"
    ),
    `$1$2${e.nbsp}`
  )), n;
}
function Y(n, e) {
  return n.replace(
    new RegExp(`([${e.spaces}])(${e.ampersand})([${e.spaces}])`, "g"),
    ` $2${e.nbsp}`
  );
}
function l(n, e) {
  return n.replace(
    new RegExp(
      `([^${e.nbsp}${e.cardinalNumber}]|^)(${e.cardinalNumber}{1,2})([${e.spaces}])([${e.allChars}])`,
      "g"
    ),
    `$1$2${e.nbsp}$4`
  );
}
function ee(n, e) {
  return n.replace(
    new RegExp(
      `([^${e.nbsp}${e.cardinalNumber}_%\\-]|^)(${e.cardinalNumber}{1,2})(${e.ordinalIndicator})([${e.spaces}]?)([${e.allChars}])`,
      "g"
    ),
    `$1$2$3${e.nbsp}$5`
  );
}
function ne(n, e) {
  let t = "";
  switch (e.locale) {
    case "en-us":
    case "rue":
    case "sk":
    case "cs":
      t = `$1$2${e.nbsp}$4$5${e.nbsp}$7`;
      break;
    case "de-de":
      t = `$1$2${e.nbsp}$4$5${e.space}$7`;
      break;
  }
  return n.replace(
    new RegExp(
      `(${e.cardinalNumber})(${e.ordinalIndicator})([${e.spaces}]?)(${e.cardinalNumber})(${e.ordinalIndicator})([${e.spaces}]?)(${e.cardinalNumber})`,
      "g"
    ),
    t
  );
}
function te(n, e) {
  return e.romanOrdinalIndicator != "" ? n.replace(
    new RegExp(
      `(\\b)([${e.romanNumerals}]+)(${e.romanOrdinalIndicator})([${e.spaces}]?)([${e.allChars}${e.cardinalNumber}])`,
      "g"
    ),
    `$1$2$3${e.nbsp}$5`
  ) : n;
}
function pe(n, e) {
  let t = `(\\b[${e.uppercaseChars}][${e.lowercaseChars}]+?)([${e.spaces}])([${e.romanNumerals}]+\\b)(${e.romanOrdinalIndicator})([${e.nbsp}]?)`, r = new RegExp(t, "g");
  return n.replace(r, function(p, $, s, u, i, o) {
    return o == "" && u == "I" ? $ + e.space + u + i : o == "" && u != "I" ? $ + e.nbsp + u + i : o == e.nbsp && u == "I" ? $ + e.space + u + i + o : $ + e.nbsp + u + i + e.space;
  });
}
function re(n, e) {
  var r;
  const t = {
    "en-us": () => "",
    sk: (p) => `${p.nbsp}`,
    cs: (p) => `${p.nbsp}`,
    rue: (p) => `${p.nbsp}`,
    "de-de": (p) => `${p.narrowNbsp}`
  };
  return n.replace(
    new RegExp(
      `(\\d)([${e.spaces}])([${e.percent}${e.permille}${e.permyriad}])`,
      "g"
    ),
    `$1${(r = t[e.locale]) == null ? void 0 : r.call(t, e)}$3`
  );
}
function $e(n, e) {
  let t = e.uppercaseChars;
  e.locale == "en-us" && (t = t.replace(/A-Z/g, "A-HJ-Z"));
  let r = `([^${e.sentencePunctuation}${e.ellipsis}${e.closingBrackets}${e.rightDoubleQuote}${e.rightSingleQuote}${e.apostrophe}${e.multiplicationSign}${e.emDash}${e.enDash}])([${e.spaces}])([${t}])(([${e.spaces}])|(\\.$|$))`, p = new RegExp(r, "g");
  return n.replace(p, function($, s, u, i, o, a) {
    return e.locale == "en-us" ? s + e.nbsp + i + o : i == "I" && (a == e.nbsp || a == e.hairSpace || a == e.narrowNbsp) ? s + e.nbsp + i + e.space : s + e.nbsp + i + o;
  });
}
function ue(n, e, t) {
  return n.replace(
    new RegExp(`(${e})([^${t.spaces}])`, "g"),
    `$1${t.nbsp}$2`
  );
}
function se(n, e, t) {
  return n.replace(
    new RegExp(`(${e})([${t.spaces}])`, "g"),
    `$1${t.nbsp}`
  );
}
function ie(n, e) {
  return n = V(n, e), n = g(n, e), n = Y(n, e), n = l(n, e), n = ee(n, e), n = ne(n, e), n = te(n, e), n = $e(n, e), n = pe(n, e), n = re(n, e), n;
}
function oe(n, e) {
  return n.replace(
    new RegExp(
      `(\\S)([${e.spaces}]{2,})(\\S)`,
      "g"
    ),
    "$1 $3"
  );
}
function ae(n, e, t) {
  let r = n.split(/\r?\n/), p = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g");
  for (let $ = 0; $ < r.length; $++)
    r[$] = r[$].replace(p, function(s, u, i) {
      return t.removeWhitespacesBeforeMarkdownList == !1 && i != "" ? u + i : i;
    });
  return r.join(`
`);
}
function de(n) {
  let e = n.split(/\r?\n/), t = new RegExp("(\\s+$)", "g");
  for (let r = 0; r < e.length; r++)
    e[r] = e[r].replace(t, "");
  return e.join(`
`);
}
function fe(n, e) {
  return n.replace(
    new RegExp(
      `([${e.spaces}])([${e.sentencePausePunctuation}])([^\\-\\)]|$)`,
      "g"
    ),
    "$2$3"
  );
}
function he(n, e) {
  return n.replace(
    new RegExp(
      `([${e.spaces}])([${e.terminalPunctuation}${e.closingBrackets}${e.degree}])`,
      "g"
    ),
    "$2"
  );
}
function be(n, e) {
  return n.replace(
    new RegExp(
      `(${e.cardinalNumber})([${e.spaces}]?)(${e.ordinalIndicator})([${e.spaces}]|\\b)`,
      //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    "$1$3$4"
  );
}
function me(n, e) {
  return n.replace(
    new RegExp(
      `([${e.openingBrackets}])([${e.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function ce(n, e) {
  return n.replace(
    new RegExp(
      `([${e.lowercaseChars}${e.uppercaseChars}])([${e.openingBrackets}])([${e.lowercaseChars}${e.uppercaseChars}${e.ellipsis}])([${e.lowercaseChars}${e.uppercaseChars}${e.ellipsis}${e.closingBrackets}])`,
      "g"
    ),
    function(t, r, p, $, s) {
      return $ == "s" | $ == "S" | $ + s == "es" | $ + s == "ES" ? `${r}${p}${$}${s}` : `${r}${e.space}${p}${$}${s}`;
    }
  );
}
function xe(n, e) {
  return n.replace(
    new RegExp(
      `([${e.lowercaseChars}${e.uppercaseChars}]{2,}|[${e.ellipsis}])([${e.terminalPunctuation}])([${e.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function we(n, e) {
  return n.replace(
    new RegExp(
      `([${e.lowercaseChars}${e.uppercaseChars}]{2,}|[${e.ellipsis}])([${e.sentencePausePunctuation}])([${e.lowercaseChars}${e.uppercaseChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function ge(n, e) {
  return n.replace(
    new RegExp(
      `([${e.closingBrackets}])([${e.lowercaseChars}${e.uppercaseChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function Se(n, e, t) {
  return n.replace(
    new RegExp(`([^${t.spaces}${t.openingBrackets}])(${e})`, "g"),
    `$1${t.space}$2`
  );
}
function Ee(n, e, t) {
  return n = oe(n, e), n = ae(n, e, t), n = de(n), n = fe(n, e), n = he(n, e), n = be(n, e), n = me(n, e), n = ce(n, e), n = xe(n, e), n = ge(n, e), n = we(n, e), n;
}
function Re(n) {
  return n.replace(
    new RegExp(
      "\\.{2}(?![\\\\/])",
      "g"
    ),
    "."
  );
}
function _e(n) {
  return Re(n);
}
function Qe(n, e) {
  return n.replace(new RegExp(`[${e.ellipsis}\\.]{3,}`, "g"), e.ellipsis);
}
function ye(n, e) {
  return n.replace(
    new RegExp(
      `\\.${e.ellipsis}|${e.ellipsis}{2,}|${e.ellipsis}\\.`,
      "g"
    ),
    e.ellipsis
  );
}
function Ce(n, e) {
  return n.replace(
    new RegExp(`[${e.spaces}]\\.{2}[${e.spaces}]`, "g"),
    `${e.space}${e.ellipsis}${e.space}`
  );
}
function Ae(n, e) {
  return n.replace(
    new RegExp(
      `(,)([${e.spaces}]?)(${e.ellipsis})([${e.spaces}]?)(,)`,
      "g"
    ),
    `$1 ${e.ellipsis}$5`
  );
}
function De(n, e) {
  return n.replace(
    new RegExp(
      `(,)([${e.spaces}]?)(${e.ellipsis})([${e.spaces}]?)(\\B|[${e.closingBrackets}])([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}
function Pe(n, e) {
  return n.replace(
    new RegExp(
      `(^${e.ellipsis})([${e.spaces}])([${e.lowercaseChars}${e.uppercaseChars}])`,
      "gm"
    ),
    "$1$3"
  );
}
function ve(n, e) {
  return n.replace(
    new RegExp(
      `([${e.sentencePunctuation}${e.terminalQuotes}])([${e.spaces}]?)([${e.ellipsis}])([${e.spaces}]?)([${e.lowercaseChars}])`,
      "g"
    ),
    "$1 $3$5"
  );
}
function Ne(n, e) {
  return n.replace(
    new RegExp(
      `([${e.lowercaseChars}])([${e.spaces}])([${e.ellipsis}])([${e.spaces}]?)([${e.uppercaseChars}])`,
      "g"
    ),
    "$1$3 $5"
  );
}
function Be(n, e) {
  return n.replace(
    new RegExp(
      `([${e.allChars}])([${e.ellipsis}])([${e.allChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}
function We(n, e) {
  return n.replace(
    new RegExp(
      `([${e.sentencePunctuation}${e.terminalQuotes}])([${e.spaces}]?)(${e.ellipsis})([${e.spaces}]?)([${e.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}
function ke(n, e) {
  return n.replace(
    new RegExp(
      `([${e.lowercaseChars}])([${e.spaces}])+([${e.ellipsis}][${e.rightDoubleQuote}${e.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}
function qe(n, e) {
  return n = Qe(n, e), n = Ae(n, e), n = De(n, e), n = Pe(n, e), n = ve(n, e), n = Ne(n, e), n = Be(n, e), n = We(n, e), n = ke(n, e), n = ye(n, e), n = Ce(n, e), n;
}
function Ie(n, e) {
  return n = n.replace(
    new RegExp(
      `([${e.allChars}])(-)([${e.spaces}])([${e.allChars}])`,
      "g"
    ),
    "$1-$4"
  ), n = n.replace(
    new RegExp(
      `([${e.allChars}])([${e.spaces}])(-)([${e.allChars}])`,
      "g"
    ),
    "$1-$4"
  ), n;
}
function Me(n, e) {
  return n = Ie(n, e), n;
}
function Le(n) {
  return n.replace(/(---)/g, "—");
}
function Oe(n) {
  return n.replace(/(--)/g, "–");
}
function Te(n, e) {
  var r;
  const t = {
    "en-us": (p) => `${p.emDash}`,
    rue: (p) => `${p.hairSpace}${p.emDash}${p.hairSpace}`,
    sk: (p) => `${p.hairSpace}${p.emDash}${p.hairSpace}`,
    cs: (p) => `${p.nbsp}${p.enDash}${p.space}`,
    "de-de": (p) => `${p.hairSpace}${p.enDash}${p.hairSpace}`
  };
  return n.replace(
    new RegExp(
      `([${e.allChars}\\d])([${e.spaces}]*[${e.enDash}${e.emDash}][${e.spaces}]*|[${e.spaces}]+[${e.hyphen}][${e.spaces}]+)([${e.allChars}\\d])`,
      "g"
    ),
    `$1${(r = t[e.locale]) == null ? void 0 : r.call(t, e)}$3`
  );
}
function ze(n, e) {
  var r;
  const t = {
    "en-us": (p) => `$1${p.emDash}$5`,
    rue: (p) => `$1${p.hairSpace}${p.emDash}$5`,
    sk: (p) => `$1${p.hairSpace}${p.emDash}$5`,
    cs: (p) => `$1${p.nbsp}${p.enDash}$5`,
    "de-de": (p) => `$1${p.hairSpace}${p.enDash}$5`
  };
  return n.replace(
    new RegExp(
      `([${e.allChars}])([${e.spaces}]?)(${e.hyphen})([${e.spaces}]?)([${e.sentencePunctuation}\\n\\r])`,
      "g"
    ),
    ((r = t[e.locale]) == null ? void 0 : r.call(t, e)) || ""
  );
}
function je(n, e) {
  return n = b(
    n,
    new RegExp(
      `(${e.cardinalNumber})([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)(${e.cardinalNumber})`,
      "g"
    ),
    "$1{{typopo__endash}}$3"
  ), n.replace(
    new RegExp(
      "{{typopo__endash}}",
      "g"
    ),
    e.enDash
  );
}
function Ze(n, e) {
  return n.replace(
    new RegExp(
      `([${e.percent}${e.permille}${e.permyriad}])([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)(${e.cardinalNumber})`,
      "g"
    ),
    `$1${e.enDash}$3`
  );
}
function He(n, e) {
  return n.replace(
    new RegExp(
      `(${e.cardinalNumber})(${e.ordinalIndicator})([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)(${e.cardinalNumber})(${e.ordinalIndicator})`,
      "gi"
    ),
    `$1$2${e.enDash}$4$5`
  );
}
function Xe(n, e) {
  return n = Le(n), n = Oe(n), n = Te(n, e), n = ze(n, e), n = je(n, e), n = Ze(n, e), n = He(n, e), n;
}
const f = "{{typopo__markdown_tick}}";
function S(n, e) {
  return e.keepMarkdownCodeBlocks ? n.replace(/(\s*)(```)/g, `$1${f}${f}${f}`).replace(/(``)(.*?)(``)/g, `${f}${f}$2${f}${f}`).replace(/(`)(.*?)(`)/g, `${f}$2${f}`) : n;
}
function E(n, e) {
  return e.keepMarkdownCodeBlocks ? n.replace(
    new RegExp(
      `${f}`,
      "g"
    ),
    "`"
  ) : n;
}
function Ue(n, e) {
  return n.replace(
    new RegExp(
      `([^${e.romanNumerals}])([${e.sentencePunctuation}])([${e.sentencePunctuation}])(${e.doubleQuoteAdepts})`,
      "g"
    ),
    "$1$2$4"
  );
}
function Fe(n, e) {
  return n.replace(
    new RegExp(
      `([^${e.romanNumerals}])([${e.sentencePunctuation}])(${e.doubleQuoteAdepts})([${e.sentencePunctuation}])`,
      "g"
    ),
    "$1$2$3"
  );
}
function Ge(n, e) {
  return n = n.replace(
    new RegExp(
      `([^0-9]|^)(${e.doubleQuoteAdepts})(.+?)(\\d+)(${e.doubleQuoteAdepts})([${e.terminalPunctuation}${e.ellipsis}])`,
      "g"
    ),
    "$1$2$3$4$6$5"
  ), n = n.replace(
    new RegExp(
      `(\\b\\d{1,3})([${e.spaces}]?)(“|”|\\"|″|‘{2,}|’{2,}|'{2,}|′{2,})`,
      "g"
    ),
    "$1$2{{typopo__double-prime}}"
  ), n;
}
function Je(n, e) {
  return n = n.replace(
    new RegExp(
      `(${e.doubleQuoteAdepts})(\\d+)({{typopo__double-prime}})`,
      "g"
    ),
    "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}"
  ), n = n.replace(
    new RegExp(
      `(${e.doubleQuoteAdepts})(.*?)(${e.doubleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}"
  ), n;
}
function Ke(n, e) {
  return n.replace(
    new RegExp(
      `(${e.doubleQuoteAdepts})([0-9${e.lowercaseChars}${e.uppercaseChars}])`,
      "g"
    ),
    "{{typopo__left-double-quote--standalone}}$2"
  );
}
function Ve(n, e) {
  return n.replace(
    new RegExp(
      `([${e.lowercaseChars}${e.uppercaseChars}${e.sentencePunctuation}${e.ellipsis}])(${e.doubleQuoteAdepts})`,
      "g"
    ),
    "$1{{typopo__right-double-quote--standalone}}"
  );
}
function Ye(n, e) {
  return n.replace(
    new RegExp(
      `([${e.spaces}])(${e.doubleQuoteAdepts})([${e.spaces}])`,
      "g"
    ),
    "$1"
  );
}
function le(n) {
  return n.replace(
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
function en(n, e) {
  return n = n.replace(
    new RegExp(
      `([^${e.sentencePunctuation}])([${e.spaces}])(${e.leftDoubleQuote})([^${e.rightDoubleQuote}]+?)([^${e.romanNumerals}${e.closingBrackets}])([${e.terminalPunctuation}${e.ellipsis}])(${e.rightDoubleQuote})`,
      // 7
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), n = n.replace(
    new RegExp(
      `([^${e.sentencePunctuation}])([${e.spaces}])(${e.leftDoubleQuote})(.+?)([^${e.romanNumerals}])(${e.rightDoubleQuote})([${e.terminalPunctuation}${e.ellipsis}])([${e.spaces}])([${e.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), n = n.replace(
    new RegExp(
      `(^${e.leftDoubleQuote}[^${e.rightDoubleQuote}]+?[^${e.romanNumerals}])(${e.rightDoubleQuote})([${e.terminalPunctuation}${e.ellipsis}])(\\B)`,
      "gm"
    ),
    "$1$3$2$4"
  ), n = n.replace(
    new RegExp(
      `([${e.sentencePunctuation}][${e.spaces}]${e.leftDoubleQuote}[^${e.rightDoubleQuote}]+?[^${e.romanNumerals}])(${e.rightDoubleQuote})([${e.terminalPunctuation}${e.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), n = n.replace(
    new RegExp(
      `([${e.sentencePunctuation}][${e.rightDoubleQuote}][${e.spaces}]${e.leftDoubleQuote}[^${e.rightDoubleQuote}]+?[^${e.romanNumerals}])(${e.rightDoubleQuote})([${e.terminalPunctuation}${e.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$3$2$4"
  ), n;
}
function nn(n, e) {
  return n.replace(/{{typopo__double-prime}}/g, e.doublePrime).replace(
    /({{typopo__left-double-quote}}|{{typopo__left-double-quote--standalone}})/g,
    e.leftDoubleQuote
  ).replace(
    /({{typopo__right-double-quote}}|{{typopo__right-double-quote--standalone}})/g,
    e.rightDoubleQuote
  );
}
function tn(n, e) {
  return n.replace(
    new RegExp(
      `([${e.sentencePunctuation}])([,])(${e.rightDoubleQuote})`,
      "g"
    ),
    "$1$3"
  );
}
function pn(n, e) {
  return n = n.replace(
    new RegExp(
      `(${e.leftDoubleQuote})([${e.spaces}])`,
      "g"
    ),
    "$1"
  ), n = n.replace(
    new RegExp(
      `([${e.spaces}])(${e.rightDoubleQuote})`,
      "g"
    ),
    "$2"
  ), n = n.replace(
    new RegExp(
      `([${e.spaces}])(${e.doublePrime})`,
      "g"
    ),
    "$2"
  ), n;
}
function rn(n, e) {
  return n = n.replace(
    new RegExp(
      `([${e.sentencePunctuation}${e.allChars}])([${e.leftDoubleQuote}])`,
      "g"
    ),
    "$1 $2"
  ), n = g(n, e), n;
}
function $n(n, e) {
  return n.replace(
    new RegExp(
      `([${e.rightDoubleQuote}])([${e.allChars}])`,
      "g"
    ),
    "$1 $2"
  );
}
function un(n, e, t) {
  return n = S(n, t), n = Ue(n, e), n = Fe(n, e), n = Ge(n, e), n = Je(n, e), n = Ke(n, e), n = Ve(n, e), n = Ye(n, e), n = le(n), n = nn(n, e), n = E(n, t), n = pn(n, e), n = rn(n, e), n = $n(n, e), n = en(n, e), n = tn(n, e), n;
}
function sn(n, e) {
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
  ].forEach((r) => {
    n = n.replace(
      new RegExp(
        `(${r[0]})([${e.spaces}]?)(${e.singleQuoteAdepts})(n)(${e.singleQuoteAdepts})([${e.spaces}]?)(${r[1]})`,
        "gi"
      ),
      `$1${e.nbsp}{{typopo__apostrophe}}$4{{typopo__apostrophe}}${e.nbsp}$7`
    );
  }), n;
}
function on(n, e) {
  let t = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";
  return n.replace(
    new RegExp(
      `(${e.singleQuoteAdepts})(${t})`,
      "gi"
    ),
    "{{typopo__apostrophe}}$2"
  );
}
function an(n, e) {
  return n.replace(
    new RegExp(
      `(\\Bin)(${e.singleQuoteAdepts})`,
      "gi"
    ),
    "$1{{typopo__apostrophe}}"
  );
}
function dn(n, e) {
  return n.replace(
    new RegExp(
      `([${e.cardinalNumber}${e.allChars}])(${e.singleQuoteAdepts})+([${e.allChars}])`,
      "g"
    ),
    "$1{{typopo__apostrophe}}$3"
  );
}
function fn(n, e) {
  return n.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])([${e.spaces}])(${e.singleQuoteAdepts})([${e.cardinalNumber}]{2})`,
      "g"
    ),
    "$1$2{{typopo__apostrophe}}$4"
  );
}
function hn(n) {
  return n.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}
function bn(n, e) {
  return n.replace(
    new RegExp(
      `(^|[${e.spaces}${e.emDash}${e.enDash}])(${e.singleQuoteAdepts}|,)([${e.allChars}${e.ellipsis}])`,
      "g"
    ),
    "$1{{typopo__left-single-quote--standalone}}$3"
  );
}
function mn(n, e) {
  return n.replace(
    new RegExp(
      `([${e.allChars}])([${e.sentencePunctuation}${e.ellipsis}])?(${e.singleQuoteAdepts})([ ${e.sentencePunctuation}])?`,
      "g"
    ),
    "$1$2{{typopo__right-single-quote--standalone}}$4"
  );
}
function cn(n, e) {
  return n.replace(
    // prettier-ignore
    new RegExp(
      `(${e.doubleQuoteAdepts})(.*?)(${e.doubleQuoteAdepts})`,
      "g"
    ),
    function(t, r, p, $) {
      return p = bn(p, e), p = mn(p, e), p = xn(p), r + p + $;
    }
  );
}
function xn(n) {
  return n.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  );
}
function wn(n, e) {
  return n.replace(
    new RegExp(
      `(\\B)(${e.singleQuoteAdepts})([${e.allChars}]+)(${e.singleQuoteAdepts})(\\B)`,
      "g"
    ),
    "$1{{typopo__left-single-quote}}$3{{typopo__right-single-quote}}$5"
  );
}
function gn(n, e) {
  return n.replace(
    new RegExp(
      `(${e.singleQuoteAdepts})`,
      "g"
    ),
    "{{typopo__apostrophe}}"
  );
}
function Sn(n) {
  return n = n.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})(.*?)({{typopo__single-prime}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  ), n = n.replace(
    new RegExp(
      "({{typopo__single-prime}})(.*?)({{typopo__right-single-quote--standalone}})",
      "g"
    ),
    "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}"
  ), n;
}
function En(n, e) {
  return n = n.replace(
    new RegExp(
      `([^${e.sentencePunctuation}])([${e.spaces}])(${e.leftSingleQuote})([^${e.rightSingleQuote}]+?)([^${e.romanNumerals}])([${e.terminalPunctuation}${e.ellipsis}])(${e.rightSingleQuote})`,
      "g"
    ),
    "$1$2$3$4$5$7$6"
  ), n = n.replace(
    new RegExp(
      `([^${e.sentencePunctuation}])([${e.spaces}])(${e.leftSingleQuote})(.+?)([^${e.romanNumerals}])(${e.rightSingleQuote})([${e.terminalPunctuation}${e.ellipsis}])([${e.spaces}])([${e.lowercaseChars}])`,
      "g"
    ),
    "$1$2$3$4$5$7$6$8$9"
  ), n = n.replace(
    new RegExp(
      `([${e.sentencePunctuation}][${e.spaces}]|^)(${e.leftSingleQuote})([^${e.rightSingleQuote}]+?)([^${e.romanNumerals}])(${e.rightSingleQuote})([${e.terminalPunctuation}${e.ellipsis}])(\\B)`,
      "g"
    ),
    "$1$2$3$4$6$5$7"
  ), n;
}
function Rn(n, e) {
  return n.replace(
    new RegExp(
      `([${e.spaces}])(${e.singlePrime})`,
      "g"
    ),
    "$2"
  );
}
function _n(n, e) {
  return n = n.replace(/({{typopo__single-prime}})/g, e.singlePrime), n = n.replace(
    /{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g,
    e.apostrophe
  ), n = n.replace(/{{typopo__left-single-quote}}/g, e.leftSingleQuote), n = n.replace(/{{typopo__right-single-quote}}/g, e.rightSingleQuote), n = n.replace(/{{typopo__markdown_syntax_highlight}}/g, "```"), n;
}
function Qn(n, e, t) {
  return n = S(n, t), n = sn(n, e), n = on(n, e), n = dn(n, e), n = fn(n, e), n = an(n, e), n = hn(n), n = wn(n, e), n = cn(n, e), n = Sn(n), n = gn(n, e), n = _n(n, e), n = E(n, t), n = En(n, e), n = Rn(n, e), n;
}
function yn(n, e) {
  return b(
    n,
    new RegExp(
      `([${e.cardinalNumber}]+)([${e.spaces}]?[${e.lowercaseChars}${e.singlePrime}${e.doublePrime}]*)([${e.spaces}][x][${e.spaces}])([${e.cardinalNumber}]+)([${e.spaces}]?[${e.lowercaseChars}${e.singlePrime}${e.doublePrime}]*)`,
      "gi"
    ),
    `$1$2${e.nbsp}${e.multiplicationSign}${e.nbsp}$4$5`
  );
}
function Cn(n, e) {
  return b(
    n,
    new RegExp(
      `([${e.allChars}]+)([${e.spaces}][x][${e.spaces}])([${e.allChars}]+)`,
      "g"
    ),
    `$1${e.nbsp}${e.multiplicationSign}${e.nbsp}$3`
  );
}
function An(n, e) {
  return n.replace(
    new RegExp(
      `([${e.cardinalNumber}])([${e.spaces}]?)([x|×])([${e.spaces}])([${e.lowercaseChars}]+)`,
      "gi"
    ),
    function(t, r, p, $, s, u) {
      return p == "" ? `${r}${p}${e.multiplicationSign}${e.nbsp}${u}` : `${r}${e.nbsp}${e.multiplicationSign}${e.nbsp}${u}`;
    }
  );
}
function Dn(n, e) {
  return n.replace(
    new RegExp(
      `([${e.cardinalNumber}]+)([${e.singlePrime}${e.doublePrime}])?([x|×])([${e.cardinalNumber}]+)([${e.singlePrime}${e.doublePrime}])?`,
      "gi"
    ),
    `$1$2${e.nbsp}${e.multiplicationSign}${e.nbsp}$4$5`
  );
}
function Pn(n, e) {
  return n = yn(n, e), n = Cn(n, e), n = An(n, e), n = Dn(n, e), n;
}
function vn(n, e) {
  return n.replace(
    new RegExp(
      `([^${e.spaces}${e.sectionSign}${e.openingBrackets}])(${e.sectionSign})`,
      "g"
    ),
    `$1${e.space}$2`
  );
}
function Nn(n, e) {
  return n.replace(
    new RegExp(
      `(${e.sectionSign})([^${e.spaces}${e.sectionSign}])`,
      "g"
    ),
    `$1${e.nbsp}$2`
  );
}
function Bn(n, e) {
  return n.replace(
    new RegExp(
      `(${e.sectionSign})([${e.spaces}])`,
      "g"
    ),
    `$1${e.nbsp}`
  );
}
function Wn(n, e) {
  return n = vn(n, e), n = Nn(n, e), n = Bn(n, e), n;
}
function x(n, e, t, r) {
  return n.replace(
    new RegExp(
      `(\\(${e}\\))([${r.spaces}]*)(${r.cardinalNumber})`,
      "gi"
    ),
    `${t}$2$3`
  );
}
function w(n, e, t) {
  return n = Se(n, e, t), n = ue(n, e, t), n = se(n, e, t), n;
}
function kn(n, e) {
  return n = x(n, "c", e.copyright, e), n = w(n, e.copyright, e), n = x(n, "p", e.soundRecordingCopyright, e), n = w(n, e.soundRecordingCopyright, e), n;
}
function qn(n, e) {
  return n.replace(
    new RegExp(
      "(\\+\\-)|(\\-\\+)",
      "g"
    ),
    e.plusMinus
  );
}
function m(n, e, t, r) {
  return n.replace(
    new RegExp(
      `([^0-9]|^)([${r.spaces}]*)(\\(${e}\\)|${t})`,
      "gi"
    ),
    `$1${t}`
  );
}
function In(n, e) {
  return n = m(n, "r", e.registeredTrademark, e), n = m(n, "sm", e.serviceMark, e), n = m(n, "tm", e.trademark, e), n;
}
function R(n, e, t, r) {
  let p = "m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym";
  return n.replace(
    new RegExp(`([${e.spaces}${e.slash}])(${p})(${t})`, "g"),
    `$1$2${r}`
  );
}
function Mn(n, e) {
  return R(n, e, "2", "²");
}
function Ln(n, e) {
  return R(n, e, "3", "³");
}
function On(n, e) {
  return n = Mn(n, e), n = Ln(n, e), n;
}
function Tn(n, e) {
  return n.replace(
    new RegExp(
      `([${e.spaces}]+)(${e.numberSign})([${e.spaces}]+)(${e.cardinalNumber})`,
      "g"
    ),
    "$1$2$4"
  );
}
function zn(n, e) {
  return n = Tn(n, e), n;
}
function _(n) {
  return {
    "en-us": "",
    rue: n.nbsp,
    sk: n.nbsp,
    cs: n.nbsp,
    "de-de": n.nbsp
  }[n.locale];
}
function jn(n, e) {
  const t = _(e), r = `([${e.uppercaseChars}][${e.allChars}]?\\.)([${e.spaces}]?)`, p = `([${e.allChars}]{2,}[^\\.])`, $ = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${r}${p}`,
      replacement: `$1${e.nbsp}$3`
    },
    {
      // "I. I. FullName"
      pattern: `${r}${r}${p}`,
      replacement: `$1${t}$3${e.space}$5`
    },
    {
      // "I. I. I. FullName"
      pattern: `${r}${r}${r}${p}`,
      replacement: `$1${t}$3${t}$5${e.space}$7`
    }
  ];
  for (const { pattern: s, replacement: u } of $)
    n = n.replace(new RegExp(s, "g"), u);
  return n;
}
function Zn(n, e) {
  let t = `([^${e.allChars}${e.enDash}${e.emDash}]|^)`, r = `([${e.allChars}]|\\D)`, p = `([^${e.allChars}${e.leftDoubleQuote}${e.leftSingleQuote}${e.backtick}\\p{Emoji}]|$)`;
  const $ = _(e);
  let s = [];
  for (let u = 0; u < e.multipleWordAbbreviations.length; u++) {
    let i = e.multipleWordAbbreviations[u].split(" "), o = "";
    for (let a = 0; a < i.length; a++)
      o += `(${i[a]})(\\.)([${e.spaces}]?)`;
    s[u] = o;
  }
  for (let u = 0; u < s.length; u++) {
    let i = `${t}${s[u]}${r}`, o = "$1", a = (s[u].match(/\(/g) || []).length / 3;
    for (let h = 0; h < a - 1; h++)
      o += `$${h * 3 + 2}.${$}`;
    o += `$${(a - 1) * 3 + 2}. $${a * 3 + 2}`, n = n.replace(new RegExp(i, "gi"), o);
  }
  for (let u = 0; u < s.length; u++) {
    let i = `${t}${s[u]}${p}`, o = "$1", a = (s[u].match(/\(/g) || []).length / 3;
    for (let h = 0; h < a - 1; h++)
      o += `$${h * 3 + 2}.${$}`;
    o += `$${(a - 1) * 3 + 2}.$${a * 3 + 2}`, n = n.replace(new RegExp(i, "giu"), o);
  }
  return n;
}
function Hn(n, e) {
  let t = [];
  for (let u = 0; u < e.singleWordAbbreviations.length; u++)
    t[u] = `(${e.singleWordAbbreviations[u]})(\\.)([${e.spaces}]?)`;
  let r = `([^${e.allChars}${e.enDash}${e.emDash}${e.nbsp}\\.]|^)`, p = `([${e.allChars}\\d]+)([^\\.]|$)`;
  for (let u = 0; u < t.length; u++)
    n = n.replace(
      new RegExp(
        `${r}${t[u]}${p}`,
        "gi"
      ),
      `$1$2$3${e.nbsp}$5$6`
    );
  let $ = `([${e.allChars}\\d])([${e.spaces}])`, s = `([^${e.spaces}${e.allChars}\\d]|$)`;
  for (let u = 0; u < t.length; u++)
    n = n.replace(
      new RegExp(
        `${$}${t[u]}${s}`,
        "gi"
      ),
      `$1${e.nbsp}$3$4$5$6`
    );
  return n;
}
function Xn(n, e) {
  return n = jn(n, e), n = Zn(n, e), n = Hn(n, e), n;
}
function Un(n, e) {
  return n = n.replace(
    new RegExp(
      `([^${e.allChars}]|^)([${e.uppercaseChars}]{2})([${e.lowercaseChars}]{2,})`,
      "g"
    ),
    function(t, r, p, $) {
      return `${r}${p.substring(0, 1)}${p.substring(1).toLowerCase()}${$}`;
    }
  ), n.replace(
    new RegExp(
      `(\\b)(?!iOS)([${e.lowercaseChars}])([${e.uppercaseChars}]{2,})`,
      "g"
    ),
    function(t, r, p, $) {
      return `${r}${p.toUpperCase()}${$.toLowerCase()}`;
    }
  );
}
function Fn(n, e) {
  return n.replace(
    new RegExp(
      `(issn)(:?)([${e.spaces}]?)(\\d{4})([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)(\\d{4})`,
      "gi"
    ),
    `ISSN$2${e.nbsp}$4-$6`
  );
}
function Gn(n, e) {
  let t = `([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)`;
  return n.replace(
    new RegExp(
      `(isbn)(:?)([${e.spaces}]?)(\\d+)` + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${e.nbsp}$4-$6-$8-$10`
  );
}
function Jn(n, e) {
  let t = `([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)`;
  return n.replace(
    new RegExp(
      `(isbn)(:?)([${e.spaces}]?)(\\d+)` + t + "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+)",
      "gi"
    ),
    `ISBN$2${e.nbsp}$4-$6-$8-$10-$12`
  );
}
function Kn(n, e) {
  let t = `([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)`;
  return n.replace(
    new RegExp(
      "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+?)",
      "g"
    ),
    "$1-$3-$5-$7-$9"
  );
}
function Vn(n, e) {
  return n = Fn(n, e), n = Gn(n, e), n = Jn(n, e), n = Kn(n, e), n;
}
function Yn(n, e) {
  let t = [];
  return c(n, e.emailPattern, t), c(n, e.urlPattern, t), c(n, e.filenamePattern, t), { processedText: ln(n, t), exceptions: t };
}
function c(n, e, t) {
  const r = new RegExp(e, "gi"), p = n.match(r);
  return p && p.forEach(($) => t.push($)), t;
}
function ln(n, e) {
  return e.reduce((t, r, p) => {
    const $ = `{{typopo__exception-${p}}}`;
    return t.replace(r, $);
  }, n);
}
function et(n, e) {
  return e.reduce((t, r, p) => {
    const $ = new RegExp(`{{typopo__exception-${p}}}`, "g");
    return t.replace($, r);
  }, n);
}
/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
function nt(n, e, t) {
  e = typeof e > "u" ? "en-us" : e;
  let r = new J(e);
  t = typeof t > "u" ? {
    removeLines: !0,
    removeWhitespacesBeforeMarkdownList: !0,
    keepMarkdownCodeBlocks: !1
  } : t;
  const { processedText: p, exceptions: $ } = Yn(n, r);
  return n = p, t.removeLines && (n = K(n)), n = qe(n, r), n = Ee(n, r, t), n = _e(n), n = Xe(n, r), n = Me(n, r), n = Qn(n, r, t), n = un(n, r, t), n = Pn(n, r), n = Wn(n, r), n = kn(n, r), n = qn(n, r), n = In(n, r), n = On(n, r), n = zn(n, r), n = Un(n, r), n = Xn(n, r), n = Vn(n, r), n = ie(n, r), n = et(n, $), n;
}
export {
  nt as fixTypos
};
