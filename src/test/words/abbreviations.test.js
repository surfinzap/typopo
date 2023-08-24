import {fixAbbreviations,
				fixInitials,
				fixMultipleWordAbbreviations,
				fixSingleWordAbbreviations} from "../../lib/words/abbreviations";
import assert from 'assert';
import Locale from "../../locale/locale";


describe('Fix Initials (sk, cs, rue, de-de)\n', () => {
	let testCase = {
		// test cases for first name initials
		"J. Novak": "J. Novak",	// essential case, nbsp missing
		"J.Novak": "J. Novak",	// space missing
		"J. Novak": "J. Novak",	// double-check NBSP in the middle
		"Ch. Lambert" : "Ch. Lambert", //double-letter as a first name initial
		"CH. Lambert" : "CH. Lambert", //double-letter initialized as a first name initial
		"Philip K. Dick": "Philip K. Dick", // one middle initial
		"Philip K.Dick": "Philip K. Dick", // one middle initials

		// test cases for two-letter initials
		"F. X. Šalda" : "F. X. Šalda", //nbsp after 1st letter, normal space after 2nd one
		"F.X. Šalda" : "F. X. Šalda",
		"Ch.Ch. Šalda" : "Ch. Ch. Šalda",
		"CH.CH. Šalda" : "CH. CH. Šalda",

		// test cases for three-letter initials
		"Ch. G. D. Lambert" : "Ch. G. D. Lambert", // nbsp after 2 letter, normal space after third one
		"Ch. Ch. Ch. Lambert" : "Ch. Ch. Ch. Lambert",
		"CH. CH. CH. Lambert" : "CH. CH. CH. Lambert",

		// false positives, this function should leave them as they are
		"F. X." : "F. X.",
		"F.X." : "F.X.",
		"F. X. R." : "F. X. R.",
	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixInitials(key, new Locale("sk")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixAbbreviations(key, new Locale("sk")), testCase[key]);
		});
	});
});

describe('Fix Initials (en-us)\n', () => {
	let testCase = {
		// test cases for first name initials
		"J. Novak": "J. Novak",	// essential case, nbsp missing
		"J.Novak": "J. Novak",	// space missing
		"J. Novak": "J. Novak",	// double-check NBSP in the middle
		"Ch. Lambert" : "Ch. Lambert", //double-letter as a first name initial
		"CH. Lambert" : "CH. Lambert", //double-letter initialized as a first name initial
		"Philip K. Dick": "Philip K. Dick", // one middle initial
		"Philip K.Dick": "Philip K. Dick", // one middle initials

		// test cases for two-letter initials
		"F. X. Šalda" : "F.X. Šalda", //nbsp after 1st letter, normal space after 2nd one
		"F.X. Šalda" : "F.X. Šalda",
		"Ch.Ch. Šalda" : "Ch.Ch. Šalda",
		"CH.CH. Šalda" : "CH.CH. Šalda",

		// test cases for three-letter initials
		"Ch. G. D. Lambert" : "Ch.G.D. Lambert", // nbsp after 2 letter, normal space after third one
		"Ch. Ch. Ch. Lambert" : "Ch.Ch.Ch. Lambert",
		"CH. CH. CH. Lambert" : "CH.CH.CH. Lambert",

		// false positives, this function should leave them as they are
		"F. X." : "F. X.",
		"F.X." : "F.X.",
		"F. X. R." : "F. X. R.",
		"the U.S." : "the U.S.",
	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixInitials(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixAbbreviations(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Fix multiple-word abbreviations (sk, cs, rue, de-de)\n', () => {
	let testCase = {
		/* General pattern for these locales assumes:
			 * dots after each abbreviated word
			 * non-breaking spaces between abbreviated words
			 * normal space after the last abbreviated word
		*/
		// double-word abbreviations
		"hl. m. Praha" : "hl. m. Praha", // set proper nbsp
		"hl.m.Praha" : "hl. m. Praha", // include proper spaces
		"Hl.m.Praha" : "Hl. m. Praha", // catch capitalized exception
		"Je to hl. m. Praha." : "Je to hl. m. Praha.", // in a sentence
		"Praha, hl. m." : "Praha, hl. m.", // check for abbr at the end of statement
		"(hl. m. Praha)" : "(hl. m. Praha)", // bracket & quotes variations
		"(Praha, hl. m.)" : "(Praha, hl. m.)", // bracket & quotes variations
		"(hl. m.)" : "(hl. m.)", // bracket & quotes variations
		"hl. m." : "hl. m.", // plain abbreviation
		"č., s., hl. m., str.," : "č., s., hl. m., str.,", // in a list of abbreviations
		"Dave Grohl. m. Praha" : "Dave Grohl. m. Praha", // false positive for not catching abbr. in a word
		"Sliačhl. m. Praha" : "Sliačhl. m. Praha", // false positive for not catching abbr. in a non-latin word

		// triple word abbreviations
		"im Jahr 200 v. u. Z. als der Hunger" : "im Jahr 200 v. u. Z. als der Hunger",
		"im Jahr 200 v.u.Z. als der Hunger" : "im Jahr 200 v. u. Z. als der Hunger",
		"im Jahr 200 v. u. Z." : "im Jahr 200 v. u. Z.",
		"im Jahr 200 v.u.Z." : "im Jahr 200 v. u. Z.",
		"v. u. Z." : "v. u. Z.",
		"v.u.Z." : "v. u. Z.",

		// random abbreviations to randomly check various localization
		"1000 pr. n. l." : "1000 pr. n. l.",
		"im Jahr 200 v. Chr." : "im Jahr 200 v. Chr.",
		"Das Tier, d. h. der Fisch, lebte noch lange." : "Das Tier, d. h. der Fisch, lebte noch lange.",
		"Das Tier – d. i. der Fisch – lebte noch lange." : "Das Tier – d. i. der Fisch – lebte noch lange.",
		"Das Tier (d. h. der Fisch) lebte noch lange." : "Das Tier (d. h. der Fisch) lebte noch lange.",
		"т. зн. незвыкле" : "т. зн. незвыкле"
	};



	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixMultipleWordAbbreviations(key, new Locale("sk")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixAbbreviations(key, new Locale("sk")), testCase[key]);
		});
	});
});

describe('Fix multiple-word abbreviations (en-us)\n', () => {
	let testCase = {
		/* General pattern for these locales assumes:
		 * dots after each abbreviated word
		 * no spaces between abbreviated words
		 * normal space after the last abbreviated word
		 */
		"the U.S.": "the U.S.",
		"the U. S.": "the U.S.",

		", e.g. something": ", e.g. something",
		"(e.g. something": "(e.g. something",
		"a e.g. something": "a e.g. something",
		"abc\ne.g. something": "abc\ne.g. something",
		"e.g. 100 km": "e.g. 100 km",
		"(e.g.)": "(e.g.)",
		"(e.g. )": "(e.g.)",
		"“e. g.”": "“e.g.”",
		"‘e. g.’": "‘e.g.’",
		"e. g.": "e.g.",
		"č., s., fol., e. g., i.e., str.,": "č., s., fol., e.g., i.e., str.,",

		"e.g. “something”": "e.g. “something”",
		"e.g. ‘something’": "e.g. ‘something’",

		"e.g. ```something```": "e.g. ```something```",
		"e.g. `something`": "e.g. `something`",

		"a i.e. something": "a i.e. something",
		"i.e. 100 km": "i.e. 100 km",
		"brie cheese": "brie cheese", // false positive
		"Pam Grier": "Pam Grier", // false positive
		najkrajšie: "najkrajšie", // false positive for non-latin boundaries
		nevieš: "nevieš", // false positive for non-latin boundaries
		ieš: "ieš", // false positive for non-latin boundaries
		"či e-mail marketing": "či e-mail marketing", // false positive for non-latin boundaries
		"(i.e.)": "(i.e.)",

		"4.20 p.m.": "4.20 p.m.",
		"4.20 p.m. in the afternoon": "4.20 p.m. in the afternoon",
		"She is the PM of the UK.": "She is the PM of the UK.", // false positive
		"2 PMs": "2 PMs",

		// Throwing extra space
		"“We will continue tomorrow at 8:00 a.m.”":
			"“We will continue tomorrow at 8:00 a.m.”",
		"We will continue tomorrow at 8:00 a.m.!":
			"We will continue tomorrow at 8:00 a.m.!",
		"8 a.m. is the right time": "8 a.m. is the right time",
	};



	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixMultipleWordAbbreviations(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixAbbreviations(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Fix Single-word abbreviations (sk, cs, rue, de-de, en-us)\n', () => {
	let testCase = {
		/* General pattern for these locales assumes nbsp after abbreviation
		*/
		"č. 5 žije" : "č. 5 žije", // set nbsp
		"č.5 žije" : "č. 5 žije", // add nbsp
		"preč č. 5 žije" : "preč č. 5 žije", // identify abbreviation word ending in non-latin character
		"áno, č. 5 žije" : "áno, č. 5 žije", // identify abbreviation after sentence punctuation
		"Prines kvetináč. 5 je super číslo." : "Prines kvetináč. 5 je super číslo.", //false positive where abbreviation is part of the previous sentence
		"(pp. 10–25)" : "(pp. 10–25)", // abbr. in brackets
		"t. č. 555-729-458" : "t. č. 555-729-458", // false positive, do not correct single-word abbr. that's part of the multiple-word abbr
		"t. č. dačo" : "t. č. dačo", // false positive, do not correct single-word abbr. that's part of the multiple-word abbr (word variation)
		"4.20 p.m." : "4.20 p.m.", // false positive

		"str. 38" : "str. 38", // other abbreviation example
		"str. 7" : "str. 7", // other abbreviation example
		"str. p" : "str. p", // other abbreviation example
		"tzv. rýč" : "tzv. rýč", // other abbreviation example

		"10 č." : "10 č.", // abbreviation at the end of the word
		"10 p." : "10 p.", // abbreviation at the end of the word
		"10 str." : "10 str.", // abbreviation at the end of the word
		"(10 p.)" : "(10 p.)", // abbreviation at the end of the word & in brackets

		"the U.S. and" : "the U.S. and", //false positive
	};



	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixSingleWordAbbreviations(key, new Locale("sk")), testCase[key]);
		});
	});
});
