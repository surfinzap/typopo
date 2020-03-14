import {replacePeriodsWithEllipsis,
				fixEllipsis} from "../../lib/punctuation/ellipsis";
import assert from 'assert';
import Locale from "../../locale/locale";


describe('Replace periods/ellipses with a single ellipsis:\n', () => {
	let testCase = {
		/* [1] replace 3 and more dots/ellipses with an ellipsis */
	 "Sentence ... another sentence": "Sentence … another sentence",
	 "Sentence .... another sentence": "Sentence … another sentence",
	 "Sentence ..... another sentence": "Sentence … another sentence",
	 "Sentence ending...": "Sentence ending…",
	 "Sentence ending....": "Sentence ending…",
	 "Sentence ending.....": "Sentence ending…",
	 "Sentence ending….....": "Sentence ending…",
	 "Sentence ending….…": "Sentence ending…",
	 "Sentence ending.….....": "Sentence ending…",

	 /* [2] replace .…, …., …… with an ellipsis */
	 "Sentence ending……": "Sentence ending…",
	 "Sentence ending….": "Sentence ending…",
	 "Sentence ending.…": "Sentence ending…",

	 /* [3] replace .. between words with an aposiopesis (best effort) */
	 "Sentence .. another sentence": "Sentence … another sentence",

	 /* false positives */
	 "Sentence ending.": "Sentence ending.",
	 "Sentence ending..": "Sentence ending..",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replacePeriodsWithEllipsis(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixEllipsis(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Ellipsis\n', () => {
	let testCase = {

		/* space ellipsis correctly, when used around commas */
		"We sell apples, oranges,…, pens.": "We sell apples, oranges, …, pens.",
		"We sell apples, oranges,… , pens.": "We sell apples, oranges, …, pens.",
		"We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.",
		"We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // nbsp
		"We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // hair_space
		"We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", //narrow_nbsp

		/* remove space before aposiopesis, that is ending a sentence*/
		"Sentence ending … And another starting": "Sentence ending… And another starting",
		"Sentence ending …": "Sentence ending…",
		/* but keep the space after the sentence punctuation,
			where … is a placeholder for other concrete words */
		"Give me some example, e.g. apples, oranges, …": "Give me some example, e.g. apples, oranges, …",

		/*	remove space
				when aposiopesis is used at the beginning of unfinished the sentence */
		"Sentence ended. … and we were there.": "Sentence ended. …and we were there.",
		"Sentence ended! … and we were there.": "Sentence ended! …and we were there.",
		"Sentence ended!… and we were there.": "Sentence ended! …and we were there.",
		"Sentence ended? … and we were there.": "Sentence ended? …and we were there.",
		"Sentence ended?’ … and we were there.": "Sentence ended?’ …and we were there.",
		"Sentence ended?’… and we were there.": "Sentence ended?’ …and we were there.",
		"Sentence ended?”… and we were there.": "Sentence ended?” …and we were there.",

		/*	keep spaces around ellipsis
				when it is used at the beginning of the full sentence */
		"What are you saying. …She did not answer." : "What are you saying. … She did not answer.",
		"What are you saying!…She did not answer." : "What are you saying! … She did not answer.",
		"What are you saying?…She did not answer." : "What are you saying? … She did not answer.",
		"‘What are you saying?’…She did not answer." : "‘What are you saying?’ … She did not answer.",
		"“What are you saying?”…She did not answer." : "“What are you saying?” … She did not answer.",

		/* remove space after aposiopesis at the beginning of the paragraph*/
		"… да святить ся": "…да святить ся",
		"… да святить ся\n… multiline test": "…да святить ся\n…multiline test",

		/* keep spaces around aposiopesis, that is used in the middle of a sentence */
		"Sentence using … aposiopesis in the middle of a sentence.": "Sentence using … aposiopesis in the middle of a sentence.",

		/* add space after aposiopesis between two words
		(best effort guess based on ellipsis being placed between two words) */
		"word...word" : "word… word"

	};



	Object.keys(testCase).forEach((key) => {
		it("should fix multiple errors with ellipsis/aposiopesis use", () => {
			assert.equal(fixEllipsis(key, new Locale("en-us")), testCase[key]);
		});
	});
});
