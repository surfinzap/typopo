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


        // replace 2 and more periods to ellipsis …
        "sentence .. another sentence" : "sentence … another sentence",
        "sentence ... another sentence" : "sentence … another sentence",
        "sentence .... another sentence" : "sentence … another sentence",
        "sentence ..... another sentence" : "sentence … another sentence",
        "sentence ending." : "sentence ending.",
        "sentence ending.." : "sentence ending…",
        "sentence ending..." : "sentence ending…",
        "sentence ending...." : "sentence ending…",
    	"sentence ending....." : "sentence ending…",

        // replace multiple spaces with single one
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
        "…one sentence ends. And next one continues as it should" : "…one sentence ends. And next one continues as it should",


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

        // remove space arround slashes that are used in dramatic texts
        "Kebŷ ňa moja mamyčka z nebočka viďily. / Posmotryť dohorŷ / Može bŷ i plakaly. Isto bŷ ňa požalovaly. / Pochterať si slyzu /" : "Kebŷ ňa moja mamyčka z nebočka viďily. /Posmotryť dohorŷ/ Može bŷ i plakaly. Isto bŷ ňa požalovaly. /Pochterať si slyzu/",


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

        // start sentence with a Capital letter
        "One sentence ended. and another started." : "One sentence ended. And another started.",
        "What? nothing." : "What? Nothing.",
        "Hey! what?" : "Hey! What?",
        "Jedna skončila. že, čo?" : "Jedna skončila. Že, čo?",
        "Jedna skončila. ůe, čo?" : "Jedna skončila. Ůe, čo?",
        "Jedna skončila. яe, čo?" : "Jedna skončila. Яe, čo?",

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
    }

    typos__en = {
        // correct “English double quotation marks”
        "English „English„ „English„ English" : "English “English” “English” English",
        "“English double quotation marks“" : "“English double quotation marks”",
        "”English double quotation marks”" : "“English double quotation marks”",
        "\"English double quotation marks\"" : "“English double quotation marks”",
        "Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘" : "Chto mu povisť slova “Myžku, sŷnku mij”",
        "\"abc''" : "“abc”" ,

        // // correct ‚English single quotation marks‘
        // "English ‚English‚ ‚English‚ English" : "English ‘English’ ‘English’ English",
        // "‘English double quotation marks‘" : "‘English double quotation marks’",
        // "’English double quotation marks’" : "‘English double quotation marks’",
        // "'English double quotation marks'" : "‘English double quotation marks’",
        //
        // // even when single quotation marks are mixed with apostrophes
        // "'I can't explain myself, I'm afraid, sir' said Alice, 'because I'm not myself, you see.'" : "‘I can't explain myself, I'm afraid, sir’ said Alice, ‘because I'm not myself, you see.’",

        // still cannot handle this guys, when they appear within sentence
        // 'n' Hers’
        // INCHEBA ’89
        //  69’ers

        // swap quotes for punctuation .,?!
        "hey”," : "hey,”",
        "hey”." : "hey.”",
        // "hey’!" : "hey!’",
        // "hey’?" : "hey?’",

        // remove extra spaces along „English double quotation marks“
        "“ Ups, an extra space at the beginning”" : "“Ups, an extra space at the beginning”",
        "“Ups, an extra space at the end ”" : "“Ups, an extra space at the end”",

        // // remove extra spaces along ‚English single quotation marks‘
        // "‘ Ups, an extra space at the beginning’" : "‘Ups, an extra space at the beginning’",
        // "‘Ups, an extra space at the end ’" : "‘Ups, an extra space at the end’",

        //tbd this test
        // 'I can't explain myself, I'm afraid, sir' said Alice, 'because I'm not myself, you see.'

    }

    typos__rue_sk_cz = {

        // correct „Slovak, Rusyn, Czech double quotation marks“
        "Slovak „Slovak„ „Slovak„ Slovak" : "Slovak „Slovak“ „Slovak“ Slovak",
        "“Slovak, Rusyn, Czech double quotation marks“" : "„Slovak, Rusyn, Czech double quotation marks“",
        "”Slovak, Rusyn, Czech double quotation marks”" : "„Slovak, Rusyn, Czech double quotation marks“",
        "\"Slovak, Rusyn, Czech double quotation marks\"" : "„Slovak, Rusyn, Czech double quotation marks“",
        "Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘" : "Chto mu povisť slova „Myžku, sŷnku mij“",
        "\"abc''" : "„abc“" ,

        // // correct ‚Slovak, Rusyn, Czech single quotation marks‘
        // "Slovak ‚Slovak‚ ‚Slovak‚ Slovak" : "Slovak ‚Slovak‘ ‚Slovak‘ Slovak",
        // "‘Slovak, Rusyn, Czech double quotation marks‘" : "‚Slovak, Rusyn, Czech double quotation marks‘",
        // "’Slovak, Rusyn, Czech double quotation marks’" : "‚Slovak, Rusyn, Czech double quotation marks‘",
        // "'Slovak, Rusyn, Czech double quotation marks'" : "‚Slovak, Rusyn, Czech double quotation marks‘",
        //
        // // even when single quotation marks are mixed with apostrophes
        // "'I can't explain myself, I'm afraid, sir' said Alice, 'because I'm not myself, you see.'" : "‚I can't explain myself, I'm afraid, sir‘ said Alice, ‚because I'm not myself, you see.‘",

        // swap quotes for punctuation .,?!
        "hey“," : "hey,“",
        "hey“." : "hey.“",
        // "hey‘!" : "hey!‘", //once we'll support single quotes
        // "hey‘?" : "hey?‘", //once we'll support single quotes

        // remove extra spaces along „Slovak, Rusyn, Czech double quotation marks“
        "„ Ups, an extra space at the beginning“" : "„Ups, an extra space at the beginning“",
        "„Ups, an extra space at the end “" : "„Ups, an extra space at the end“",

        // // remove extra spaces along ‚Slovak, Rusyn, Czech single quotation marks‘
        // "‚ Ups, an extra space at the beginning‘" : "‚Ups, an extra space at the beginning‘",
        // "‚Ups, an extra space at the end ‘" : "‚Ups, an extra space at the end‘",

    }

    function test__batch(batch, language) {
        for (var key in batch){
            assert(clean_typos(key, language), (batch[key]),"Typo error uncorrected in " + language + ":\nOriginal:\t" + key + "\nResult:\t\t" + clean_typos(key, language) + "\nExpected:\t" + batch[key]);
        }
    }

    function test__clean_typos_rue() {
        test__batch(typos__generic, "rue");
        test__batch(typos__rue_sk_cz, "rue");
    }

    function test__clean_typos_sk() {
        test__batch(typos__generic, "sk");
        test__batch(typos__rue_sk_cz, "sk");
    }

    function test__clean_typos_cs() {
        test__batch(typos__generic, "cs");
        test__batch(typos__rue_sk_cz, "cs");
    }

    function test__clean_typos_en() {
        test__batch(typos__generic, "en");
        test__batch(typos__en, "en");
    }


    test__clean_typos_rue();
    test__clean_typos_sk();
    test__clean_typos_cs();
    test__clean_typos_en();



    function test__identify_common_apostrophes(batch) {
        for (var key in batch){
            assert(identify_common_apostrophes(key), (batch[key]),"Typo error uncorrected:\nOriginal:\t" + key + "\nResult:\t\t" + identify_common_apostrophes(key) + "\nExpected:\t" + batch[key]);
        }
    }



})();
