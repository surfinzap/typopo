(function(){
	function assert(expected,actual,message){
		if(expected !== actual){
			console.error(message);
		}
	}

	typos__generic = {
		// replace some characters
		"(C) (C)" : "© ©",
		"(c) (c)" : "© ©",
		"(R) (R)" : "® ®",
		"(r) (r)" : "® ®",
		"(tm) (tm)" : "™ ™",
		"(TM) (TM)" : "™ ™",
		"+- +-" :"± ±",
		"-+ -+" :"± ±",



		/*
				Ellipsis & Aposiopesis


				Ellipsis (as a character) is used for 2 different purposes
				— as an ellipsis to ommit a piece of information deliberately
				— as an aposiopesis; a figure of speech wherein a sentence is deliberately broken off and left unfinished

				Ellipsis & Aposiopesis require different use of spacing around them — that is why we cannot cover all cases for proper spacing as we are missing context. However, we can still correct some typographic errors

				sources
				https://en.wikipedia.org/wiki/Ellipsis
				https://en.wikipedia.org/wiki/Aposiopesis
				http://www.liteera.cz/slovnik/vypustka
		*/
		/* replace 2 and more periods with an ellipsis …*/
		"Sentence .. another sentence" : "Sentence … another sentence",
		"Sentence ... another sentence" : "Sentence … another sentence",
		"Sentence .... another sentence" : "Sentence … another sentence",
		"Sentence ..... another sentence" : "Sentence … another sentence",
		"Sentence ending." : "Sentence ending.",
		"Sentence ending.." : "Sentence ending…",
		"Sentence ending..." : "Sentence ending…",
		"Sentence ending...." : "Sentence ending…",
		"Sentence ending....." : "Sentence ending…",
		/* remove space before aposiopesis, that is ending a sentence*/
		"Sentence ending … And another starting" : "Sentence ending… And another starting",
		"Sentence ending …" : "Sentence ending…",
		/* keep space before aposiopesis, that is used in the middle of a sentence*/
		"Sentence using … aposiopesis in the middle of a sentence." : "Sentence using … aposiopesis in the middle of a sentence.",
		/* space ellipsis correctly, when used around commas*/
		"We sell apples, oranges,…, pens." : "We sell apples, oranges, …, pens.",
		"We sell apples, oranges,… , pens." : "We sell apples, oranges, …, pens.",
		"We sell apples, oranges, … , pens." : "We sell apples, oranges, …, pens.",
		/* remove spaces when ellipsis is used in brackets*/
		"Something ( …) something else" :  "Something (…) something else",
		"Something ( … ) something else" : "Something (…) something else",
		"Something (… ) something else" :  "Something (…) something else",
		"Something [ …] something else" :  "Something […] something else",
		"Something [ … ] something else" : "Something […] something else",
		"Something [… ] something else" :  "Something […] something else",
		/* remove space when aposiopesis is followed by punctuation (language-specific examples are located in corresponding sets)*/
		"Sentence and… !" : "Sentence and…!",
		"Sentence and… ?" : "Sentence and…?",
		"Sentence and… :" : "Sentence and…:",
		"Sentence and… , else" : "Sentence and…, else",
		"Sentence and… ; else" : "Sentence and…; else",
		/* remove space when aposiopesis is used at the beginning of the sentence*/
		"Sentence ended. … and we were there." : "Sentence ended. …and we were there.",
		"Sentence ended! … and we were there." : "Sentence ended! …and we were there.",
		"Sentence ended? … and we were there." : "Sentence ended? …and we were there.",


		// replace multiple spaces with a single one
		"How  many spaces" : "How many spaces",
		"How   many" : "How many",
		"How    many" : "How many",
		"How     many" : "How many",

		// remove extra spaces between word and punctuation
		"Hey ." : "Hey.",
		"Hey !" : "Hey!",
		"Hey ?" : "Hey?",
		"Hey :" : "Hey:",
		"Hey ;" : "Hey;",
		"Hey , what?" : "Hey, what?",


		// remove extra spaces between parentheses ()
		"( Ups, an extra space at the beginning)" : "(Ups, an extra space at the beginning)",
		"(Ups, an extra space at the end )" : "(Ups, an extra space at the end)",


		// remove extra spaces at the beginning of the paragraph
		" What if paragraph starts with extra space at the beginning?" : "What if paragraph starts with extra space at the beginning?",
		"  What if paragraph starts with extra space at the beginning?" : "What if paragraph starts with extra space at the beginning?",
		"   What if paragraph starts with extra space at the beginning?" : "What if paragraph starts with extra space at the beginning?",
		"One sentence ends. And next one continues as it should" : "One sentence ends. And next one continues as it should",
		"first sentence.\nsecond sentence." : "First sentence.\nSecond sentence.",


		// remove extra tabs at the beginning of the paragraph
		"			What if sentence starts with tabs?" : "What if sentence starts with tabs?",
		"		What if sentence starts with tabs?" : "What if sentence starts with tabs?",
		"	What if sentence starts with tabs?" : "What if sentence starts with tabs?",

		// check, if spaces/tabs aren't removed so fiercely that paragraphs are merged together
		"If there is one line \nand another" : "If there is one line \nand another" ,


		// replace x by itself by a multiplier ×
		// set up correct typography for multiplication sign
		"5 mm x 5 mm" : "5 mm × 5 mm",
		"5cm x 5cm" : "5cm × 5cm",
		"5 x 4" : "5 × 4",
		"12x3" : "12 × 3",
		"12×3" : "12 × 3",


		// replace hyphen or en dash with em dash
		"and - she said" : "and — she said",
		"and – she said" : "and — she said",
		"vopros - što" : "vopros — što",

		// remove too many new lines between paragraphs
		"something here\nand over there\n\nand over there\n\n\nand over there" : "something here\nand over there\nand over there\nand over there",

		// correct apostrophes
		// "Fish 'n' Chips" : "Fish ’n’ Chips",
		"Hers'" : "Hers’",
		"INCHEBA '89" : "INCHEBA ’89",
		"69'ers" : "69’ers",


		// replace space with non-breaking space after single letter prepositions
		// it goes after after characters like "a", "v", "i", "u", "o", "s", "z", "k", "A", "V", "I", "U", "O", "S", "Z", "K", "&".
		// positive examples
		"Koniec. V potoku" : "Koniec. V potoku",
		"Skace o tyči" : "Skace o tyči",
		"v obchode a v hospode" : "v obchode a v hospode",
		"Bed & Breakfast" : "Bed & Breakfast",
		"v a v a v" : "v a v a v",
		// false positives (ie. script shouldn't catch these)
		"vo dvore" : "vo dvore",
		"Ku komore" : "Ku komore",
		"ňa moja" : "ňa moja", // regex \b does not catch words that start with non-latin character
		"Ťa tvoja" : "Ťa tvoja", // regex \b again


		/*
				Start sentence with a Capital letter

				false positives — auto-correcting ellipsis/aposiopesis
				[1] Sentence continues after aposiopesis is being used
				[2] Ellipsis is being used in the middle of the sentence
		*/
		"one sentence ended. and another started." : "One sentence ended. And another started.",
		"What? nothing." : "What? Nothing.",
		"Hey! what?" : "Hey! What?",
		"Jedna skončila. že, čo?" : "Jedna skončila. Že, čo?",
		"Jedna skončila. ůe, čo?" : "Jedna skončila. Ůe, čo?",
		"Jedna skončila. яe, čo?" : "Jedna skončila. Яe, čo?",
		/*[1]*/"V Jednotě je… silný zápach." : "V Jednotě je… silný zápach.",
		/*[2]*/"Pustili ho na § 9. … Pak, inspirován Watergatem, dostal 30 let." : "Pustili ho na § 9. … Pak, inspirován Watergatem, dostal 30 let.",
		"„Хто ті дав?" : "„Хто ті дав?",

		// correct accidental upper case
		"HEy, JennIFer!" : "Hey, Jennifer!",
		"HEy, JeNnIFer!" : "Hey, Jennifer!",
		"HEy, JENNIFEr!" : "Hey, Jennifer!",
		"How about ABC?" : "How about ABC?",
		"cAPSLOCK" : "capslock",
		"tesT" : "test",
		"Central Europe and Cyrillic tests — aĎiÉuБuГ" : "Central Europe and Cyrillic tests — aďiéuбuг",

		//correct dash for hyphen
		"two—year—old child" : "two-year-old child",
		"two–year–old child" : "two-year-old child",
		"zeleno–žltá" : "zeleno-žltá",

		//add spaces after punctuation
		"One sentence ended.Another started." : "One sentence ended. Another started.",
		"One sentence ended!Another started." : "One sentence ended! Another started.",
		"One sentence ended?Another started." : "One sentence ended? Another started.",
		"One sentence ended:another started." : "One sentence ended: another started.",
		"One sentence ended;another started." : "One sentence ended; another started.",
		"One sentence ended,another started." : "One sentence ended, another started.",
		"Enclosed(in)the brackets." : "Enclosed (in) the brackets.",
		//false positives, numbers
		"15,4" : "15,4",
		"15.4" : "15.4",
	};



	typos__en = {
			// correct “US English double quotation marks”
			"English „English„ „English„ English" : "English “English” “English” English",
			"“English double quotation marks“" : "“English double quotation marks”",
			"”English double quotation marks”" : "“English double quotation marks”",
			"\"English double quotation marks\"" : "“English double quotation marks”",
			"Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘" : "Chto mu povisť slova “Myžku, sŷnku mij”",
			"\"abc''" : "“abc”" ,

			// Correct apostrophes and ‘US English single quotation marks’
			"Let's test this: \"however, 'quote this or nottin' 'n' this will be corrected for 69'ers,' he said\"" : "Let’s test this: “however, ‘quote this or nottin’ ’n’ this will be corrected for 69’ers,’ he said”",
			"within double quotes “there are single 'quotes with mix’d punctuation,' you see.”" : "Within double quotes “there are single ‘quotes with mix’d punctuation,’ you see.”",

			// swap quotes for punctuation .,?!
			"hey”," : "hey,”",
			"Hey”." : "Hey.”",
			"Within double quotes “there are single ‘quotes with mixed punctuation’, you see.”" : "Within double quotes “there are single ‘quotes with mixed punctuation,’ you see.”",
			"Within double quotes “there are single ‘quotes with mixed punctuation’? you see.”" : "Within double quotes “there are single ‘quotes with mixed punctuation?’ you see.”",


			// remove extra spaces along „English double quotation marks“
			"“ Ups, an extra space at the beginning”" : "“Ups, an extra space at the beginning”",
			"“Ups, an extra space at the end ”" : "“Ups, an extra space at the end”",

			// start quoted sentence with a Capital letter
			"“one sentence ended. and another started.”" : "“One sentence ended. And another started.”",

			/* remove space when aposiopesis is followed by punctuation*/
			"“Sentence and… ”" : "“Sentence and…”",
	};



	typos__sk_cz = {

		// correct „Slovak, Rusyn, Czech double quotation marks“
		"Slovak „Slovak„ „Slovak„ Slovak" : "Slovak „Slovak“ „Slovak“ Slovak",
		"“Slovak, Rusyn, Czech double quotation marks“" : "„Slovak, Rusyn, Czech double quotation marks“",
		"”Slovak, Rusyn, Czech double quotation marks”" : "„Slovak, Rusyn, Czech double quotation marks“",
		"\"Slovak, Rusyn, Czech double quotation marks\"" : "„Slovak, Rusyn, Czech double quotation marks“",
		"Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘" : "Chto mu povisť slova „Myžku, sŷnku mij“",
		"\"abc''" : "„abc“" ,

		// Correct apostrophes and ‚Slovak, Rusyn, Czech quotation marks‘
		"Hej: \"Vin mu povil, 'ta de jes' take vidil,' neviril\"" : "Hej: „Vin mu povil, ‚ta de jes‘ take vidil,’ neviril“",
		"INCHEBA '89" : "INCHEBA ’89",

		// swap quotes for punctuation .,?!
		"hey“," : "hey,“",
		"Hey“." : "Hey.“",
		"Within double quotes „there are single ‚quotes with mixed punctuation‘, you see“" : "Within double quotes „there are single ‚quotes with mixed punctuation,‘ you see“",
		"Within double quotes „there are single ‚quotes with mixed punctuation‘? you see“" : "Within double quotes „there are single ‚quotes with mixed punctuation?‘ you see“",
		"Within double quotes „there are single 'quotes with mix’d punctuation,' you see.“" : "Within double quotes „there are single ‚quotes with mix’d punctuation,‘ you see.“",

		// remove extra spaces along „Slovak, Rusyn, Czech double quotation marks“
		"„ Ups, an extra space at the beginning“" : "„Ups, an extra space at the beginning“",
		"„Ups, an extra space at the end “" : "„Ups, an extra space at the end“",

		/* remove space when aposiopesis is followed by punctuation*/
		"„Sentence and… “" : "„Sentence and…“",

		// start sentence with a Capital letter — false positives
		"25. február" : "25. február",
		"158. pluk" : "158. pluk",
		"1432. v poradí" : "1432. v poradí",
		"20. новембра" : "20. новембра",
	};

	typos__rue = {

		// correct „Slovak, Rusyn, Czech double quotation marks“
		"Slovak „Slovak„ „Slovak„ Slovak" : "Slovak «Slovak» «Slovak» Slovak",
		"“Slovak, Rusyn, Czech double quotation marks“" : "«Slovak, Rusyn, Czech double quotation marks»",
		"”Slovak, Rusyn, Czech double quotation marks”" : "«Slovak, Rusyn, Czech double quotation marks»",
		"\"Slovak, Rusyn, Czech double quotation marks\"" : "«Slovak, Rusyn, Czech double quotation marks»",
		"Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘" : "Chto mu povisť slova «Myžku, sŷnku mij»",
		"\"abc''" : "«abc»" ,

		// Correct apostrophes and ‚Slovak, Rusyn, Czech quotation marks‘
		"Hej: \"Vin mu povil, 'ta de jes' take vidil,' neviril\"" : "Hej: «Vin mu povil, ‹ta de jes› take vidil,’ neviril»",
		"INCHEBA '89" : "INCHEBA ’89",

		// swap quotes for punctuation .,?!
		"hey»," : "hey,»",
		"Hey»." : "Hey.»",
		"Within double quotes „there are single ‹quotes with mixed punctuation›? you see“" : "Within double quotes «there are single ‹quotes with mixed punctuation?› you see»",
		"Within double quotes „there are single 'quotes with mix’d punctuation,' you see.“" : "Within double quotes «there are single ‹quotes with mix’d punctuation,› you see.»",

		// remove extra spaces along «Slovak, Rusyn, Czech double quotation marks»
		"« Ups, an extra space at the beginning»" : "«Ups, an extra space at the beginning»",
		"«Ups, an extra space at the end »" : "«Ups, an extra space at the end»",

		/* remove space when aposiopesis is followed by punctuation*/
		"«Sentence and… »" : "«Sentence and…»",

		// start sentence with a Capital letter — false positives
		"20. новембра" : "20. новембра",

		//single space prepositions cyrilic letters ї, є, і, а, з, в, к, ю, о, я, Ї, Є, І, А, З, В, К, Ю, О, Я
		"a з коминів" : "a з коминів" ,
		"a я іду здоїти" : "a я іду здоїти",
		"a в хырбетї" : "a в хырбетї",
		"што є му вытыкане" : "што є му вытыкане",
		"ся ї не" : "ся ї не"
	};

	function test__batch(batch, language) {
		for (var key in batch){
			assert(correct_typos(key, language), (batch[key]),"Typo error uncorrected in " + language + ":\nOriginal:\t" + key + "\nResult:\t\t" + correct_typos(key, language) + "\nExpected:\t" + batch[key]);
		}
	}

	function test__correct_typos_rue() {
		test__batch(typos__generic, "rue");
		test__batch(typos__rue, "rue");
	}

	function test__correct_typos_sk() {
		test__batch(typos__generic, "sk");
		test__batch(typos__sk_cz, "sk");
	}

	function test__correct_typos_cs() {
		test__batch(typos__generic, "cs");
		test__batch(typos__sk_cz, "cs");
	}

	function test__correct_typos_en() {
		test__batch(typos__generic, "en");
		test__batch(typos__en, "en");
	}


	test__correct_typos_rue();
	test__correct_typos_sk();
	test__correct_typos_cs();
	test__correct_typos_en();



	function test__identify_common_apostrophes(batch) {
		for (var key in batch){
			assert(identify_common_apostrophes(key), (batch[key]),"Typo error uncorrected:\nOriginal:\t" + key + "\nResult:\t\t" + identify_common_apostrophes(key) + "\nExpected:\t" + batch[key]);
		}
	}

})();
