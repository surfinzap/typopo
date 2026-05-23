/*!
 * Typopo v3.0.2 (https://typopo.org)
 * Copyright 2015–2026 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
//#region src/const.js
var e = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›", t = "’", n = "′", r = "`", i = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’ʼ'‹›′´`]{2,}", a = "″", o = " ", s = "\xA0", c = " ", l = " ", ee = o + s + c + l, u = "\\.!?", d = ",:;", f = {
	singleQuoteAdepts: e,
	apostrophe: t,
	singlePrime: n,
	backtick: r,
	doubleQuoteAdepts: i,
	doublePrime: a,
	space: o,
	nbsp: s,
	hairSpace: c,
	narrowNbsp: l,
	spaces: ee,
	terminalPunctuation: u,
	sentencePausePunctuation: d,
	sentencePunctuation: d + u,
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
}, p = {
	cs: {
		quotes: {
			openingDoubleQuote: "„",
			closingDoubleQuote: "“",
			openingSingleQuote: "‚",
			closingSingleQuote: "‘"
		},
		directSpeechIntro: ":",
		dashWords: {
			spaceBefore: f.nbsp,
			dash: f.enDash,
			spaceAfter: f.space
		},
		spaceAfter: {
			copyright: f.space,
			soundRecordingCopyright: f.space,
			numeroSign: f.nbsp,
			sectionSign: f.nbsp,
			paragraphSign: f.nbsp,
			abbreviation: f.nbsp
		},
		spaceBefore: { percent: f.nbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: f.nbsp,
			secondSpace: f.nbsp
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
			dash: f.emDash,
			spaceAfter: ""
		},
		spaceAfter: {
			copyright: f.nbsp,
			soundRecordingCopyright: f.nbsp,
			numeroSign: f.nbsp,
			sectionSign: f.nbsp,
			paragraphSign: f.nbsp,
			abbreviation: ""
		},
		spaceBefore: { percent: "" },
		numbers: {
			ordinalIndicator: "st|nd|rd|th",
			romanOrdinalIndicator: ""
		},
		ordinalDate: {
			firstSpace: f.nbsp,
			secondSpace: f.nbsp
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
			spaceBefore: f.hairSpace,
			dash: f.emDash,
			spaceAfter: f.hairSpace
		},
		spaceAfter: {
			copyright: f.nbsp,
			soundRecordingCopyright: f.nbsp,
			numeroSign: f.nbsp,
			sectionSign: f.narrowNbsp,
			paragraphSign: f.narrowNbsp,
			abbreviation: f.nbsp
		},
		spaceBefore: { percent: f.nbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: f.nbsp,
			secondSpace: f.nbsp
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
			spaceBefore: f.hairSpace,
			dash: f.emDash,
			spaceAfter: f.hairSpace
		},
		spaceAfter: {
			copyright: f.nbsp,
			soundRecordingCopyright: f.nbsp,
			numeroSign: f.nbsp,
			sectionSign: f.narrowNbsp,
			paragraphSign: f.narrowNbsp,
			abbreviation: f.nbsp
		},
		spaceBefore: { percent: f.nbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: f.nbsp,
			secondSpace: f.nbsp
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
			spaceBefore: f.hairSpace,
			dash: f.enDash,
			spaceAfter: f.hairSpace
		},
		spaceAfter: {
			copyright: f.nbsp,
			soundRecordingCopyright: f.nbsp,
			numeroSign: f.nbsp,
			sectionSign: f.nbsp,
			paragraphSign: f.nbsp,
			abbreviation: f.nbsp
		},
		spaceBefore: { percent: f.narrowNbsp },
		numbers: {
			ordinalIndicator: "\\.",
			romanOrdinalIndicator: "\\."
		},
		ordinalDate: {
			firstSpace: f.nbsp,
			secondSpace: f.space
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
			spaceBefore: f.nbsp,
			dash: f.enDash,
			spaceAfter: f.space
		},
		spaceAfter: {
			copyright: f.nbsp,
			soundRecordingCopyright: f.nbsp,
			numeroSign: f.nbsp,
			sectionSign: f.nbsp,
			paragraphSign: f.nbsp,
			abbreviation: f.nbsp
		},
		spaceBefore: { percent: f.narrowNbsp },
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
}, m = "en-us", te = class {
	constructor(e) {
		p[e] || (console.warn(`Locale '${e}' not found, falling back to '${m}'`), e = m), this.ID = e, this.openingSingleQuote = p[e].quotes.openingSingleQuote, this.closingSingleQuote = p[e].quotes.closingSingleQuote, this.openingDoubleQuote = p[e].quotes.openingDoubleQuote, this.closingDoubleQuote = p[e].quotes.closingDoubleQuote, this.terminalQuotes = this.closingSingleQuote + this.closingDoubleQuote, this.directSpeechIntro = p[e].directSpeechIntro, this.dashWords = p[e].dashWords, this.spaceAfter = p[e].spaceAfter, this.spaceBefore = p[e].spaceBefore, this.ordinalIndicator = p[e].numbers.ordinalIndicator, this.romanOrdinalIndicator = p[e].numbers.romanOrdinalIndicator, this.ordinalDate = p[e].ordinalDate, this.singleWordAbbreviations = [];
		for (let e in p) this.singleWordAbbreviations = this.singleWordAbbreviations.concat(p[e].singleWordAbbreviations);
		this.multipleWordAbbreviations = [];
		for (let e in p) this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(p[e].multipleWordAbbreviations);
		let t = [];
		for (let e in p) {
			let n = p[e].directSpeechIntro;
			n && !t.includes(n) && t.push(n);
		}
		this.directSpeechIntroAdepts = t.join("");
	}
};
//#endregion
//#region src/modules/whitespace/lines.js
function ne(e) {
	return e.replace(/[\n\r]{2,}/gm, "\n");
}
//#endregion
//#region src/utils/regex-overlap.js
function h(e, t, n) {
	let r = 0, i = e, a = "";
	for (; i !== a && r < 50;) a = i, i = i.replace(t, n), r++;
	return i;
}
//#endregion
//#region src/modules/whitespace/nbsp.js
function re(e) {
	return h(e, RegExp(`([\\p{L}]{2,})([${f.nbsp}${f.narrowNbsp}])([\\p{L}]{2,})`, "gu"), "$1 $3");
}
function g(e, t) {
	return e = h(e, RegExp(`(^|[${f.space}]|[^\\p{L}\\d${f.apostrophe}${f.plus}${f.minus}${f.hyphen}])([\\p{Ll}])([${f.space}])`, "gu"), `$1$2${f.nbsp}`), e = e.replace(RegExp(`(^|[${f.sentencePunctuation}${f.ellipsis}${f.copyright}${f.registeredTrademark}${f.soundRecordingCopyright}])([${f.spaces}]?)([\\p{Lu}])([${f.spaces}])`, "gu"), `$1$2$3${f.nbsp}`), t.ID == "en-us" && (e = e.replace(RegExp(`(^|[${f.spaces}])(I)([${f.spaces}])`, "g"), `$1$2${f.nbsp}`)), e;
}
function ie(e) {
	return e.replace(RegExp(`([${f.spaces}])(${f.ampersand})([${f.spaces}])`, "g"), ` $2${f.nbsp}`);
}
function ae(e) {
	return e.replace(RegExp(`([^${f.nbsp}\\d]|^)(\\d{1,2})([${f.spaces}])([\\p{L}])`, "gu"), `\$1\$2${f.nbsp}$4`);
}
function oe(e, t) {
	return e.replace(RegExp(`([^${f.nbsp}\\d_%\\-]|^)(\\d{1,2})(${t.ordinalIndicator})([${f.spaces}]?)([\\p{L}])`, "gu"), `$1$2$3${f.nbsp}$5`);
}
function se(e, t) {
	return e.replace(RegExp(`(\\d{1,2})(\\.)([${f.spaces}]?)(\\d{1,2})(\\.)([${f.spaces}]?)(\\d{4})`, "g"), `$1$2${t.ordinalDate.firstSpace}$4$5${t.ordinalDate.secondSpace}$7`);
}
function ce(e, t) {
	return t.romanOrdinalIndicator == "" ? e : e.replace(RegExp(`(\\b[\\p{Lu}][\\p{L}]?${t.romanOrdinalIndicator}[${f.spaces}]?)?(\\b)([${f.romanNumerals}]+)(${t.romanOrdinalIndicator})([${f.spaces}]?)([\\p{L}\\d])`, "gu"), function(e, t, n, r, i, a, o) {
		return t ? e : `${n}${r}${i}${f.nbsp}${o}`;
	});
}
function le(e, t) {
	let n = `(\\b[\\p{Lu}][\\p{Ll}]+?)([${f.spaces}])([${f.romanNumerals}]+\\b)(${t.romanOrdinalIndicator})([${f.nbsp}]?)`, r = new RegExp(n, "gu");
	return e.replace(r, function(e, t, n, r, i, a) {
		let o = r.startsWith("M") || r.startsWith("D") || r.startsWith("C"), s = r === "I", c = a === f.nbsp;
		return o ? t + f.space + r + i + a : s ? t + f.space + r + i + (c ? a : "") : t + f.nbsp + r + i + (c ? f.space : "");
	});
}
function ue(e, t) {
	return e.replace(RegExp(`(\\d)([${f.spaces}])([${f.percent}${f.permille}${f.permyriad}])`, "gu"), `$1${t.spaceBefore.percent}$3`);
}
function _(e, t) {
	let n = `([^${f.sentencePunctuation}${f.ellipsis}${f.closingBrackets}${t.closingDoubleQuote}${t.closingSingleQuote}${f.apostrophe}${f.multiplicationSign}${f.emDash}${f.enDash}])([${f.spaces}])([\\p{Lu}])([${f.spaces}]|\\.$|$)`, r = new RegExp(n, "gu");
	return e.replace(r, function(e, n, r, i, a) {
		return t.ID === "en-us" && i === "I" ? e : t.ID === "en-us" ? n + f.nbsp + i + a : i === "I" && a && f.spaces.includes(a) ? n + f.nbsp + i + f.space : n + f.nbsp + i + a;
	});
}
function v(e, t, n) {
	return n = n === void 0 ? f.nbsp : n, e.replace(RegExp(`(${t})([^${f.spaces}${t}])`, "g"), `$1${n}$2`);
}
function y(e, t, n) {
	return n = n === void 0 ? f.nbsp : n, e.replace(RegExp(`(${t})([${f.spaces}]+)`, "g"), `$1${n}`);
}
function b(e, t) {
	return e = re(e), e = g(e, t), e = ie(e), e = ae(e), e = oe(e, t), e = se(e, t), e = ce(e, t), e = _(e, t), e = le(e, t), e = ue(e, t), e;
}
//#endregion
//#region src/modules/whitespace/spaces.js
function x(e) {
	return e.replace(RegExp(`(\\S)([${f.spaces}]{2,})(\\S)`, "g"), "$1 $3");
}
function S(e) {
	return e.split(/\r?\n/).map((e) => e.replace(/^\s+/, "")).join("\n");
}
function C(e) {
	return e.split(/\r?\n/).map((e) => e.replace(/\s+$/, "")).join("\n");
}
function w(e) {
	return e.replace(RegExp(`([${f.spaces}])([${f.sentencePausePunctuation}])([^\\-\\)]|$)`, "g"), "$2$3");
}
function T(e) {
	return e.replace(RegExp(`([^${f.openingBrackets}])([${f.spaces}])([${f.terminalPunctuation}${f.closingBrackets}${f.degree}])`, "g"), "$1$3");
}
function E(e, t) {
	return e.replace(RegExp(`(\\d)([${f.spaces}]?)(${t.ordinalIndicator})([${f.spaces}]|\\b)`, "g"), "$1$3$4");
}
function D(e) {
	return e.replace(RegExp(`([${f.openingBrackets}])([${f.spaces}])([^${f.closingBrackets}])`, "g"), "$1$3");
}
function O(e) {
	return e.replace(RegExp(`([\\p{L}])([${f.openingBrackets}])([\\p{L}${f.ellipsis}])([\\p{L}${f.ellipsis}${f.closingBrackets}])`, "gu"), function(e, t, n, r, i) {
		return r == "s" | r == "S" | r + i == "es" | r + i == "ES" ? `${t}${n}${r}${i}` : `${t}${f.space}${n}${r}${i}`;
	});
}
function k(e) {
	return e.replace(RegExp(`([\\p{L}]{2,}|[${f.ellipsis}])([${f.terminalPunctuation}])([\\p{Lu}])`, "gu"), "$1$2 $3");
}
function A(e) {
	return e.replace(RegExp(`([\\p{L}]{2,}|[${f.ellipsis}])([${f.sentencePausePunctuation}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function j(e) {
	return e.replace(RegExp(`([${f.closingBrackets}])([\\p{L}])`, "gu"), "$1 $2");
}
function M(e, t) {
	return e.replace(RegExp(`([^${f.spaces}${f.openingBrackets}${t}])(${t})`, "g"), `$1${f.space}$2`);
}
function N(e, t) {
	return e = x(e), e = S(e), e = C(e), e = w(e), e = T(e), e = E(e, t), e = D(e), e = O(e), e = k(e), e = j(e), e = A(e), e;
}
//#endregion
//#region src/modules/punctuation/period.js
function P(e) {
	return e.replace(RegExp("\\.{2}(?![\\\\/])", "g"), ".");
}
function F(e) {
	return P(e);
}
//#endregion
//#region src/modules/punctuation/ellipsis.js
function I(e) {
	return e.replace(RegExp(`[${f.ellipsis}\\.]{3,}`, "g"), f.ellipsis);
}
function L(e) {
	return e.replace(RegExp(`\\.${f.ellipsis}|${f.ellipsis}{2,}|${f.ellipsis}\\.`, "g"), f.ellipsis);
}
function R(e) {
	return e.replace(RegExp(`[${f.spaces}]\\.{2}[${f.spaces}]`, "g"), `${f.space}${f.ellipsis}${f.space}`);
}
function z(e) {
	return e.replace(RegExp(`(,)([${f.spaces}]?)(${f.ellipsis})([${f.spaces}]?)(,)`, "g"), `$1 ${f.ellipsis}$5`);
}
function B(e) {
	return e.replace(RegExp(`(,)([${f.spaces}]?)(${f.ellipsis})([${f.spaces}]?)(\\B|[${f.closingBrackets}])([^,]|$)`, "g"), "$1$3$5$6");
}
function V(e) {
	return e.replace(RegExp(`(^${f.ellipsis})([${f.spaces}])([\\p{L}])`, "gmu"), "$1$3");
}
function H(e, t) {
	return e.replace(RegExp(`([^${t.terminalQuotes}])([${f.sentencePunctuation}])([${f.spaces}]?)([${f.ellipsis}])([${f.spaces}]?)([\\p{Ll}])`, "gu"), "$1$2 $4$6");
}
function U(e) {
	return e.replace(RegExp(`([\\p{Ll}])([${f.spaces}])([${f.ellipsis}])([${f.spaces}]?)([\\p{Lu}])`, "gu"), "$1$3 $5");
}
function de(e) {
	return e.replace(RegExp(`([\\p{L}])([${f.ellipsis}])([\\p{L}])`, "gu"), "$1$2 $3");
}
function fe(e, t) {
	return e.replace(RegExp(`([${f.sentencePunctuation}${t.terminalQuotes}])([${f.spaces}]?)(${f.ellipsis})([${f.spaces}]?)([\\p{Lu}])`, "gu"), "$1 $3 $5");
}
function pe(e, t) {
	return e.replace(RegExp(`([\\p{Ll}])([${f.spaces}])+([${f.ellipsis}][${t.closingDoubleQuote}${t.closingSingleQuote}]?$)`, "gmu"), "$1$3");
}
function me(e, t) {
	return e = I(e), e = z(e), e = B(e), e = V(e), e = H(e, t), e = U(e), e = de(e), e = fe(e, t), e = pe(e, t), e = L(e), e = R(e), e;
}
//#endregion
//#region src/markers.js
var W = {
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
}, G = 57856, K = 63743, he = K - G + 1;
function q(e) {
	let t = G + e;
	if (t > K) throw Error(`Exception index ${e} exceeds PUA limit (max ${he}). Text contains too many exceptions (emails/URLs/filenames). Consider processing the text in smaller chunks.`);
	return String.fromCharCode(t);
}
//#endregion
//#region src/modules/punctuation/dash.js
function ge(e, t) {
	return e.replace(RegExp(`([\\p{L}\\d])([${f.spaces}]*[${f.enDash}${f.emDash}]{1,3}[${f.spaces}]*|[${f.spaces}]+[${f.hyphen}]{1,3}[${f.spaces}]+)([\\p{L}\\d])`, "gu"), `$1${t.dashWords.spaceBefore}${t.dashWords.dash}${t.dashWords.spaceAfter}$3`);
}
function _e(e, t) {
	return e.replace(RegExp(`([\\p{L}])([${f.spaces}]?)([${f.hyphen}${f.enDash}${f.emDash}]{1,3})([${f.spaces}]?)([${f.sentencePunctuation}\\n\\r])`, "gu"), `$1${t.dashWords.spaceBefore}${t.dashWords.dash}$5`);
}
function ve(e, t) {
	return e = e.replace(RegExp(`([${f.openingBrackets}])[${f.spaces}]*([${f.hyphen}${f.enDash}${f.emDash}]+)[${f.spaces}]*([${f.closingBrackets}])`, "gu"), "$1$2$3"), e = e.replace(RegExp(`([\\p{L}])[${f.spaces}]*[${f.hyphen}${f.enDash}${f.emDash}]{1,3}[${f.spaces}]*([${f.openingBrackets}])`, "gu"), `$1${t.dashWords.spaceBefore}${t.dashWords.dash}${t.dashWords.spaceAfter}$2`), e = e.replace(RegExp(`([${f.closingBrackets}])[${f.spaces}]*[${f.hyphen}${f.enDash}${f.emDash}]{1,3}[${f.spaces}]*([\\p{L}])`, "gu"), `$1${t.dashWords.spaceBefore}${t.dashWords.dash}${t.dashWords.spaceAfter}$2`), e = e.replace(RegExp(`([\\p{L}])[${f.spaces}]*[${f.hyphen}${f.enDash}${f.emDash}]{1,3}[${f.spaces}]*([${f.closingBrackets}])`, "gu"), `$1${t.dashWords.spaceBefore}${t.dashWords.dash}${t.dashWords.spaceAfter}$2`), e = e.replace(RegExp(`([${f.openingBrackets}])[${f.spaces}]*[${f.hyphen}${f.enDash}${f.emDash}]{1,3}[${f.spaces}]*([\\p{L}])`, "gu"), `$1${t.dashWords.spaceBefore}${t.dashWords.dash}${t.dashWords.spaceAfter}$2`), e = e.replace(RegExp(`([${f.closingBrackets}])[${f.spaces}]*[${f.hyphen}${f.enDash}${f.emDash}][${f.spaces}]*([${f.openingBrackets}])`, "gu"), `$1${t.dashWords.spaceBefore}${t.dashWords.dash}${t.dashWords.spaceAfter}$2`), e;
}
function ye(e) {
	return e = h(e, RegExp(`(\\d)([${f.spaces}]?[${f.hyphen}${f.enDash}${f.emDash}]{1,3}[${f.spaces}]?)(\\d)`, "gu"), `$1${W.enDash}$3`), e.replace(RegExp(`${W.enDash}`, "g"), f.enDash);
}
function be(e) {
	return e.replace(RegExp(`([${f.percent}${f.permille}${f.permyriad}])([${f.spaces}]?[${f.hyphen}${f.enDash}${f.emDash}]{1,3}[${f.spaces}]?)(\\d)`, "gu"), `$1${f.enDash}$3`);
}
function xe(e, t) {
	return e.replace(RegExp(`(\\d)(${t.ordinalIndicator})([${f.spaces}]?[${f.hyphen}${f.enDash}${f.emDash}]{1,3}[${f.spaces}]?)(\\d)(${t.ordinalIndicator})`, "giu"), `$1$2${f.enDash}$4$5`);
}
function Se(e, t) {
	return e = ge(e, t), e = _e(e, t), e = ve(e, t), e = ye(e), e = be(e), e = xe(e, t), e;
}
//#endregion
//#region src/modules/punctuation/double-quotes.js
function Ce(e) {
	return e.replace(RegExp(`([^${f.romanNumerals}])([${f.sentencePunctuation}])([${f.sentencePausePunctuation}])(${f.doubleQuoteAdepts})`, "g"), "$1$2$4");
}
function we(e) {
	return e.replace(RegExp(`([^${f.romanNumerals}])([${f.sentencePunctuation}])(${f.doubleQuoteAdepts})([${f.sentencePunctuation}])`, "g"), "$1$2$3");
}
function Te(e) {
	return e = e.replace(RegExp(`([^0-9]|^)(${f.doubleQuoteAdepts})(.+?)(\\d+)(${f.doubleQuoteAdepts})([${f.terminalPunctuation}${f.ellipsis}])`, "g"), "$1$2$3$4$6$5"), e = e.replace(RegExp(`(\\b\\d{1,3})([${f.spaces}]?)(${f.doubleQuoteAdepts})([^\\p{L}]|\\B)`, "gu"), `\$1\$2${W.doublePrime}$4`), e;
}
function Ee(e) {
	return e = e.replace(RegExp(`(${f.doubleQuoteAdepts})(\\d+)(${W.doublePrime})`, "g"), `${W.odq}$2${W.cdq}`), e = e.replace(RegExp(`(${f.doubleQuoteAdepts})(.*?)(${f.doubleQuoteAdepts})`, "g"), `${W.odq}$2${W.cdq}`), e;
}
function De(e) {
	return e.replace(RegExp(`(${f.doubleQuoteAdepts})([0-9\\p{L}])`, "gu"), `${W.odqUnpaired}$2`);
}
function Oe(e) {
	return e.replace(RegExp(`([\\p{L}${f.sentencePunctuation}${f.ellipsis}])(${f.doubleQuoteAdepts})`, "gu"), `$1${W.cdqUnpaired}`);
}
function ke(e) {
	return e.replace(RegExp(`([${f.spaces}])(${f.doubleQuoteAdepts})([${f.spaces}])`, "gu"), "$1");
}
function Ae(e) {
	return e.replace(RegExp(`(${W.odqUnpaired})(.*?)(${W.doublePrime})`, "g"), `${W.odq}$2${W.cdq}`).replace(RegExp(`(${W.doublePrime})(.*?)(${W.cdqUnpaired})`, "g"), `${W.odq}$2${W.cdq}`);
}
function je(e, t) {
	return e.replace(RegExp(`(${t.openingDoubleQuote})([^${f.spaces}${t.closingDoubleQuote}]+?)([^${f.romanNumerals}${f.sentencePunctuation}])([${f.sentencePunctuation}]{1,})(${t.closingDoubleQuote})`, "g"), (e, t, n, r, i, a) => i.length === 1 && /[.,;:]/.test(i) ? t + n + r + a + i : e);
}
function Me(e, t) {
	return e = e.replace(RegExp(`(${t.openingDoubleQuote})(.+)([${f.spaces}])(?!${t.openingDoubleQuote})([^${f.romanNumerals}]{2,})(${t.closingDoubleQuote})([${f.sentencePunctuation}${f.ellipsis}])`, "g"), "$1$2$3$4$6$5"), e = e.replace(RegExp(`([:;])(${t.closingDoubleQuote})`, "g"), "$2$1"), e;
}
function Ne(e, t) {
	return [
		{
			pattern: W.doublePrime,
			replacement: f.doublePrime
		},
		{
			pattern: `[${W.odq}${W.odqUnpaired}]`,
			replacement: t.openingDoubleQuote
		},
		{
			pattern: `[${W.cdq}${W.cdqUnpaired}]`,
			replacement: t.closingDoubleQuote
		}
	].reduce((e, { pattern: t, replacement: n }) => e.replace(new RegExp(t, "gu"), n), e);
}
function Pe(e, t) {
	return e = e.replace(RegExp(`(${t.openingDoubleQuote})([${f.spaces}])`, "g"), "$1"), e = e.replace(RegExp(`([${f.spaces}])(${t.closingDoubleQuote})`, "g"), "$2"), e = e.replace(RegExp(`([${f.spaces}])(${f.doublePrime})`, "g"), "$2"), e;
}
function Fe(e, t) {
	return e = e.replace(RegExp(`([${f.sentencePunctuation}\\p{L}])([${t.openingDoubleQuote}])`, "gu"), "$1 $2"), e = g(e, t), e;
}
function Ie(e, t) {
	return e.replace(RegExp(`([${t.closingDoubleQuote}])([\\p{L}])`, "gu"), "$1 $2");
}
function Le(e, t) {
	let n = `${f.hyphen}${f.enDash}${f.emDash}`;
	return e = e.replace(RegExp(`([\\p{L}])[${t.directSpeechIntroAdepts}]?[${f.spaces}]*[${n}][${f.spaces}]*([${t.openingDoubleQuote}].+?[${t.closingDoubleQuote}])`, "gu"), `$1${t.directSpeechIntro} $2`), e = e.replace(RegExp(`([\\p{L}])[${t.directSpeechIntroAdepts}][${f.spaces}]*([${t.openingDoubleQuote}].+?[${t.closingDoubleQuote}])`, "gu"), `$1${t.directSpeechIntro} $2`), e = e.replace(RegExp(`([${t.openingDoubleQuote}].+?[${t.closingDoubleQuote}])[${f.spaces}]*[${n}][${f.spaces}]*([\\p{L}])`, "gu"), "$1 $2"), e = e.replace(RegExp(`^[${f.spaces}]*[${n}][${f.spaces}]*([${t.openingDoubleQuote}].+?[${t.closingDoubleQuote}])`, "g"), "$1"), e = e.replace(RegExp(`([${f.terminalPunctuation}${f.ellipsis}])[${f.spaces}]+[${n}][${f.spaces}]*([${t.openingDoubleQuote}].+?[${t.closingDoubleQuote}])`, "g"), "$1 $2"), e;
}
function Re(e, t) {
	return e = Ce(e), e = we(e), e = Te(e), e = Ee(e), e = De(e), e = Oe(e), e = ke(e), e = Ae(e), e = Ne(e, t), e = Pe(e, t), e = Fe(e, t), e = Ie(e, t), e = Le(e, t), e = je(e, t), e = Me(e, t), e;
}
//#endregion
//#region src/modules/punctuation/single-quotes.js
function ze(e) {
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
		e = e.replace(RegExp(`(${t[0]})([${f.spaces}]?)(${f.singleQuoteAdepts})(n)(${f.singleQuoteAdepts})([${f.spaces}]?)(${t[1]})`, "gi"), `$1${f.nbsp}${W.apos}$4${W.apos}${f.nbsp}$7`);
	}), e;
}
function Be(e) {
	return e.replace(RegExp(`(${f.singleQuoteAdepts})(cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould)`, "gi"), `${W.apos}$2`);
}
function Ve(e) {
	return e.replace(RegExp(`(\\Bin)(${f.singleQuoteAdepts})`, "gi"), `$1${W.apos}`);
}
function He(e) {
	return e.replace(RegExp(`([\\d\\p{L}])(${f.singleQuoteAdepts})+([\\p{L}])`, "gu"), `$1${W.apos}$3`);
}
function Ue(e) {
	return e.replace(RegExp(`([^0-9]|[A-Z][0-9])([${f.spaces}])(${f.singleQuoteAdepts})([\\d]{2})`, "gu"), `$1$2${W.apos}$4`);
}
function We(e) {
	return e.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${W.singlePrime}`);
}
function Ge(e) {
	return e.replace(RegExp(`(^|[${f.spaces}${f.emDash}${f.enDash}])(${f.singleQuoteAdepts}|,)([\\p{L}${f.ellipsis}${f.openingBrackets}\\{])`, "gu"), `$1${W.osqUnpaired}$3`);
}
function Ke(e) {
	return e.replace(RegExp(`([\\p{L}\\d${f.closingBrackets}])([${f.sentencePunctuation}${f.ellipsis}])?(${f.singleQuoteAdepts})([ ${f.sentencePunctuation}])?`, "gu"), `$1$2${W.csqUnpaired}$4`);
}
function qe(e) {
	return e.replace(RegExp(`(${f.doubleQuoteAdepts})(.*?)(${f.doubleQuoteAdepts})`, "gu"), function(e, t, n, r) {
		return n = Ge(n), n = Ke(n), n = Je(n), t + n + r;
	});
}
function Je(e) {
	return e.replace(RegExp(`(${W.osqUnpaired})(.*)(${W.csqUnpaired})`, "gu"), `${W.osq}$2${W.csq}`);
}
function Ye(e) {
	return e.replace(RegExp(`(\\B)(${f.singleQuoteAdepts})([\\p{L}]+)(${f.singleQuoteAdepts})(\\B)`, "gu"), `$1${W.osq}$3${W.csq}$5`);
}
function Xe(e) {
	return e.replace(RegExp(`(${f.singleQuoteAdepts})`, "g"), `${W.apos}`);
}
function Ze(e) {
	return e = e.replace(RegExp(`(${W.osqUnpaired})(.*?)(${W.singlePrime})`, "g"), `${W.osq}$2${W.csq}`), e = e.replace(RegExp(`(${W.singlePrime})(.*?)(${W.csqUnpaired})`, "g"), `${W.osq}$2${W.csq}`), e;
}
function Qe(e, t) {
	return e.replace(RegExp(`(${t.openingSingleQuote})([^${f.spaces}${t.closingSingleQuote}]+?)([^${f.romanNumerals}${f.sentencePunctuation}])([${f.sentencePunctuation}]{1,})(${t.closingSingleQuote})`, "g"), (e, t, n, r, i, a) => i.length === 1 && /[.,;:]/.test(i) ? t + n + r + a + i : e);
}
function $e(e, t) {
	return e = e.replace(RegExp(`(${t.openingSingleQuote})(.+)([${f.spaces}])(?!${t.openingSingleQuote})([^${f.romanNumerals}]{2,})(${t.closingSingleQuote})([${f.sentencePunctuation}${f.ellipsis}])([^${t.closingDoubleQuote}])`, "g"), "$1$2$3$4$6$5$7"), e = e.replace(RegExp(`([:;])(${t.closingSingleQuote})`, "g"), "$2$1"), e = e.replace(RegExp(`([${f.terminalPunctuation}${f.ellipsis}])(${t.closingSingleQuote})(${t.closingDoubleQuote})`, "g"), "$2$1$3"), e;
}
function et(e) {
	return e.replace(RegExp(`([${f.spaces}])(${f.singlePrime})`, "g"), "$2");
}
function tt(e, t) {
	return [
		{
			pattern: W.singlePrime,
			replacement: f.singlePrime
		},
		{
			pattern: `[${W.apos}${W.osqUnpaired}${W.csqUnpaired}]`,
			replacement: f.apostrophe
		},
		{
			pattern: W.osq,
			replacement: t.openingSingleQuote
		},
		{
			pattern: W.csq,
			replacement: t.closingSingleQuote
		}
	].reduce((e, { pattern: t, replacement: n }) => e.replace(new RegExp(t, "gu"), n), e);
}
function nt(e, t) {
	return e = ze(e), e = Be(e), e = He(e), e = Ue(e), e = Ve(e), e = We(e), e = Ye(e), e = qe(e), e = Ze(e), e = Xe(e), e = tt(e, t), e = Qe(e, t), e = $e(e, t), e = et(e), e;
}
//#endregion
//#region src/modules/symbols/multiplication-sign.js
function rt(e) {
	return h(e, RegExp(`([\\d]+)([${f.spaces}]?[\\p{Ll}${f.singlePrime}${f.doublePrime}]*)([${f.spaces}][x][${f.spaces}])([\\d]+)([${f.spaces}]?[\\p{Ll}${f.singlePrime}${f.doublePrime}]*)`, "giu"), `$1$2${f.nbsp}${f.multiplicationSign}${f.nbsp}$4$5`);
}
function it(e) {
	return h(e, RegExp(`([\\p{L}]+)([${f.spaces}][x][${f.spaces}])([\\p{L}]+)`, "gu"), `$1${f.nbsp}${f.multiplicationSign}${f.nbsp}$3`);
}
function at(e) {
	return e.replace(RegExp(`([\\d])([${f.spaces}]?)([x×])([${f.spaces}])([\\p{Ll}]+)`, "giu"), function(e, t, n, r, i, a) {
		return n == "" ? `${t}${n}${f.multiplicationSign}${f.nbsp}${a}` : `${t}${f.nbsp}${f.multiplicationSign}${f.nbsp}${a}`;
	});
}
function ot(e) {
	return e.replace(RegExp(`([\\d]+)([${f.singlePrime}${f.doublePrime}])?([x|×])([\\d]+)([${f.singlePrime}${f.doublePrime}])?`, "giu"), `$1$2${f.nbsp}${f.multiplicationSign}${f.nbsp}$4$5`);
}
function st(e) {
	return e = rt(e), e = it(e), e = at(e), e = ot(e), e;
}
//#endregion
//#region src/modules/symbols/symbol-utils.js
function J(e, t, n) {
	return e = M(e, t), e = v(e, t, n), e = y(e, t, n), e;
}
//#endregion
//#region src/modules/symbols/section-sign.js
function ct(e, t) {
	return e = J(e, f.sectionSign, t.spaceAfter.sectionSign), e = J(e, f.paragraphSign, t.spaceAfter.paragraphSign), e;
}
//#endregion
//#region src/modules/symbols/copyrights.js
function Y(e, t, n) {
	return e.replace(RegExp(`(\\(${t}\\))([${f.spaces}]*)(\\d)`, "gi"), `${n}$2$3`);
}
function lt(e, t) {
	return e = Y(e, "c", f.copyright), e = J(e, f.copyright, t.spaceAfter.copyright), e = Y(e, "p", f.soundRecordingCopyright), e = J(e, f.soundRecordingCopyright, t.spaceAfter.soundRecordingCopyright), e;
}
//#endregion
//#region src/modules/symbols/numero-sign.js
function ut(e, t) {
	return e = J(e, f.numeroSign, t.spaceAfter.numeroSign), e;
}
//#endregion
//#region src/modules/symbols/plus-minus.js
function dt(e) {
	return e.replace(RegExp("(\\+\\-)|(\\-\\+)", "g"), f.plusMinus);
}
//#endregion
//#region src/modules/symbols/marks.js
function X(e, t, n) {
	return e.replace(RegExp(`([^0-9]|^)([${f.spaces}]*)(\\(${t}\\)|${n})`, "gi"), `$1${n}`);
}
function ft(e) {
	return e = X(e, "r", f.registeredTrademark), e = X(e, "sm", f.serviceMark), e = X(e, "tm", f.trademark), e;
}
//#endregion
//#region src/modules/symbols/exponents.js
function Z(e, t, n) {
	return e.replace(RegExp(`([${f.spaces}${f.slash}])(m|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym)(${t})`, "g"), `$1$2${n}`);
}
function pt(e) {
	return Z(e, "2", "²");
}
function mt(e) {
	return Z(e, "3", "³");
}
function ht(e) {
	return e = pt(e), e = mt(e), e;
}
//#endregion
//#region src/modules/symbols/number-sign.js
function gt(e) {
	return e.replace(RegExp(`([${f.spaces}]+)(${f.numberSign})([${f.spaces}]+)(\\d)`, "g"), "$1$2$4");
}
function _t(e) {
	return e = gt(e), e;
}
//#endregion
//#region src/modules/words/abbreviations.js
function vt(e, t) {
	let n = `([\\p{Lu}][\\p{L}]?\\.)([${f.spaces}]?)`, r = "([\\p{L}]{2,}[^\\.])", i = [
		{
			pattern: `${n}${r}`,
			replacement: `$1${f.nbsp}$3`
		},
		{
			pattern: `${n}${n}${r}`,
			replacement: `$1${t.spaceAfter.abbreviation}$3${f.space}$5`
		},
		{
			pattern: `${n}${n}${n}${r}`,
			replacement: `$1${t.spaceAfter.abbreviation}$3${t.spaceAfter.abbreviation}$5${f.space}$7`
		}
	];
	for (let { pattern: t, replacement: n } of i) e = e.replace(new RegExp(t, "gu"), n);
	return e;
}
function yt(e, t) {
	let n = `([^\\p{L}${f.enDash}${f.emDash}]|^)`, r = `([^\\p{L}${t.openingDoubleQuote}${t.openingSingleQuote}${f.backtick}\\p{Emoji}]|$)`, i = [];
	for (let e = 0; e < t.multipleWordAbbreviations.length; e++) {
		let n = t.multipleWordAbbreviations[e].split(" "), r = "";
		for (let e = 0; e < n.length; e++) r += `(${n[e]})(\\.)([${f.spaces}]?)`;
		i[e] = r;
	}
	for (let r = 0; r < i.length; r++) {
		let a = `${n}${i[r]}([\\p{L}]|\\D)`, o = "$1", s = (i[r].match(/\(/g) || []).length / 3;
		for (let e = 0; e < s - 1; e++) o += `$${e * 3 + 2}.${t.spaceAfter.abbreviation}`;
		o += `$${(s - 1) * 3 + 2}. $${s * 3 + 2}`, e = e.replace(new RegExp(a, "giu"), o);
	}
	for (let a = 0; a < i.length; a++) {
		let o = `${n}${i[a]}${r}`, s = "$1", c = (i[a].match(/\(/g) || []).length / 3;
		for (let e = 0; e < c - 1; e++) s += `$${e * 3 + 2}.${t.spaceAfter.abbreviation}`;
		s += `$${(c - 1) * 3 + 2}.$${c * 3 + 2}`, e = e.replace(new RegExp(o, "giu"), s);
	}
	return e;
}
function bt(e, t) {
	let n = [];
	for (let e = 0; e < t.singleWordAbbreviations.length; e++) n[e] = `(${t.singleWordAbbreviations[e]})(\\.)([${f.spaces}]?)`;
	let r = `([^\\p{L}${f.enDash}${f.emDash}${f.nbsp}\\.]|^)`;
	for (let t = 0; t < n.length; t++) e = e.replace(RegExp(`${r}${n[t]}([\\p{L}\\d]+)([^\\.]|\$)`, "giu"), `$1$2$3${f.nbsp}$5$6`);
	let i = `([\\p{L}\\d])([${f.spaces}])`, a = `([^${f.spaces}\\p{L}\\d]|$)`;
	for (let t = 0; t < n.length; t++) e = e.replace(RegExp(`${i}${n[t]}${a}`, "giu"), `$1${f.nbsp}$3$4$5$6`);
	return e;
}
function Q(e, t) {
	return e = vt(e, t), e = yt(e, t), e = bt(e, t), e;
}
//#endregion
//#region src/modules/words/case.js
function xt(e) {
	return e = e.replace(/* @__PURE__ */ RegExp("([^\\p{L}]|^)([\\p{Lu}]{2})([\\p{Ll}]{2,})", "gu"), function(e, t, n, r) {
		return `${t}${n.substring(0, 1)}${n.substring(1).toLowerCase()}${r}`;
	}), e.replace(/* @__PURE__ */ RegExp("(\\b)(?!iOS)([\\p{Ll}])([\\p{Lu}]{2,})", "gu"), function(e, t, n, r) {
		return `${t}${n.toUpperCase()}${r.toLowerCase()}`;
	});
}
//#endregion
//#region src/modules/words/pub-id.js
function St(e) {
	return e.replace(RegExp(`(issn)(:?)([${f.spaces}]?)(\\d{4})([${f.spaces}]?[${f.hyphen}${f.enDash}${f.emDash}][${f.spaces}]?)(\\d{4})`, "gi"), `ISSN$2${f.nbsp}$4-$6`);
}
function Ct(e) {
	let t = `([${f.spaces}]?[${f.hyphen}${f.enDash}${f.emDash}][${f.spaces}]?)`;
	return e.replace(RegExp(`(isbn)(:?)([${f.spaces}]?)(\\d+)` + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+)", "gi"), `ISBN$2${f.nbsp}$4-$6-$8-$10`);
}
function wt(e) {
	let t = `([${f.spaces}]?[${f.hyphen}${f.enDash}${f.emDash}][${f.spaces}]?)`;
	return e.replace(RegExp(`(isbn)(:?)([${f.spaces}]?)(\\d+)` + t + "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+)", "gi"), `ISBN$2${f.nbsp}$4-$6-$8-$10-$12`);
}
function Tt(e) {
	let t = `([${f.spaces}]?[${f.hyphen}${f.enDash}${f.emDash}][${f.spaces}]?)`;
	return e.replace(RegExp("(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(\\d+)" + t + "(X|\\d+?)", "g"), "$1-$3-$5-$7-$9");
}
function Et(e) {
	return e = St(e), e = Ct(e), e = wt(e), e = Tt(e), e;
}
//#endregion
//#region src/modules/words/exceptions.js
function Dt(e) {
	let t = [];
	return $(e, f.emailPattern, t), $(e, f.urlPattern, t), $(e, f.filenamePattern, t), {
		processedText: Ot(e, t),
		exceptions: t
	};
}
function $(e, t, n) {
	let r = new RegExp(t, "gi"), i = e.match(r);
	return i && i.forEach((e) => n.push(e)), n;
}
function Ot(e, t) {
	return t.reduce((e, t, n) => {
		let r = q(n);
		return e.replace(t, r);
	}, e);
}
function kt(e, t) {
	return t.reduce((e, t, n) => {
		let r = q(n), i = new RegExp(r, "g");
		return e.replace(i, t);
	}, e);
}
//#endregion
//#region src/typopo.js
function At(e, t, n) {
	t = t === void 0 ? "en-us" : t;
	let r = new te(t);
	n = n === void 0 ? { removeLines: !0 } : n;
	let { processedText: i, exceptions: a } = Dt(e);
	return e = i, n.removeLines && (e = ne(e)), e = me(e, r), e = N(e, r), e = F(e), e = Se(e, r), e = nt(e, r), e = Re(e, r), e = st(e), e = ct(e, r), e = lt(e, r), e = ut(e, r), e = dt(e), e = ft(e), e = ht(e), e = _t(e), e = xt(e), e = Et(e), e = Q(e, r), e = b(e, r), e = kt(e, a), e;
}
//#endregion
export { At as fixTypos };
