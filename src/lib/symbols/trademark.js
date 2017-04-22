import {removeSpaceBeforeTerminalPunctuation,
				removeSpaceAfterPunctuation} from "../whitespace/spaces";

function replaceTMwithTrademark(string, locale) {
	let pattern = "([" + locale.spaces + "]*)(\\(tm\\)|" + locale.trademark +")";
	let re = new RegExp(pattern, "gi");
	let replacement = locale.trademark;

	return string.replace(re, replacement);
}



export function fixTrademark(string, locale) {
	string = removeSpaceAfterPunctuation(string, locale); 
	string = removeSpaceBeforeTerminalPunctuation(string, locale);
	string = replaceTMwithTrademark(string, locale);

	return string
}
