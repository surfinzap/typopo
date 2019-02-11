import {fixAbbreviations,
				fixInitials,
				fixEgIeAmPm} from "../../lib/words/abbreviations";
import assert from 'assert';
import Locale from "../../locale/locale";


describe('Fix abbreviations — a.m., p.m., e.g., i.e.\n', () => {
	let testCase = {
		"E. g. something": "e.g. something",
		"E. g.something": "e.g. something",
		"E. G. something": "e.g. something",
		"E.G. something": "e.g. something",
		"eg. something": "e.g. something",
		"eg something": "e.g. something",
		"e.     g. something": "e.g. something",
		", e.g. something": ", e.g. something",
		"(e.g. something": "(e.g. something",
		"a e.g. something": "a e.g. something",
		"abc\ne.g. something": "abc\ne.g. something",
		"Greg Snow": "Greg Snow", // false positive
		"eggnog": "eggnog", // false positive
		"e.g.\nsomething": "e.g. \nsomething", //consider removing space at the end of the line
		"e.g. 100 km" : "e.g. 100 km",
		"(e.g.)" : "(e.g.)",
		"(e.g. )" : "(e.g.)",
		"“e. g.”" : "“e.g.”",
		"‘e. g.’" : "‘e.g.’",
		"e. g." : "e.g.",
		"č., s., fol., e. g., i.e., str.," : "č., s., fol., e.g., i.e., str.,",

		"I. e. something": "i.e. something",
		"I. e.something": "i.e. something",
		"I. E. something": "i.e. something",
		"I.E. something": "i.e. something",
		"ie. something": "i.e. something",
		"(I. e. something": "(i.e. something",
		"ie something": "i.e. something",
		"i.     e. something": "i.e. something",
		"a i.e. something": "a i.e. something",
		"brie cheese": "brie cheese", // false positive
		"Pam Grier": "Pam Grier", // false positive
		"najkrajšie": "najkrajšie", // false positive for non-latin boundaries
		"nevieš": "nevieš", // false positive for non-latin boundaries
		"ieš": "ieš", // false positive for non-latin boundaries
		"či e-mail marketing" : "či e-mail marketing", // false positive for non-latin boundaries
		"i.e. 100 km" : "i.e. 100 km",
		"(i.e.)" : "(i.e.)",

		"a. m." : "a.m.",
		"(a. m.)" : "(a.m.)",
		"“a. m.”" : "“a.m.”",
		"‘a. m.’" : "‘a.m.’",
		"5 am": "5 a.m.",
		"5 a. m. " : "5 a.m.",
		"5 a.     m. " : "5 a.m.",
		"5a. m. " : "5 a.m.",
		"5 am in the morning": "5 a.m. in the morning",
		"5 AM": "5 a.m.",
		"5 a.m.": "5 a.m.",
		"I am from nowhere.": "I am from nowhere.", // false positive
		"5 šam": "5 šam", // false positive for non-latin boundaries
		"5 amš": "5 amš", // false positive for non-latin boundaries
		"10 Americans" : "10 Americans",

		"4.20 pm": "4.20 p.m.",
		"4.20 PM": "4.20 p.m.",
		"4.20 p.m.": "4.20 p.m.",
		"4.20 p.     m.": "4.20 p.m.",
		"4.20 p.m. in the afternoon": "4.20 p.m. in the afternoon",
		"She is the PM of the UK.": "She is the PM of the UK.", // false positive
		"2 PMs" : "2 PMs",

		// Throwing extra space
		"“We will continue tomorrow at 8:00 a.m.”": "“We will continue tomorrow at 8:00 a.m.”",
		"We will continue tomorrow at 8:00 a.m.!": "We will continue tomorrow at 8:00 a.m.!",
		"We will continue tomorrow at 8:00 a.m. — unless — someting else happens": "We will continue tomorrow at 8:00 a.m. — unless — someting else happens",
		"8 a.m. is the right time" : "8 a.m. is the right time",

	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixEgIeAmPm(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Fix Initials (sk, cs, rue, de-de)\n', () => {
	let testCase = {
		"J.Novak": "J. Novak",
		"J. Novak": "J. Novak",
		"Philip K.Dick": "Philip K. Dick",
		"Philip K. Dick": "Philip K. Dick",
		"F. X." : "F. X.",
		"F. X. R." : "F. X. R.",
		"F. X. Šalda" : "F. X. Šalda",
		"F.X. Šalda" : "F. X. Šalda",
		"S.J.": "S. J.",
	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixInitials(key, new Locale("sk")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixAbbreviations(key, new Locale("sk")), testCase[key]);
		});
	});
});

describe('Fix Initials (en-us)\n', () => {
	let testCase = {
		"J.Novak": "J. Novak",
		"J. Novak": "J. Novak",
		"Philip K.Dick": "Philip K. Dick",
		"Philip K. Dick": "Philip K. Dick",
		"F. X." : "F.X.",
		"F. X. R." : "F.X. R.", // TBD for more letters?
		"F. X. Šalda" : "F.X. Šalda",
		"F.X. Šalda" : "F.X. Šalda",
		"S.J." : "S.J.",
		"the U.S." : "the U.S.",
	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixInitials(key, new Locale("en-us")), testCase[key]);
		});
		// it("module test", () => {
		// 	assert.equal(fixAbbreviations(key, new Locale("en-us")), testCase[key]);
		// });
	});
});
