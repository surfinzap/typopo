import {fixNbsp} from "../../lib/rhythm/nbsp";
import assert from 'assert';

describe('Fix various occurences of non-breaking space\n', () => {
	let testCase = {
		/*
		 Handling non-breaking spaces

		 [1] Add non-breaking space after single letter prepositions
		 [2] False positive — do not add nbsp between multicharacter words
		 [3] False positive — do not take non-latin multi-character words as a single prepositions (javascript regex \b limitation)
		 [4] Remove non-breaking space between multi-letter words
		 */
		// [1]
		"Koniec. V potoku": "Koniec. V potoku",
		"Skáče o tyči": "Skáče o tyči",
		"v obchode a v hospode": "v obchode a v hospode",
		"Bed & Breakfast": "Bed & Breakfast",
		"v a v a v": "v a v a v",
		"5 mm" : "5 mm",
		// [2]
		"vo dvore": "vo dvore",
		"Ku komore": "Ku komore",
		// [3]
		"ňa moja": "ňa moja",
		"Ťa tvoja": "Ťa tvoja",
		// [4]
		"vo dvore": "vo dvore",
		"Ku komore": "Ku komore",
		"vo vo vo vo": "vo vo vo vo",

		//single space prepositions cyrilic letters ї, є, і, а, з, в, к, ю, о, я, Ї, Є, І, А, З, В, К, Ю, О, Я
		"a з коминів": "a з коминів",
		"a я іду здоїти": "a я іду здоїти",
		"a в хырбетї": "a в хырбетї",
		"што є му вытыкане": "што є му вытыкане",
		"ся ї не": "ся ї не",
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixNbsp(key, "en"), testCase[key]);
		});
	});
});
