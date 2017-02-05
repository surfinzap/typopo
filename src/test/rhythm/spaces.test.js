import {removeMultipleSpaces,
				removeSpacesAtParagraphStart,
				removeSpaceBeforePunctuation,
				removeSpaceAfterPunctuation,
				addSpaceBeforePunctuation,
				addSpaceAfterPunctuation,
				removeTrailingSpaces} from "../../lib/rhythm/spaces";
import assert from 'assert';

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
			assert.equal(removeMultipleSpaces(key, "en"), testCase[key]);
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
			assert.equal(removeSpacesAtParagraphStart(key, "en"), testCase[key]);
		});
	});
});

describe('Remove space before sentence punctuation, closing brackets and degree symbol\n', () => {
	let testCase = {
		"Hey .": "Hey.",
		"Hey .": "Hey.", // nbsp
		"Hey .": "Hey.", // hair_space
		"Hey .": "Hey.", // narrow_nbsp
		"Sentence and… !": "Sentence and…!",
		"Sentence and… ?": "Sentence and…?",
		"Sentence and… :": "Sentence and…:",
		"Sentence and… , else": "Sentence and…, else",
		"Sentence and… ; else": "Sentence and…; else",
		"Something (… ) something else": "Something (…) something else",
		"Something [… ] something else": "Something […] something else",
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(removeSpaceBeforePunctuation(key, "en"), testCase[key]);
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
			assert.equal(removeSpaceAfterPunctuation(key, "en"), testCase[key]);
		});
	});
});

describe('Add space before opening brackets\n', () => {
	let testCase = {
		"Enclosed(in) the brackets.": "Enclosed (in) the brackets.",
		"Enclosed[in] the brackets.": "Enclosed [in] the brackets.",
		"Enclosed{in} the brackets.": "Enclosed {in} the brackets.",
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(addSpaceBeforePunctuation(key, "en"), testCase[key]);
		});
	});
});

describe('Add space after sentence punctuation and closing brackets\n', () => {
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
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(addSpaceAfterPunctuation(key, "en"), testCase[key]);
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
		it("", () => {
			assert.equal(removeTrailingSpaces(key, "en"), testCase[key]);
		});
	});
});
