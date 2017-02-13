export function fixMultiplicationSign(string, locale) {

	let pattern = "([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)";
	let re = new RegExp(pattern, "g");
	let replacement = "$1 " + locale.multiplicationSign + " $3"
	string =  string.replace(re, replacement);

	pattern = "(["+ locale.spaces +"]+)(" + locale.multiplicationSign + ")(["+ locale.spaces +"]+)"
	re = new RegExp(pattern, "g");
	replacement = locale.nbsp + locale.multiplicationSign + locale.nbsp;
	string =  string.replace(re, replacement);

	return string
}
