/*----------------------------------------------------------------------------*\
 Variables & Character replacement sets
 \*----------------------------------------------------------------------------*/

const essentialSet = {
  "\\(C\\)": "©",
  "\\(c\\)": "©",
  "\\(R\\)": "®",
  "\\(r\\)": "®",
  "\\(TM\\)": "™",
  "\\(tm\\)": "™",
  "\\+\\-": "±",
  "\\-\\+": "±",
};
const nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
const nonLatinUppercase = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
const nonLatinChars = nonLatinLowercase + nonLatinUppercase;
const lowercaseCharsEnSkCzRue = "a-z" + nonLatinLowercase;
const uppercaseCharsEnSkCzRue = "A-Z" + nonLatinUppercase;
const allChars = lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue;
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
const singleQuoteAdepts = "‚|'|‘|’|ʼ|‛|′|‹|›";
const doubleQuoteAdepts = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}";
const space = " ";
const nbsp = " ";
const hairSpace = " "; //&#8202;
const narrowNbsp = " "; //&#8239;
const spaces = space + nbsp + hairSpace + narrowNbsp;
const terminalPunctuation = "\.\!\?";
const sentencePunctuation = "\,\:\;" + terminalPunctuation; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
const openingBrackets = "\\(\\[\\{";
const closingBrackets = "\\)\\]\\}";
const ellipsis = "…";
const degree = "°";

/*
 Source for webUrlPattern, emailAddressPattern
 http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
 */
const webUrlPattern = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" +
  "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" +
  "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" +
  "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" +  // named host
  "(?:" + // plus top level domain
  "(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" +
  "|(?:biz|b[abdefghijmnorstvwyz])" +
  "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" +
  "|d[ejkmoz]" +
  "|(?:edu|e[cegrstu])" +
  "|f[ijkmor]" +
  "|(?:gov|g[abdefghilmnpqrstuwy])" +
  "|h[kmnrtu]" +
  "|(?:info|int|i[delmnoqrst])" +
  "|(?:jobs|j[emop])" +
  "|k[eghimnrwyz]" +
  "|l[abcikrstuvy]" +
  "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" +
  "|(?:name|net|n[acefgilopruz])" +
  "|(?:org|om)" +
  "|(?:pro|p[aefghklmnrstwy])" +
  "|qa" +
  "|r[eouw]" +
  "|s[abcdeghijklmnortuvyz]" +
  "|(?:tel|travel|t[cdfghjklmnoprtvwz])" +
  "|u[agkmsyz]" +
  "|v[aceginu]" +
  "|w[fs]" +
  "|y[etu]" +
  "|z[amw]))" +
  "|(?:(?:25[0-5]|2[0-4]" + // or ip address
  "[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]" +
  "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]" +
  "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}" +
  "|[1-9][0-9]|[0-9])))" +
  "(?:\\:\\d{1,5})?)" + // plus option port number +
  "(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~" + // plus option query params
  "\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" +
  "(?:\\b|$)"; // and finally, a word boundary or end of
// input.  This is to stop foo.sure from
// matching as foo.su


const emailAddressPattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" +
  "\\@" +
  "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
  "(" +
  "\\." +
  "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
  ")+";

export default {
  essentialSet,
  nonLatinLowercase,
  nonLatinUppercase,
  nonLatinChars,
  lowercaseCharsEnSkCzRue,
  uppercaseCharsEnSkCzRue,
  allChars,
  singleQuoteAdepts,
  doubleQuoteAdepts,
  space,
  nbsp,
  hairSpace,
  narrowNbsp,
  spaces,
  terminalPunctuation,
  sentencePunctuation,
  openingBrackets,
  closingBrackets,
  ellipsis,
  degree,
  webUrlPattern,
  emailAddressPattern,
}
