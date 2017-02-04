import {correct_typos} from '../typopo.js';
import assert from 'assert';

describe('One off tests', () => {
  let typos__generic = {
    /*
     Basic string replacements
     */
    "(C) (C)": "© ©",
    "(c) (c)": "© ©",
		"(P) (P)": "Ⓟ Ⓟ",
		"(p) (p)": "Ⓟ Ⓟ",
    "(R) (R)": "® ®",
    "(r) (r)": "® ®",
    "(tm) (tm)": "™ ™",
    "(TM) (TM)": "™ ™",
    "+- +-": "± ±",
    "-+ -+": "± ±",


    /*
     Utility tests

     We are using temporary {variables} in curly brackets as text replacement in some functions.
     We have included couple of tests to make sure that variables in curly brackets do not change as we carry other replacements.
     */
    "{{test-variable}}": "{{test-variable}}",
    "{{test-variable}} at the beginning of the sentence.": "{{test-variable}} at the beginning of the sentence.",
    "And {{test-variable}} in the middle of the sentence.": "And {{test-variable}} in the middle of the sentence.",


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
    /* replace 2 and more periods with an ellipsis …*/
    "Sentence .. another sentence": "Sentence … another sentence",
    "Sentence ... another sentence": "Sentence … another sentence",
    "Sentence .... another sentence": "Sentence … another sentence",
    "Sentence ..... another sentence": "Sentence … another sentence",
    "Sentence ending.": "Sentence ending.",
    "Sentence ending..": "Sentence ending.",
    "Sentence ending...": "Sentence ending…",
    "Sentence ending....": "Sentence ending…",
    "Sentence ending.....": "Sentence ending…",

    /* remove space before aposiopesis, that is ending a sentence*/
    "Sentence ending … And another starting": "Sentence ending… And another starting",
    "Sentence ending …": "Sentence ending…",
    "Give me some example, e.g. apples, oranges, …": "Give me some example, e.g. apples, oranges,…",

    /* remove space */
    "… да святить ся": "…да святить ся",
    "… да святить ся\n… multiline test": "…да святить ся\n…multiline test",

    /* keep spaces around aposiopesis, that is used in the middle of a sentence*/
    "Sentence using … aposiopesis in the middle of a sentence.": "Sentence using … aposiopesis in the middle of a sentence.",

    /* space ellipsis correctly, when used around commas*/
    "We sell apples, oranges,…, pens.": "We sell apples, oranges, …, pens.",
    "We sell apples, oranges,… , pens.": "We sell apples, oranges, …, pens.",
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.",
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // nbsp
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // hair_space
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", //narrow_nbsp

    /* remove spaces when ellipsis is used in brackets*/
    "Something ( …) something else": "Something (…) something else",
    "Something ( … ) something else": "Something (…) something else",
    "Something (… ) something else": "Something (…) something else",
    "Something [ …] something else": "Something […] something else",
    "Something [ … ] something else": "Something […] something else",
    "Something [… ] something else": "Something […] something else",

    /* remove space when aposiopesis is followed by punctuation (language-specific examples are located in corresponding sets)*/
    "Sentence and… !": "Sentence and…!",
    "Sentence and… ?": "Sentence and…?",
    "Sentence and… :": "Sentence and…:",
    "Sentence and… , else": "Sentence and…, else",
    "Sentence and… ; else": "Sentence and…; else",

    /* remove space when aposiopesis is used at the beginning of the sentence*/
    "Sentence ended. … and we were there.": "Sentence ended. …and we were there.",
    "Sentence ended! … and we were there.": "Sentence ended! …and we were there.",
    "Sentence ended? … and we were there.": "Sentence ended? …and we were there.",


    /*
     Handling spaces
     */
    // replace multiple spaces with a single one
    "How  many spaces": "How many spaces",
    "How   many": "How many",
    "How    many": "How many",
    "How     many": "How many",

    // remove trailing spaces at the end of the paragraphs
    "trailing spaces    ": "trailing spaces",
    "trailing spaces    ": "trailing spaces", // nbsp
    "trailing spaces    ": "trailing spaces", // hair_space
    "trailing spaces    ": "trailing spaces", // narrow_nbsp
    "trailing spaces.    ": "trailing spaces.",
    "trailing spaces;    ": "trailing spaces;",

    // remove extra spaces between word and punctuation
    "Hey .": "Hey.",
    "Hey .": "Hey.", // nbsp
    "Hey .": "Hey.", // hair_space
    "Hey .": "Hey.", // narrow_nbsp
    "Hey !": "Hey!",
    "Hey ?": "Hey?",
    "Hey :": "Hey:",
    "Hey ;": "Hey;",
    "Hey , what?": "Hey, what?",

    // remove extra spaces between parentheses ()
    "( Ups, an extra space at the beginning)": "(Ups, an extra space at the beginning)",
    "( Ups, an extra space at the beginning)": "(Ups, an extra space at the beginning)", // nbsp
    "( Ups, an extra space at the beginning)": "(Ups, an extra space at the beginning)", // hair_space
    "( Ups, an extra space at the beginning)": "(Ups, an extra space at the beginning)", // narrow_nbsp
    "(Ups, an extra space at the end )": "(Ups, an extra space at the end)",

    // remove extra spaces at the beginning of the paragraph
    " What if paragraph starts with extra space at the beginning?": "What if paragraph starts with extra space at the beginning?",
    "  What if paragraph starts with extra space at the beginning?": "What if paragraph starts with extra space at the beginning?",
    "   What if paragraph starts with extra space at the beginning?": "What if paragraph starts with extra space at the beginning?",
    "One sentence ends. And next one continues as it should": "One sentence ends. And next one continues as it should",

    // remove extra tabs at the beginning of the paragraph
    "			What if sentence starts with tabs?": "What if sentence starts with tabs?",
    "		What if sentence starts with tabs?": "What if sentence starts with tabs?",
    "	What if sentence starts with tabs?": "What if sentence starts with tabs?",

    // check, if spaces/tabs aren't removed so fiercely that paragraphs are merged together
    "If there is one line \nand another": "If there is one line \nand another",


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


    // replace x with a multiplier ×
    // set up correct typography for multiplication sign
    "5 mm x 5 mm": "5 mm × 5 mm",
    "5cm x 5cm": "5cm × 5cm",
    "5 x 4": "5 × 4",
    "12x3": "12 × 3",
    "12×3": "12 × 3",


    // replace hyphen or en dash with em dash
    "and - she said": "and — she said",
    "Brno--Praha": "Brno–Praha",
    "and --- she said": "and — she said",
    "and – she said": "and — she said",
    "vopros - što": "vopros — što",

    // correct apostrophes
    "Fish 'n' Chips": "Fish ’n’ Chips",
    "Find 'em!": "Find ’em!",
    "Just 'cause I wanna.": "Just ’cause I wanna.",
    "'Tis the season": "’Tis the season",
    "'Twas the Night Before Christmas": "’Twas the Night Before Christmas",
    "'Til The Season Comes 'Round Again": "’Til The Season Comes ’Round Again",
    "Hers'": "Hers’",
    "INCHEBA '89": "INCHEBA ’89",
    "69'ers": "69’ers",
    "iPhone6's": "iPhone6’s",
    "1990's": "1990’s",


    // correct accidental upper case
    "HEy, JEnnifer!": "Hey, Jennifer!",
    "How about ABC?": "How about ABC?",
    "cAPSLOCK": "capslock",
    "iPhone": "iPhone",
    "iT": "it",
    "Central Europe and Cyrillic tests: aĎIÉUБUГ": "Central Europe and Cyrillic tests: aďiéuбuг",

    //correct dash for hyphen
    "two—year—old child": "two-year-old child",
    "two–year–old child": "two-year-old child",
    "zeleno–žltá": "zeleno-žltá",

    //add spaces after punctuation
    "One sentence ended.Another started.": "One sentence ended. Another started.",
    "One sentence ended!Another started.": "One sentence ended! Another started.",
    "One sentence ended?Another started.": "One sentence ended? Another started.",
    "One sentence ended:another started.": "One sentence ended: another started.",
    "One sentence ended;another started.": "One sentence ended; another started.",
    "One sentence ended,another started.": "One sentence ended, another started.",
    "Enclosed(in)the brackets.": "Enclosed (in) the brackets.",

    //false positives, numbers
    "15,4": "15,4",
    "15.4": "15.4",


    /*
     Exceptions

     This is list of exceptions that we want skip while correcting errors,
     namely:
     [1] URL address
     [2] IP address
     [3] Email adress

     Sidenote: List of tests is incomplete, however to identify
     all kinds of URLs, IPs or emails, we’re adapting following implementation:
     http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
     */

    // [1] URL address
    "www.tota.sk": "www.tota.sk",
    "http://www.tota.sk": "http://www.tota.sk",

    // [2] IP address
    "127.0.0.1": "127.0.0.1",

    // [3] Email address
    "mail@domain.com": "mail@domain.com",

    // test order of replacements
    "www.tota.sk and 127.0.0.1 and mail@domain.com": "www.tota.sk and 127.0.0.1 and mail@domain.com"
  };


  let typos__en = {
    /*
     Quotation marks
     */
    // correct “US English double quotation marks”
    "English „English„ „English„ English": "English “English” “English” English",
    "“English double quotation marks“": "“English double quotation marks”",
    "”English double quotation marks”": "“English double quotation marks”",
    "\"English double quotation marks\"": "“English double quotation marks”",
    "Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘": "Chto mu povisť slova “Myžku, sŷnku mij”",
    "\"abc''": "“abc”",

    // Correct apostrophes and ‘US English single quotation marks’
    "Let's test this: \"however, 'quote this or nottin' 'n' this will be corrected for 69'ers,' he said\"": "Let’s test this: “however, ‘quote this or nottin’ ’n’ this will be corrected for 69’ers,’ he said”",
    "Within double quotes “there are single 'quotes with mix’d punctuation', you see.”": "Within double quotes “there are single ‘quotes with mix’d punctuation’, you see”.",

    // Use-cases for mixing double quotes and primes
    "He said: \"Here's 12\" record.\"": "He said: “Here’s 12″ record.”",
    "He said: \"He was 12.\"": "He said: “He was 12.”", //false positive
    //error of wrongly identified primes due to swapped punctuation
    "He said: \"He was 12\". And then he added: \"Maybe he was 13\".": "He said: “He was 12.” And then he added: “Maybe he was 13.”",

    // Best-effort for unclosed double quotes
    "\"Even when left double quote is missing its right counterpart.": "“Even when left double quote is missing its right counterpart.",
    "Even when right double quote is missing its left counterpart.\"": "Even when right double quote is missing its left counterpart.”",
    "We’ll remove a quote, \" when it is hanging spaced around in the middle": "We’ll remove a quote, when it is hanging spaced around in the middle",

    // Mixing quotes and primes
    "12' 45\"": "12′ 45″",
    "3° 5' 30\"": "3° 5′ 30″",

    // Improperly spaced primes
    "12 ′ 45 ″": "12′ 45″",
    "3 ° 5 ′ 30 ″": "3° 5′ 30″",


    // swap quotes for punctuation .,?!
    "Hey”.": "Hey.”",
    "Hey”?": "Hey?”",
    "Within double quotes “there are single ‘quotes with mixed punctuation’, you see.”": "Within double quotes “there are single ‘quotes with mixed punctuation’, you see”.",
    "“We swap punctuation and double quotes in case of the whole sentence”.": "“We swap punctuation and double quotes in case of the whole sentence.”",
    // but we won’t swap it when only portion of a sentence is double-quoted
    "Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.": "Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.",
    "He was like “namespace pollution”.": "He was like “namespace pollution”.",
    "He was like “Georgia”.": "He was like “Georgia”.",
    "He was ok. “He was ok”.": "He was ok. “He was ok.”",
    "“Zest”, that’s an interesting name.": "“Zest”, that’s an interesting name.",

    // remove extra spaces along „English double quotation marks“
    "“ Ups, an extra space at the beginning”": "“Ups, an extra space at the beginning”",
    "“Ups, an extra space at the end ”": "“Ups, an extra space at the end”",

    // remove space when aposiopesis is followed by punctuation
    "“Sentence and… ”": "“Sentence and…”",

    /* Remove extra sentence punctuation

     [1] extra comma after terminal punctuation, it it happens often in direct speech
     [2] extra dot at the end of a direct speech ending with abbreviation
     [3] extra dot at the end of a sentence ending with abbreviation */
    /*[1]*/
    "“Hey!,” she said": "“Hey!” she said",
    /*[2]*/
    "“We will continue this tomorrow at 8:00 a.m.”.": "“We will continue this tomorrow at 8:00 a.m.”",
    /*[3]*/
    "He is a vice president at Apple Inc..": "He is a vice president at Apple Inc.",


    /*
     Spell common abbreviations correctly

     Supported:
     e.g., i.e., a.m., p.m.
     */
    "E. g. something": "e.g. something",
    "E. g.something": "e.g. something",
    "E. G. something": "e.g. something",
    "E.G. something": "e.g. something",
    "eg. something": "e.g. something",
    "eg something": "e.g. something",
    "Greg Snow": "Greg Snow", // false positive
    "eggnog": "eggnog", // false positive

    "I. e. something": "i.e. something",
    "I. e.something": "i.e. something",
    "I. E. something": "i.e. something",
    "I.E. something": "i.e. something",
    "ie. something": "i.e. something",
    "ie something": "i.e. something",
    "brie cheese": "brie cheese", // false positive
    "Pam Grier": "Pam Grier", // false positive
    "najkrajšie": "najkrajšie", // false positive for non-latin boundaries
    "ieš": "ieš", // false positive for non-latin boundaries

    "5 am": "5 a.m.",
    "5 am in the morning": "5 a.m. in the morning",
    "5 AM": "5 a.m.",
    "5 a.m.": "5 a.m.",
    "I am from nowhere.": "I am from nowhere.", // false positive
    "5 šam": "5 šam", // false positive for non-latin boundaries
    "5 amš": "5 amš", // false positive for non-latin boundaries

    "4.20 pm": "4.20 p.m.",
    "4.20 PM": "4.20 p.m.",
    "4.20 p.m.": "4.20 p.m.",
    "4.20 p.m. in the afternoon": "4.20 p.m. in the afternoon",
    "She is the PM of the UK.": "She is the PM of the UK.", // false positive


    /*
     Correct dashes for number ranges
     */
    "5-6 eggs": "5–6 eggs",
    "5 -6 eggs": "5–6 eggs",
    "5- 6 eggs": "5–6 eggs",
    "5 - 6 eggs": "5–6 eggs",
    "5—6 eggs": "5–6 eggs",

    "5-12″ long": "5–12″ long",
    "In 5.25-10.75 range": "In 5.25–10.75 range",
    "In 5,000.25-10,000.75 range": "In 5,000.25–10,000.75 range",
    "1st-5th August": "1st–5th August",
    "1st -5th August": "1st–5th August",
    "1st- 5th August": "1st–5th August",
    "1st - 5th August": "1st–5th August",

    "v rozmedzí 5,25-10,75": "v rozmedzí 5,25–10,75",
    "v rozmedzí 5 000,25-10 000,75": "v rozmedzí 5 000,25–10 000,75",
  };


  let typos__sk_cz = {

    // correct „Slovak, Rusyn, Czech double quotation marks“
    "Slovak „Slovak„ „Slovak„ Slovak": "Slovak „Slovak“ „Slovak“ Slovak",
    "“Slovak, Rusyn, Czech double quotation marks“": "„Slovak, Rusyn, Czech double quotation marks“",
    "”Slovak, Rusyn, Czech double quotation marks”": "„Slovak, Rusyn, Czech double quotation marks“",
    "\"Slovak, Rusyn, Czech double quotation marks\"": "„Slovak, Rusyn, Czech double quotation marks“",
    "Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘": "Chto mu povisť slova „Myžku, sŷnku mij“",
    "\"abc''": "„abc“",

    // Correct apostrophes and ‚Slovak, Rusyn, Czech quotation marks‘
    "Hej: \"Vin mu povil, 'ta de jes' take vidil,' neviril\"": "Hej: „Vin mu povil, ‚ta de jes‘ take vidil,’ neviril“",
    "INCHEBA '89": "INCHEBA ’89",

    // swap quotes for punctuation .,?!
    "Hey“.": "Hey.“",
    "Within double quotes „there are single ‚quotes with mixed punctuation‘, you see“": "Within double quotes „there are single ‚quotes with mixed punctuation‘, you see“",
    "Within double quotes „there are single 'quotes with mix’d punctuation', you see.“": "Within double quotes „there are single ‚quotes with mix’d punctuation‘, you see“.",
    "„Och, što teper’?!“ obertaly s’a skoro kolečka Myž’ovy v holovi.": "„Och, što teper’?!“ obertaly s’a skoro kolečka Myž’ovy v holovi.", //false positive

    // remove extra spaces along „Slovak, Rusyn, Czech double quotation marks“
    "„ Ups, an extra space at the beginning“": "„Ups, an extra space at the beginning“",
    "„Ups, an extra space at the end “": "„Ups, an extra space at the end“",

    /* remove space when aposiopesis is followed by punctuation*/
    "„Sentence and… “": "„Sentence and…“",

    // start sentence with a Capital letter — false positives
    "25. február": "25. február",
    "158. pluk": "158. pluk",
    "1432. v poradí": "1432. v poradí",
    "20. новембра": "20. новембра",

    /*
     Correct dashes for ordinal number ranges
     */
    "v rozmedzí 5,25-10,75": "v rozmedzí 5,25–10,75",
    "v rozmedzí 5 000,25-10 000,75": "v rozmedzí 5 000,25–10 000,75",
    "1.-5. augusta": "1.–5. augusta",
    "1. -5. augusta": "1.–5. augusta",
    "1.- 5. augusta": "1.–5. augusta",
    "1. - 5. augusta": "1.–5. augusta",
  };

  let typos__rue = {

    // correct „Slovak, Rusyn, Czech double quotation marks“
    "Slovak „Slovak„ „Slovak„ Slovak": "Slovak «Slovak» «Slovak» Slovak",
    "“Slovak, Rusyn, Czech double quotation marks“": "«Slovak, Rusyn, Czech double quotation marks»",
    "”Slovak, Rusyn, Czech double quotation marks”": "«Slovak, Rusyn, Czech double quotation marks»",
    "\"Slovak, Rusyn, Czech double quotation marks\"": "«Slovak, Rusyn, Czech double quotation marks»",
    "Chto mu povisť slova  ,,Myžku, sŷnku mij‘‘": "Chto mu povisť slova «Myžku, sŷnku mij»",
    "\"abc''": "«abc»",

    // Correct apostrophes and ‚Slovak, Rusyn, Czech quotation marks‘
    "Hej: \"Vin mu povil, 'ta de jes' take vidil,' neviril\"": "Hej: «Vin mu povil, ‹ta de jes› take vidil,’ neviril»",
    "INCHEBA '89": "INCHEBA ’89",

    // swap quotes for punctuation .,?!
    "Hey».": "Hey.»",
    "Within double quotes „there are single 'quotes with mix’d punctuation', you see.“": "Within double quotes «there are single ‹quotes with mix’d punctuation›, you see».",

    // remove extra spaces along «Slovak, Rusyn, Czech double quotation marks»
    "« Ups, an extra space at the beginning»": "«Ups, an extra space at the beginning»",
    "«Ups, an extra space at the end »": "«Ups, an extra space at the end»",

    /* remove space when aposiopesis is followed by punctuation*/
    "«Sentence and… »": "«Sentence and…»",

    // start sentence with a Capital letter — false positives
    "20. новембра": "20. новембра",

    //single space prepositions cyrilic letters ї, є, і, а, з, в, к, ю, о, я, Ї, Є, І, А, З, В, К, Ю, О, Я
    "a з коминів": "a з коминів",
    "a я іду здоїти": "a я іду здоїти",
    "a в хырбетї": "a в хырбетї",
    "што є му вытыкане": "што є му вытыкане",
    "ся ї не": "ся ї не",

    /*
     Correct dashes for ordinal number ranges
     */
    "v rozmedzí 5,25-10,75": "v rozmedzí 5,25–10,75",
    "v rozmedzí 5 000,25-10 000,75": "v rozmedzí 5 000,25–10 000,75",
    "1.-5. augusta": "1.–5. augusta",
    "1. -5. augusta": "1.–5. augusta",
    "1.- 5. augusta": "1.–5. augusta",
    "1. - 5. augusta": "1.–5. augusta",

  };


	function test__batch(batch, language) {
    Object.keys(batch).forEach((key) => {
      it(`Corrects '${key}' in ${({
        en: 'English',
        sk: 'Slovak',
        cz: 'Czech',
        rue: 'Rusyn',
      }[language])} correctly`, () => {
  			assert.equal(correct_typos(key, language), (batch[key]),"Typo error uncorrected in " + language + ":\nOriginal:\t" + key + "\nResult:\t\t" + correct_typos(key, language) + "\nExpected:\t" + batch[key]);
  		});
    });
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
});
