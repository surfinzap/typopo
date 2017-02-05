import constants from "../constants";

export function fixHyphen(string){
	let pattern = "(["+ constants.lowercaseChars +"])([–—])(["+ constants.lowercaseChars +"])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1-$3");
}
