# Backlog for typopo

* fix that: „nova-produkt-4“ na napr. "cervenyj-bereh“
* fix that: - dashes at the beginning of the sentence

* special cases for non-breaking spaces between abbreviations and numbers
	* {findWhat:"(č\\.|s\\.|fol\\.|str\\.|r\\.|par.|odst\\.) (\\d)"}
	* {findWhat:"(sv\\.|tj\\.|tzv\\.|čl\\.) (\\w+)"}
	* {findWhat:"(hl\\.)\\s?(m\\.)"}

* non-breaking space between currency and number
* check if inch is using right character

* include license in dist
* jslint?

* consider resolving single-word widows

* fix this:  30.000,-. > 30.000,—
* fix this e- shopu
* fix numeral format
* add support for currencies

* add support for math equations spacing


* remove function implementation (removeNumerals) from js




==================================
* Reintroduce more sophisticated support for starting a sentence with a Capital letter
	* main issue concerned many false positives
	* tests:
	//
	// 		Start sentence with a Capital letter
	//
	// 		[1] Sentence continues after aposiopesis is being used
	// 		[2] Ellipsis is being used in the middle of the sentence
	// 		[3] False positives
	//
	// "one sentence ended. and another started." : "One sentence ended. And another started.",
	// "What? nothing." : "What? Nothing.",
	// "Hey! what?" : "Hey! What?",
	// "Jedna skončila. že, čo?" : "Jedna skončila. Že, čo?",
	// "Jedna skončila. ůe, čo?" : "Jedna skončila. Ůe, čo?",
	// "Jedna skončila. яe, čo?" : "Jedna skončila. Яe, čo?",
	// "There is (urgent need to ise 15.4 inches) in the brackets." : "There is (urgent need to ise 15.4 inches) in the brackets.",
	// /*[1]*/"V Jednotě je… silný zápach." : "V Jednotě je… silný zápach.",
	// /*[2]*/"Pustili ho na § 9. … Pak, inspirován Watergatem, dostal 30 let." : "Pustili ho na § 9. … Pak, inspirován Watergatem, dostal 30 let.",
	// /*[3]*/"Firma s.r.o." : "Firma s.r.o.",
	// /*[3]*/"Firma, spol. s. r. o." : "Firma, spol. s. r. o.",
	// /*[3]*/"Firma s. r. o." : "Firma s. r. o.",

	// // start quoted sentence with a Capital letter
	// "“one sentence ended. and another started.”" : "“One sentence ended. And another started.”",
	// "“хто ті дав?”" : "“Хто ті дав?”",
