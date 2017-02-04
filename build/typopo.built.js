(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getDefaultConfiguration = getDefaultConfiguration;
exports.normalizeConfiguration = normalizeConfiguration;

var _patterns = require('./patterns');

var _patterns2 = _interopRequireDefault(_patterns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultValues = {
  'remove-empty-lines': true,
  'language': 'en',
  'exceptions': {
    exceptionPatterns: ['webUrlPattern', 'emailAddressPattern']
  },
  'patterns': _patterns2.default
};

function objMap(obj, callback) {
  return Object.keys(obj).reduce(function (aggregate, key) {
    aggregate[key] = callback(key, obj[key], obj);
    return aggregate;
  }, {});
}

function returnProp(propName) {
  return function (obj) {
    return obj[propName];
  };
}

function normalizeExceptionsConfig(exceptionsConfiguration) {
  var exceptionConfig = exceptionsConfiguration || {};
  var exceptionDefaultValues = defaultValues['exceptions'];
  return objMap(exceptionDefaultValues, function (key, value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== _typeof(exceptionConfig[key])) {
      return value;
    }

    return exceptionConfig[key];
  });
}

function denormalizeExceptions(config) {
  var exceptionPatterns = config.exceptions.exceptionPatterns.map(function (patternName) {
    if (!config.patterns[patternName]) {
      throw new Error('Exception pattern ' + patternName + ' is not in config.patterns.');
    }
    return config.patterns[patternName];
  });

  return Object.assign({}, config.exceptions, { exceptionPatterns: exceptionPatterns });
}

function isString(arg) {
  return typeof arg === 'string';
}

function isStringMap(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && Object.keys(arg).every(function (key) {
    return isString(arg[key]);
  });
}

function verifyPatternsObject(patterns) {
  Object.keys(patterns).forEach(function (patternName) {
    if (!isString(patterns[patternName]) && !isStringMap(patterns[patternName])) {
      throw new Error('The pattern ' + patternName + ' in configuration is neither a string nor a map of strings.');
    }
  });
}

function normalizePatterns(patternsConfiguration) {
  var patternsConfig = patternsConfiguration || {};
  verifyPatternsObject(patternsConfig);

  return Object.assign({}, defaultValues['patterns'], patternsConfig);
}

var configurationNormalizer = {
  'remove-empty-lines': function removeEmptyLines(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _typeof(true) ? value : defaultValues['remove-empty-lines'];
  },
  'language': function language(value) {
    return ['en', 'sk', 'cs', 'rue'].includes(value) ? value : defaultValues['language'];
  },
  'patterns': normalizePatterns,
  'exceptions': normalizeExceptionsConfig
};

var configurationDenormalizer = {
  'exceptions': denormalizeExceptions,
  'remove-empty-lines': returnProp('remove-empty-lines'),
  'language': returnProp('language'),
  'patterns': returnProp('patterns')
};

function getDefaultConfiguration() {
  return Object.assign({}, defaultValues);
}

function normalizeConfiguration(configuration) {
  var config = configuration || {};
  var normalizedConfig = objMap(configurationNormalizer, function (key, normalize) {
    return normalize(config[key]);
  });
  var denormalizedConfig = objMap(configurationDenormalizer, function (key, denormalize) {
    return denormalize(normalizedConfig);
  });

  return denormalizedConfig;
}

},{"./patterns":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getExceptionHandler;
/*----------------------------------------------------------------------------*\
 Exceptions
 \*----------------------------------------------------------------------------*/

/*
 Identifies exceptions that will be omitted from correction of any sort

 Algorithm
 [1] Identify email addresses
 [2] Identify web URLs and IPs
 [3] Mark them as temporary exceptions in format {{typopo__exception-[i]}}

 @param {string} input text for identification of exceptions
 @returns {string} — output with identified exceptions in format {{typopo__exception-[i]}}
 */
function identify_exceptions(string) {
  var _this = this;

  this.config.exceptionPatterns.forEach(function (pattern) {
    identify_exception_set.call(_this, string, pattern);
  });

  /* [3] Mark them as temporary exceptions in format {{typopo__exception-[i]}} */
  for (var i = 0; i < this.exceptions.length; i++) {
    var replacement = "{{typopo__exception-" + i + "}}";
    string = string.replace(this.exceptions[i], replacement);
  }

  return string;
}

/*
 Identifies set of exceptions for given pattern
 Used as helper function for identify_exceptions(string)

 @param {string} input text for identification of exceptions
 @param {pattern} regular expression pattern to match exception
 */
function identify_exception_set(string, pattern) {
  var re = new RegExp(pattern, "g");
  var matched_exceptions = string.match(re);
  if (matched_exceptions != null) {
    this.exceptions = this.exceptions.concat(matched_exceptions);
  }
}

/*
 Replaces identified exceptions with real ones by change their
 temporary representation in format {{typopo__exception-[i]}} with its
 corresponding representation

 @param {string} input text with identified exceptions
 @returns {string} output with placed exceptions
 */
function place_exceptions(string) {
  for (var i = 0; i < this.exceptions.length; i++) {
    var pattern = "{{typopo__exception-" + i + "}}";
    var re = new RegExp(pattern, "g");
    var replacement = this.exceptions[i];
    string = string.replace(re, replacement);
  }

  return string;
}

function getExceptionHandler(config) {
  return {
    exceptions: [],
    identify_exceptions: identify_exceptions,
    place_exceptions: place_exceptions,
    config: config
  };
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*----------------------------------------------------------------------------*\
 Variables & Character replacement sets
 \*----------------------------------------------------------------------------*/

var essentialSet = {
  "\\(C\\)": "©",
  "\\(c\\)": "©",
  "\\(R\\)": "®",
  "\\(r\\)": "®",
  "\\(TM\\)": "™",
  "\\(tm\\)": "™",
  "\\+\\-": "±",
  "\\-\\+": "±"
};
var nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
var nonLatinUppercase = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
var nonLatinChars = nonLatinLowercase + nonLatinUppercase;
var lowercaseCharsEnSkCzRue = "a-z" + nonLatinLowercase;
var uppercaseCharsEnSkCzRue = "A-Z" + nonLatinUppercase;
var allChars = lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue;
/*
 (39)			dumb single quote
 (8216)		left single quotation mark
 (8217)		right single quotation mark
 (700)		modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe
 (8219)		single high-reversed-9 quotation mark
 (8242)		prime
 (8249)		single left-pointing angle quotation mark
 (8250)		single right-pointing angle quotation mark
 */
var singleQuoteAdepts = "‚|'|‘|’|ʼ|‛|′|‹|›";
var doubleQuoteAdepts = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}";
var space = " ";
var nbsp = " ";
var hairSpace = " "; //&#8202;
var narrowNbsp = " "; //&#8239;
var spaces = space + nbsp + hairSpace + narrowNbsp;
var terminalPunctuation = "\.\!\?";
var sentencePunctuation = "\,\:\;" + terminalPunctuation; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
var openingBrackets = "\\(\\[\\{";
var closingBrackets = "\\)\\]\\}";
var ellipsis = "…";
var degree = "°";

/*
 Source for webUrlPattern, emailAddressPattern
 http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
 */
var webUrlPattern = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" + "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" + "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" + "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" + // named host
"(?:" + // plus top level domain
"(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" + "|(?:biz|b[abdefghijmnorstvwyz])" + "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" + "|d[ejkmoz]" + "|(?:edu|e[cegrstu])" + "|f[ijkmor]" + "|(?:gov|g[abdefghilmnpqrstuwy])" + "|h[kmnrtu]" + "|(?:info|int|i[delmnoqrst])" + "|(?:jobs|j[emop])" + "|k[eghimnrwyz]" + "|l[abcikrstuvy]" + "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" + "|(?:name|net|n[acefgilopruz])" + "|(?:org|om)" + "|(?:pro|p[aefghklmnrstwy])" + "|qa" + "|r[eouw]" + "|s[abcdeghijklmnortuvyz]" + "|(?:tel|travel|t[cdfghjklmnoprtvwz])" + "|u[agkmsyz]" + "|v[aceginu]" + "|w[fs]" + "|y[etu]" + "|z[amw]))" + "|(?:(?:25[0-5]|2[0-4]" + // or ip address
"[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]" + "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]" + "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}" + "|[1-9][0-9]|[0-9])))" + "(?:\\:\\d{1,5})?)" + // plus option port number +
"(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~" + // plus option query params
"\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" + "(?:\\b|$)"; // and finally, a word boundary or end of
// input.  This is to stop foo.sure from
// matching as foo.su


var emailAddressPattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" + "\\@" + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" + "(" + "\\." + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" + ")+";

exports.default = {
  essentialSet: essentialSet,
  nonLatinLowercase: nonLatinLowercase,
  nonLatinUppercase: nonLatinUppercase,
  nonLatinChars: nonLatinChars,
  lowercaseCharsEnSkCzRue: lowercaseCharsEnSkCzRue,
  uppercaseCharsEnSkCzRue: uppercaseCharsEnSkCzRue,
  allChars: allChars,
  singleQuoteAdepts: singleQuoteAdepts,
  doubleQuoteAdepts: doubleQuoteAdepts,
  space: space,
  nbsp: nbsp,
  hairSpace: hairSpace,
  narrowNbsp: narrowNbsp,
  spaces: spaces,
  terminalPunctuation: terminalPunctuation,
  sentencePunctuation: sentencePunctuation,
  openingBrackets: openingBrackets,
  closingBrackets: closingBrackets,
  ellipsis: ellipsis,
  degree: degree,
  webUrlPattern: webUrlPattern,
  emailAddressPattern: emailAddressPattern
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultConfiguration = undefined;

var _configuration = require('./configuration');

Object.defineProperty(exports, 'getDefaultConfiguration', {
  enumerable: true,
  get: function get() {
    return _configuration.getDefaultConfiguration;
  }
});
exports.createCorrector = createCorrector;

var _exceptions = require('./modules/exceptions');

var _exceptions2 = _interopRequireDefault(_exceptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCorrector(configuration) {
  var config = (0, _configuration.normalizeConfiguration)(configuration);
  var _config$patterns = config.patterns,
      essentialSet = _config$patterns.essentialSet,
      nonLatinChars = _config$patterns.nonLatinChars,
      lowercaseCharsEnSkCzRue = _config$patterns.lowercaseCharsEnSkCzRue,
      uppercaseCharsEnSkCzRue = _config$patterns.uppercaseCharsEnSkCzRue,
      singleQuoteAdepts = _config$patterns.singleQuoteAdepts,
      doubleQuoteAdepts = _config$patterns.doubleQuoteAdepts,
      nbsp = _config$patterns.nbsp,
      hairSpace = _config$patterns.hairSpace,
      narrowNbsp = _config$patterns.narrowNbsp,
      spaces = _config$patterns.spaces,
      terminalPunctuation = _config$patterns.terminalPunctuation,
      sentencePunctuation = _config$patterns.sentencePunctuation,
      openingBrackets = _config$patterns.openingBrackets,
      closingBrackets = _config$patterns.closingBrackets,
      ellipsis = _config$patterns.ellipsis,
      degree = _config$patterns.degree;

  /*----------------------------------------------------------------------------*\
   Essential replacements
   \*----------------------------------------------------------------------------*/

  function replace_symbols(string) {
    for (var rule in essentialSet) {
      var re = new RegExp(rule, "g");
      string = string.replace(re, essentialSet[rule]);
    }
    return string;
  }

  function replace_periods_with_ellipsis(string) {
    /* [1] replace 3 and more dots with an ellipsis */
    string = string.replace(/\.{3,}/g, "…");

    /* [2] replace 2 dots in the middle of the sentence with an aposiopesis */
    var pattern = "[" + spaces + "]\\.{2}[" + spaces + "]";
    var re = new RegExp(pattern, "g");
    string = string.replace(re, " … ");

    /* [3] replace 2 dots at the end of the sentence with full stop */
    string = string.replace(/\.{2}/g, ".");

    return string;
  }

  function remove_multiple_spaces(string) {
    return string.replace(/ {2,}/g, " ");
  }

  /*----------------------------------------------------------------------------*\
   Quotes, primes & apostrophes
   \*----------------------------------------------------------------------------*/

  /*
   Corrects improper use of double quotes and double primes
    Assumptions and Limitations
   This function assumes that double quotes are always used in pair,
   i.e. authors did not forget to close double quotes in their text.
    Algorithm
   [0] Remove extra terminal punctuation around double quotes
   [1] Swap right double quote adepts with a punctuation
   (this comes first as it is a quite common mistake that may eventually
   lead to improper identification of double primes)
   [2] Identify inches, arcseconds, seconds
   [3] Identify closed double quotes
   [4] Identify the rest as unclosed double quotes (best-effort replacement)
   [5] Fix spacing around quotes and primes
   [6] Swap back some of the double quotes with a punctuation
   [7] Remove extra punctuation around quotes
   [8] Replace all identified punctuation with appropriate punctuation in
   given language
    @param {string} string — input text for identification
   @param {string} language — language option
   @returns {string} output with properly replaces double quotes and double primes
   */
  function correct_double_quotes_and_primes(string, language) {

    /* [0] Remove extra terminal punctuation around double quotes
     e.g. “We will continue tomorrow.”. */
    var pattern = "([" + sentencePunctuation + "])(" + doubleQuoteAdepts + ")([" + sentencePunctuation + "])";
    var re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$2");

    /* [1] Swap right double quote adepts with a terminal punctuation */
    pattern = "(" + doubleQuoteAdepts + ")([" + terminalPunctuation + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, '$2$1');

    /* [2] Identify inches, arcseconds, seconds
     Note: we’re not using double_quote_adepts variable
     as commas and low-positioned quotes are omitted*/
    string = string.replace(/(\d ?)(“|”|"|″|‘{2,}|’{2,}|'{2,}|′{2,})/g, "$1{{typopo__double-prime}}");

    /* [3] Identify closed double quotes */
    pattern = "(" + doubleQuoteAdepts + ")(.*?)(" + doubleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");

    /* [4.1] Identify unclosed left double quote */
    pattern = "(" + doubleQuoteAdepts + ")([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__left-double-quote}}$2");

    /* [4.2] Identify unclosed right double quote */
    pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + sentencePunctuation + ellipsis + "])(" + doubleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1{{typopo__right-double-quote}}");

    /* [4.3] Remove remaining unidentified double quote */
    pattern = "([" + spaces + "])(" + doubleQuoteAdepts + ")([" + spaces + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");

    /* [5] Fix spacing around quotes and prime */
    string = string.replace(/(\{\{typopo__left-double-quote}})( )/g, "$1");
    string = string.replace(/( )(\{\{typopo__right-double-quote}})/g, "$2");
    string = string.replace(/( )(\{\{typopo__double-prime}})/g, "$2");

    /* [6] Swap back some of the double quotes with a punctuation
      Idea
     In [1] we have swapped all double right quotes by default with a terminal
     punctuation. However, not all double quotes wrap the whole sentence and
     there are cases when few words are quoted within a sentence. Take a look at
     examples:
     “Sentence quoted as a whole.” (full stop is placed within double quotes)
     This is “quoted expression.” (full stop is placed outside double quotes)
      Algorithm
     Match all the double quote pairs that do not precede sentence punctuation
     (and thus must be used within a sentence) and swap right double with
     a terminal punctuation.
     */
    pattern = "([^" + sentencePunctuation + "][" + spaces + "]{{typopo__left-double-quote}}.+?)([" + terminalPunctuation + "])({{typopo__right-double-quote}})";
    // console.log(pattern);
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3$2");

    /* [7] Remove extra comma after punctuation in direct speech,
     e.g. "“Hey!,” she said" */
    pattern = "([" + sentencePunctuation + "])([\,])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1");

    /* [8] Punctuation replacement */
    string = string.replace(/(\{\{typopo__double-prime}})/g, "″");

    switch (language) {
      case "rue":
        string = string.replace(/(\{\{typopo__left-double-quote}})/g, "«");
        string = string.replace(/(\{\{typopo__right-double-quote}})/g, "»");
        break;
      case "sk":
      case "cs":
        string = string.replace(/(\{\{typopo__left-double-quote}})/g, "„");
        string = string.replace(/(\{\{typopo__right-double-quote}})/g, "“");
        break;
      case "en":
        string = string.replace(/(\{\{typopo__left-double-quote}})/g, "“");
        string = string.replace(/(\{\{typopo__right-double-quote}})/g, "”");
        break;
    }

    return string;
  }

  /*
   Corrects improper use of single quotes, single primes and apostrophes
    Assumptions and Limitations
   This function assumes that double quotes are always used in pair,
   i.e. authors did not forget to close double quotes in their text.
   Further, single quotes are used as secondary and they're properly spaced,
   e.g. ␣'word or sentence portion'␣ (and not like ␣'␣word␣'␣)
    Algorithm
   [1] Identify common apostrohe contractions
   [2] Identify single quotes
   [3] Identify feet, arcminutes, minutes
   [4] Identify residual apostrophes that have left
   [?] Swap right single quote adepts with a punctuation
   (We were swapping single quotes as part of algorithm a while a back,
   but since it is more probable that single quotes are in the middle of the
   sentence, we have dropped swapping as a part of the algorithm)
   [6] Replace all identified punctuation with appropriate punctuation in
   given language
    @param {string} string — input text for identification
   @param {string} language — language options
   @returns {string} — corrected output
   */
  function correct_single_quotes_primes_and_apostrophes(string, language) {

    /* [1.1] Identify ’n’ contractions */
    var pattern = "(" + singleQuoteAdepts + ")(n)(" + singleQuoteAdepts + ")";
    var re = new RegExp(pattern, "gi");
    string = string.replace(re, "{{typopo__apostrophe}}$2{{typopo__apostrophe}}");

    /* [1.2] Identify common contractions at the beginning or at the end
     of the word, e.g. Fish ’n’ Chips, ’em, ’cause,… */
    var contraction_examples = "em|cause|twas|tis|til|round";
    pattern = "(" + singleQuoteAdepts + ")(" + contraction_examples + ")";
    re = new RegExp(pattern, "gi");
    string = string.replace(re, "{{typopo__apostrophe}}$2");

    /* [1.3] Identify in-word contractions,
     e.g. Don’t, I’m, O’Doole, 69’ers */
    var character_adepts = "0-9" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue;
    pattern = "([" + character_adepts + "])(" + singleQuoteAdepts + ")([" + character_adepts + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1{{typopo__apostrophe}}$3");

    /* [1.4] Identify year contractions
     e.g. ’70s, INCHEBA ’89,… */
    pattern = "(" + singleQuoteAdepts + ")([0-9]{2})";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__apostrophe}}$2");

    /* [2] Identify single quotes within double quotes */
    pattern = "(" + doubleQuoteAdepts + ")(.*?)(" + doubleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, function ($0, $1, $2, $3) {

      //identify {{typopo__left-single-quote--adept}}
      var pattern = "( )(" + singleQuoteAdepts + ")([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
      var re = new RegExp(pattern, "g");
      $2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

      //identify {{typopo__right-single-quote--adept}}
      pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])([\.,!?])?(" + singleQuoteAdepts + ")([ ]|[\.,!?])";
      re = new RegExp(pattern, "g");
      $2 = $2.replace(re, "$1$2{{typopo__right-single-quote--adept}}$4");

      //identify single quote pairs
      pattern = "({{typopo__left-single-quote--adept}})(.*?)({{typopo__right-single-quote--adept}})";
      re = new RegExp(pattern, "g");
      $2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

      return $1 + $2 + $3;
    });

    /* [3] Identify feet, arcminutes, minutes
     Note: we’re not using single_quote_adepts variable
     as commas and low-positioned quotes are omitted*/
    string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{{typopo__single-prime}}");

    /* [4] Identify residual apostrophes that have left */
    pattern = "(" + singleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__apostrophe}}");

    /* [5] Punctuation replacement */
    string = string.replace(/(\{\{typopo__single-prime}})/g, "′");
    string = string.replace(/\{\{typopo__apostrophe}}|\{\{typopo__left-single-quote--adept}}|\{\{typopo__right-single-quote--adept}}/g, "’");

    switch (language) {
      case "rue":
        string = string.replace(/\{\{typopo__left-single-quote}}/g, "‹");
        string = string.replace(/\{\{typopo__right-single-quote}}/g, "›");
        break;
      case "sk":
      case "cs":
        string = string.replace(/\{\{typopo__left-single-quote}}/g, "‚");
        string = string.replace(/\{\{typopo__right-single-quote}}/g, "‘");
        break;
      case "en":
        string = string.replace(/\{\{typopo__left-single-quote}}/g, "‘");
        string = string.replace(/\{\{typopo__right-single-quote}}/g, "’");
    }

    return string;
  }

  function correct_multiple_sign(string) {
    return remove_multiple_spaces(string.replace(/([1-9]+[ ]?[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, "$1 × $3"));
  }

  /*
   Replaces hyphen with em or en dash
    Algorithm
   [1] Replace 3 consecutive hyphens (---) with an em dash (—)
   [2] Replace 2 consecutive hyphens (--) with an en dash (—)
   [3] Replace any hyphen or dash surrounded with spaces with an em dash
   [4] Replace hyphen or dash used in number range with an en dash
   and set proper spacing
    @param {string} string — input text for identification
   @returns {string} — output with dashes instead of hyphens
   */
  function replace_hyphen_with_dash(string, language) {
    var dashes = "-–—"; // including a hyphen

    /* [1] Replace 3 consecutive hyphens (---) with an em dash (—) */
    string = string.replace(/(---)/g, "—");

    /* [2] Replace 2 consecutive hyphens (--) with an en dash (—) */
    string = string.replace(/(--)/g, "–");

    /* [3] Replace any hyphen or dash surrounded with spaces with an em dash */
    var pattern = "[" + spaces + "][" + dashes + "][" + spaces + "]";
    var re = new RegExp(pattern, "g");
    var replacement = narrowNbsp + "—" + hairSpace;
    string = string.replace(re, replacement);

    /* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
     with an en dash; including cases when there is an extra space
     from either one side or both sides of the dash */
    var cardinal_number = "\\d+";
    pattern = "(" + cardinal_number + ")([" + spaces + "]?[" + dashes + "][" + spaces + "]?)(" + cardinal_number + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1–$3");

    /* [4.2] Replace hyphen or dash, placed between 2 ordinal numbers,
     with an en dash; including cases when there is an extra space
     from either one side or both sides of the dash */
    var ordinal_indicator = "";
    switch (language) {
      case "rue":
      case "sk":
      case "cs":
        ordinal_indicator = "\\.";
        break;
      case "en":
        ordinal_indicator = "st|nd|rd|th";
        break;
    }
    pattern = "(" + cardinal_number + ")(" + ordinal_indicator + ")([" + spaces + "]?[" + dashes + "][" + spaces + "]?)(" + cardinal_number + ")(" + ordinal_indicator + ")";
    re = new RegExp(pattern, "gi");
    string = string.replace(re, "$1$2–$4$5");

    return string;
  }

  function replace_dash_with_hyphen(string) {
    var pattern = "([" + lowercaseCharsEnSkCzRue + "])([–—])([" + lowercaseCharsEnSkCzRue + "])";
    var re = new RegExp(pattern, "g");
    return string.replace(re, "$1-$3");
  }

  /*----------------------------------------------------------------------------*\
   Consolidation of spaces
   \*----------------------------------------------------------------------------*/

  function remove_space_before_punctuation(string) {
    var pattern = "([" + spaces + "])([" + sentencePunctuation + closingBrackets + degree + "])";
    var re = new RegExp(pattern, "g");
    return string.replace(re, "$2");
  }

  function remove_space_after_punctuation(string) {
    var pattern = "([" + openingBrackets + "])([" + spaces + "])";
    var re = new RegExp(pattern, "g");
    return string.replace(re, "$1");
  }

  function remove_trailing_spaces(string) {
    return string.trim();
  }

  function add_space_before_punctuation(string) {
    var pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])([" + openingBrackets + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    var re = new RegExp(pattern, "g");
    return string.replace(re, "$1 $2$3");
  }

  function add_space_after_punctuation(string) {
    var pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])([" + sentencePunctuation + closingBrackets + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    var re = new RegExp(pattern, "g");
    return string.replace(re, "$1$2 $3");
  }

  /*
   Removes extra spaces at the beginning of each paragraph
    This could be done with a one-liner:
   return string.replace(/^\s+/gm, "");
    However, it also removes empty lines. Since, we want to handle this change
   separately, we need to
   [1] split the lines manually
   [2] and remove extra spaces at the begining of each line
   [3] join lines together to a single string
    @param {string} string — input text for identification
   @returns {string} — output with removed spaces at the beginning of paragraphs
   */
  function remove_spaces_at_paragraph_beginning(string) {
    /* [1] split the lines manually */
    var lines = string.split(/\r?\n/);

    /* [2] and remove extra spaces at the begining of each line */
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/^\s+/, "");
    }

    /* [3] join lines together to a single string */
    return lines.join("\n");
  }

  /*
   Removes empty lines
    @param {string} string — input text for identification
   @returns {string} — output with removed empty lines
   */
  function remove_empty_lines(string) {
    return string.replace(/^\s+/gm, "");
  }

  /*
   Consolidates the use of non-breaking spaces
    * adds non-breaking spaces after single-character prepositions
   * adds non-breaking spaces after numerals
   * adds non-breaking spaces around ×
   * removes characters between multi-character words
    @param {string} string — input text for identification
   @returns {string} — output with correctly placed non-breaking space
   */
  function consolidate_nbsp(string) {
    // removes non-breaking spaces between multi-character words
    var pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]{2,})([" + nbsp + narrowNbsp + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]{2,})";
    var re = new RegExp(pattern, "g");
    string = string.replace(re, "$1 $3");
    string = string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


    // adds non-breaking spaces after numerals
    pattern = "([0-9]+)( )([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]+)";
    re = new RegExp(pattern, "g");
    var replacement = "$1" + nbsp + "$3";
    string = string.replace(re, replacement);

    // adds non-breaking spaces around ×
    pattern = "([" + spaces + "])([×])([" + spaces + "])";
    re = new RegExp(pattern, "g");
    replacement = nbsp + "$2" + nbsp;
    string = string.replace(re, replacement);

    // adds non-breaking spaces after single-character prepositions
    pattern = "([  ])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]|&)( )";
    re = new RegExp(pattern, "g");
    replacement = "$1$2" + nbsp;
    string = string.replace(re, replacement);
    string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

    return string;
  }

  /*
   Corrects improper spacing around ellipsis and aposiopesis
    Ellipsis (as a character) is used for 2 different purposes:
   1. as an ellipsis to omit a piece of information deliberately
   2. as an aposiopesis; a figure of speech wherein a sentence is
   deliberately broken off and left unfinished
    sources
   https://en.wikipedia.org/wiki/Ellipsis
   https://en.wikipedia.org/wiki/Aposiopesis
   http://www.liteera.cz/slovnik/vypustka
    Algorithm
   Ellipsis & Aposiopesis require different use of spacing around them,
   that is why we are correcting only following cases:
   errors:
   [1] correct spacing, when ellipsis used used around commas
   [2] correct spacing for aposiopesis at the end of the sentence in the middle of the paragraph
   [3] correct spacing for aposiopesis at the beginning of the sentence in the middle of the paragraph
   [4] correct spacing for aposiopesis at the beginning of the sentence at the beginning of the paragraph
   [5] correct spacing for aposiopesis at the end of the sentence at the end of the paragraph
    @param {string} string — input text for identification
   @returns {string} — output with corrected spacing around aposiopesis
   */
  function correct_spaces_around_ellipsis(string) {

    /* [1] correct spacing, when ellipsis used used around commas */
    var pattern = ",[" + spaces + "]?" + ellipsis + "[" + spaces + "]?,";
    var re = new RegExp(pattern, "g");
    string = string.replace(re, ", …,");

    /* [2] correct spacing for aposiopesis at the end of the sentence
     in the middle of the paragraph */
    pattern = "([" + lowercaseCharsEnSkCzRue + "])([" + spaces + "])(" + ellipsis + "[" + spaces + "][" + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");

    /* [3] correct spacing for aposiopesis at the beginning of the sentence
     in the middle of the paragraph */
    pattern = "([" + sentencePunctuation + "][" + spaces + "]" + ellipsis + ")([" + spaces + "])([" + lowercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");

    /* [4] correct spacing for aposiopesis at the beginning of the sentence
     at the beginning of the paragraph */
    pattern = "(^…)([" + spaces + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "gm");
    string = string.replace(re, "$1$3");

    /* [5] correct spacing for aposiopesis at the end of the sentence
     at the end of the paragraph */
    pattern = "([" + lowercaseCharsEnSkCzRue + sentencePunctuation + "])([" + spaces + "])(" + ellipsis + ")(?![ " + sentencePunctuation + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");

    return string;
  }

  /*
   Corrects accidental uppercase
    Best-effort function to fix most common accidental uppercase errors, namely:
   [1] 2 first uppercase letters (ie. UPpercase)
   [2] Swapped cases (ie. uPPERCASE)
    Algorithm does not fix other uppercase eventualities,
   e.g. mixed case (UppERcaSe) as there are many cases for corporate brands
   that could potentially match the algorithm as false positive.
    @param {string} string — input text for identification
   @returns {string} — output with corrected accidental uppercase
   */
  function correct_accidental_uppercase(string) {

    /* [1] two first uppercase letters (i.e. UPpercase) */
    var pattern = "[" + uppercaseCharsEnSkCzRue + "]{2,2}[" + lowercaseCharsEnSkCzRue + "]+";
    var re = new RegExp(pattern, "g");
    string = string.replace(re, function (string) {
      return string.substring(0, 1) + string.substring(1).toLowerCase();
    });

    /* [2.1] Swapped cases (2-letter cases, i.e. iT)
     Note that this is divided into 2 separate cases as \b in JavaScript regex
     does not take non-latin characters into a cosnideration
     */
    pattern = "[" + lowercaseCharsEnSkCzRue + "][" + uppercaseCharsEnSkCzRue + "]\\b";
    re = new RegExp(pattern, "g");
    string = string.replace(re, function (string) {
      return string.substring(0, 1) + string.substring(1).toLowerCase();
    });

    /* [2.2] Swapped cases (n-letter cases, i.e. uPPERCASE) */
    pattern = "[" + lowercaseCharsEnSkCzRue + "]+[" + uppercaseCharsEnSkCzRue + "]{2,}";
    re = new RegExp(pattern, "g");
    string = string.replace(re, function (string) {
      return string.substring(0, 1) + string.substring(1).toLowerCase();
    });

    return string;
  }

  /*----------------------------------------------------------------------------*\
   Abbreviations
   \*----------------------------------------------------------------------------*/
  /*
   Identifies differently-spelled abbreviations and replaces it with
   a temp variable, {{typopo__[abbr]}}
    Identifies given abbreviations:
   a.m., p.m., e.g., i.e.
    Algorithm
   [1] Identify e.g., i.e.
   [2] Identify a.m., p.m. (different match to avoid false positives such as:
   I am, He is the PM.)
   [3] Exclude false identifications
    @param {string} input text for identification
   @returns {string} corrected output
   */
  function identify_common_abbreviations(string) {

    /* [1] Identify e.g., i.e. */
    var abbreviations = ["eg", "ie"];
    for (var i = 0; i < abbreviations.length; i++) {
      var pattern = "(\\b[" + abbreviations[i][0] + "]\\.?[" + spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + spaces + "]?)(\\b)";
      // console.log(pattern);
      var re = new RegExp(pattern, "gi");
      var replacement = "{{typopo__" + abbreviations[i] + "}} ";
      string = string.replace(re, replacement);
    }

    /* [2] Identify a.m., p.m. */
    abbreviations = ["am", "pm"];
    for (var _i = 0; _i < abbreviations.length; _i++) {
      var _pattern = "(\\d)([" + spaces + "]?)(\\b[" + abbreviations[_i][0] + "]\\.?[" + spaces + "]?[" + abbreviations[_i][1] + "]\\.?)([" + spaces + "]?)(\\b|\\B)";
      var _re = new RegExp(_pattern, "gi");
      var _replacement = "$1 {{typopo__" + abbreviations[_i] + "}} ";
      string = string.replace(_re, _replacement);
    }

    /* [3] Exclude false identifications
     Regex \b does not catch non-latin characters so we need to exclude false
     identifications
     */
    abbreviations = ["eg", "ie", "am", "pm"];
    for (var _i2 = 0; _i2 < abbreviations.length; _i2++) {
      // non-latin character at the beginning
      var _pattern2 = "([" + nonLatinChars + "])({{typopo__" + abbreviations[_i2] + "}})";
      var _re2 = new RegExp(_pattern2, "g");
      var _replacement2 = "$1" + abbreviations[_i2];
      string = string.replace(_re2, _replacement2);

      // non-latin character at the end
      _pattern2 = "({{typopo__" + abbreviations[_i2] + "}} )([" + nonLatinChars + "])";
      _re2 = new RegExp(_pattern2, "g");
      _replacement2 = abbreviations[_i2] + "$2";
      string = string.replace(_re2, _replacement2);
    }

    return string;
  }

  /*
   Replaces identified temp abbreviation variable like {{typopo__eg}},
   with their actual representation
    @param {string} input text for identification
   @returns {string} corrected output
   */
  function place_common_abbreviations(string) {
    var abbreviations = ["eg", "ie", "am", "pm"];
    for (var i = 0; i < abbreviations.length; i++) {
      var pattern = "{{typopo__" + abbreviations[i] + "}}";
      var re = new RegExp(pattern, "g");
      var replacement = abbreviations[i][0] + "." + abbreviations[i][1] + ".";
      string = string.replace(re, replacement);
    }

    return string;
  }

  /*----------------------------------------------------------------------------*\
   Main script
   \*----------------------------------------------------------------------------*/

  /*
   Correct typos in the predefined order
     @param {string} string — input text for correction
   @returns {string} — corrected output
   */
  return function correct_typos(string) {
    var language = config.language;
    var remove_lines = config['remove-empty-lines'];

    var exceptionHandler = (0, _exceptions2.default)(config['exceptions']);

    string = exceptionHandler.identify_exceptions(string);
    string = identify_common_abbreviations(string); // needs to go before punctuation fixes

    string = replace_symbols(string, essentialSet);
    string = replace_periods_with_ellipsis(string);
    string = remove_multiple_spaces(string);

    string = correct_double_quotes_and_primes(string, language);
    string = correct_single_quotes_primes_and_apostrophes(string, language);

    string = correct_multiple_sign(string);

    string = remove_space_before_punctuation(string);
    string = remove_space_after_punctuation(string);
    string = remove_trailing_spaces(string);
    string = add_space_before_punctuation(string);
    string = add_space_after_punctuation(string);
    string = remove_spaces_at_paragraph_beginning(string);

    if (remove_lines) {
      string = remove_empty_lines(string);
    }

    string = consolidate_nbsp(string);
    string = correct_spaces_around_ellipsis(string);

    string = replace_hyphen_with_dash(string, language);
    string = replace_dash_with_hyphen(string);

    string = correct_accidental_uppercase(string);

    string = place_common_abbreviations(string); // needs to go after punctuation fixes
    string = exceptionHandler.place_exceptions(string);

    string = replace_periods_with_ellipsis(string);

    return string;
  };
}

},{"./configuration":1,"./modules/exceptions":2}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvbmZpZ3VyYXRpb24uanMiLCJzcmNcXG1vZHVsZXNcXGV4Y2VwdGlvbnMuanMiLCJzcmNcXHBhdHRlcm5zLmpzIiwic3JjXFx0eXBvcG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztRQ29GZ0IsdUIsR0FBQSx1QjtRQUtBLHNCLEdBQUEsc0I7O0FBekZoQjs7Ozs7O0FBR0EsSUFBTSxnQkFBZ0I7QUFDcEIsd0JBQXNCLElBREY7QUFFcEIsY0FBWSxJQUZRO0FBR3BCLGdCQUFjO0FBQ1osdUJBQW1CLENBQUMsZUFBRCxFQUFrQixxQkFBbEI7QUFEUCxHQUhNO0FBTXBCO0FBTm9CLENBQXRCOztBQVVBLFNBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQixRQUFyQixFQUErQjtBQUM3QixTQUFPLE9BQU8sSUFBUCxDQUFZLEdBQVosRUFBaUIsTUFBakIsQ0FBd0IsVUFBQyxTQUFELEVBQVksR0FBWixFQUFvQjtBQUNqRCxjQUFVLEdBQVYsSUFBaUIsU0FBUyxHQUFULEVBQWMsSUFBSSxHQUFKLENBQWQsRUFBd0IsR0FBeEIsQ0FBakI7QUFDQSxXQUFPLFNBQVA7QUFDRCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUQ7O0FBRUQsU0FBUyxVQUFULENBQW9CLFFBQXBCLEVBQThCO0FBQzVCLFNBQU87QUFBQSxXQUFPLElBQUksUUFBSixDQUFQO0FBQUEsR0FBUDtBQUNEOztBQUVELFNBQVMseUJBQVQsQ0FBbUMsdUJBQW5DLEVBQTREO0FBQzFELE1BQU0sa0JBQWtCLDJCQUEyQixFQUFuRDtBQUNBLE1BQU0seUJBQXlCLGNBQWMsWUFBZCxDQUEvQjtBQUNBLFNBQU8sT0FBTyxzQkFBUCxFQUErQixVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQ3BELFFBQUksUUFBTyxLQUFQLHlDQUFPLEtBQVAsZUFBeUIsZ0JBQWdCLEdBQWhCLENBQXpCLENBQUos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b0MsQ0FzQ1M7QUFDN0MsYUFBUyxpQkFBaUIsZ0JBQWpCLENBQWtDLE1BQWxDLENBQVQ7O0FBRUEsYUFBUyw4QkFBOEIsTUFBOUIsQ0FBVDs7QUFFQSxXQUFPLE1BQVA7QUFDRCxHQTVDRDtBQTZDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgcGF0dGVybnMgZnJvbSAnLi9wYXR0ZXJucyc7XG5cblxuY29uc3QgZGVmYXVsdFZhbHVlcyA9IHtcbiAgJ3JlbW92ZS1lbXB0eS1saW5lcyc6IHRydWUsXG4gICdsYW5ndWFnZSc6ICdlbicsXG4gICdleGNlcHRpb25zJzoge1xuICAgIGV4Y2VwdGlvblBhdHRlcm5zOiBbJ3dlYlVybFBhdHRlcm4nLCAnZW1haWxBZGRyZXNzUGF0dGVybiddLFxuICB9LFxuICAncGF0dGVybnMnOiBwYXR0ZXJucyxcbn07XG5cblxuZnVuY3Rpb24gb2JqTWFwKG9iaiwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChhZ2dyZWdhdGUsIGtleSkgPT4ge1xuICAgIGFnZ3JlZ2F0ZVtrZXldID0gY2FsbGJhY2soa2V5LCBvYmpba2V5XSwgb2JqKTtcbiAgICByZXR1cm4gYWdncmVnYXRlO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIHJldHVyblByb3AocHJvcE5hbWUpIHtcbiAgcmV0dXJuIG9iaiA9PiBvYmpbcHJvcE5hbWVdO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVFeGNlcHRpb25zQ29uZmlnKGV4Y2VwdGlvbnNDb25maWd1cmF0aW9uKSB7XG4gIGNvbnN0IGV4Y2VwdGlvbkNvbmZpZyA9IGV4Y2VwdGlvbnNDb25maWd1cmF0aW9uIHx8IHt9O1xuICBjb25zdCBleGNlcHRpb25EZWZhdWx0VmFsdWVzID0gZGVmYXVsdFZhbHVlc1snZXhjZXB0aW9ucyddO1xuICByZXR1cm4gb2JqTWFwKGV4Y2VwdGlvbkRlZmF1bHRWYWx1ZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZih2YWx1ZSkgIT09IHR5cGVvZihleGNlcHRpb25Db25maWdba2V5XSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhjZXB0aW9uQ29uZmlnW2tleV07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZW5vcm1hbGl6ZUV4Y2VwdGlvbnMoY29uZmlnKSB7XG4gIGNvbnN0IGV4Y2VwdGlvblBhdHRlcm5zID0gY29uZmlnLmV4Y2VwdGlvbnMuZXhjZXB0aW9uUGF0dGVybnMubWFwKHBhdHRlcm5OYW1lID0+IHtcbiAgICBpZiAoIWNvbmZpZy5wYXR0ZXJuc1twYXR0ZXJuTmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXhjZXB0aW9uIHBhdHRlcm4gJHtwYXR0ZXJuTmFtZX0gaXMgbm90IGluIGNvbmZpZy5wYXR0ZXJucy5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZy5wYXR0ZXJuc1twYXR0ZXJuTmFtZV07XG4gIH0pO1xuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb25maWcuZXhjZXB0aW9ucywge2V4Y2VwdGlvblBhdHRlcm5zfSk7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIChhcmcpID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmdNYXAoYXJnKSB7XG4gIHJldHVybiAodHlwZW9mIChhcmcpID09PSAnb2JqZWN0JykgJiYgKE9iamVjdC5rZXlzKGFyZykuZXZlcnkoa2V5ID0+IGlzU3RyaW5nKGFyZ1trZXldKSkpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlQYXR0ZXJuc09iamVjdChwYXR0ZXJucykge1xuICBPYmplY3Qua2V5cyhwYXR0ZXJucykuZm9yRWFjaCgocGF0dGVybk5hbWUpID0+IHtcbiAgICBpZiAoIWlzU3RyaW5nKHBhdHRlcm5zW3BhdHRlcm5OYW1lXSkgJiYgIWlzU3RyaW5nTWFwKHBhdHRlcm5zW3BhdHRlcm5OYW1lXSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHBhdHRlcm4gJHtwYXR0ZXJuTmFtZX0gaW4gY29uZmlndXJhdGlvbiBpcyBuZWl0aGVyIGEgc3RyaW5nIG5vciBhIG1hcCBvZiBzdHJpbmdzLmApO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVBhdHRlcm5zKHBhdHRlcm5zQ29uZmlndXJhdGlvbikge1xuICBjb25zdCBwYXR0ZXJuc0NvbmZpZyA9IHBhdHRlcm5zQ29uZmlndXJhdGlvbiB8fCB7fTtcbiAgdmVyaWZ5UGF0dGVybnNPYmplY3QocGF0dGVybnNDb25maWcpO1xuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VmFsdWVzWydwYXR0ZXJucyddLCBwYXR0ZXJuc0NvbmZpZyk7XG59XG5cbmNvbnN0IGNvbmZpZ3VyYXRpb25Ob3JtYWxpemVyID0ge1xuICAncmVtb3ZlLWVtcHR5LWxpbmVzJzogKHZhbHVlKSA9PiB0eXBlb2YodmFsdWUpID09PSB0eXBlb2YodHJ1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZXNbJ3JlbW92ZS1lbXB0eS1saW5lcyddLFxuICAnbGFuZ3VhZ2UnOiAodmFsdWUpID0+IFsnZW4nLCAnc2snLCAnY3MnLCAncnVlJ10uaW5jbHVkZXModmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWVzWydsYW5ndWFnZSddLFxuICAncGF0dGVybnMnOiBub3JtYWxpemVQYXR0ZXJucyxcbiAgJ2V4Y2VwdGlvbnMnOiBub3JtYWxpemVFeGNlcHRpb25zQ29uZmlnLFxufTtcblxuY29uc3QgY29uZmlndXJhdGlvbkRlbm9ybWFsaXplciA9IHtcbiAgJ2V4Y2VwdGlvbnMnOiBkZW5vcm1hbGl6ZUV4Y2VwdGlvbnMsXG4gICdyZW1vdmUtZW1wdHktbGluZXMnOiByZXR1cm5Qcm9wKCdyZW1vdmUtZW1wdHktbGluZXMnKSxcbiAgJ2xhbmd1YWdlJzogcmV0dXJuUHJvcCgnbGFuZ3VhZ2UnKSxcbiAgJ3BhdHRlcm5zJzogcmV0dXJuUHJvcCgncGF0dGVybnMnKSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0Q29uZmlndXJhdGlvbigpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRWYWx1ZXMpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb24pIHtcbiAgY29uc3QgY29uZmlnID0gY29uZmlndXJhdGlvbiB8fCB7fTtcbiAgY29uc3Qgbm9ybWFsaXplZENvbmZpZyA9IG9iak1hcChjb25maWd1cmF0aW9uTm9ybWFsaXplciwgKGtleSwgbm9ybWFsaXplKSA9PiBub3JtYWxpemUoY29uZmlnW2tleV0pKTtcbiAgY29uc3QgZGVub3JtYWxpemVkQ29uZmlnID0gb2JqTWFwKGNvbmZpZ3VyYXRpb25EZW5vcm1hbGl6ZXIsIChrZXksIGRlbm9ybWFsaXplKSA9PiBkZW5vcm1hbGl6ZShub3JtYWxpemVkQ29uZmlnKSk7XG5cbiAgcmV0dXJuIGRlbm9ybWFsaXplZENvbmZpZztcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuIEV4Y2VwdGlvbnNcbiBcXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG4vKlxuIElkZW50aWZpZXMgZXhjZXB0aW9ucyB0aGF0IHdpbGwgYmUgb21pdHRlZCBmcm9tIGNvcnJlY3Rpb24gb2YgYW55IHNvcnRcblxuIEFsZ29yaXRobVxuIFsxXSBJZGVudGlmeSBlbWFpbCBhZGRyZXNzZXNcbiBbMl0gSWRlbnRpZnkgd2ViIFVSTHMgYW5kIElQc1xuIFszXSBNYXJrIHRoZW0gYXMgdGVtcG9yYXJ5IGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX1cblxuIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvbiBvZiBleGNlcHRpb25zXG4gQHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGlkZW50aWZpZWQgZXhjZXB0aW9ucyBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fVxuICovXG5mdW5jdGlvbiBpZGVudGlmeV9leGNlcHRpb25zKHN0cmluZykge1xuICB0aGlzLmNvbmZpZy5leGNlcHRpb25QYXR0ZXJucy5mb3JFYWNoKHBhdHRlcm4gPT4ge1xuICAgIGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQuY2FsbCh0aGlzLCBzdHJpbmcsIHBhdHRlcm4pO1xuICB9KTtcblxuICAvKiBbM10gTWFyayB0aGVtIGFzIHRlbXBvcmFyeSBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19ICovXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5leGNlcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcmVwbGFjZW1lbnQgPSBcInt7dHlwb3BvX19leGNlcHRpb24tXCIgKyBpICsgXCJ9fVwiO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHRoaXMuZXhjZXB0aW9uc1tpXSwgcmVwbGFjZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZztcbn1cblxuXG4vKlxuIElkZW50aWZpZXMgc2V0IG9mIGV4Y2VwdGlvbnMgZm9yIGdpdmVuIHBhdHRlcm5cbiBVc2VkIGFzIGhlbHBlciBmdW5jdGlvbiBmb3IgaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpXG5cbiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb24gb2YgZXhjZXB0aW9uc1xuIEBwYXJhbSB7cGF0dGVybn0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gdG8gbWF0Y2ggZXhjZXB0aW9uXG4gKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCBwYXR0ZXJuKSB7XG4gIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gIGNvbnN0IG1hdGNoZWRfZXhjZXB0aW9ucyA9IHN0cmluZy5tYXRjaChyZSk7XG4gIGlmIChtYXRjaGVkX2V4Y2VwdGlvbnMgIT0gbnVsbCkge1xuICAgIHRoaXMuZXhjZXB0aW9ucyA9IHRoaXMuZXhjZXB0aW9ucy5jb25jYXQobWF0Y2hlZF9leGNlcHRpb25zKTtcbiAgfVxufVxuXG5cbi8qXG4gUmVwbGFjZXMgaWRlbnRpZmllZCBleGNlcHRpb25zIHdpdGggcmVhbCBvbmVzIGJ5IGNoYW5nZSB0aGVpclxuIHRlbXBvcmFyeSByZXByZXNlbnRhdGlvbiBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fSB3aXRoIGl0c1xuIGNvcnJlc3BvbmRpbmcgcmVwcmVzZW50YXRpb25cblxuIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IHdpdGggaWRlbnRpZmllZCBleGNlcHRpb25zXG4gQHJldHVybnMge3N0cmluZ30gb3V0cHV0IHdpdGggcGxhY2VkIGV4Y2VwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcGxhY2VfZXhjZXB0aW9ucyhzdHJpbmcpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmV4Y2VwdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gXCJ7e3R5cG9wb19fZXhjZXB0aW9uLVwiICsgaSArIFwifX1cIjtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gdGhpcy5leGNlcHRpb25zW2ldO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG4gIH1cblxuICByZXR1cm4gc3RyaW5nO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEV4Y2VwdGlvbkhhbmRsZXIoY29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgZXhjZXB0aW9uczogW10sXG4gICAgaWRlbnRpZnlfZXhjZXB0aW9ucyxcbiAgICBwbGFjZV9leGNlcHRpb25zLFxuICAgIGNvbmZpZyxcbiAgfTtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuIFZhcmlhYmxlcyAmIENoYXJhY3RlciByZXBsYWNlbWVudCBzZXRzXG4gXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IGVzc2VudGlhbFNldCA9IHtcbiAgXCJcXFxcKENcXFxcKVwiOiBcIsKpXCIsXG4gIFwiXFxcXChjXFxcXClcIjogXCLCqVwiLFxuICBcIlxcXFwoUlxcXFwpXCI6IFwiwq5cIixcbiAgXCJcXFxcKHJcXFxcKVwiOiBcIsKuXCIsXG4gIFwiXFxcXChUTVxcXFwpXCI6IFwi4oSiXCIsXG4gIFwiXFxcXCh0bVxcXFwpXCI6IFwi4oSiXCIsXG4gIFwiXFxcXCtcXFxcLVwiOiBcIsKxXCIsXG4gIFwiXFxcXC1cXFxcK1wiOiBcIsKxXCIsXG59O1xuY29uc3Qgbm9uTGF0aW5Mb3dlcmNhc2UgPSBcIsOhw6TEjcSPw6nEm8OtxLrEvsWIw7PDtMO2xZHFlcWZxaHFpcO6w7zFscWvw73FvtCw0LHQstCz0pHQtNC10LfRltC40LnQutC70LzQvdC+0L/RgNGB0YLRg9GE0YrRi9GM0YbRh9C20YjRl9GJ0ZHRlNGO0Y/RhVwiO1xuY29uc3Qgbm9uTGF0aW5VcHBlcmNhc2UgPSBcIsOBw4TEjMSOw4nEmsONxLnEvcWHw5PDlMOWxZDFlMWYxaDFpMOaw5zFsMWuw53FvdCQ0JHQktCT0pDQlNCV0JfQhtCY0JnQmtCb0JzQndCe0J/QoNCh0KLQo9Ck0KrQq9Cs0KbQp9CW0KjQh9Cp0IHQhNCu0K/QpVwiO1xuY29uc3Qgbm9uTGF0aW5DaGFycyA9IG5vbkxhdGluTG93ZXJjYXNlICsgbm9uTGF0aW5VcHBlcmNhc2U7XG5jb25zdCBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSA9IFwiYS16XCIgKyBub25MYXRpbkxvd2VyY2FzZTtcbmNvbnN0IHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlID0gXCJBLVpcIiArIG5vbkxhdGluVXBwZXJjYXNlO1xuY29uc3QgYWxsQ2hhcnMgPSBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlO1xuLypcbiAoMzkpXHRcdFx0ZHVtYiBzaW5nbGUgcXVvdGVcbiAoODIxNilcdFx0bGVmdCBzaW5nbGUgcXVvdGF0aW9uIG1hcmtcbiAoODIxNylcdFx0cmlnaHQgc2luZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKDcwMClcdFx0bW9kaWZpZXIgbGV0dGVyIGFwb3N0cm9waGU7IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01vZGlmaWVyX2xldHRlcl9hcG9zdHJvcGhlXG4gKDgyMTkpXHRcdHNpbmdsZSBoaWdoLXJldmVyc2VkLTkgcXVvdGF0aW9uIG1hcmtcbiAoODI0MilcdFx0cHJpbWVcbiAoODI0OSlcdFx0c2luZ2xlIGxlZnQtcG9pbnRpbmcgYW5nbGUgcXVvdGF0aW9uIG1hcmtcbiAoODI1MClcdFx0c2luZ2xlIHJpZ2h0LXBvaW50aW5nIGFuZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKi9cbmNvbnN0IHNpbmdsZVF1b3RlQWRlcHRzID0gXCLigJp8J3zigJh84oCZfMq8fOKAm3zigLJ84oC5fOKAulwiO1xuY29uc3QgZG91YmxlUXVvdGVBZGVwdHMgPSBcIuKAnnzigJx84oCdfFxcXCJ8wqt8wrt84oCzfCx7Mix9fOKAmHsyLH184oCZezIsfXwnezIsfXzigLl7Mix9fOKAunsyLH184oCyezIsfVwiO1xuY29uc3Qgc3BhY2UgPSBcIiBcIjtcbmNvbnN0IG5ic3AgPSBcIsKgXCI7XG5jb25zdCBoYWlyU3BhY2UgPSBcIuKAilwiOyAvLyYjODIwMjtcbmNvbnN0IG5hcnJvd05ic3AgPSBcIuKAr1wiOyAvLyYjODIzOTtcbmNvbnN0IHNwYWNlcyA9IHNwYWNlICsgbmJzcCArIGhhaXJTcGFjZSArIG5hcnJvd05ic3A7XG5jb25zdCB0ZXJtaW5hbFB1bmN0dWF0aW9uID0gXCJcXC5cXCFcXD9cIjtcbmNvbnN0IHNlbnRlbmNlUHVuY3R1YXRpb24gPSBcIlxcLFxcOlxcO1wiICsgdGVybWluYWxQdW5jdHVhdGlvbjsgLy8gdGhlcmUgaXMgbm8gZWxsaXBzaXMgaW4gdGhlIHNldCBhcyBpdCBpcyBiZWluZyB1c2VkIHRocm91Z2hvdXQgYSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlLiBSZXRoaW5rIHRoaXMgZ3JvdXAgdG8gc3BsaXQgaXQgaW50byBlbmQtc2VudGVuY2UgcHVuY3R1YXRpb24gYW5kIG1pZGRsZSBzZW50ZW5jZSBwdW5jdHVhdGlvblxuY29uc3Qgb3BlbmluZ0JyYWNrZXRzID0gXCJcXFxcKFxcXFxbXFxcXHtcIjtcbmNvbnN0IGNsb3NpbmdCcmFja2V0cyA9IFwiXFxcXClcXFxcXVxcXFx9XCI7XG5jb25zdCBlbGxpcHNpcyA9IFwi4oCmXCI7XG5jb25zdCBkZWdyZWUgPSBcIsKwXCI7XG5cbi8qXG4gU291cmNlIGZvciB3ZWJVcmxQYXR0ZXJuLCBlbWFpbEFkZHJlc3NQYXR0ZXJuXG4gaHR0cDovL2dyZXBjb2RlLmNvbS9maWxlL3JlcG9zaXRvcnkuZ3JlcGNvZGUuY29tL2phdmEvZXh0L2NvbS5nb29nbGUuYW5kcm9pZC9hbmRyb2lkLzIuMF9yMS9hbmRyb2lkL3RleHQvdXRpbC9SZWdleC5qYXZhI1JlZ2V4LjBXRUJfVVJMX1BBVFRFUk5cbiAqL1xuY29uc3Qgd2ViVXJsUGF0dGVybiA9IFwiKCg/OihodHRwfGh0dHBzfEh0dHB8SHR0cHN8cnRzcHxSdHNwKTpcXFxcL1xcXFwvKD86KD86W2EtekEtWjAtOVxcXFwkXFxcXC1cXFxcX1xcXFwuXFxcXCtcXFxcIVxcXFwqXFxcXCdcXFxcKFxcXFwpXCIgK1xuICBcIlxcXFwsXFxcXDtcXFxcP1xcXFwmXFxcXD1dfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKXsxLDY0fSg/OlxcXFw6KD86W2EtekEtWjAtOVxcXFwkXFxcXC1cXFxcX1wiICtcbiAgXCJcXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVxcXFwsXFxcXDtcXFxcP1xcXFwmXFxcXD1dfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKXsxLDI1fSk/XFxcXEApPyk/XCIgK1xuICBcIigoPzooPzpbYS16QS1aMC05XVthLXpBLVowLTlcXFxcLV17MCw2NH1cXFxcLikrXCIgKyAgLy8gbmFtZWQgaG9zdFxuICBcIig/OlwiICsgLy8gcGx1cyB0b3AgbGV2ZWwgZG9tYWluXG4gIFwiKD86YWVyb3xhcnBhfGFzaWF8YVtjZGVmZ2lsbW5vcXJzdHV3eHpdKVwiICtcbiAgXCJ8KD86Yml6fGJbYWJkZWZnaGlqbW5vcnN0dnd5el0pXCIgK1xuICBcInwoPzpjYXR8Y29tfGNvb3B8Y1thY2RmZ2hpa2xtbm9ydXZ4eXpdKVwiICtcbiAgXCJ8ZFtlamttb3pdXCIgK1xuICBcInwoPzplZHV8ZVtjZWdyc3R1XSlcIiArXG4gIFwifGZbaWprbW9yXVwiICtcbiAgXCJ8KD86Z292fGdbYWJkZWZnaGlsbW5wcXJzdHV3eV0pXCIgK1xuICBcInxoW2ttbnJ0dV1cIiArXG4gIFwifCg/OmluZm98aW50fGlbZGVsbW5vcXJzdF0pXCIgK1xuICBcInwoPzpqb2JzfGpbZW1vcF0pXCIgK1xuICBcInxrW2VnaGltbnJ3eXpdXCIgK1xuICBcInxsW2FiY2lrcnN0dXZ5XVwiICtcbiAgXCJ8KD86bWlsfG1vYml8bXVzZXVtfG1bYWNkZ2hrbG1ub3BxcnN0dXZ3eHl6XSlcIiArXG4gIFwifCg/Om5hbWV8bmV0fG5bYWNlZmdpbG9wcnV6XSlcIiArXG4gIFwifCg/Om9yZ3xvbSlcIiArXG4gIFwifCg/OnByb3xwW2FlZmdoa2xtbnJzdHd5XSlcIiArXG4gIFwifHFhXCIgK1xuICBcInxyW2VvdXddXCIgK1xuICBcInxzW2FiY2RlZ2hpamtsbW5vcnR1dnl6XVwiICtcbiAgXCJ8KD86dGVsfHRyYXZlbHx0W2NkZmdoamtsbW5vcHJ0dnd6XSlcIiArXG4gIFwifHVbYWdrbXN5el1cIiArXG4gIFwifHZbYWNlZ2ludV1cIiArXG4gIFwifHdbZnNdXCIgK1xuICBcInx5W2V0dV1cIiArXG4gIFwifHpbYW13XSkpXCIgK1xuICBcInwoPzooPzoyNVswLTVdfDJbMC00XVwiICsgLy8gb3IgaXAgYWRkcmVzc1xuICBcIlswLTldfFswLTFdWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XSlcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV1cIiArXG4gIFwifFswLTFdWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XXwwKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVwiICtcbiAgXCJbMC05XXsyfXxbMS05XVswLTldfFsxLTldfDApXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldfFswLTFdWzAtOV17Mn1cIiArXG4gIFwifFsxLTldWzAtOV18WzAtOV0pKSlcIiArXG4gIFwiKD86XFxcXDpcXFxcZHsxLDV9KT8pXCIgKyAvLyBwbHVzIG9wdGlvbiBwb3J0IG51bWJlciArXG4gIFwiKFxcXFwvKD86KD86W2EtekEtWjAtOVxcXFw7XFxcXC9cXFxcP1xcXFw6XFxcXEBcXFxcJlxcXFw9XFxcXCNcXFxcflwiICsgLy8gcGx1cyBvcHRpb24gcXVlcnkgcGFyYW1zXG4gIFwiXFxcXC1cXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVxcXFwsXFxcXF9dKXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSkqKT9cIiArXG4gIFwiKD86XFxcXGJ8JClcIjsgLy8gYW5kIGZpbmFsbHksIGEgd29yZCBib3VuZGFyeSBvciBlbmQgb2Zcbi8vIGlucHV0LiAgVGhpcyBpcyB0byBzdG9wIGZvby5zdXJlIGZyb21cbi8vIG1hdGNoaW5nIGFzIGZvby5zdVxuXG5cbmNvbnN0IGVtYWlsQWRkcmVzc1BhdHRlcm4gPSBcIlthLXpBLVowLTlcXFxcK1xcXFwuXFxcXF9cXFxcJVxcXFwtXXsxLDI1Nn1cIiArXG4gIFwiXFxcXEBcIiArXG4gIFwiW2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsNjR9XCIgK1xuICBcIihcIiArXG4gIFwiXFxcXC5cIiArXG4gIFwiW2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsMjV9XCIgK1xuICBcIikrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZXNzZW50aWFsU2V0LFxuICBub25MYXRpbkxvd2VyY2FzZSxcbiAgbm9uTGF0aW5VcHBlcmNhc2UsXG4gIG5vbkxhdGluQ2hhcnMsXG4gIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlLFxuICB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSxcbiAgYWxsQ2hhcnMsXG4gIHNpbmdsZVF1b3RlQWRlcHRzLFxuICBkb3VibGVRdW90ZUFkZXB0cyxcbiAgc3BhY2UsXG4gIG5ic3AsXG4gIGhhaXJTcGFjZSxcbiAgbmFycm93TmJzcCxcbiAgc3BhY2VzLFxuICB0ZXJtaW5hbFB1bmN0dWF0aW9uLFxuICBzZW50ZW5jZVB1bmN0dWF0aW9uLFxuICBvcGVuaW5nQnJhY2tldHMsXG4gIGNsb3NpbmdCcmFja2V0cyxcbiAgZWxsaXBzaXMsXG4gIGRlZ3JlZSxcbiAgd2ViVXJsUGF0dGVybixcbiAgZW1haWxBZGRyZXNzUGF0dGVybixcbn1cbiIsIi8qIVxuICogVHlwb3BvIDEuNC4wXG4gKlxuICogQ29weXJpZ2h0IDIwMTUtMTcgQnJhxYhvIMWgYW5kYWxhXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE3LTAxLTE1XG4gKi9cblxuaW1wb3J0IHtub3JtYWxpemVDb25maWd1cmF0aW9ufSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IGdldEV4Y2VwdGlvbkhhbmRsZXIgZnJvbSAnLi9tb2R1bGVzL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQge2dldERlZmF1bHRDb25maWd1cmF0aW9ufSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29ycmVjdG9yKGNvbmZpZ3VyYXRpb24pIHtcbiAgY29uc3QgY29uZmlnID0gbm9ybWFsaXplQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uKTtcbiAgY29uc3Qge1xuICAgIGVzc2VudGlhbFNldCxcbiAgICBub25MYXRpbkNoYXJzLFxuICAgIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlLFxuICAgIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlLFxuICAgIHNpbmdsZVF1b3RlQWRlcHRzLFxuICAgIGRvdWJsZVF1b3RlQWRlcHRzLFxuICAgIG5ic3AsXG4gICAgaGFpclNwYWNlLFxuICAgIG5hcnJvd05ic3AsXG4gICAgc3BhY2VzLFxuICAgIHRlcm1pbmFsUHVuY3R1YXRpb24sXG4gICAgc2VudGVuY2VQdW5jdHVhdGlvbixcbiAgICBvcGVuaW5nQnJhY2tldHMsXG4gICAgY2xvc2luZ0JyYWNrZXRzLFxuICAgIGVsbGlwc2lzLFxuICAgIGRlZ3JlZSxcbiAgfSA9IGNvbmZpZy5wYXR0ZXJucztcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcbiAgIEVzc2VudGlhbCByZXBsYWNlbWVudHNcbiAgIFxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIGZ1bmN0aW9uIHJlcGxhY2Vfc3ltYm9scyhzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IHJ1bGUgaW4gZXNzZW50aWFsU2V0KSB7XG4gICAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAocnVsZSwgXCJnXCIpO1xuICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGVzc2VudGlhbFNldFtydWxlXSk7XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZykge1xuICAgIC8qIFsxXSByZXBsYWNlIDMgYW5kIG1vcmUgZG90cyB3aXRoIGFuIGVsbGlwc2lzICovXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcLnszLH0vZywgXCLigKZcIik7XG5cbiAgICAvKiBbMl0gcmVwbGFjZSAyIGRvdHMgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2VudGVuY2Ugd2l0aCBhbiBhcG9zaW9wZXNpcyAqL1xuICAgIGNvbnN0IHBhdHRlcm4gPSBcIltcIiArIHNwYWNlcyArIFwiXVxcXFwuezJ9W1wiICsgc3BhY2VzICsgXCJdXCI7XG4gICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIg4oCmIFwiKTtcblxuICAgIC8qIFszXSByZXBsYWNlIDIgZG90cyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZSB3aXRoIGZ1bGwgc3RvcCAqL1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC57Mn0vZywgXCIuXCIpO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csIFwiIFwiKTtcbiAgfVxuXG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG4gICBRdW90ZXMsIHByaW1lcyAmIGFwb3N0cm9waGVzXG4gICBcXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG4gIC8qXG4gICBDb3JyZWN0cyBpbXByb3BlciB1c2Ugb2YgZG91YmxlIHF1b3RlcyBhbmQgZG91YmxlIHByaW1lc1xuXG4gICBBc3N1bXB0aW9ucyBhbmQgTGltaXRhdGlvbnNcbiAgIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGRvdWJsZSBxdW90ZXMgYXJlIGFsd2F5cyB1c2VkIGluIHBhaXIsXG4gICBpLmUuIGF1dGhvcnMgZGlkIG5vdCBmb3JnZXQgdG8gY2xvc2UgZG91YmxlIHF1b3RlcyBpbiB0aGVpciB0ZXh0LlxuXG4gICBBbGdvcml0aG1cbiAgIFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcbiAgIFsxXSBTd2FwIHJpZ2h0IGRvdWJsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHB1bmN0dWF0aW9uXG4gICAodGhpcyBjb21lcyBmaXJzdCBhcyBpdCBpcyBhIHF1aXRlIGNvbW1vbiBtaXN0YWtlIHRoYXQgbWF5IGV2ZW50dWFsbHlcbiAgIGxlYWQgdG8gaW1wcm9wZXIgaWRlbnRpZmljYXRpb24gb2YgZG91YmxlIHByaW1lcylcbiAgIFsyXSBJZGVudGlmeSBpbmNoZXMsIGFyY3NlY29uZHMsIHNlY29uZHNcbiAgIFszXSBJZGVudGlmeSBjbG9zZWQgZG91YmxlIHF1b3Rlc1xuICAgWzRdIElkZW50aWZ5IHRoZSByZXN0IGFzIHVuY2xvc2VkIGRvdWJsZSBxdW90ZXMgKGJlc3QtZWZmb3J0IHJlcGxhY2VtZW50KVxuICAgWzVdIEZpeCBzcGFjaW5nIGFyb3VuZCBxdW90ZXMgYW5kIHByaW1lc1xuICAgWzZdIFN3YXAgYmFjayBzb21lIG9mIHRoZSBkb3VibGUgcXVvdGVzIHdpdGggYSBwdW5jdHVhdGlvblxuICAgWzddIFJlbW92ZSBleHRyYSBwdW5jdHVhdGlvbiBhcm91bmQgcXVvdGVzXG4gICBbOF0gUmVwbGFjZSBhbGwgaWRlbnRpZmllZCBwdW5jdHVhdGlvbiB3aXRoIGFwcHJvcHJpYXRlIHB1bmN0dWF0aW9uIGluXG4gICBnaXZlbiBsYW5ndWFnZVxuXG4gICBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuICAgQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIOKAlCBsYW5ndWFnZSBvcHRpb25cbiAgIEByZXR1cm5zIHtzdHJpbmd9IG91dHB1dCB3aXRoIHByb3Blcmx5IHJlcGxhY2VzIGRvdWJsZSBxdW90ZXMgYW5kIGRvdWJsZSBwcmltZXNcbiAgICovXG4gIGZ1bmN0aW9uIGNvcnJlY3RfZG91YmxlX3F1b3Rlc19hbmRfcHJpbWVzKHN0cmluZywgbGFuZ3VhZ2UpIHtcblxuICAgIC8qIFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcbiAgICAgZS5nLiDigJxXZSB3aWxsIGNvbnRpbnVlIHRvbW9ycm93LuKAnS4gKi9cbiAgICBsZXQgcGF0dGVybiA9IFwiKFtcIiArIHNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl0pKFwiICsgZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSlcIjtcbiAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQyXCIpO1xuXG4gICAgLyogWzFdIFN3YXAgcmlnaHQgZG91YmxlIHF1b3RlIGFkZXB0cyB3aXRoIGEgdGVybWluYWwgcHVuY3R1YXRpb24gKi9cbiAgICBwYXR0ZXJuID0gXCIoXCIgKyBkb3VibGVRdW90ZUFkZXB0cyArIFwiKShbXCIgKyB0ZXJtaW5hbFB1bmN0dWF0aW9uICsgXCJdKVwiO1xuICAgIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsICckMiQxJyk7XG5cbiAgICAvKiBbMl0gSWRlbnRpZnkgaW5jaGVzLCBhcmNzZWNvbmRzLCBzZWNvbmRzXG4gICAgIE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIGRvdWJsZV9xdW90ZV9hZGVwdHMgdmFyaWFibGVcbiAgICAgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9taXR0ZWQqL1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFxkID8pKOKAnHzigJ18XCJ84oCzfOKAmHsyLH184oCZezIsfXwnezIsfXzigLJ7Mix9KS9nLCBcIiQxe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19XCIpO1xuXG5cbiAgICAvKiBbM10gSWRlbnRpZnkgY2xvc2VkIGRvdWJsZSBxdW90ZXMgKi9cbiAgICBwYXR0ZXJuID0gXCIoXCIgKyBkb3VibGVRdW90ZUFkZXB0cyArIFwiKSguKj8pKFwiICsgZG91YmxlUXVvdGVBZGVwdHMgKyBcIilcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19JDJ7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX1cIik7XG5cblxuICAgIC8qIFs0LjFdIElkZW50aWZ5IHVuY2xvc2VkIGxlZnQgZG91YmxlIHF1b3RlICovXG4gICAgcGF0dGVybiA9IFwiKFwiICsgZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgbG93ZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSlcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19JDJcIik7XG5cblxuICAgIC8qIFs0LjJdIElkZW50aWZ5IHVuY2xvc2VkIHJpZ2h0IGRvdWJsZSBxdW90ZSAqL1xuICAgIHBhdHRlcm4gPSBcIihbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlICsgc2VudGVuY2VQdW5jdHVhdGlvbiArIGVsbGlwc2lzICsgXCJdKShcIiArIGRvdWJsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fVwiKTtcblxuXG4gICAgLyogWzQuM10gUmVtb3ZlIHJlbWFpbmluZyB1bmlkZW50aWZpZWQgZG91YmxlIHF1b3RlICovXG4gICAgcGF0dGVybiA9IFwiKFtcIiArIHNwYWNlcyArIFwiXSkoXCIgKyBkb3VibGVRdW90ZUFkZXB0cyArIFwiKShbXCIgKyBzcGFjZXMgKyBcIl0pXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cbiAgICAvKiBbNV0gRml4IHNwYWNpbmcgYXJvdW5kIHF1b3RlcyBhbmQgcHJpbWUgKi9cbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxce1xce3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkoICkvZywgXCIkMVwiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKCApKFxce1xce3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwiJDJcIik7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyggKShcXHtcXHt0eXBvcG9fX2RvdWJsZS1wcmltZX19KS9nLCBcIiQyXCIpO1xuXG5cbiAgICAvKiBbNl0gU3dhcCBiYWNrIHNvbWUgb2YgdGhlIGRvdWJsZSBxdW90ZXMgd2l0aCBhIHB1bmN0dWF0aW9uXG5cbiAgICAgSWRlYVxuICAgICBJbiBbMV0gd2UgaGF2ZSBzd2FwcGVkIGFsbCBkb3VibGUgcmlnaHQgcXVvdGVzIGJ5IGRlZmF1bHQgd2l0aCBhIHRlcm1pbmFsXG4gICAgIHB1bmN0dWF0aW9uLiBIb3dldmVyLCBub3QgYWxsIGRvdWJsZSBxdW90ZXMgd3JhcCB0aGUgd2hvbGUgc2VudGVuY2UgYW5kXG4gICAgIHRoZXJlIGFyZSBjYXNlcyB3aGVuIGZldyB3b3JkcyBhcmUgcXVvdGVkIHdpdGhpbiBhIHNlbnRlbmNlLiBUYWtlIGEgbG9vayBhdFxuICAgICBleGFtcGxlczpcbiAgICAg4oCcU2VudGVuY2UgcXVvdGVkIGFzIGEgd2hvbGUu4oCdIChmdWxsIHN0b3AgaXMgcGxhY2VkIHdpdGhpbiBkb3VibGUgcXVvdGVzKVxuICAgICBUaGlzIGlzIOKAnHF1b3RlZCBleHByZXNzaW9uLuKAnSAoZnVsbCBzdG9wIGlzIHBsYWNlZCBvdXRzaWRlIGRvdWJsZSBxdW90ZXMpXG5cbiAgICAgQWxnb3JpdGhtXG4gICAgIE1hdGNoIGFsbCB0aGUgZG91YmxlIHF1b3RlIHBhaXJzIHRoYXQgZG8gbm90IHByZWNlZGUgc2VudGVuY2UgcHVuY3R1YXRpb25cbiAgICAgKGFuZCB0aHVzIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBzZW50ZW5jZSkgYW5kIHN3YXAgcmlnaHQgZG91YmxlIHdpdGhcbiAgICAgYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbi5cbiAgICAgKi9cbiAgICBwYXR0ZXJuID0gXCIoW15cIiArIHNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl1bXCIgKyBzcGFjZXMgKyBcIl17e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fS4rPykoW1wiICsgdGVybWluYWxQdW5jdHVhdGlvbiArIFwiXSkoe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KVwiO1xuICAgIC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuICAgIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMyQyXCIpO1xuXG5cbiAgICAvKiBbN10gUmVtb3ZlIGV4dHJhIGNvbW1hIGFmdGVyIHB1bmN0dWF0aW9uIGluIGRpcmVjdCBzcGVlY2gsXG4gICAgIGUuZy4gXCLigJxIZXkhLOKAnSBzaGUgc2FpZFwiICovXG4gICAgcGF0dGVybiA9IFwiKFtcIiArIHNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl0pKFtcXCxdKVwiO1xuICAgIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDFcIik7XG5cblxuICAgIC8qIFs4XSBQdW5jdHVhdGlvbiByZXBsYWNlbWVudCAqL1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFx7XFx7dHlwb3BvX19kb3VibGUtcHJpbWV9fSkvZywgXCLigLNcIik7XG5cbiAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XG4gICAgICBjYXNlIFwicnVlXCI6XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFx7XFx7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIsKrXCIpO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxce1xce3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwiwrtcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNrXCI6XG4gICAgICBjYXNlIFwiY3NcIjpcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhcXHtcXHt0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCeXCIpO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxce1xce3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCcXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlblwiOlxuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxce1xce3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJxcIik7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFx7XFx7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJ1cIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuXG4gIC8qXG4gICBDb3JyZWN0cyBpbXByb3BlciB1c2Ugb2Ygc2luZ2xlIHF1b3Rlcywgc2luZ2xlIHByaW1lcyBhbmQgYXBvc3Ryb3BoZXNcblxuICAgQXNzdW1wdGlvbnMgYW5kIExpbWl0YXRpb25zXG4gICBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBkb3VibGUgcXVvdGVzIGFyZSBhbHdheXMgdXNlZCBpbiBwYWlyLFxuICAgaS5lLiBhdXRob3JzIGRpZCBub3QgZm9yZ2V0IHRvIGNsb3NlIGRvdWJsZSBxdW90ZXMgaW4gdGhlaXIgdGV4dC5cbiAgIEZ1cnRoZXIsIHNpbmdsZSBxdW90ZXMgYXJlIHVzZWQgYXMgc2Vjb25kYXJ5IGFuZCB0aGV5J3JlIHByb3Blcmx5IHNwYWNlZCxcbiAgIGUuZy4g4pCjJ3dvcmQgb3Igc2VudGVuY2UgcG9ydGlvbifikKMgKGFuZCBub3QgbGlrZSDikKMn4pCjd29yZOKQoyfikKMpXG5cbiAgIEFsZ29yaXRobVxuICAgWzFdIElkZW50aWZ5IGNvbW1vbiBhcG9zdHJvaGUgY29udHJhY3Rpb25zXG4gICBbMl0gSWRlbnRpZnkgc2luZ2xlIHF1b3Rlc1xuICAgWzNdIElkZW50aWZ5IGZlZXQsIGFyY21pbnV0ZXMsIG1pbnV0ZXNcbiAgIFs0XSBJZGVudGlmeSByZXNpZHVhbCBhcG9zdHJvcGhlcyB0aGF0IGhhdmUgbGVmdFxuICAgWz9dIFN3YXAgcmlnaHQgc2luZ2xlIHF1b3RlIGFkZXB0cyB3aXRoIGEgcHVuY3R1YXRpb25cbiAgIChXZSB3ZXJlIHN3YXBwaW5nIHNpbmdsZSBxdW90ZXMgYXMgcGFydCBvZiBhbGdvcml0aG0gYSB3aGlsZSBhIGJhY2ssXG4gICBidXQgc2luY2UgaXQgaXMgbW9yZSBwcm9iYWJsZSB0aGF0IHNpbmdsZSBxdW90ZXMgYXJlIGluIHRoZSBtaWRkbGUgb2YgdGhlXG4gICBzZW50ZW5jZSwgd2UgaGF2ZSBkcm9wcGVkIHN3YXBwaW5nIGFzIGEgcGFydCBvZiB0aGUgYWxnb3JpdGhtKVxuICAgWzZdIFJlcGxhY2UgYWxsIGlkZW50aWZpZWQgcHVuY3R1YXRpb24gd2l0aCBhcHByb3ByaWF0ZSBwdW5jdHVhdGlvbiBpblxuICAgZ2l2ZW4gbGFuZ3VhZ2VcblxuICAgQHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cbiAgIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSDigJQgbGFuZ3VhZ2Ugb3B0aW9uc1xuICAgQHJldHVybnMge3N0cmluZ30g4oCUIGNvcnJlY3RlZCBvdXRwdXRcbiAgICovXG4gIGZ1bmN0aW9uIGNvcnJlY3Rfc2luZ2xlX3F1b3Rlc19wcmltZXNfYW5kX2Fwb3N0cm9waGVzKHN0cmluZywgbGFuZ3VhZ2UpIHtcblxuICAgIC8qIFsxLjFdIElkZW50aWZ5IOKAmW7igJkgY29udHJhY3Rpb25zICovXG4gICAgbGV0IHBhdHRlcm4gPSBcIihcIiArIHNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKG4pKFwiICsgc2luZ2xlUXVvdGVBZGVwdHMgKyBcIilcIjtcbiAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQye3t0eXBvcG9fX2Fwb3N0cm9waGV9fVwiKTtcblxuXG4gICAgLyogWzEuMl0gSWRlbnRpZnkgY29tbW9uIGNvbnRyYWN0aW9ucyBhdCB0aGUgYmVnaW5uaW5nIG9yIGF0IHRoZSBlbmRcbiAgICAgb2YgdGhlIHdvcmQsIGUuZy4gRmlzaCDigJlu4oCZIENoaXBzLCDigJllbSwg4oCZY2F1c2Us4oCmICovXG4gICAgY29uc3QgY29udHJhY3Rpb25fZXhhbXBsZXMgPSBcImVtfGNhdXNlfHR3YXN8dGlzfHRpbHxyb3VuZFwiO1xuICAgIHBhdHRlcm4gPSBcIihcIiArIHNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFwiICsgY29udHJhY3Rpb25fZXhhbXBsZXMgKyBcIilcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJcIik7XG5cblxuICAgIC8qIFsxLjNdIElkZW50aWZ5IGluLXdvcmQgY29udHJhY3Rpb25zLFxuICAgICBlLmcuIERvbuKAmXQsIEnigJltLCBP4oCZRG9vbGUsIDY54oCZZXJzICovXG4gICAgY29uc3QgY2hhcmFjdGVyX2FkZXB0cyA9IFwiMC05XCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlO1xuICAgIHBhdHRlcm4gPSBcIihbXCIgKyBjaGFyYWN0ZXJfYWRlcHRzICsgXCJdKShcIiArIHNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFtcIiArIGNoYXJhY3Rlcl9hZGVwdHMgKyBcIl0pXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19hcG9zdHJvcGhlfX0kM1wiKTtcblxuXG4gICAgLyogWzEuNF0gSWRlbnRpZnkgeWVhciBjb250cmFjdGlvbnNcbiAgICAgZS5nLiDigJk3MHMsIElOQ0hFQkEg4oCZODks4oCmICovXG4gICAgcGF0dGVybiA9IFwiKFwiICsgc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoWzAtOV17Mn0pXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJcIik7XG5cblxuICAgIC8qIFsyXSBJZGVudGlmeSBzaW5nbGUgcXVvdGVzIHdpdGhpbiBkb3VibGUgcXVvdGVzICovXG4gICAgcGF0dGVybiA9IFwiKFwiICsgZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoLio/KShcIiArIGRvdWJsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24gKCQwLCAkMSwgJDIsICQzKSB7XG5cbiAgICAgIC8vaWRlbnRpZnkge3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19XG4gICAgICBsZXQgcGF0dGVybiA9IFwiKCApKFwiICsgc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgbG93ZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSlcIjtcbiAgICAgIGxldCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgICAgJDIgPSAkMi5yZXBsYWNlKHJlLCBcIiQxe3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19JDNcIik7XG5cbiAgICAgIC8vaWRlbnRpZnkge3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fVxuICAgICAgcGF0dGVybiA9IFwiKFtcIiArIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlICsgdXBwZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyBcIl0pKFtcXC4sIT9dKT8oXCIgKyBzaW5nbGVRdW90ZUFkZXB0cyArIFwiKShbIF18W1xcLiwhP10pXCI7XG4gICAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgICAgJDIgPSAkMi5yZXBsYWNlKHJlLCBcIiQxJDJ7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19JDRcIik7XG5cbiAgICAgIC8vaWRlbnRpZnkgc2luZ2xlIHF1b3RlIHBhaXJzXG4gICAgICBwYXR0ZXJuID0gXCIoe3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19KSguKj8pKHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0pXCI7XG4gICAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgICAgJDIgPSAkMi5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19JDJ7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX1cIik7XG5cbiAgICAgIHJldHVybiAkMSArICQyICsgJDM7XG4gICAgfSk7XG5cblxuICAgIC8qIFszXSBJZGVudGlmeSBmZWV0LCBhcmNtaW51dGVzLCBtaW51dGVzXG4gICAgIE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIHNpbmdsZV9xdW90ZV9hZGVwdHMgdmFyaWFibGVcbiAgICAgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9taXR0ZWQqL1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFxkKSggPykoJ3zigJh84oCZfOKAm3zigLIpL2csIFwiJDF7e3R5cG9wb19fc2luZ2xlLXByaW1lfX1cIik7XG5cblxuICAgIC8qIFs0XSBJZGVudGlmeSByZXNpZHVhbCBhcG9zdHJvcGhlcyB0aGF0IGhhdmUgbGVmdCAqL1xuICAgIHBhdHRlcm4gPSBcIihcIiArIHNpbmdsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19XCIpO1xuXG5cbiAgICAvKiBbNV0gUHVuY3R1YXRpb24gcmVwbGFjZW1lbnQgKi9cbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxce1xce3R5cG9wb19fc2luZ2xlLXByaW1lfX0pL2csIFwi4oCyXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHtcXHt0eXBvcG9fX2Fwb3N0cm9waGV9fXxcXHtcXHt0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19fFxce1xce3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19L2csIFwi4oCZXCIpO1xuXG5cbiAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XG4gICAgICBjYXNlIFwicnVlXCI6XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHtcXHt0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigLlcIik7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHtcXHt0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oC6XCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJza1wiOlxuICAgICAgY2FzZSBcImNzXCI6XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHtcXHt0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJpcIik7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHtcXHt0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCYXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJlblwiOlxuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFx7XFx7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCYXCIpO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFx7XFx7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cblxuICBmdW5jdGlvbiBjb3JyZWN0X211bHRpcGxlX3NpZ24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nLnJlcGxhY2UoLyhbMS05XStbIF0/W2Etd3pdKikoWyBdezAsMX1beHzDl11bIF17MCwxfSkoWzEtOV0rWyBdezAsMX1bYS13el0qKS9nLCBcIiQxIMOXICQzXCIpKTtcbiAgfVxuXG5cbiAgLypcbiAgIFJlcGxhY2VzIGh5cGhlbiB3aXRoIGVtIG9yIGVuIGRhc2hcblxuICAgQWxnb3JpdGhtXG4gICBbMV0gUmVwbGFjZSAzIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tLSkgd2l0aCBhbiBlbSBkYXNoICjigJQpXG4gICBbMl0gUmVwbGFjZSAyIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tKSB3aXRoIGFuIGVuIGRhc2ggKOKAlClcbiAgIFszXSBSZXBsYWNlIGFueSBoeXBoZW4gb3IgZGFzaCBzdXJyb3VuZGVkIHdpdGggc3BhY2VzIHdpdGggYW4gZW0gZGFzaFxuICAgWzRdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2ggdXNlZCBpbiBudW1iZXIgcmFuZ2Ugd2l0aCBhbiBlbiBkYXNoXG4gICBhbmQgc2V0IHByb3BlciBzcGFjaW5nXG5cbiAgIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG4gICBAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggZGFzaGVzIGluc3RlYWQgb2YgaHlwaGVuc1xuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZV9oeXBoZW5fd2l0aF9kYXNoKHN0cmluZywgbGFuZ3VhZ2UpIHtcbiAgICBjb25zdCBkYXNoZXMgPSBcIi3igJPigJRcIjsgLy8gaW5jbHVkaW5nIGEgaHlwaGVuXG5cbiAgICAvKiBbMV0gUmVwbGFjZSAzIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tLSkgd2l0aCBhbiBlbSBkYXNoICjigJQpICovXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygtLS0pL2csIFwi4oCUXCIpO1xuXG5cbiAgICAvKiBbMl0gUmVwbGFjZSAyIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tKSB3aXRoIGFuIGVuIGRhc2ggKOKAlCkgKi9cbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKC0tKS9nLCBcIuKAk1wiKTtcblxuXG4gICAgLyogWzNdIFJlcGxhY2UgYW55IGh5cGhlbiBvciBkYXNoIHN1cnJvdW5kZWQgd2l0aCBzcGFjZXMgd2l0aCBhbiBlbSBkYXNoICovXG4gICAgbGV0IHBhdHRlcm4gPSBcIltcIiArIHNwYWNlcyArIFwiXVtcIiArIGRhc2hlcyArIFwiXVtcIiArIHNwYWNlcyArIFwiXVwiO1xuICAgIGxldCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gbmFycm93TmJzcCArIFwi4oCUXCIgKyBoYWlyU3BhY2U7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuICAgIC8qIFs0LjFdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2gsIHBsYWNlZCBiZXR3ZWVuIDIgY2FyZGluYWwgbnVtYmVycyxcbiAgICAgd2l0aCBhbiBlbiBkYXNoOyBpbmNsdWRpbmcgY2FzZXMgd2hlbiB0aGVyZSBpcyBhbiBleHRyYSBzcGFjZVxuICAgICBmcm9tIGVpdGhlciBvbmUgc2lkZSBvciBib3RoIHNpZGVzIG9mIHRoZSBkYXNoICovXG4gICAgY29uc3QgY2FyZGluYWxfbnVtYmVyID0gXCJcXFxcZCtcIjtcbiAgICBwYXR0ZXJuID0gXCIoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoW1wiICsgc3BhY2VzICsgXCJdP1tcIiArIGRhc2hlcyArIFwiXVtcIiArIHNwYWNlcyArIFwiXT8pKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMeKAkyQzXCIpO1xuXG5cbiAgICAvKiBbNC4yXSBSZXBsYWNlIGh5cGhlbiBvciBkYXNoLCBwbGFjZWQgYmV0d2VlbiAyIG9yZGluYWwgbnVtYmVycyxcbiAgICAgd2l0aCBhbiBlbiBkYXNoOyBpbmNsdWRpbmcgY2FzZXMgd2hlbiB0aGVyZSBpcyBhbiBleHRyYSBzcGFjZVxuICAgICBmcm9tIGVpdGhlciBvbmUgc2lkZSBvciBib3RoIHNpZGVzIG9mIHRoZSBkYXNoICovXG4gICAgbGV0IG9yZGluYWxfaW5kaWNhdG9yID0gXCJcIjtcbiAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XG4gICAgICBjYXNlIFwicnVlXCI6XG4gICAgICBjYXNlIFwic2tcIjpcbiAgICAgIGNhc2UgXCJjc1wiOlxuICAgICAgICBvcmRpbmFsX2luZGljYXRvciA9IFwiXFxcXC5cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZW5cIjpcbiAgICAgICAgb3JkaW5hbF9pbmRpY2F0b3IgPSBcInN0fG5kfHJkfHRoXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwYXR0ZXJuID0gXCIoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoXCIgKyBvcmRpbmFsX2luZGljYXRvciArIFwiKShbXCIgKyBzcGFjZXMgKyBcIl0/W1wiICsgZGFzaGVzICsgXCJdW1wiICsgc3BhY2VzICsgXCJdPykoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoXCIgKyBvcmRpbmFsX2luZGljYXRvciArIFwiKVwiO1xuICAgIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDLigJMkNCQ1XCIpO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVwbGFjZV9kYXNoX3dpdGhfaHlwaGVuKHN0cmluZykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSBcIihbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSkoW+KAk+KAlF0pKFtcIiArIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdKVwiO1xuICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxLSQzXCIpO1xuICB9XG5cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcbiAgIENvbnNvbGlkYXRpb24gb2Ygc3BhY2VzXG4gICBcXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZV9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IFwiKFtcIiArIHNwYWNlcyArIFwiXSkoW1wiICsgc2VudGVuY2VQdW5jdHVhdGlvbiArIGNsb3NpbmdCcmFja2V0cyArIGRlZ3JlZSArIFwiXSlcIjtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMlwiKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSBcIihbXCIgKyBvcGVuaW5nQnJhY2tldHMgKyBcIl0pKFtcIiArIHNwYWNlcyArIFwiXSlcIjtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMVwiKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlX3RyYWlsaW5nX3NwYWNlcyhzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRyaW0oKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gYWRkX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gXCIoW1wiICsgbG93ZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSkoW1wiICsgb3BlbmluZ0JyYWNrZXRzICsgXCJdKShbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdKVwiO1xuICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQyJDNcIik7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGFkZF9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpIHtcbiAgICBjb25zdCBwYXR0ZXJuID0gXCIoW1wiICsgbG93ZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSkoW1wiICsgc2VudGVuY2VQdW5jdHVhdGlvbiArIGNsb3NpbmdCcmFja2V0cyArIFwiXSkoW1wiICsgbG93ZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSlcIjtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQyICQzXCIpO1xuICB9XG5cblxuICAvKlxuICAgUmVtb3ZlcyBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIHBhcmFncmFwaFxuXG4gICBUaGlzIGNvdWxkIGJlIGRvbmUgd2l0aCBhIG9uZS1saW5lcjpcbiAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccysvZ20sIFwiXCIpO1xuXG4gICBIb3dldmVyLCBpdCBhbHNvIHJlbW92ZXMgZW1wdHkgbGluZXMuIFNpbmNlLCB3ZSB3YW50IHRvIGhhbmRsZSB0aGlzIGNoYW5nZVxuICAgc2VwYXJhdGVseSwgd2UgbmVlZCB0b1xuICAgWzFdIHNwbGl0IHRoZSBsaW5lcyBtYW51YWxseVxuICAgWzJdIGFuZCByZW1vdmUgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbmluZyBvZiBlYWNoIGxpbmVcbiAgIFszXSBqb2luIGxpbmVzIHRvZ2V0aGVyIHRvIGEgc2luZ2xlIHN0cmluZ1xuXG4gICBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuICAgQHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgcGFyYWdyYXBoc1xuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlX3NwYWNlc19hdF9wYXJhZ3JhcGhfYmVnaW5uaW5nKHN0cmluZykge1xuICAgIC8qIFsxXSBzcGxpdCB0aGUgbGluZXMgbWFudWFsbHkgKi9cbiAgICBsZXQgbGluZXMgPSBzdHJpbmcuc3BsaXQoL1xccj9cXG4vKTtcblxuICAgIC8qIFsyXSBhbmQgcmVtb3ZlIGV4dHJhIHNwYWNlcyBhdCB0aGUgYmVnaW5pbmcgb2YgZWFjaCBsaW5lICovXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGluZXNbaV0gPSBsaW5lc1tpXS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuICAgIH1cblxuICAgIC8qIFszXSBqb2luIGxpbmVzIHRvZ2V0aGVyIHRvIGEgc2luZ2xlIHN0cmluZyAqL1xuICAgIHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xuICB9XG5cblxuICAvKlxuICAgUmVtb3ZlcyBlbXB0eSBsaW5lc1xuXG4gICBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuICAgQHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgZW1wdHkgbGluZXNcbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZV9lbXB0eV9saW5lcyhzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrL2dtLCBcIlwiKTtcbiAgfVxuXG5cbiAgLypcbiAgIENvbnNvbGlkYXRlcyB0aGUgdXNlIG9mIG5vbi1icmVha2luZyBzcGFjZXNcblxuICAgKiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgc2luZ2xlLWNoYXJhY3RlciBwcmVwb3NpdGlvbnNcbiAgICogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIG51bWVyYWxzXG4gICAqIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhcm91bmQgw5dcbiAgICogcmVtb3ZlcyBjaGFyYWN0ZXJzIGJldHdlZW4gbXVsdGktY2hhcmFjdGVyIHdvcmRzXG5cbiAgIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG4gICBAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGx5IHBsYWNlZCBub24tYnJlYWtpbmcgc3BhY2VcbiAgICovXG4gIGZ1bmN0aW9uIGNvbnNvbGlkYXRlX25ic3Aoc3RyaW5nKSB7XG4gICAgLy8gcmVtb3ZlcyBub24tYnJlYWtpbmcgc3BhY2VzIGJldHdlZW4gbXVsdGktY2hhcmFjdGVyIHdvcmRzXG4gICAgbGV0IHBhdHRlcm4gPSBcIihbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdezIsfSkoW1wiICsgbmJzcCArIG5hcnJvd05ic3AgKyBcIl0pKFtcIiArIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlICsgdXBwZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyBcIl17Mix9KVwiO1xuICAgIGxldCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQzXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQzXCIpOyAvL2NhbGxpbmcgaXQgdHdpY2UgdG8gY2F0Y2ggb2RkL2V2ZW4gb2NjdXJlbmNlc1xuXG5cbiAgICAvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgbnVtZXJhbHNcbiAgICBwYXR0ZXJuID0gXCIoWzAtOV0rKSggKShbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdKylcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIGxldCByZXBsYWNlbWVudCA9IFwiJDFcIiArIG5ic3AgKyBcIiQzXCI7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXG4gICAgLy8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFyb3VuZCDDl1xuICAgIHBhdHRlcm4gPSBcIihbXCIgKyBzcGFjZXMgKyBcIl0pKFvDl10pKFtcIiArIHNwYWNlcyArIFwiXSlcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHJlcGxhY2VtZW50ID0gbmJzcCArIFwiJDJcIiArIG5ic3A7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXG4gICAgLy8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIHNpbmdsZS1jaGFyYWN0ZXIgcHJlcG9zaXRpb25zXG4gICAgcGF0dGVybiA9IFwiKFvCoCBdKShbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdfCYpKCApXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICByZXBsYWNlbWVudCA9IFwiJDEkMlwiICsgbmJzcDtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7IC8vY2FsbGluZyBpdCB0d2ljZSB0byBjYXRjaCBvZGQvZXZlbiBvY2N1cmVuY2VzXG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cblxuICAvKlxuICAgQ29ycmVjdHMgaW1wcm9wZXIgc3BhY2luZyBhcm91bmQgZWxsaXBzaXMgYW5kIGFwb3Npb3Blc2lzXG5cbiAgIEVsbGlwc2lzIChhcyBhIGNoYXJhY3RlcikgaXMgdXNlZCBmb3IgMiBkaWZmZXJlbnQgcHVycG9zZXM6XG4gICAxLiBhcyBhbiBlbGxpcHNpcyB0byBvbWl0IGEgcGllY2Ugb2YgaW5mb3JtYXRpb24gZGVsaWJlcmF0ZWx5XG4gICAyLiBhcyBhbiBhcG9zaW9wZXNpczsgYSBmaWd1cmUgb2Ygc3BlZWNoIHdoZXJlaW4gYSBzZW50ZW5jZSBpc1xuICAgZGVsaWJlcmF0ZWx5IGJyb2tlbiBvZmYgYW5kIGxlZnQgdW5maW5pc2hlZFxuXG4gICBzb3VyY2VzXG4gICBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FbGxpcHNpc1xuICAgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQXBvc2lvcGVzaXNcbiAgIGh0dHA6Ly93d3cubGl0ZWVyYS5jei9zbG92bmlrL3Z5cHVzdGthXG5cbiAgIEFsZ29yaXRobVxuICAgRWxsaXBzaXMgJiBBcG9zaW9wZXNpcyByZXF1aXJlIGRpZmZlcmVudCB1c2Ugb2Ygc3BhY2luZyBhcm91bmQgdGhlbSxcbiAgIHRoYXQgaXMgd2h5IHdlIGFyZSBjb3JyZWN0aW5nIG9ubHkgZm9sbG93aW5nIGNhc2VzOlxuICAgZXJyb3JzOlxuICAgWzFdIGNvcnJlY3Qgc3BhY2luZywgd2hlbiBlbGxpcHNpcyB1c2VkIHVzZWQgYXJvdW5kIGNvbW1hc1xuICAgWzJdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2UgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoXG4gICBbM10gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGhcbiAgIFs0XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhcmFncmFwaFxuICAgWzVdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2UgYXQgdGhlIGVuZCBvZiB0aGUgcGFyYWdyYXBoXG5cbiAgIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG4gICBAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGVkIHNwYWNpbmcgYXJvdW5kIGFwb3Npb3Blc2lzXG4gICAqL1xuICBmdW5jdGlvbiBjb3JyZWN0X3NwYWNlc19hcm91bmRfZWxsaXBzaXMoc3RyaW5nKSB7XG5cbiAgICAvKiBbMV0gY29ycmVjdCBzcGFjaW5nLCB3aGVuIGVsbGlwc2lzIHVzZWQgdXNlZCBhcm91bmQgY29tbWFzICovXG4gICAgbGV0IHBhdHRlcm4gPSBcIixbXCIgKyBzcGFjZXMgKyBcIl0/XCIgKyBlbGxpcHNpcyArIFwiW1wiICsgc3BhY2VzICsgXCJdPyxcIjtcbiAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIsIOKApixcIik7XG5cblxuICAgIC8qIFsyXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXG4gICAgIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaCAqL1xuICAgIHBhdHRlcm4gPSBcIihbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSkoW1wiICsgc3BhY2VzICsgXCJdKShcIiArIGVsbGlwc2lzICsgXCJbXCIgKyBzcGFjZXMgKyBcIl1bXCIgKyB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSlcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuICAgIC8qIFszXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlXG4gICAgIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaCAqL1xuICAgIHBhdHRlcm4gPSBcIihbXCIgKyBzZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdW1wiICsgc3BhY2VzICsgXCJdXCIgKyBlbGxpcHNpcyArIFwiKShbXCIgKyBzcGFjZXMgKyBcIl0pKFtcIiArIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdKVwiO1xuICAgIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG4gICAgLyogWzRdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2VcbiAgICAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGFyYWdyYXBoICovXG4gICAgcGF0dGVybiA9IFwiKF7igKYpKFtcIiArIHNwYWNlcyArIFwiXSkoW1wiICsgbG93ZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyB1cHBlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXSlcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnbVwiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cbiAgICAvKiBbNV0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZVxuICAgICBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGggKi9cbiAgICBwYXR0ZXJuID0gXCIoW1wiICsgbG93ZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyBzZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdKShbXCIgKyBzcGFjZXMgKyBcIl0pKFwiICsgZWxsaXBzaXMgKyBcIikoPyFbIFwiICsgc2VudGVuY2VQdW5jdHVhdGlvbiArIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlICsgdXBwZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyBcIl0pXCI7XG4gICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG5cbiAgLypcbiAgIENvcnJlY3RzIGFjY2lkZW50YWwgdXBwZXJjYXNlXG5cbiAgIEJlc3QtZWZmb3J0IGZ1bmN0aW9uIHRvIGZpeCBtb3N0IGNvbW1vbiBhY2NpZGVudGFsIHVwcGVyY2FzZSBlcnJvcnMsIG5hbWVseTpcbiAgIFsxXSAyIGZpcnN0IHVwcGVyY2FzZSBsZXR0ZXJzIChpZS4gVVBwZXJjYXNlKVxuICAgWzJdIFN3YXBwZWQgY2FzZXMgKGllLiB1UFBFUkNBU0UpXG5cbiAgIEFsZ29yaXRobSBkb2VzIG5vdCBmaXggb3RoZXIgdXBwZXJjYXNlIGV2ZW50dWFsaXRpZXMsXG4gICBlLmcuIG1peGVkIGNhc2UgKFVwcEVSY2FTZSkgYXMgdGhlcmUgYXJlIG1hbnkgY2FzZXMgZm9yIGNvcnBvcmF0ZSBicmFuZHNcbiAgIHRoYXQgY291bGQgcG90ZW50aWFsbHkgbWF0Y2ggdGhlIGFsZ29yaXRobSBhcyBmYWxzZSBwb3NpdGl2ZS5cblxuICAgQHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cbiAgIEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0ZWQgYWNjaWRlbnRhbCB1cHBlcmNhc2VcbiAgICovXG4gIGZ1bmN0aW9uIGNvcnJlY3RfYWNjaWRlbnRhbF91cHBlcmNhc2Uoc3RyaW5nKSB7XG5cbiAgICAvKiBbMV0gdHdvIGZpcnN0IHVwcGVyY2FzZSBsZXR0ZXJzIChpLmUuIFVQcGVyY2FzZSkgKi9cbiAgICBsZXQgcGF0dGVybiA9IFwiW1wiICsgdXBwZXJjYXNlQ2hhcnNFblNrQ3pSdWUgKyBcIl17MiwyfVtcIiArIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdK1wiO1xuICAgIGxldCByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICByZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwgMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH0pO1xuXG4gICAgLyogWzIuMV0gU3dhcHBlZCBjYXNlcyAoMi1sZXR0ZXIgY2FzZXMsIGkuZS4gaVQpXG4gICAgIE5vdGUgdGhhdCB0aGlzIGlzIGRpdmlkZWQgaW50byAyIHNlcGFyYXRlIGNhc2VzIGFzIFxcYiBpbiBKYXZhU2NyaXB0IHJlZ2V4XG4gICAgIGRvZXMgbm90IHRha2Ugbm9uLWxhdGluIGNoYXJhY3RlcnMgaW50byBhIGNvc25pZGVyYXRpb25cbiAgICAgKi9cbiAgICBwYXR0ZXJuID0gXCJbXCIgKyBsb3dlcmNhc2VDaGFyc0VuU2tDelJ1ZSArIFwiXVtcIiArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdXFxcXGJcIjtcbiAgICByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICByZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwgMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH0pO1xuXG4gICAgLyogWzIuMl0gU3dhcHBlZCBjYXNlcyAobi1sZXR0ZXIgY2FzZXMsIGkuZS4gdVBQRVJDQVNFKSAqL1xuICAgIHBhdHRlcm4gPSBcIltcIiArIGxvd2VyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdK1tcIiArIHVwcGVyY2FzZUNoYXJzRW5Ta0N6UnVlICsgXCJdezIsfVwiO1xuICAgIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgIHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLCAxKSArIHN0cmluZy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcbiAgIEFiYnJldmlhdGlvbnNcbiAgIFxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAvKlxuICAgSWRlbnRpZmllcyBkaWZmZXJlbnRseS1zcGVsbGVkIGFiYnJldmlhdGlvbnMgYW5kIHJlcGxhY2VzIGl0IHdpdGhcbiAgIGEgdGVtcCB2YXJpYWJsZSwge3t0eXBvcG9fX1thYmJyXX19XG5cbiAgIElkZW50aWZpZXMgZ2l2ZW4gYWJicmV2aWF0aW9uczpcbiAgIGEubS4sIHAubS4sIGUuZy4sIGkuZS5cblxuICAgQWxnb3JpdGhtXG4gICBbMV0gSWRlbnRpZnkgZS5nLiwgaS5lLlxuICAgWzJdIElkZW50aWZ5IGEubS4sIHAubS4gKGRpZmZlcmVudCBtYXRjaCB0byBhdm9pZCBmYWxzZSBwb3NpdGl2ZXMgc3VjaCBhczpcbiAgIEkgYW0sIEhlIGlzIHRoZSBQTS4pXG4gICBbM10gRXhjbHVkZSBmYWxzZSBpZGVudGlmaWNhdGlvbnNcblxuICAgQHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG4gICBAcmV0dXJucyB7c3RyaW5nfSBjb3JyZWN0ZWQgb3V0cHV0XG4gICAqL1xuICBmdW5jdGlvbiBpZGVudGlmeV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpIHtcblxuICAgIC8qIFsxXSBJZGVudGlmeSBlLmcuLCBpLmUuICovXG4gICAgbGV0IGFiYnJldmlhdGlvbnMgPSBbXCJlZ1wiLCBcImllXCJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcGF0dGVybiA9IFwiKFxcXFxiW1wiICsgYWJicmV2aWF0aW9uc1tpXVswXSArIFwiXVxcXFwuP1tcIiArIHNwYWNlcyArIFwiXT9bXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCJdXFxcXC4/KShbXCIgKyBzcGFjZXMgKyBcIl0/KShcXFxcYilcIjtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuICAgICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG4gICAgICBjb25zdCByZXBsYWNlbWVudCA9IFwie3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gXCI7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuICAgIH1cblxuXG4gICAgLyogWzJdIElkZW50aWZ5IGEubS4sIHAubS4gKi9cbiAgICBhYmJyZXZpYXRpb25zID0gW1wiYW1cIiwgXCJwbVwiXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSBcIihcXFxcZCkoW1wiICsgc3BhY2VzICsgXCJdPykoXFxcXGJbXCIgKyBhYmJyZXZpYXRpb25zW2ldWzBdICsgXCJdXFxcXC4/W1wiICsgc3BhY2VzICsgXCJdP1tcIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIl1cXFxcLj8pKFtcIiArIHNwYWNlcyArIFwiXT8pKFxcXFxifFxcXFxCKVwiO1xuICAgICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG4gICAgICBjb25zdCByZXBsYWNlbWVudCA9IFwiJDEge3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gXCI7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuICAgIH1cblxuXG4gICAgLyogWzNdIEV4Y2x1ZGUgZmFsc2UgaWRlbnRpZmljYXRpb25zXG4gICAgIFJlZ2V4IFxcYiBkb2VzIG5vdCBjYXRjaCBub24tbGF0aW4gY2hhcmFjdGVycyBzbyB3ZSBuZWVkIHRvIGV4Y2x1ZGUgZmFsc2VcbiAgICAgaWRlbnRpZmljYXRpb25zXG4gICAgICovXG4gICAgYWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIiwgXCJhbVwiLCBcInBtXCJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gbm9uLWxhdGluIGNoYXJhY3RlciBhdCB0aGUgYmVnaW5uaW5nXG4gICAgICBsZXQgcGF0dGVybiA9IFwiKFtcIiArIG5vbkxhdGluQ2hhcnMgKyBcIl0pKHt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19KVwiO1xuICAgICAgbGV0IHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgICBsZXQgcmVwbGFjZW1lbnQgPSBcIiQxXCIgKyBhYmJyZXZpYXRpb25zW2ldO1xuICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuICAgICAgLy8gbm9uLWxhdGluIGNoYXJhY3RlciBhdCB0aGUgZW5kXG4gICAgICBwYXR0ZXJuID0gXCIoe3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gKShbXCIgKyBub25MYXRpbkNoYXJzICsgXCJdKVwiO1xuICAgICAgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcbiAgICAgIHJlcGxhY2VtZW50ID0gYWJicmV2aWF0aW9uc1tpXSArIFwiJDJcIjtcbiAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG5cbiAgLypcbiAgIFJlcGxhY2VzIGlkZW50aWZpZWQgdGVtcCBhYmJyZXZpYXRpb24gdmFyaWFibGUgbGlrZSB7e3R5cG9wb19fZWd9fSxcbiAgIHdpdGggdGhlaXIgYWN0dWFsIHJlcHJlc2VudGF0aW9uXG5cbiAgIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuICAgQHJldHVybnMge3N0cmluZ30gY29ycmVjdGVkIG91dHB1dFxuICAgKi9cbiAgZnVuY3Rpb24gcGxhY2VfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKSB7XG4gICAgY29uc3QgYWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIiwgXCJhbVwiLCBcInBtXCJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcGF0dGVybiA9IFwie3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX1cIjtcbiAgICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG4gICAgICBjb25zdCByZXBsYWNlbWVudCA9IGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIi5cIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIi5cIjtcbiAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG4gICBNYWluIHNjcmlwdFxuICAgXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuICAvKlxuICAgQ29ycmVjdCB0eXBvcyBpbiB0aGUgcHJlZGVmaW5lZCBvcmRlclxuXG5cbiAgIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGNvcnJlY3Rpb25cbiAgIEByZXR1cm5zIHtzdHJpbmd9IOKAlCBjb3JyZWN0ZWQgb3V0cHV0XG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24gY29ycmVjdF90eXBvcyhzdHJpbmcpIHtcbiAgICBjb25zdCBsYW5ndWFnZSA9IGNvbmZpZy5sYW5ndWFnZTtcbiAgICBjb25zdCByZW1vdmVfbGluZXMgPSBjb25maWdbJ3JlbW92ZS1lbXB0eS1saW5lcyddO1xuXG4gICAgY29uc3QgZXhjZXB0aW9uSGFuZGxlciA9IGdldEV4Y2VwdGlvbkhhbmRsZXIoY29uZmlnWydleGNlcHRpb25zJ10pO1xuXG4gICAgc3RyaW5nID0gZXhjZXB0aW9uSGFuZGxlci5pZGVudGlmeV9leGNlcHRpb25zKHN0cmluZyk7XG4gICAgc3RyaW5nID0gaWRlbnRpZnlfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKTsgLy8gbmVlZHMgdG8gZ28gYmVmb3JlIHB1bmN0dWF0aW9uIGZpeGVzXG5cbiAgICBzdHJpbmcgPSByZXBsYWNlX3N5bWJvbHMoc3RyaW5nLCBlc3NlbnRpYWxTZXQpO1xuICAgIHN0cmluZyA9IHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZyk7XG4gICAgc3RyaW5nID0gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcpO1xuXG5cbiAgICBzdHJpbmcgPSBjb3JyZWN0X2RvdWJsZV9xdW90ZXNfYW5kX3ByaW1lcyhzdHJpbmcsIGxhbmd1YWdlKTtcbiAgICBzdHJpbmcgPSBjb3JyZWN0X3NpbmdsZV9xdW90ZXNfcHJpbWVzX2FuZF9hcG9zdHJvcGhlcyhzdHJpbmcsIGxhbmd1YWdlKTtcblxuICAgIHN0cmluZyA9IGNvcnJlY3RfbXVsdGlwbGVfc2lnbihzdHJpbmcpO1xuXG4gICAgc3RyaW5nID0gcmVtb3ZlX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpO1xuICAgIHN0cmluZyA9IHJlbW92ZV9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpO1xuICAgIHN0cmluZyA9IHJlbW92ZV90cmFpbGluZ19zcGFjZXMoc3RyaW5nKTtcbiAgICBzdHJpbmcgPSBhZGRfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZyk7XG4gICAgc3RyaW5nID0gYWRkX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZyk7XG4gICAgc3RyaW5nID0gcmVtb3ZlX3NwYWNlc19hdF9wYXJhZ3JhcGhfYmVnaW5uaW5nKHN0cmluZyk7XG5cbiAgICBpZiAocmVtb3ZlX2xpbmVzKSB7XG4gICAgICBzdHJpbmcgPSByZW1vdmVfZW1wdHlfbGluZXMoc3RyaW5nKTtcbiAgICB9XG5cbiAgICBzdHJpbmcgPSBjb25zb2xpZGF0ZV9uYnNwKHN0cmluZyk7XG4gICAgc3RyaW5nID0gY29ycmVjdF9zcGFjZXNfYXJvdW5kX2VsbGlwc2lzKHN0cmluZyk7XG5cbiAgICBzdHJpbmcgPSByZXBsYWNlX2h5cGhlbl93aXRoX2Rhc2goc3RyaW5nLCBsYW5ndWFnZSk7XG4gICAgc3RyaW5nID0gcmVwbGFjZV9kYXNoX3dpdGhfaHlwaGVuKHN0cmluZyk7XG5cbiAgICBzdHJpbmcgPSBjb3JyZWN0X2FjY2lkZW50YWxfdXBwZXJjYXNlKHN0cmluZyk7XG5cbiAgICBzdHJpbmcgPSBwbGFjZV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpOyAvLyBuZWVkcyB0byBnbyBhZnRlciBwdW5jdHVhdGlvbiBmaXhlc1xuICAgIHN0cmluZyA9IGV4Y2VwdGlvbkhhbmRsZXIucGxhY2VfZXhjZXB0aW9ucyhzdHJpbmcpO1xuXG4gICAgc3RyaW5nID0gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKTtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbn1cbiJdfQ==

//# sourceMappingURL=maps/typopo.built.js.map
