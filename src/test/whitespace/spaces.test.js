import {removeMultipleSpaces,
				removeSpacesAtParagraphStart,
				removeSpaceBeforeSentencePausePunctuation,
				removeSpaceBeforeTerminalPunctuation,
				removeSpaceAfterPunctuation,
				addSpaceBeforePunctuation,
				addSpaceAfterPunctuation,
				removeTrailingSpaces,
				addSpaceBeforeSymbol,
				fixSpaces} from "../../lib/whitespace/spaces";
import assert from 'assert';
import Locale from "../../locale/locale";

describe('Replace multiple spaces with a single one\n', () => {
	let testCase = {
		/* Remove multiple spaces with a single one,
			 even non-breaking spaces and others */
		"How  many spaces": "How many spaces",
		"How   many": "How many",
		"How    many": "How many",
		"How     many": "How many",
		"How      many": "How many", // test includes nbsp
		"How      many": "How many", // test includes hairSpace
		"How      many": "How many", // test includes narrowNbsp
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(removeMultipleSpaces(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Remove spaces and tabs at paragraph start\n', () => {
	let testCase = {

		" What if paragraph starts with extra space at the beginning?":
		"What if paragraph starts with extra space at the beginning?",

		"  What if paragraph starts with extra space at the beginning?":
		"What if paragraph starts with extra space at the beginning?",

		"   What if paragraph starts with extra space at the beginning?":
		"What if paragraph starts with extra space at the beginning?",

		"    What if paragraph starts with extra space at the beginning?":
		"What if paragraph starts with extra space at the beginning?", // including nbsp

		"    What if paragraph starts with extra space at the beginning?":
		"What if paragraph starts with extra space at the beginning?", // including hairSpace

		"    What if paragraph starts with extra space at the beginning?":
		"What if paragraph starts with extra space at the beginning?", // including narrowNbsp

		"One sentence ends. And next one continues as it should":
		"One sentence ends. And next one continues as it should",

		/* removing tabs as well*/
		"			What if sentence starts with tabs?": "What if sentence starts with tabs?",
		"		What if sentence starts with tabs?": "What if sentence starts with tabs?",
		"	What if sentence starts with tabs?": "What if sentence starts with tabs?",

		// double-check, that single new lines are not removed
		"If there is one line \nand another": "If there is one line \nand another",
	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(removeSpacesAtParagraphStart(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Remove space before sentence pause-punctuation\n', () => {
	let testCase = {
		"Hey , man.": "Hey, man.",
		"Hey , man.": "Hey, man.", // nbsp
		"Hey , man.": "Hey, man.", // hair_space
		"Hey , man.": "Hey, man.", // narrow_nbsp
		"Sentence and… :": "Sentence and…:",
		"Sentence and… , else": "Sentence and…, else",
		"Sentence and… ; else": "Sentence and…; else",
		"Keep space before emoticon :)" : "Keep space before emoticon :)", // false positive
		"Keep space before emoticon :-)" : "Keep space before emoticon :-)", // false positive
	};

	Object.keys(testCase).forEach((key) => {
		it("unit tests", () => {
			assert.equal(removeSpaceBeforeSentencePausePunctuation(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Remove space before terminal punctuation, closing brackets and degree symbol\n', () => {
	let testCase = {
		"Hey .": "Hey.",
		"Hey .": "Hey.", // nbsp
		"Hey .": "Hey.", // hair_space
		"Hey .": "Hey.", // narrow_nbsp
		"Sentence and… !": "Sentence and…!",
		"Sentence and… ?": "Sentence and…?",
		"Something (… ) something else": "Something (…) something else",
		"Something [… ] something else": "Something […] something else",
		"It was good (It was bad !)." : "It was good (It was bad!).",
		"5 °" : "5°",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit tests", () => {
			assert.equal(removeSpaceBeforeTerminalPunctuation(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Remove space after opening brackets\n', () => {
	let testCase = {
		"Something ( …) something else": "Something (…) something else",
		"Something [ …] something else": "Something […] something else",

	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(removeSpaceAfterPunctuation(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe.only('Add space before opening brackets\n', () => {
	let testCase = {
		"Enclosed(in) the brackets.": "Enclosed (in) the brackets.",
		"Enclosed[in] the brackets.": "Enclosed [in] the brackets.",
		"quote[…] with parts left out": "quote […] with parts left out",
		"Enclosed{in} the brackets.": "Enclosed {in} the brackets.",
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(addSpaceBeforePunctuation(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe.only('Add space after sentence punctuation and closing brackets\n', () => {
	let testCase = {
		"One sentence ended.Another started.": "One sentence ended. Another started.",
		"One sentence ended!Another started.": "One sentence ended! Another started.",
		"One sentence ended?Another started.": "One sentence ended? Another started.",
		"One sentence ended:another started.": "One sentence ended: another started.",
		"One sentence ended;another started.": "One sentence ended; another started.",
		"One sentence ended,another started.": "One sentence ended, another started.",
		"Enclosed (in)the brackets.": "Enclosed (in) the brackets.",
		"Enclosed [in]the brackets.": "Enclosed [in] the brackets.",
		"Enclosed {in}the brackets.": "Enclosed {in} the brackets.",
		"quote […]with parts left out": "quote […] with parts left out",
		"R-N.D." : "R-N.D.", // false positive
		"the U.S.":"the U.S.",
		"John Thune (S.D.)" : "John Thune (S.D.)",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addSpaceAfterPunctuation(key, new Locale("en-us")), testCase[key]);
		});
	});

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.equal(fixSpaces(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Remove trailing spaces\n', () => {
	let testCase = {
		"trailing spaces    ": "trailing spaces",
		"trailing spaces    ": "trailing spaces", // nbsp
		"trailing spaces    ": "trailing spaces", // hair_space
		"trailing spaces    ": "trailing spaces", // narrow_nbsp
		"trailing spaces.    ": "trailing spaces.",
		"trailing spaces;    ": "trailing spaces;",
	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(removeTrailingSpaces(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Add space before symbol, e.g. ©\n', () => {
	let testCase = {
		"© 2017": "© 2017",
		"(© 2017)": "(© 2017)",
		"Company© 2017": "Company © 2017",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addSpaceBeforeSymbol(key, new Locale("en-us"), "©"), testCase[key]);
		});
	});
});
