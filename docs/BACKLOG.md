# Backlog for typopo

* add non-breaking space after ordinal/cardinal numbers
* non-breaking space between dates 2. díl, 4. januar, 4th Janary, 20. novembra, 15. 2. 2016
* non-breaking space for names F. X. Šalda, K. Čapek
* non-breaking space between Roman numerals {findWhat:"(\\u\\w+)\\s(I\\.|II\\.|III\\.|IV\\.|V\\.|VI\\.|VII\\.|VIII\\.|IX\\.|X\\.)"}

* special cases for non-braking spaces between abbreviations and numbers
	* {findWhat:"(č\\.|s\\.|fol\\.|str\\.|r\\.|odst\\.|§) (\\d)"}
	* {findWhat:"(©|℗|sv\\.|tj\\.|tzv\\.|čl\\.) (\\w+)"}
	* {findWhat:"(hl\\.)\\s?(m\\.)"}

* tech debt — adjust tests for different attributes (e.g. keep lines)

* fix that: He said:“Here’s a 12″ record.”
* fix that: „nova-produkt-4“ na napr. "cervenyj-bereh“
* fix that: - dashes at the beginning of the sentence

* non-breaking space between currency and number

* consider resolving single-word widows

* add support for math equations spacing
* fix numeral format
* fix this:  30.000,-. > 30.000,—
* fix this e- shopu


* split script in isolated options, set up architecture
	* Modules
		* Global variables (characters)
		* Exceptions
		* Essential replacements
		* Quotes, apostrophes and primes
		* Spaces, tabs, newlines
		* Non-breaking spaces, hair spaces
		* Dashes and hyphens
		* Math and numerals
		* Letter Case
	* Other reqs
		* loading different Modules
		* auto-bundling, minifying
		* unit test and integration tests. tests for attributes
		* options, e.g. language, keep-lines, dash-preference, etc.
	* Questions
		* fix nbsp around numerals in numerals or in nbsp?
		*


* exceptions/replacements for emoticons?

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
