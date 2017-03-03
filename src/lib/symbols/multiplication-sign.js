export function fixMultiplicationSign(string, locale) {

	// catch measure multiplication
	let pattern = "([1-9]+[ ]{0,1}[a-wz]*)([" + locale.spaces + "]{0,1}[x|×][" + locale.spaces + "]{0,1})([1-9]+[ ]{0,1}[a-wz]*)";
	let re = new RegExp(pattern, "gi");
	let replacement = "$1 " + locale.multiplicationSign + " $3"
	string =  string.replace(re, replacement);

	// catch multiplication followed by word
	pattern = "([" + locale.cardinalNumber + "])([" + locale.spaces + "]{0,1})([x|×])([ ])([a-wz]+)";
	re = new RegExp(pattern, "gi");
	replacement = "$1$2" + locale.multiplicationSign + locale.nbsp + "$5";
	string =  string.replace(re, replacement);

	// replace spaces with nbsp
	pattern = "(["+ locale.spaces +"]+)(" + locale.multiplicationSign + ")(["+ locale.spaces +"]+)"
	re = new RegExp(pattern, "g");
	replacement = locale.nbsp + locale.multiplicationSign + locale.nbsp;
	string =  string.replace(re, replacement);

	return string
}
