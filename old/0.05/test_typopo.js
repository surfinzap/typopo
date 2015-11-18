(function(){
    function assert(expected,actual,message){
        if(expected !== actual){
            console.error(message);
        }
    }

    test_dict = {
        // replace some characters
        "(C) (C)" : "© ©",
        "(c) (c)" : "© ©",
        "(R) (R)" : "® ®",
        "(r) (r)" : "® ®",

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
        "Hey , what?" : "Hey, what?",


        // correct „Slovak, Rusyn, Czech double quotation marks“
        "Slovak „Slovak„ „Slovak„ Slovak" : "Slovak „Slovak“ „Slovak“ Slovak",
        "“Slovak, Rusyn, Czech double quotation marks“" : "„Slovak, Rusyn, Czech double quotation marks“",
        "”Slovak, Rusyn, Czech double quotation marks”" : "„Slovak, Rusyn, Czech double quotation marks“",
        "\"Slovak, Rusyn, Czech double quotation marks\"" : "„Slovak, Rusyn, Czech double quotation marks“",
        "Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘" : "Chto mu povisť slova „Myžku, sŷnku mij“", 

        // correct ‚Slovak, Rusyn, Czech single quotation marks‘
        "Slovak ‚Slovak‚ ‚Slovak‚ Slovak" : "Slovak ‚Slovak‘ ‚Slovak‘ Slovak",
        "‘Slovak, Rusyn, Czech double quotation marks‘" : "‚Slovak, Rusyn, Czech double quotation marks‘",
        "’Slovak, Rusyn, Czech double quotation marks’" : "‚Slovak, Rusyn, Czech double quotation marks‘",

        // remove extra spaces along „Slovak, Rusyn, Czech double quotation marks“
        "„ Ups, an extra space at the beginning“" : "„Ups, an extra space at the beginning“",
        "„Ups, an extra space at the end “" : "„Ups, an extra space at the end“",

        // remove extra spaces along ‚Slovak, Rusyn, Czech single quotation marks‘
        "‚ Ups, an extra space at the beginning‘" : "‚Ups, an extra space at the beginning‘",
        "‚Ups, an extra space at the end ‘" : "‚Ups, an extra space at the end‘",

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

        // // start sentence with a Capital letter
        // "One sentence ended. and another started." : "One sentence ended. And another started.",


    }


    // Test translations from latin to azbuka
    for (var key in test_dict){
        assert(clean_typos(key), (test_dict[key]),"Assertion error: " + key + " is transformed to " + clean_typos(key) + ", but should be transformed to " + test_dict[key]);
    }


})();
