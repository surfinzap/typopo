/*!
 * Typopo v3.0.2 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
var e = {
	singleQuoteAdepts: "‚|'|‘|’|ʼ|‛|´|`|′|‹|›",
	apostrophe: "’",
	singlePrime: "′",
	backtick: "`",
	doubleQuoteAdepts: "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’ʼ'‹›′´`]{2,}",
	doublePrime: "″",
	space: " ",
	nbsp: "\xA0",
	hairSpace: " ",
	narrowNbsp: " ",
	spaces: " \xA0  ",
	terminalPunctuation: "\\.!?",
	sentencePausePunctuation: ",:;",
	sentencePunctuation: ",:;\\.!?",
	openingBrackets: "\\(\\[\\{",
	closingBrackets: "\\)\\]\\}",
	ellipsis: "…",
	hyphen: "-",
	enDash: "–",
	emDash: "—",
	slash: "/",
	degree: "°",
	multiplicationSign: "×",
	ampersand: "&",
	sectionSign: "§",
	paragraphSign: "¶",
	copyright: "©",
	soundRecordingCopyright: "℗",
	registeredTrademark: "®",
	serviceMark: "℠",
	trademark: "™",
	plus: "+",
	minus: "−",
	plusMinus: "±",
	percent: "%",
	permille: "‰",
	permyriad: "‱",
	numberSign: "#",
	numeroSign: "№",
	romanNumerals: "IVXLCDM",
	urlPattern: "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+(?:(?:aero|arpa|asia|agency|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|cloud|com|company|coop|c[acdfghiklmnoruvxyz])|(?:dev|d[ejkmoz])|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|guide|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om|one)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|(?:shop|store|s[abcdeghijklmnortuvyz])|(?:tel|travel|team|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|(?:work|w[fs])|(?:xyz)|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\\:\\d{1,5})?)(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?(?:\\b|$)",
	emailPattern: "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}\\@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+",
	filenamePattern: "\\b[a-zA-Z0-9_%\\-]+\\.(ai|asm|bat|bmp|c|cpp|cs|css|csv|dart|doc|docx|exe|gif|go|html|ics|java|jpeg|jpg|js|json|key|kt|less|lua|log|md|mp4|odp|ods|odt|pdf|php|pl|png|ppt|pptx|psd|py|r|rar|rb|rs|scala|scss|sh|svg|sql|swift|tar.gz|tar|tex|tiff|ts|txt|vbs|xml|xls|xlsx|yaml|yml|zip)\\b"
}, t = {
	cs: {
		quotes: {
			openingDoubleQuote: "„",
			closingDoubleQuote: "“",
			openingSingleQuote: "‚",
			closingSingleQuote: "‘"
		},
		directSpeechIntro: ":",
		dashWords: {
			spaceBefore: e.nbsp,
			dash: e.enDash,
			spaceAfter: e.space
		},
		spaceAfter: {
			copyright: e.space,
			soundRecordingCopyright: e.space,
			numeroSign: e.nbsp,
			sectionSign: e.nbsp,
			paragraphSign: e.nbsp,
			abbreviation: e.nbsp
		},
		spaceBefore: { percent: e.nbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: e.nbsp,
			secondSpace: e.nbsp
		},
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
		multipleWordAbbreviations: [
			"hl m",
			"n l",
			"p n l",
			"př n l"
		]
	},
	"en-us": {
		quotes: {
			openingDoubleQuote: "“",
			closingDoubleQuote: "”",
			openingSingleQuote: "‘",
			closingSingleQuote: "’"
		},
		directSpeechIntro: ",",
		dashWords: {
			spaceBefore: "",
			dash: e.emDash,
			spaceAfter: ""
		},
		spaceAfter: {
			copyright: e.nbsp,
			soundRecordingCopyright: e.nbsp,
			numeroSign: e.nbsp,
			sectionSign: e.nbsp,
			paragraphSign: e.nbsp,
			abbreviation: ""
		},
		spaceBefore: { percent: "" },
		numbers: {
			ordinalIndicator: "st|nd|rd|th",
			romanOrdinalIndicator: ""
		},
		ordinalDate: {
			firstSpace: e.nbsp,
			secondSpace: e.nbsp
		},
		singleWordAbbreviations: [
			"p",
			"pp",
			"no",
			"vol"
		],
		multipleWordAbbreviations: [
			"U S",
			"e g",
			"i e",
			"a m",
			"p m"
		]
	},
	rue: {
		quotes: {
			openingDoubleQuote: "«",
			closingDoubleQuote: "»",
			openingSingleQuote: "‹",
			closingSingleQuote: "›"
		},
		directSpeechIntro: ":",
		dashWords: {
			spaceBefore: e.hairSpace,
			dash: e.emDash,
			spaceAfter: e.hairSpace
		},
		spaceAfter: {
			copyright: e.nbsp,
			soundRecordingCopyright: e.nbsp,
			numeroSign: e.nbsp,
			sectionSign: e.narrowNbsp,
			paragraphSign: e.narrowNbsp,
			abbreviation: e.nbsp
		},
		spaceBefore: { percent: e.nbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: e.nbsp,
			secondSpace: e.nbsp
		},
		singleWordAbbreviations: [
			"ціт",
			"ст",
			"канц",
			"абз",
			"тзв",
			"Зб",
			"ч",
			"напр"
		],
		multipleWordAbbreviations: [
			"т зн",
			"Е Ч",
			"евід ч",
			"род ч",
			"т ч",
			"т д"
		]
	},
	sk: {
		quotes: {
			openingDoubleQuote: "„",
			closingDoubleQuote: "“",
			openingSingleQuote: "‚",
			closingSingleQuote: "‘"
		},
		directSpeechIntro: ":",
		dashWords: {
			spaceBefore: e.hairSpace,
			dash: e.emDash,
			spaceAfter: e.hairSpace
		},
		spaceAfter: {
			copyright: e.nbsp,
			soundRecordingCopyright: e.nbsp,
			numeroSign: e.nbsp,
			sectionSign: e.narrowNbsp,
			paragraphSign: e.narrowNbsp,
			abbreviation: e.nbsp
		},
		spaceBefore: { percent: e.nbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: e.nbsp,
			secondSpace: e.nbsp
		},
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
	},
	"de-de": {
		quotes: {
			openingDoubleQuote: "„",
			closingDoubleQuote: "“",
			openingSingleQuote: "‚",
			closingSingleQuote: "‘"
		},
		directSpeechIntro: ":",
		dashWords: {
			spaceBefore: e.hairSpace,
			dash: e.enDash,
			spaceAfter: e.hairSpace
		},
		spaceAfter: {
			copyright: e.nbsp,
			soundRecordingCopyright: e.nbsp,
			numeroSign: e.nbsp,
			sectionSign: e.nbsp,
			paragraphSign: e.nbsp,
			abbreviation: e.nbsp
		},
		spaceBefore: { percent: e.narrowNbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: e.nbsp,
			secondSpace: e.space
		},
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
	},
	"de-ch": {
		quotes: {
			openingDoubleQuote: "«",
			closingDoubleQuote: "»",
			openingSingleQuote: "‹",
			closingSingleQuote: "›"
		},
		directSpeechIntro: ":",
		dashWords: {
			spaceBefore: e.nbsp,
			dash: e.enDash,
			spaceAfter: e.space
		},
		spaceAfter: {
			copyright: e.nbsp,
			soundRecordingCopyright: e.nbsp,
			numeroSign: e.nbsp,
			sectionSign: e.nbsp,
			paragraphSign: e.nbsp,
			abbreviation: e.nbsp
		},
		spaceBefore: { percent: e.narrowNbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: "",
			secondSpace: ""
		},
		singleWordAbbreviations: /* @__PURE__ */ "Abk.Abs.Abt.abw.allg.Anh.Anm.Bd.Bde.Bem.bes.betr.Bsp.bzw.dgl.eidg.Einl.evtl.exkl.Ex.frz.geb.ggf.inkl.int.Jg.Jh.Kap.Kt.kt.Lit.lt.mat.Mio.Mia.Mrd.öff.ppa.Prot.Red.Reg.ref.schweiz.sog.spez.St.usw.Verf.vgl.vs.Vw.Ziff.zzt".split("."),
		multipleWordAbbreviations: [
			"a A",
			"d h",
			"i V",
			"m E",
			"m W",
			"o Ä",
			"u a",
			"u Ä",
			"u a m",
			"u U",
			"z B",
			"z Hd",
			"z H",
			"z T"
		]
	}
}, n = "en-us", r = class {
	constructor(e) {
		t[e] || (console.warn(`Locale '${e}' not found, falling back to '${n}'`), e = n), this.ID = e, this.openingSingleQuote = t[e].quotes.openingSingleQuote, this.closingSingleQuote = t[e].quotes.closingSingleQuote, this.openingDoubleQuote = t[e].quotes.openingDoubleQuote, this.closingDoubleQuote = t[e].quotes.closingDoubleQuote, this.terminalQuotes = this.closingSingleQuote + this.closingDoubleQuote, this.directSpeechIntro = t[e].directSpeechIntro, this.dashWords = t[e].dashWords, this.spaceAfter = t[e].spaceAfter, this.spaceBefore = t[e].spaceBefore, this.ordinalIndicator = t[e].numbers.ordinalIndicator, this.romanOrdinalIndicator = t[e].numbers.romanOrdinalIndicator, this.ordinalDate = t[e].ordinalDate, this.singleWordAbbreviations = [];
		for (let e in t) this.singleWordAbbreviations = this.singleWordAbbreviations.concat(t[e].singleWordAbbreviations);
		this.multipleWordAbbreviations = [];
		for (let e in t) this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(t[e].multipleWordAbbreviations);
		let r = [];
		for (let e in t) {
			let n = t[e].directSpeechIntro;
			n && !r.includes(n) && r.push(n);
		}
		this.directSpeechIntroAdepts = r.join("");
	}
};
//#endregion
//#region src/modules/whitespace/lines.js
function i(e) {
	return e.replace(/[\n\r]{2,}/gm, "\n");
}
//#endregion
//#region src/utils/regex-overlap.js
function a(e, t, n) {
	let r = 0, i = e, a = "";
	for (; i !== a && r < 50;) a = i, i = i.replace(t, n), r++;
	return i;
}
//#endregion
//#region src/modules/whitespace/nbsp.js
function o(t) {
	return a(t, RegExp(`([\\p{L}]{2,})([${e.nbsp}${e.narrowNbsp}])([\\p{L}]{2,})`, "gu"), "$1 $3");
}
function s(t, n) {
	return t = a(t, RegExp(`(^|[${e.space}]|[^\\p{L}\\d${e.apostrophe}${e.plus}${e.minus}${e.hyphen}])([\\p{Ll}])([${e.space}])`, "gu"), `$1$2${e.nbsp}`), t = t.replace(RegExp(`(^|[${e.sentencePunctuation}${e.ellipsis}${e.copyright}${e.registeredTrademark}${e.soundRecordingCopyright}])([${e.spaces}]?)([\\p{Lu}])([${e.spaces}])`, "gu"), `$1$2$3${e.nbsp}`), n.ID == "en-us" && (t = t.replace(RegExp(`(^|[${e.spaces}])(I)([${e.spaces}])`, "g"), `$1$2${e.nbsp}`)), t;
}
function c(t) {
	return t.replace(RegExp(`([${e.spaces}])(${e.ampersand})([${e.spaces}])`, "g"), ` $2${e.nbsp}`);
}
function l(t) {
	return t.replace(RegExp(`([^${e.nbsp}\\d]|^)(\\d{1,2})([${e.spaces}])([\\p{L}])`, "gu"), `\$1\$2${e.nbsp}$4`);
}
function u(t, n) {
	return t.replace(RegExp(`([^${e.nbsp}\\d_%\\-]|^)(\\d{1,2})(${n.ordinalIndicator})([${e.spaces}]?)([\\p{L}])`, "gu"), `$1$2$3${e.nbsp}$5`);
}
function d(t, n) {
	return t.replace(RegExp(`(\\d{1,2})(\\.)([${e.spaces}]?)(\\d{1,2})(\\.)([${e.spaces}]?)(\\d{4})`, "g"), `$1$2${n.ordinalDate.firstSpace}$4$5${n.ordinalDate.secondSpace}$7`);
}
function ee(t, n) {
	return n.romanOrdinalIndicator == "" ? t : t.replace(RegExp(`(\\b[\\p{Lu}][\\p{L}]?${n.romanOrdinalIndicator}[${e.spaces}]?)?(\\b)([${e.romanNumerals}]+)(${n.romanOrdinalIndicator})([${e.spaces}]?)([\\p{L}\\d])`, "gu"), function(t, n, r, i, a, o, s) {
		return n ? t : `${r}${i}${a}${e.nbsp}${s}`;
	});
}
function te(t, n) {
	let r = `(\\b[\\p{Lu}][\\p{Ll}]+?)([${e.spaces}])([${e.romanNumerals}]+\\b)(${n.romanOrdinalIndicator})([${e.nbsp}]?)`, i = new RegExp(r, "gu");
	return t.replace(i, function(t, n, r, i, a, o) {
		let s = i.startsWith("M") || i.startsWith("D") || i.startsWith("C"), c = i === "I", l = o === e.nbsp;
		return s ? n + e.space + i + a + o : c ? n + e.space + i + a + (l ? o : "") : n + e.nbsp + i + a + (l ? e.space : "");
	});
}
function ne(t, n) {
	return t.replace(RegExp(`(\\d)([${e.spaces}])([${e.percent}${e.permille}${e.permyriad}])`, "gu"), `$1${n.spaceBefore.percent}$3`);
}
function re(t, n) {
	let r = `([^${e.sentencePunctuation}${e.ellipsis}${e.closingBrackets}${n.closingDoubleQuote}${n.closingSingleQuote}${e.apostrophe}${e.multiplicationSign}${e.emDash}${e.enDash}])([${e.spaces}])([\\p{Lu}])([${e.spaces}]|\\.$|$)`, i = new RegExp(r, "gu");
	return t.replace(i, function(t, r, i, a, o) {
		return n.ID === "en-us" && a === "I" ? t : n.ID === "en-us" ? r + e.nbsp + a + o : a === "I" && o && e.spaces.includes(o) ? r + e.nbsp + a + e.space : r + e.nbsp + a + o;
	});
}
function ie(t, n, r) {
	return r = r === void 0 ? e.nbsp : r, t.replace(RegExp(`(${n})([^${e.spaces}${n}])`, "g"), `$1${r}$2`);
}
function ae(t, n, r) {
	return r = r === void 0 ? e.nbsp : r, t.replace(RegExp(`(${n})([${e.spaces}]+)`, "g"), `$1${r}`);
}
function oe(e, t) {
	return e = o(e), e = s(e, t), e = c(e), e = l(e), e = u(e, t), e = d(e, t), e = ee(e, t), e = re(e, t), e = te(e, t), e = ne(e, t), e;
}
//#endregion
//#region src/modules/whitespace/spaces.js
function f(t) {
	return t.replace(RegExp(`(\\S)([${e.spaces}]{2,})(\\S)`, "g"), "$1 $3");
}
function p(e) {
	return e.split(/\r?\n/).map((e) => e.replace(/^\s+/, "")).join("\n");
}
function m(e) {
	return e.split(/\r?\n/).map((e) => e.replace(/\s+$/, "")).join("\n");
}
function h(t) {
	return t.replace(RegExp(`([${e.spaces}])([${e.sentencePausePunctuation}])([^\\-\\)]|$)`, "g"), "$2$3");
}
function g(t) {
	return t.replace(RegExp(`([^${e.openingBrackets}])([${e.spaces}])([${e.terminalPunctuation}${e.closingBrackets}${e.degree}])`, "g"), "$1$3");
}
function _(t, n) {
	return t.replace(RegExp(`(\\d)([${e.spaces}]?)(${n.ordinalIndicator})([${e.spaces}]|\\b)`, "g"), "$1$3$4");
}
function v(t) {
	return t.replace(RegExp(`([${e.openingBrackets}])([${e.spaces}])([^${e.closingBrackets}])`, "g"), "$1$3");
}
function y(t) {
	return t.replace(RegExp(`([\\p{L}])([${e.openingBrackets}])([\\p{L}${e.ellipsis}])([\\p{L}${e.ellipsis}${e.closingBrackets}])`, "gu"), function(t, n, r, i, a) {
		return i == "s" | i == "S" | i + a == "es" | i + a == "ES" ? `${n}${r}${i}${a}` : `${n}${e.space}${r}${i}${a}`;
	});
}
function b(t) {
	return t.replace(RegExp(`([\\p{L}]{2,}|[${e.ellipsis}])([${e.terminalPunctuation}])([\\p{Lu}])`, "gu"), "$1$2 $3");
}
function x(t) {
	return t.replace(RegExp(`([\\p{L}]{2,}|[${e.ellipsis}])([${e.sentencePausePunctuation}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function S(t) {
	return t.replace(RegExp(`([${e.closingBrackets}])([\\p{L}])`, "gu"), "$1 $2");
}
function C(t, n) {
	return t.replace(RegExp(`([^${e.spaces}${e.openingBrackets}${n}])(${n})`, "g"), `$1${e.space}$2`);
}
function w(e, t) {
	return e = f(e), e = p(e), e = m(e), e = h(e), e = g(e), e = _(e, t), e = v(e), e = y(e), e = b(e), e = S(e), e = x(e), e;
}
//#endregion
//#region src/modules/punctuation/period.js
function T(e) {
	return e.replace(RegExp("\\.{2}(?![\\\\/])", "g"), ".");
}
function E(e) {
	return T(e);
}
//#endregion
//#region src/modules/punctuation/ellipsis.js
function D(t) {
	return t.replace(RegExp(`[${e.ellipsis}\\.]{3,}`, "g"), e.ellipsis);
}
function O(t) {
	return t.replace(RegExp(`\\.${e.ellipsis}|${e.ellipsis}{2,}|${e.ellipsis}\\.`, "g"), e.ellipsis);
}
function k(t) {
	return t.replace(RegExp(`[${e.spaces}]\\.{2}[${e.spaces}]`, "g"), `${e.space}${e.ellipsis}${e.space}`);
}
function A(t) {
	return t.replace(RegExp(`(,)([${e.spaces}]?)(${e.ellipsis})([${e.spaces}]?)(,)`, "g"), `$1 ${e.ellipsis}$5`);
}
function j(t) {
	return t.replace(RegExp(`(,)([${e.spaces}]?)(${e.ellipsis})([${e.spaces}]?)(\\B|[${e.closingBrackets}])([^,]|$)`, "g"), "$1$3$5$6");
}
function M(t) {
	return t.replace(RegExp(`(^${e.ellipsis})([${e.spaces}])([\\p{L}])`, "gmu"), "$1$3");
}
function N(t, n) {
	return t.replace(RegExp(`([^${n.terminalQuotes}])([${e.sentencePunctuation}])([${e.spaces}]?)([${e.ellipsis}])([${e.spaces}]?)([\\p{Ll}])`, "gu"), "$1$2 $4$6");
}
function P(t) {
	return t.replace(RegExp(`([\\p{Ll}])([${e.spaces}])([${e.ellipsis}])([${e.spaces}]?)([\\p{Lu}])`, "gu"), "$1$3 $5");
}
function F(t) {
	return t.replace(RegExp(`([\\p{L}])([${e.ellipsis}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function I(t, n) {
	return t.replace(RegExp(`([${e.sentencePunctuation}${n.terminalQuotes}])([${e.spaces}]?)(${e.ellipsis})([${e.spaces}]?)([\\p{Lu}])`, "gu"), "$1 $3 $5");
}
function L(t, n) {
	return t.replace(RegExp(`([\\p{Ll}])([${e.spaces}])+([${e.ellipsis}][${n.closingDoubleQuote}${n.closingSingleQuote}]?$)`, "gmu"), "$1$3");
}
function R(e, t) {
	return e = D(e), e = A(e), e = j(e), e = M(e), e = N(e, t), e = P(e), e = F(e), e = I(e, t), e = L(e, t), e = O(e), e = k(e), e;
}
//#endregion
//#region src/markers.js
var z = {
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
	enDash: "",
	tick: ""
}, B = 57856, V = 63743, H = 5888;
function U(e) {
	let t = B + e;
	if (t > V) throw Error(`Exception index ${e} exceeds PUA limit (max ${H}). Text contains too many exceptions (emails/URLs/filenames). Consider processing the text in smaller chunks.`);
	return String.fromCharCode(t);
}
//#endregion
//#region src/modules/punctuation/dash.js
function W(t, n) {
	return t.replace(RegExp(`([\\p{L}\\d])([${e.spaces}]*[${e.enDash}${e.emDash}]{1,3}[${e.spaces}]*|[${e.spaces}]+[${e.hyphen}]{1,3}[${e.spaces}]+)([\\p{L}\\d])`, "gu"), `$1${n.dashWords.spaceBefore}${n.dashWords.dash}${n.dashWords.spaceAfter}$3`);
}
function G(t, n) {
	return t.replace(RegExp(`([\\p{L}])([${e.spaces}]?)([${e.hyphen}${e.enDash}${e.emDash}]{1,3})([${e.spaces}]?)([${e.sentencePunctuation}\\n\\r])`, "gu"), `$1${n.dashWords.spaceBefore}${n.dashWords.dash}$5`);
}
function K(t, n) {
	return t = t.replace(RegExp(`([${e.openingBrackets}])[${e.spaces}]*([${e.hyphen}${e.enDash}${e.emDash}]+)[${e.spaces}]*([${e.closingBrackets}])`, "gu"), "$1$2$3"), t = t.replace(RegExp(`([\\p{L}])[${e.spaces}]*[${e.hyphen}${e.enDash}${e.emDash}]{1,3}[${e.spaces}]*([${e.openingBrackets}])`, "gu"), `$1${n.dashWords.spaceBefore}${n.dashWords.dash}${n.dashWords.spaceAfter}$2`), t = t.replace(RegExp(`([${e.closingBrackets}])[${e.spaces}]*[${e.hyphen}${e.enDash}${e.emDash}]{1,3}[${e.spaces}]*([\\p{L}])`, "gu"), `$1${n.dashWords.spaceBefore}${n.dashWords.dash}${n.dashWords.spaceAfter}$2`), t = t.replace(RegExp(`([\\p{L}])[${e.spaces}]*[${e.hyphen}${e.enDash}${e.emDash}]{1,3}[${e.spaces}]*([${e.closingBrackets}])`, "gu"), `$1${n.dashWords.spaceBefore}${n.dashWords.dash}${n.dashWords.spaceAfter}$2`), t = t.replace(RegExp(`([${e.openingBrackets}])[${e.spaces}]*[${e.hyphen}${e.enDash}${e.emDash}]{1,3}[${e.spaces}]*([\\p{L}])`, "gu"), `$1${n.dashWords.spaceBefore}${n.dashWords.dash}${n.dashWords.spaceAfter}$2`), t = t.replace(RegExp(`([${e.closingBrackets}])[${e.spaces}]*[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]*([${e.openingBrackets}])`, "gu"), `$1${n.dashWords.spaceBefore}${n.dashWords.dash}${n.dashWords.spaceAfter}$2`), t;
}
function q(t) {
	return t = a(t, RegExp(`(\\d)([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}]{1,3}[${e.spaces}]?)(\\d)`, "gu"), `$1${z.enDash}$3`), t.replace(RegExp(`${z.enDash}`, "g"), e.enDash);
}
function se(t) {
	return t.replace(RegExp(`([${e.percent}${e.permille}${e.permyriad}])([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}]{1,3}[${e.spaces}]?)(\\d)`, "gu"), `$1${e.enDash}$3`);
}
function ce(t, n) {
	return t.replace(RegExp(`(\\d)(${n.ordinalIndicator})([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}]{1,3}[${e.spaces}]?)(\\d)(${n.ordinalIndicator})`, "giu"), `$1$2${e.enDash}$4$5`);
}
function le(e, t) {
	return e = W(e, t), e = G(e, t), e = K(e, t), e = q(e), e = se(e), e = ce(e, t), e;
}
//#endregion
//#region src/modules/punctuation/double-quotes.js
function ue(t) {
	return t.replace(RegExp(`([^${e.romanNumerals}])([${e.sentencePunctuation}])([${e.sentencePausePunctuation}])(${e.doubleQuoteAdepts})`, "g"), "$1$2$4");
}
function de(t) {
	return t.replace(RegExp(`([^${e.romanNumerals}])([${e.sentencePunctuation}])(${e.doubleQuoteAdepts})([${e.sentencePunctuation}])`, "g"), "$1$2$3");
}
function fe(t) {
	return t = t.replace(RegExp(`([^0-9]|^)(${e.doubleQuoteAdepts})(.+?)(\\d+)(${e.doubleQuoteAdepts})([${e.terminalPunctuation}${e.ellipsis}])`, "g"), "$1$2$3$4$6$5"), t = t.replace(RegExp(`(\\b\\d{1,3})([${e.spaces}]?)(${e.doubleQuoteAdepts})([^\\p{L}]|\\B)`, "gu"), `\$1\$2${z.doublePrime}$4`), t;
}
function pe(t) {
	return t = t.replace(RegExp(`(${e.doubleQuoteAdepts})(\\d+)(${z.doublePrime})`, "g"), `${z.odq}$2${z.cdq}`), t = t.replace(RegExp(`(${e.doubleQuoteAdepts})(.*?)(${e.doubleQuoteAdepts})`, "g"), `${z.odq}$2${z.cdq}`), t;
}
function me(t) {
	return t.replace(RegExp(`(${e.doubleQuoteAdepts})([0-9\\p{L}])`, "gu"), `${z.odqUnpaired}$2`);
}
function he(t) {
	return t.replace(RegExp(`([\\p{L}${e.sentencePunctuation}${e.ellipsis}])(${e.doubleQuoteAdepts})`, "gu"), `$1${z.cdqUnpaired}`);
}
function ge(t) {
	return t.replace(RegExp(`([${e.spaces}])(${e.doubleQuoteAdepts})([${e.spaces}])`, "gu"), "$1");
}
function _e(e) {
	return e.replace(RegExp(`(${z.odqUnpaired})(.*?)(${z.doublePrime})`, "g"), `${z.odq}$2${z.cdq}`).replace(RegExp(`(${z.doublePrime})(.*?)(${z.cdqUnpaired})`, "g"), `${z.odq}$2${z.cdq}`);
}
function ve(t, n) {
	return t.replace(RegExp(`(${n.openingDoubleQuote})([^${e.spaces}${n.closingDoubleQuote}]+?)([^${e.romanNumerals}${e.sentencePunctuation}])([${e.sentencePunctuation}]{1,})(${n.closingDoubleQuote})`, "g"), (e, t, n, r, i, a) => i.length === 1 && /[.,;:]/.test(i) ? t + n + r + a + i : e);
}
function ye(t, n) {
	return t = t.replace(RegExp(`(${n.openingDoubleQuote})(.+)([${e.spaces}])(?!${n.openingDoubleQuote})([^${e.romanNumerals}]{2,})(${n.closingDoubleQuote})([${e.sentencePunctuation}${e.ellipsis}])`, "g"), "$1$2$3$4$6$5"), t = t.replace(RegExp(`([:;])(${n.closingDoubleQuote})`, "g"), "$2$1"), t;
}
function be(t, n) {
	return [
		{
			pattern: z.doublePrime,
			replacement: e.doublePrime
		},
		{
			pattern: `[${z.odq}${z.odqUnpaired}]`,
			replacement: n.openingDoubleQuote
		},
		{
			pattern: `[${z.cdq}${z.cdqUnpaired}]`,
			replacement: n.closingDoubleQuote
		}
	].reduce((e, { pattern: t, replacement: n }) => e.replace(new RegExp(t, "gu"), n), t);
}
function xe(t, n) {
	return t = t.replace(RegExp(`(${n.openingDoubleQuote})([${e.spaces}])`, "g"), "$1"), t = t.replace(RegExp(`([${e.spaces}])(${n.closingDoubleQuote})`, "g"), "$2"), t = t.replace(RegExp(`([${e.spaces}])(${e.doublePrime})`, "g"), "$2"), t;
}
function Se(t, n) {
	return t = t.replace(RegExp(`([${e.sentencePunctuation}\\p{L}])([${n.openingDoubleQuote}])`, "gu"), "$1 $2"), t = s(t, n), t;
}
function Ce(e, t) {
	return e.replace(RegExp(`([${t.closingDoubleQuote}])([\\p{L}])`, "gu"), "$1 $2");
}
function we(t, n) {
	let r = `${e.hyphen}${e.enDash}${e.emDash}`;
	return t = t.replace(RegExp(`([\\p{L}])[${n.directSpeechIntroAdepts}]?[${e.spaces}]*[${r}][${e.spaces}]*([${n.openingDoubleQuote}].+?[${n.closingDoubleQuote}])`, "gu"), `$1${n.directSpeechIntro} $2`), t = t.replace(RegExp(`([\\p{L}])[${n.directSpeechIntroAdepts}][${e.spaces}]*([${n.openingDoubleQuote}].+?[${n.closingDoubleQuote}])`, "gu"), `$1${n.directSpeechIntro} $2`), t = t.replace(RegExp(`([${n.openingDoubleQuote}].+?[${n.closingDoubleQuote}])[${e.spaces}]*[${r}][${e.spaces}]*([\\p{L}])`, "gu"), "$1 $2"), t = t.replace(RegExp(`^[${e.spaces}]*[${r}][${e.spaces}]*([${n.openingDoubleQuote}].+?[${n.closingDoubleQuote}])`, "g"), "$1"), t = t.replace(RegExp(`([${e.terminalPunctuation}${e.ellipsis}])[${e.spaces}]+[${r}][${e.spaces}]*([${n.openingDoubleQuote}].+?[${n.closingDoubleQuote}])`, "g"), "$1 $2"), t;
}
function Te(e, t) {
	return e = ue(e), e = de(e), e = fe(e), e = pe(e), e = me(e), e = he(e), e = ge(e), e = _e(e), e = be(e, t), e = xe(e, t), e = Se(e, t), e = Ce(e, t), e = we(e, t), e = ve(e, t), e = ye(e, t), e;
}
//#endregion
//#region src/modules/punctuation/single-quotes.js
function Ee(t) {
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
	].forEach((n) => {
		t = t.replace(RegExp(`(${n[0]})([${e.spaces}]?)(${e.singleQuoteAdepts})(n)(${e.singleQuoteAdepts})([${e.spaces}]?)(${n[1]})`, "gi"), `$1${e.nbsp}${z.apos}$4${z.apos}${e.nbsp}$7`);
	}), t;
}
function De(t) {
	return t.replace(RegExp(`(${e.singleQuoteAdepts})(cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould)`, "gi"), `${z.apos}$2`);
}
function Oe(t) {
	return t.replace(RegExp(`(\\Bin)(${e.singleQuoteAdepts})`, "gi"), `$1${z.apos}`);
}
function ke(t) {
	return t.replace(RegExp(`([\\d\\p{L}])(${e.singleQuoteAdepts})+([\\p{L}])`, "gu"), `$1${z.apos}$3`);
}
function Ae(t) {
	return t.replace(RegExp(`([^0-9]|[A-Z][0-9])([${e.spaces}])(${e.singleQuoteAdepts})([\\d]{2})`, "gu"), `$1$2${z.apos}$4`);
}
function je(e) {
	return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${z.singlePrime}`);
}
function Me(t) {
	return t.replace(RegExp(`(^|[${e.spaces}${e.emDash}${e.enDash}])(${e.singleQuoteAdepts}|,)([\\p{L}${e.ellipsis}${e.openingBrackets}\\{])`, "gu"), `$1${z.osqUnpaired}$3`);
}
function Ne(t) {
	return t.replace(RegExp(`([\\p{L}\\d${e.closingBrackets}])([${e.sentencePunctuation}${e.ellipsis}])?(${e.singleQuoteAdepts})([ ${e.sentencePunctuation}])?`, "gu"), `$1$2${z.csqUnpaired}$4`);
}
function Pe(t) {
	return t.replace(RegExp(`(${e.doubleQuoteAdepts})(.*?)(${e.doubleQuoteAdepts})`, "gu"), function(e, t, n, r) {
		return n = Me(n), n = Ne(n), n = Fe(n), t + n + r;
	});
}
function Fe(e) {
	return e.replace(RegExp(`(${z.osqUnpaired})(.*)(${z.csqUnpaired})`, "gu"), `${z.osq}$2${z.csq}`);
}
function Ie(t) {
	return t.replace(RegExp(`(\\B)(${e.singleQuoteAdepts})([\\p{L}]+)(${e.singleQuoteAdepts})(\\B)`, "gu"), `$1${z.osq}$3${z.csq}$5`);
}
function Le(t) {
	return t.replace(RegExp(`(${e.singleQuoteAdepts})`, "g"), `${z.apos}`);
}
function Re(e) {
	return e = e.replace(RegExp(`(${z.osqUnpaired})(.*?)(${z.singlePrime})`, "g"), `${z.osq}$2${z.csq}`), e = e.replace(RegExp(`(${z.singlePrime})(.*?)(${z.csqUnpaired})`, "g"), `${z.osq}$2${z.csq}`), e;
}
function ze(t, n) {
	return t.replace(RegExp(`(${n.openingSingleQuote})([^${e.spaces}${n.closingSingleQuote}]+?)([^${e.romanNumerals}${e.sentencePunctuation}])([${e.sentencePunctuation}]{1,})(${n.closingSingleQuote})`, "g"), (e, t, n, r, i, a) => i.length === 1 && /[.,;:]/.test(i) ? t + n + r + a + i : e);
}
function Be(t, n) {
	return t = t.replace(RegExp(`(${n.openingSingleQuote})(.+)([${e.spaces}])(?!${n.openingSingleQuote})([^${e.romanNumerals}]{2,})(${n.closingSingleQuote})([${e.sentencePunctuation}${e.ellipsis}])([^${n.closingDoubleQuote}])`, "g"), "$1$2$3$4$6$5$7"), t = t.replace(RegExp(`([:;])(${n.closingSingleQuote})`, "g"), "$2$1"), t = t.replace(RegExp(`([${e.terminalPunctuation}${e.ellipsis}])(${n.closingSingleQuote})(${n.closingDoubleQuote})`, "g"), "$2$1$3"), t;
}
function Ve(t) {
	return t.replace(RegExp(`([${e.spaces}])(${e.singlePrime})`, "g"), "$2");
}
function He(t, n) {
	return [
		{
			pattern: z.singlePrime,
			replacement: e.singlePrime
		},
		{
			pattern: `[${z.apos}${z.osqUnpaired}${z.csqUnpaired}]`,
			replacement: e.apostrophe
		},
		{
			pattern: z.osq,
			replacement: n.openingSingleQuote
		},
		{
			pattern: z.csq,
			replacement: n.closingSingleQuote
		}
	].reduce((e, { pattern: t, replacement: n }) => e.replace(new RegExp(t, "gu"), n), t);
}
function Ue(e, t) {
	return e = Ee(e), e = De(e), e = ke(e), e = Ae(e), e = Oe(e), e = je(e), e = Ie(e), e = Pe(e), e = Re(e), e = Le(e), e = He(e, t), e = ze(e, t), e = Be(e, t), e = Ve(e), e;
}
//#endregion
//#region src/modules/symbols/multiplication-sign.js
function We(t) {
	return a(t, RegExp(`([\\d]+)([${e.spaces}]?[\\p{Ll}${e.singlePrime}${e.doublePrime}]*)([${e.spaces}][x][${e.spaces}])([\\d]+)([${e.spaces}]?[\\p{Ll}${e.singlePrime}${e.doublePrime}]*)`, "giu"), `$1$2${e.nbsp}${e.multiplicationSign}${e.nbsp}$4$5`);
}
function Ge(t) {
	return a(t, RegExp(`([\\p{L}]+)([${e.spaces}][x][${e.spaces}])([\\p{L}]+)`, "gu"), `$1${e.nbsp}${e.multiplicationSign}${e.nbsp}$3`);
}
function Ke(t) {
	return t.replace(RegExp(`([\\d])([${e.spaces}]?)([x×])([${e.spaces}])([\\p{Ll}]+)`, "giu"), function(t, n, r, i, a, o) {
		return r == "" ? `${n}${r}${e.multiplicationSign}${e.nbsp}${o}` : `${n}${e.nbsp}${e.multiplicationSign}${e.nbsp}${o}`;
	});
}
function qe(t) {
	return t.replace(RegExp(`([\\d]+)([${e.singlePrime}${e.doublePrime}])?([x|×])([\\d]+)([${e.singlePrime}${e.doublePrime}])?`, "giu"), `$1$2${e.nbsp}${e.multiplicationSign}${e.nbsp}$4$5`);
}
function Je(e) {
	return e = We(e), e = Ge(e), e = Ke(e), e = qe(e), e;
}
//#endregion
//#region src/modules/symbols/symbol-utils.js
function J(e, t, n) {
	return e = C(e, t), e = ie(e, t, n), e = ae(e, t, n), e;
}
//#endregion
//#region src/modules/symbols/section-sign.js
function Ye(t, n) {
	return t = J(t, e.sectionSign, n.spaceAfter.sectionSign), t = J(t, e.paragraphSign, n.spaceAfter.paragraphSign), t;
}
//#endregion
//#region src/modules/symbols/copyrights.js
function Y(t, n, r) {
	return t.replace(RegExp(`(\\(${n}\\))([${e.spaces}]*)(\\d)`, "gi"), `${r}$2$3`);
}
function Xe(t, n) {
	return t = Y(t, "c", e.copyright), t = J(t, e.copyright, n.spaceAfter.copyright), t = Y(t, "p", e.soundRecordingCopyright), t = J(t, e.soundRecordingCopyright, n.spaceAfter.soundRecordingCopyright), t;
}
//#endregion
//#region src/modules/symbols/numero-sign.js
function Ze(t, n) {
	return t = J(t, e.numeroSign, n.spaceAfter.numeroSign), t;
}
//#endregion
//#region src/modules/symbols/plus-minus.js
function Qe(t) {
	return t.replace(RegExp("(\\+\\-)|(\\-\\+)", "g"), e.plusMinus);
}
//#endregion
//#region src/modules/symbols/marks.js
function X(t, n, r) {
	return t.replace(RegExp(`([^0-9]|^)([${e.spaces}]*)(\\(${n}\\)|${r})`, "gi"), `$1${r}`);
}
function $e(t) {
	return t = X(t, "r", e.registeredTrademark), t = X(t, "sm", e.serviceMark), t = X(t, "tm", e.trademark), t;
}
//#endregion
//#region src/modules/symbols/exponents.js
function Z(t, n, r) {
	return t.replace(RegExp(`([${e.spaces}${e.slash}])(m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym)(${n})`, "g"), `$1$2${r}`);
}
function et(e) {
	return Z(e, "2", "²");
}
function tt(e) {
	return Z(e, "3", "³");
}
function nt(e) {
	return e = et(e), e = tt(e), e;
}
//#endregion
//#region src/modules/symbols/number-sign.js
function rt(t) {
	return t.replace(RegExp(`([${e.spaces}]+)(${e.numberSign})([${e.spaces}]+)(\\d)`, "g"), "$1$2$4");
}
function it(e) {
	return e = rt(e), e;
}
//#endregion
//#region src/modules/words/abbreviations.js
function at(t, n) {
	let r = `([\\p{Lu}][\\p{L}]?\\.)([${e.spaces}]?)`, i = "([\\p{L}]{2,}[^\\.])", a = [
		{
			pattern: `${r}${i}`,
			replacement: `$1${e.nbsp}$3`
		},
		{
			pattern: `${r}${r}${i}`,
			replacement: `$1${n.spaceAfter.abbreviation}$3${e.space}$5`
		},
		{
			pattern: `${r}${r}${r}${i}`,
			replacement: `$1${n.spaceAfter.abbreviation}$3${n.spaceAfter.abbreviation}$5${e.space}$7`
		}
	];
	for (let { pattern: e, replacement: n } of a) t = t.replace(new RegExp(e, "gu"), n);
	return t;
}
function Q(t, n) {
	let r = `([^\\p{L}${e.enDash}${e.emDash}]|^)`, i = `([^\\p{L}${n.openingDoubleQuote}${n.openingSingleQuote}${e.backtick}\\p{Emoji}]|$)`, a = [];
	for (let t = 0; t < n.multipleWordAbbreviations.length; t++) {
		let r = n.multipleWordAbbreviations[t].split(" "), i = "";
		for (let t = 0; t < r.length; t++) i += `(${r[t]})(\\.)([${e.spaces}]?)`;
		a[t] = i;
	}
	for (let e = 0; e < a.length; e++) {
		let i = `${r}${a[e]}([\\p{L}]|\\D)`, o = "$1", s = (a[e].match(/\(/g) || []).length / 3;
		for (let e = 0; e < s - 1; e++) o += `$${e * 3 + 2}.${n.spaceAfter.abbreviation}`;
		o += `$${(s - 1) * 3 + 2}. $${s * 3 + 2}`, t = t.replace(new RegExp(i, "giu"), o);
	}
	for (let e = 0; e < a.length; e++) {
		let o = `${r}${a[e]}${i}`, s = "$1", c = (a[e].match(/\(/g) || []).length / 3;
		for (let e = 0; e < c - 1; e++) s += `$${e * 3 + 2}.${n.spaceAfter.abbreviation}`;
		s += `$${(c - 1) * 3 + 2}.$${c * 3 + 2}`, t = t.replace(new RegExp(o, "giu"), s);
	}
	return t;
}
function ot(t, n) {
	let r = [];
	for (let t = 0; t < n.singleWordAbbreviations.length; t++) r[t] = `(${n.singleWordAbbreviations[t]})(\\.)([${e.spaces}]?)`;
	let i = `([^\\p{L}${e.enDash}${e.emDash}${e.nbsp}\\.]|^)`;
	for (let n = 0; n < r.length; n++) t = t.replace(RegExp(`${i}${r[n]}([\\p{L}\\d]+)([^\\.]|\$)`, "giu"), `$1$2$3${e.nbsp}$5$6`);
	let a = `([\\p{L}\\d])([${e.spaces}])`, o = `([^${e.spaces}\\p{L}\\d]|$)`;
	for (let n = 0; n < r.length; n++) t = t.replace(RegExp(`${a}${r[n]}${o}`, "giu"), `$1${e.nbsp}$3$4$5$6`);
	return t;
}
function st(e, t) {
	return e = at(e, t), e = Q(e, t), e = ot(e, t), e;
}
//#endregion
//#region src/modules/words/case.js
function ct(e) {
	return e = e.replace(/* @__PURE__ */ RegExp("([^\\p{L}]|^)([\\p{Lu}]{2})([\\p{Ll}]{2,})", "gu"), function(e, t, n, r) {
		return `${t}${n.substring(0, 1)}${n.substring(1).toLowerCase()}${r}`;
	}), e.replace(/* @__PURE__ */ RegExp("(\\b)(?!iOS)([\\p{Ll}])([\\p{Lu}]{2,})", "gu"), function(e, t, n, r) {
		return `${t}${n.toUpperCase()}${r.toLowerCase()}`;
	});
}
//#endregion
//#region src/modules/words/pub-id.js
function lt(t) {
	return t.replace(RegExp(`(issn)(:?)([${e.spaces}]?)(\\d{4})([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)(\\d{4})`, "gi"), `ISSN$2${e.nbsp}$4-$6`);
}
function ut(t) {
	let n = `([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)`;
	return t.replace(RegExp(`(isbn)(:?)([${e.spaces}]?)(\\d+)` + n + "(\\d+)" + n + "(\\d+)" + n + "(X|\\d+)", "gi"), `ISBN$2${e.nbsp}$4-$6-$8-$10`);
}
function dt(t) {
	let n = `([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)`;
	return t.replace(RegExp(`(isbn)(:?)([${e.spaces}]?)(\\d+)` + n + "(\\d+)" + n + "(\\d+)" + n + "(\\d+)" + n + "(X|\\d+)", "gi"), `ISBN$2${e.nbsp}$4-$6-$8-$10-$12`);
}
function ft(t) {
	let n = `([${e.spaces}]?[${e.hyphen}${e.enDash}${e.emDash}][${e.spaces}]?)`;
	return t.replace(RegExp("(\\d+)" + n + "(\\d+)" + n + "(\\d+)" + n + "(\\d+)" + n + "(X|\\d+?)", "g"), "$1-$3-$5-$7-$9");
}
function pt(e) {
	return e = lt(e), e = ut(e), e = dt(e), e = ft(e), e;
}
//#endregion
//#region src/modules/words/exceptions.js
function mt(t) {
	let n = [];
	return $(t, e.emailPattern, n), $(t, e.urlPattern, n), $(t, e.filenamePattern, n), {
		processedText: ht(t, n),
		exceptions: n
	};
}
function $(e, t, n) {
	let r = new RegExp(t, "gi"), i = e.match(r);
	return i && i.forEach((e) => n.push(e)), n;
}
function ht(e, t) {
	return t.reduce((e, t, n) => {
		let r = U(n);
		return e.replace(t, r);
	}, e);
}
function gt(e, t) {
	return t.reduce((e, t, n) => {
		let r = U(n), i = new RegExp(r, "g");
		return e.replace(i, t);
	}, e);
}
//#endregion
//#region src/typopo.js
function _t(e, t, n) {
	t = t === void 0 ? "en-us" : t;
	let a = new r(t);
	n = n === void 0 ? { removeLines: !0 } : n;
	let { processedText: o, exceptions: s } = mt(e);
	return e = o, n.removeLines && (e = i(e)), e = R(e, a), e = w(e, a), e = E(e), e = le(e, a), e = Ue(e, a), e = Te(e, a), e = Je(e), e = Ye(e, a), e = Xe(e, a), e = Ze(e, a), e = Qe(e), e = $e(e), e = nt(e), e = it(e), e = ct(e), e = pt(e), e = st(e, a), e = oe(e, a), e = gt(e, s), e;
}
//#endregion
export { _t as fixTypos };
