export function fixHyphen(string, locale){
	let pattern = "(["+ locale.lowercaseChars +"])([–—])(["+ locale.lowercaseChars +"])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1-$3");
}
