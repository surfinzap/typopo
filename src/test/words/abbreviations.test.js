import {fixAbbreviations,
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
		"a e.g. something": "a e.g. something",
		"abc\ne.g. something": "abc\ne.g. something",
		"Greg Snow": "Greg Snow", // false positive
		"eggnog": "eggnog", // false positive

		"I. e. something": "i.e. something",
		"I. e.something": "i.e. something",
		"I. E. something": "i.e. something",
		"I.E. something": "i.e. something",
		"ie. something": "i.e. something",
		"ie something": "i.e. something",
		"i.     e. something": "i.e. something",
		"a i.e. something": "a i.e. something",
		"brie cheese": "brie cheese", // false positive
		"Pam Grier": "Pam Grier", // false positive
		"najkrajšie": "najkrajšie", // false positive for non-latin boundaries
		"nevieš": "nevieš", // false positive for non-latin boundaries
		"ieš": "ieš", // false positive for non-latin boundaries
		"či e-mail marketing" : "či e-mail marketing", // false positive for non-latin boundaries

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

		"4.20 pm": "4.20 p.m.",
		"4.20 PM": "4.20 p.m.",
		"4.20 p.m.": "4.20 p.m.",
		"4.20 p.     m.": "4.20 p.m.",
		"4.20 p.m. in the afternoon": "4.20 p.m. in the afternoon",
		"She is the PM of the UK.": "She is the PM of the UK.", // false positive

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
