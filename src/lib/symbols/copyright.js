function replaceCwithCopyright(string, locale) {
	let pattern = "(\\(c\\))([" + locale.spaces + "]?)(" + locale.cardinalNumber + ")";
	let re = new RegExp(pattern, "gi");
	let replacement = locale.copyright + "$2$3";

	return string.replace(re, replacement);
}



function addSpaceBeforeCopyright(string, locale) {
	let pattern = "([^" + locale.spaces + locale.openingBrackets + "])("+ locale.copyright +")";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.space + "$2";

	return string.replace(re, replacement);
}


function addNbspAfterCopyright(string, locale) {
	let pattern = "("+ locale.copyright +")([^" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp + "$2";

	return string.replace(re, replacement);
}



function replaceSpacesAfterSectionSign(string, locale) {
	let pattern = "("+ locale.copyright +")([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp;

	return string.replace(re, replacement);
}



export function fixCopyright(string, locale) {
	string = replaceCwithCopyright(string, locale);
	string = addSpaceBeforeCopyright(string, locale);
	string = addNbspAfterCopyright(string, locale);
	string = replaceSpacesAfterSectionSign(string, locale)

	return string
}
