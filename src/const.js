/* Letters */
const nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
const nonLatinUppercase = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŶŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
const nonLatinChars = nonLatinLowercase + nonLatinUppercase;
const lowercaseChars = "a-z" + nonLatinLowercase;
const uppercaseChars = "A-Z" + nonLatinUppercase;
const allChars = "a-z" + nonLatinLowercase + "A-Z" + nonLatinUppercase;

/* Quotes, primes, apostrophes 

  (8218)    single low-9 quotation mark
  (39)			dumb single quote
  (8216)		left single quotation mark
  (8217)		right single quotation mark
  (700)	  	modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe [1]
  (8219)		single high-reversed-9 quotation mark
  (180)     acute accent ´
  (96)      grave accent `
  (8242)		prime
  (8249)		single left-pointing angle quotation mark
  (8250)		single right-pointing angle quotation mark
  quick search at https://www.toptal.com/designers/htmlarrows/punctuation/
*/
const singleQuoteAdepts = "‚|'|‘|’|ʼ|‛|´|`|′|‹|›";
const apostrophe = "’"; // (8217) [1]
const singlePrime = "′";
const backtick = "`";
const doubleQuoteAdepts = "„|“|”|\"|«|»|″|,{2,}|‚{2,}|[‘’'‹›′´`]{2,}";
const doublePrime = "″";

/* Spaces */
const space = " ";
const nbsp = " ";
const hairSpace = " "; // &#8202, U+200A
const narrowNbsp = " "; // &#8239, U+202F
const spaces = space + nbsp + hairSpace + narrowNbsp;

/* Punctuation*/
const terminalPunctuation = "\\.\\!\\?";
const sentencePausePunctuation = "\\,\\:\\;";
const sentencePunctuation = sentencePausePunctuation + terminalPunctuation; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
const openingBrackets = "\\(\\[\\{";
const closingBrackets = "\\)\\]\\}";
const ellipsis = "…";
const hyphen = "-";
const enDash = "–";
const emDash = "—";
const slash = "/";

/* Symbols*/
const degree = "°";
const multiplicationSign = "×";
const ampersand = "&";
const sectionSign = "§";
const paragraphSign = "¶";
const copyright = "©";
const soundRecordingCopyright = "℗";
const registeredTrademark = "®";
const serviceMark = "℠";
const trademark = "™";
const plus = "+";
const minus = "−";
const plusMinus = "±";
const percent = "%";
const permille = "‰";
const permyriad = "‱";
const numberSign = "#";
const numeroSign = "№";

/* Numbers */
const romanNumerals = "IVXLCDM";

export const base = {
  /* Letters */
  nonLatinLowercase,
  nonLatinUppercase,
  nonLatinChars,
  lowercaseChars,
  uppercaseChars,
  allChars,

  singleQuoteAdepts,
  apostrophe,
  singlePrime,
  backtick,
  doubleQuoteAdepts,
  doublePrime,

  /* Spaces */
  space,
  nbsp,
  hairSpace,
  narrowNbsp,
  spaces,

  /* Punctuation*/
  terminalPunctuation,
  sentencePausePunctuation,
  sentencePunctuation,
  openingBrackets,
  closingBrackets,
  ellipsis,
  hyphen,
  enDash,
  emDash,
  slash,

  /* Symbols*/
  degree,
  multiplicationSign,
  ampersand,
  sectionSign,
  paragraphSign,
  copyright,
  soundRecordingCopyright,
  registeredTrademark,
  serviceMark,
  trademark,
  plus,
  minus,
  plusMinus,
  percent,
  permille,
  permyriad,
  numberSign,
  numeroSign,

  /* Numbers */
  romanNumerals,

  /*
    Source for urlPattern, emailPattern
    http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
    urlPattern has been adjusted
  */
  urlPattern:
    "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" +
    "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" +
    "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" +
    "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" + // named host
    "(?:" + // plus top level domain
    "(?:aero|arpa|asia|agency|a[cdefgilmnoqrstuwxz])" +
    "|(?:biz|b[abdefghijmnorstvwyz])" +
    "|(?:cat|cloud|com|company|coop|c[acdfghiklmnoruvxyz])" +
    "|(?:dev|d[ejkmoz])" +
    "|(?:edu|e[cegrstu])" +
    "|f[ijkmor]" +
    "|(?:gov|guide|g[abdefghilmnpqrstuwy])" +
    "|h[kmnrtu]" +
    "|(?:info|int|i[delmnoqrst])" +
    "|(?:jobs|j[emop])" +
    "|k[eghimnrwyz]" +
    "|l[abcikrstuvy]" +
    "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" +
    "|(?:name|net|n[acefgilopruz])" +
    "|(?:org|om|one)" +
    "|(?:pro|p[aefghklmnrstwy])" +
    "|qa" +
    "|r[eouw]" +
    "|(?:shop|store|s[abcdeghijklmnortuvyz])" +
    "|(?:tel|travel|team|t[cdfghjklmnoprtvwz])" +
    "|u[agkmsyz]" +
    "|v[aceginu]" +
    "|(?:work|w[fs])" +
    "|(?:xyz)" +
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
    "(?:\\b|$)",

  /* Email pattern */
  emailPattern:
    "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" +
    "\\@" +
    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
    "(" +
    "\\." +
    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
    ")+",

  /* Filename pattern */
  filenamePattern:
    "\\b[a-zA-Z0-9_%\\-]+\\.(ai|asm|bat|bmp|c|cpp|cs|css|csv|dart|doc|docx|exe|gif|go|html|ics|java|jpeg|jpg|js|json|key|kt|less|lua|log|md|mp4|odp|ods|odt|pdf|php|pl|png|ppt|pptx|psd|py|r|rar|rb|rs|scala|scss|sh|svg|sql|swift|tar.gz|tar|tex|tiff|ts|txt|vbs|xml|xls|xlsx|yaml|yml|zip)\\b",
};
