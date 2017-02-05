import {correct_typos} from '../typopo.js';
import assert from 'assert';

describe('One off tests', () => {
  let typos__generic = {

    /*
     Utility tests

     We are using temporary {variables} in curly brackets as text replacement
		 in some functions. Make sure that variables in curly brackets do not change
		 in course of running algorithm.
     */
    "{{test-variable}}": "{{test-variable}}",
    "{{test-variable}} at the beginning of the sentence.": "{{test-variable}} at the beginning of the sentence.",
    "And {{test-variable}} in the middle of the sentence.": "And {{test-variable}} in the middle of the sentence.",



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
    // "5 mm x 5 mm": "5 mm × 5 mm",
    // "5cm x 5cm": "5cm × 5cm",
    // "5 x 4": "5 × 4",
    // "12x3": "12 × 3",
    // "12×3": "12 × 3",


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





    /* Remove extra sentence punctuation

     [1] extra comma after terminal punctuation, it it happens often in direct speech
     [2] extra dot at the end of a direct speech ending with abbreviation
     [3] extra dot at the end of a sentence ending with abbreviation */
    /*[1]*/
    "“Hey!,” she said": "“Hey!” she said",
    /*[2] TBD*/
    // "“We will continue this tomorrow at 8:00 a.m.”.": "“We will continue this tomorrow at 8:00 a.m.”",
    /*[3] TBD*/
    // "He is a vice president at Apple Inc..": "He is a vice president at Apple Inc.",



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
        "en": 'English',
        "sk": 'Slovak',
        "cs": 'Czech',
        "rue": 'Rusyn',
      }[language])} correctly`, () => {
  			assert.equal(correct_typos(key, language), (batch[key]),"Typo error uncorrected in " + language + ":\nOriginal:\t\"" + key + "\"\nResult:\t\t\"" + correct_typos(key, language) + "\"\nExpected:\t\"" + batch[key] + "\"");
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
