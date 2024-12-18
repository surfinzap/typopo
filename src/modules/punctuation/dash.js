  export function replaceThreeHyphensWithEmDash(string) {
    return string.replace(/(---)/g, "—");
  }



  export function replaceTwoHyphensWithEnDash(string) {
    return string.replace(/(--)/g, "–");
  }




  /*
    Identify a spaced hyphen between words and mark it as {{typopo__spacedHyphen}}

    We identify a hyphen before fixing it into a proper dash to avoid false identification of hyphen in compound words.

    Example
    word - word → word {{typopo__spacedHyphen}} word

    Exceptions
    - improperly spaced dash in words such as “e-shop”, e.g. “e -shop” (we fix this in hyphen.js)
    - hyphens at the beginning of the paragraph that indicate unordered list


    @param {string} string: input text for identification
    @param {string} locale: locale option
    @returns {string} output with identified spaced hyphen as {{typopo__spacedHyphen}}
  */
  export function identifySpacedHyphen(string, locale) {
    return string.replace(
      new RegExp(
        "([" + locale.allChars + "])"
      + "([" + locale.spaces + "]+)"
      + "([" + locale.hyphen + "])"
      + "([" + locale.spaces + "]+)"
      + "([" + locale.allChars + "])", 
        "g"
      ),
      "$1" + locale.space + "{{typopo__spacedHyphen}}" + locale.space + "$5"
    );
  }





  /*
    Identify:
    - {{typopo__spacedHyphen}} 
    - improperly used or spaced en dash 
    - improperly used or spaced em dash 
    between words and fix dash and spacing for given locale

    Example
    see tests

    @param {string} string: input text for identification
    @param {string} locale: locale option
    @returns {string} output with fixed dashes and spaces between words
  */
  export function fixDashesBetweenWords(string, locale) {
    let pattern = 
        "([" + locale.allChars + "])"
      + "([" + locale.spaces + "]?)+"
      + "({{typopo__spacedHyphen}}|["+ locale.enDash + "|" + locale.emDash + "])"
      + "([" + locale.spaces + "]?)+"
      + "([" + locale.allChars + "])";

    let re = new RegExp(pattern, "g");
    let replacement = "";

    switch (locale.locale) {
      case "en-us":
        replacement = "$1" + locale.emDash + "$5";
        break;
      case "rue":
      case "sk":
        replacement = "$1" + locale.hairSpace + locale.emDash + locale.hairSpace + "$5";
        break;
      case "cs":
        replacement = "$1" + locale.nbsp + locale.enDash + locale.space + "$5";
        break;
      case "de-de":
        replacement = "$1" + locale.hairSpace + locale.enDash + locale.hairSpace + "$5";
        break;
    }

    return string = string.replace(re, replacement);
  }




  /*
    Replace hyphen placed between a word and punctuation,
    or placed at the end of a paragaph.

    Examples (en-us):
    so there is a dash -, 	→ so there is a dash—,
    so there is a dash-, 		→ so there is a dash—,
    so there is a dash -?		→ so there is a dash—?
    so there is a dash -		→ so there is a dash—

    @param {string} string — input text for identification
    @returns {string} — output with locale-specific dash and spacing between a word and a punctuation.
  */
  export function fixHyphenBetweenWordAndPunctuation(string, locale) {
    let pattern = "(["+ locale.allChars +"])(["+ locale.spaces +"]?)("+ locale.hyphen +")(["+ locale.spaces +"]?)(["+ locale.sentencePunctuation +"\\n\\r])";
    let re = new RegExp(pattern, "g");
    let replacement = "";

    switch (locale.locale) {
      case "en-us":
        replacement = "$1" + locale.emDash + "$5";
        break;
      case "rue":
      case "sk":
        replacement = "$1" + locale.hairSpace + locale.emDash + "$5";
        break;
      case "cs":
        replacement = "$1" + locale.nbsp + locale.enDash + "$5";
        break;
      case "de-de":
        replacement = "$1" + locale.hairSpace + locale.enDash + "$5";
        break;
    }

    return string = string.replace(re, replacement);
  }



  /*
    Replace hyphen or dash, placed between 2 cardinal numbers,
    with an en dash; including cases when there is an extra space
    from either one side or both sides of the dash

    Because in edge cases we would need to tackle overlapping regex matches
    (e.g. 1–2–3), we've made the function bit more verbose.
    [1] Match the pattern twice, replace it with enDash adepts
    [2] Replace enDash adepts with actual enDashes

    @param {string} string — input text for identification
    @returns {string} — output with en dash between cardinal numbers
  */
  export function fixDashBetweenCardinalNumbers(string, locale) {
    /* [1] Match the pattern twice, replace it with enDash adepts */
    let pattern =
          "(" + locale.cardinalNumber + ")"
        + "([" + locale.spaces + "]?"
        + "[" + locale.hyphen + locale.enDash + locale.emDash + "]"
        + "[" + locale.spaces + "]?)"
        + "(" + locale.cardinalNumber + ")";
    let re = new RegExp(pattern, "g");
    let replacement = "$1" + "{{typopo__endash}}" + "$3";
    string = string.replace(re, replacement); // [1] replace odd matches
    string = string.replace(re, replacement); // [1] reaplce even matches

    /* [2] Replace enDash adepts with actual enDashes */
    pattern = "{{typopo__endash}}";
    re = new RegExp(pattern, "g");
    replacement = locale.enDash;

    return string.replace(re, replacement);
  }



  /*
    Replace hyphen or dash, placed between percentage range,
    with an en dash; including cases when there is an extra space
    from either one side or both sides of the dash

    @param {string} string — input text for identification
    @returns {string} — output with en dash between percentage range
  */
  export function fixDashBetweenPercentageRange(string, locale) {
    let pattern = "([" + locale.percent + locale.permille + locale.permyriad + "])([" + locale.spaces + "]?[" + locale.hyphen + locale.enDash + locale.emDash + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")";
    let re = new RegExp(pattern, "g");
    let replacement = "$1" + locale.enDash + "$3";
    return string.replace(re, replacement);
  }



  /*
    Replace hyphen or dash, placed between 2 ordinal numbers,
    with an en dash; including cases when there is an extra space
    from either one side or both sides of the dash

    @param {string} string — input text for identification
    @returns {string} — output with dash between ordinal numbers
  */
  export function fixDashBetweenOrdinalNumbers(string, locale) {
    let pattern = "(" + locale.cardinalNumber + ")(" + locale.ordinalIndicator + ")([" + locale.spaces + "]?[" + locale.hyphen + locale.enDash + locale.emDash + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")(" + locale.ordinalIndicator + ")";
    let re = new RegExp(pattern, "gi");
    let replacement = "$1$2" + locale.enDash + "$4$5";

    return string.replace(re, replacement);
  }



  /*
    Fixes dashes

    @param {string} string — input text for identification
    @returns {string} — output with fixed dashes
  */
  export function fixDash(string, locale) {
    string = replaceThreeHyphensWithEmDash(string, locale);
    string = replaceTwoHyphensWithEnDash(string, locale);
    string = identifySpacedHyphen(string, locale);
    string = fixDashesBetweenWords(string, locale);
    string = fixHyphenBetweenWordAndPunctuation(string, locale);
    string = fixDashBetweenCardinalNumbers(string, locale);
    string = fixDashBetweenPercentageRange(string, locale);
    string = fixDashBetweenOrdinalNumbers(string, locale);
    return string;
  }
