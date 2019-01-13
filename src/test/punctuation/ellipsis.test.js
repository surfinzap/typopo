import {fixEllipsis} from "../../lib/punctuation/ellipsis";
import assert from 'assert';
import Locale from "../../locale/locale";

describe('Ellipsis\n', () => {
	let testCase = {
		/*
		 Ellipsis & Aposiopesis

		 Ellipsis (as a character) is used for 2 different purposes:
		 1. as an ellipsis to omit a piece of information deliberately
		 2. as an aposiopesis; a figure of speech wherein a sentence is
		 deliberately broken off and left unfinished

		 sources
		 https://en.wikipedia.org/wiki/Ellipsis
		 https://en.wikipedia.org/wiki/Aposiopesis
		 http://www.liteera.cz/slovnik/vypustka
		 */
		 /* replace 3 and more periods with an ellipsis … */
		"Sentence ... another sentence": "Sentence … another sentence",
		"Sentence .... another sentence": "Sentence … another sentence",
		"Sentence ..... another sentence": "Sentence … another sentence",
		"Sentence ending.": "Sentence ending.",
		"Sentence ending..": "Sentence ending..",
		"Sentence ending...": "Sentence ending…",
		"Sentence ending....": "Sentence ending…",
		"Sentence ending.....": "Sentence ending…",
		"Sentence ending….....": "Sentence ending…",
		"Sentence ending….…": "Sentence ending…",
		"Sentence ending……": "Sentence ending…",
		"Sentence ending.….....": "Sentence ending…",
		"Sentence ending.…": "Sentence ending…",

		/* best-effort: replace 2 periods in the middle with an ellipsis … */
		"Sentence .. another sentence": "Sentence … another sentence",

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
		"Give me some example, e.g. apples, oranges, …": "Give me some example, e.g. apples, oranges,…",
		// I'd argue against the last example, as the … is a placeholder for other concrete words that would
		// mandate the same spacing as in a sentence ending that continues like "apples, …, peaches, …"

		/* remove space when aposiopesis is used at the beginning of the sentence*/
		"Sentence ended. … and we were there.": "Sentence ended. …and we were there.",
		"Sentence ended! … and we were there.": "Sentence ended! …and we were there.",
		"Sentence ended? … and we were there.": "Sentence ended? …and we were there.",
		// What happens if the … stands for a complete sentence? As in: 
		// "‘What are you saying?’ … She did not answer."
		
		// In scientific discourse, I'd use […] to signify that I deliberately omitted parts (e.g. of a quotation)
		// (don’t know in which order text gets processed, so I’m including brackets spacing cases as well)
		"quote […]with parts left out": "quote […] with parts left out",
		"quote[…] with parts left out": "quote […] with parts left out",
		"quote [ …] with parts left out": "quote […] with parts left out",
		"quote [… ] with parts left out": "quote […] with parts left out",
		"quote [ … ] with parts left out": "quote […] with parts left out",

		/* remove space after aposiopesis at the beginning of the paragraph*/
		"… да святить ся": "…да святить ся",
		"… да святить ся\n… multiline test": "…да святить ся\n…multiline test",

		/* keep spaces around aposiopesis, that is used in the middle of a sentence */
		"Sentence using … aposiopesis in the middle of a sentence.": "Sentence using … aposiopesis in the middle of a sentence.",

		/* add space after aposiopesis between two words */
		// depending on context, this might also need spacing "before … after"?
		"word...word" : "word… word"

	};



	Object.keys(testCase).forEach((key) => {
		it("should replace multiple dots with an ellipsis", () => {
			assert.equal(fixEllipsis(key, new Locale("en-us")), testCase[key]);
		});
	});
});
