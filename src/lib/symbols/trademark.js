import {addSpaceBeforeSymbol} from "../whitespace/spaces";
import {addNbspAfterSymbol,
				replaceSpacesWithNbspAfterSymbol} from "../whitespace/nbsp";
import {removeSpaceBeforeTerminalPunctuation,
				removeSpaceAfterPunctuation} from "../whitespace/spaces";

function replaceTMwithTrademark(string, locale) {
	let pattern = "([" + locale.spaces + "]*)(\\(tm\\))";
	let re = new RegExp(pattern, "gi");
	let replacement = locale.trademark;

	return string.replace(re, replacement);
}



export function fixTrademark(string, locale) {
	string = removeSpaceAfterPunctuation(string, locale); // this is duplicate code, could be refactored into inegration tests
	string = removeSpaceBeforeTerminalPunctuation(string, locale);
	string = replaceTMwithTrademark(string, locale);

	return string
}
