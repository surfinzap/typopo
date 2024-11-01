/*
  What the function does? e.g. Replace 3 and more…

  Example


  Exceptions


  Assumptions and Limitations


  Theory


  Algorithm 


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with ...
*/
/*eslint-disable*/
export function name(string, locale) {	
  let pattern =
      "(\\b)"
    + "(["+ locale.romanNumerals + "]+)"
    + "(" + locale.romanOrdinalIndicator +")"
    + "(["+ locale.spaces +"]?)"
    + "(["+ locale.allChars + locale.cardinalNumber + "])";
  let re = new RegExp(pattern, "g");
  let replacement = locale.ellipsis;

  return string.replace(re, replacement); 

  // shorter version
  string = string.replace(
    new RegExp(
      "("+ locale.leftDoubleQuote +")"
    + "(["+ locale.spaces +"])", 
      "g"
    ),
    "$1"
  );
}


export function withFunctionInReturn(string, locale) {
    let pattern =
      "(\\b[" + locale.uppercaseChars + "]["+ locale.lowercaseChars +"]+?)"
    + "([" + locale.spaces + "])"
    + "([" + locale.romanNumerals +"]+\\b)"
    + "("  + locale.romanOrdinalIndicator +")"
    + "([" + locale.nbsp + "]?)";
    let re = new RegExp(pattern, "g");

    return string.replace(re, function($0, $1, $2, $3, $4, $5){
      //you use literals from $1 onwards

    });
}



/* test */
describe('Test case (en-us):\n', () => {
  let testCase = {
    ...somePartialTestCase,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        unitFunction(
          key, 
          new Locale("en-us")), 
        testCase[key]
      );
    });
    it("module test", () => {
      assert.strictEqual(
        moduleFunction(
          key, 
          new Locale("en-us")), 
        testCase[key]
      );
    });
  });
});
