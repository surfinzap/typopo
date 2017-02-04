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
  this.config.exceptionPatterns.forEach(pattern => {
    identify_exception_set.call(this, string, pattern);
  });

  /* [3] Mark them as temporary exceptions in format {{typopo__exception-[i]}} */
  for (let i = 0; i < this.exceptions.length; i++) {
    const replacement = "{{typopo__exception-" + i + "}}";
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
  const re = new RegExp(pattern, "g");
  const matched_exceptions = string.match(re);
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
  for (let i = 0; i < this.exceptions.length; i++) {
    const pattern = "{{typopo__exception-" + i + "}}";
    const re = new RegExp(pattern, "g");
    const replacement = this.exceptions[i];
    string = string.replace(re, replacement);
  }

  return string;
}


export default function getExceptionHandler(config) {
  return {
    exceptions: [],
    identify_exceptions,
    place_exceptions,
    config,
  };
}
