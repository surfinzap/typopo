import {removeNbspBetweenMultiCharWords,
				addNbspAfterPreposition,
				addNbspAfterAmpersand,
				addNbspAroundMultiplicationSign,
				addNbspAfterCardinalNumber,
				addNbspAfterOrdinalNumber,
				addNbspWithinOrdinalDate,
				addNbspAfterRomanNumeral,
				addNbspAfterInitial,
				addNbspAfterSymbol,
				replaceSpacesWithNbspAfterSymbol,
				addNbspAfterAbbreviation,
				fixNbsp} from "../../lib/whitespace/nbsp";
import assert from 'assert';
import Locale from "../../locale/locale";



describe('Remove non-breaking space between multi-letter words\n', () => {
	let testCase = {
		"vo dvore": "vo dvore",
		"Ku komore": "Ku komore",
		"vo vo vo vo": "vo vo vo vo",
		"ňa moja": "ňa moja",
		"Ťa tvoja": "Ťa tvoja",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(removeNbspBetweenMultiCharWords(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Add non-breaking spaces after single-character prepositions\n', () => {
	let testCase = {
		"Koniec. V potoku": "Koniec. V potoku",
		"Skáče o tyči": "Skáče o tyči",
		"v obchode a v hospode": "v obchode a v hospode",
		"v a v a v": "v a v a v",
		"a з коминів": "a з коминів",
		"a я іду здоїти": "a я іду здоїти",
		"a в хырбетї": "a в хырбетї",
		"што є му вытыкане": "што є му вытыкане",
		"ся ї не": "ся ї не",
		"client’s customer" : "client’s customer", // false positive
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterPreposition(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Add non-breaking space after ampersand\n', () => {
	let testCase = {
		"Bed & Breakfast": "Bed & Breakfast",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterAmpersand(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Add non-breaking space after cardinal number\n', () => {
	let testCase = {
		"5 mm": "5 mm",
		"5 Kč": "5 Kč",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterCardinalNumber(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Add non-breaking space after ordinal number (en)\n', () => {
	let testCase = {
		"1st amendment": "1st amendment",
		"2nd amendment": "2nd amendment",
		"3rd amendment": "3rd amendment",
		"4th amendment": "4th amendment",
		"18th amendment": "18th amendment",
		"15th March": "15th March",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterOrdinalNumber(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Add non-breaking space after ordinal number (sk, cs, rue, de-de)\n', () => {
	let testCase = {
		"1. dodatok" : "1. dodatok",
		"1.dodatok" : "1. dodatok",
		"1.štava" : "1. štava",
		"10.00" : "10.00", // false positive for the example above
		"12. dodatok" : "12. dodatok",
		"12. január" : "12. január",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterOrdinalNumber(key, new Locale("sk")), testCase[key]);
			assert.equal(addNbspAfterOrdinalNumber(key, new Locale("cs")), testCase[key]);
			assert.equal(addNbspAfterOrdinalNumber(key, new Locale("de-de")), testCase[key]);
			assert.equal(addNbspAfterOrdinalNumber(key, new Locale("rue")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("sk")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("cs")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("de-de")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("rue")), testCase[key]);
		});
	});
});



describe('Add non-breaking space within ordinal date (sk, cs, rue)\n', () => {
	let testCase = {
		"12. 1. 2017" : "12. 1. 2017",
		"12.1.2017" : "12. 1. 2017",
		"10.00" : "10.00", // false positive for the example above
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspWithinOrdinalDate(key, new Locale("sk")), testCase[key]);
			assert.equal(addNbspWithinOrdinalDate(key, new Locale("cs")), testCase[key]);
			assert.equal(addNbspWithinOrdinalDate(key, new Locale("rue")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("sk")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("cs")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("rue")), testCase[key]);
		});
	});
});



describe('Add non-breaking space within ordinal date (de-de)\n', () => {
	let testCase = {
		/*  German standard orthography (Duden) recommends
				only one nbsp (or narrowNbsp) after the day
				and a regular interword space following the month*/
		"12.1.2019" : "12. 1. 2019",
		"12. 1. 2019": "12. 1. 2019",
		"10.00" : "10.00", // false positive for the example above
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspWithinOrdinalDate(key, new Locale("de-de")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("de-de")), testCase[key]);
		});
	});
});



describe('Add non-breaking space after roman numeral (sk, cs, de-de, rue)\n', () => {
	let testCase = {
		"I. kapitola": "I. kapitola",
		"bola to I. kapitola": " bola to I. kapitola",
		"III. kapitola": "III. kapitola",
		"III.kapitola": "III. kapitola",
		"X. ročník": "X. ročník",
		"V. ročník": "V. ročník",
		"L. ročník": "L. ročník",
		"D. ročník": "D. ročník",
		"8. V. 1945": "8. V. 1945",
		"8. V.1945": "8. V. 1945",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterRomanNumeral(key, new Locale("sk")), testCase[key]);
			assert.equal(addNbspAfterRomanNumeral(key, new Locale("cs")), testCase[key]);
			assert.equal(addNbspAfterRomanNumeral(key, new Locale("de-de")), testCase[key]);
			assert.equal(addNbspAfterRomanNumeral(key, new Locale("rue")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("sk")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("cs")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("de-de")), testCase[key]);
			assert.equal(fixNbsp(key, new Locale("rue")), testCase[key]);
		});
	});
});



describe('Add non-breaking space after initial\n', () => {
	let testCase = {
		"Philip K. Dick": "Philip K. Dick",
		"F. X." : "F. X.",
		"F. X. R." : "F. X. R.",
		"F. X. Šalda" : "F. X. Šalda",
		"S.J.": "S. J.",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterInitial(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Add space after symbol, e.g. ©\n', () => {
	let testCase = {
		"©2017": "© 2017",
		"Company ©2017": "Company © 2017",
	};

	Object.keys(testCase).forEach((key) => {
		it("just unit tests", () => {
			assert.equal(addNbspAfterSymbol(key, new Locale("en-us"), "©"), testCase[key]);
		});
	});
});



describe('Replaces various spaces with non-breaking space after symbol, e.g. ©\n', () => {
	let testCase = {
		"Company © 2017": "Company © 2017",
		"Company © 2017": "Company © 2017", // hairSpace
		"Company © 2017": "Company © 2017", // narrowNbsp
	};

	Object.keys(testCase).forEach((key) => {
		it("just unit tests", () => {
			assert.equal(replaceSpacesWithNbspAfterSymbol(key, new Locale("en-us"), "©"), testCase[key]);
		});
	});
});



describe('Add non-breaking space after abbreviations\n', () => {
	let testCase = {
		// as all abbreviations can be used within different languages, such as reference, they're being corrected in each language
		"č.5 žije" : "č. 5 žije",
		"Č.5 žije" : "č. 5 žije",
		"č. 5 žije" : "č. 5 žije",
		"áno, č. 5 žije" : "áno, č. 5 žije",
		"preč č. 5 žije" : "preč č. 5 žije",
		"str. 8" : "str. 8",
		"tzv. rýč" : "tzv. rýč",
		"Prines kvetináč. 5 je super číslo." : "Prines kvetináč. 5 je super číslo.", //false positive
		"hl. m. Praha" : "hl. m. Praha",
		"hl.m.Praha" : "hl. m. Praha", // not supported yet
		"hl. m.Praha" : "hl. m. Praha",
		"hl.m. Praha" : "hl. m. Praha",
		"10 a.m." : "10 a.m.", // false positive for abbreviation within abbreviation, i.e. m. within a.m.
		"e.g. something" : "e.g. something",
		"10 p." : "10 p.",
		"pp. 10–25" : "pp. 10–25",
		"(pp. 10–25)" : "(pp. 10–25)",
		"(e.g.)" : "(e.g.)",
		"“e.g.”" : "“e.g.”",
		"‘e.g.’" : "‘e.g.’",
		"z.B." : "z. B.",
		"S. 123" : "S. 123",
		"the U.S. and" : "the U.S. and", //false positive
		// "John Thune (S.D.)" : "John Thune (S.D.)", // false positive, yet not supported. TBD
	};

	Object.keys(testCase).forEach((key) => {
		it("unit tests", () => {
			assert.equal(addNbspAfterAbbreviation(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Add non-breaking space after abbreviations (extra set for module test)\n', () => {
	let testCase = {
		// as all abbreviations can be used within different languages, such as reference, they're being corrected in each language
		"str. 8" : "str. 8",
		"tzv. rýč" : "tzv. rýč",
		"hl. m. Praha" : "hl. m. Praha",
		// "hl.m.Praha" : "hl. m. Praha", // not supported yet
		// "hl. m.Praha" : "hl. m. Praha",
		// "hl.m. Praha" : "hl. m. Praha",
		"e.g. something" : "e.g. something",
		"pp. 10–25" : "pp. 10–25",
		"(e.g.)" : "(e.g.)",
		"“e.g.”" : "“e.g.”",
		"‘e.g.’" : "‘e.g.’",
		"z.B." : "z. B.", // (e.g. in Germany)
		"S. 123" : "S. 123",
		// "the U.S. and" : "the U.S. and", //false positive, yet not supported.
		// "John Thune (S.D.)" : "John Thune (S.D.)", // false positive, yet not supported. TBD

	};

	Object.keys(testCase).forEach((key) => {
		it("module tests", () => {
			assert.equal(fixNbsp(key, new Locale("en-us")), testCase[key]);
		});
	});
});
