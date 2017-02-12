export function fixMultiplicationSign(string, constants) {

	let pattern = "([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)";
	let re = new RegExp(pattern, "g");
	let replacement = "$1 " + constants.multiplicationSign + " $3"
	string =  string.replace(re, replacement);

	pattern = "(["+ constants.spaces +"]+)(" + constants.multiplicationSign + ")(["+ constants.spaces +"]+)"
	re = new RegExp(pattern, "g");
	replacement = constants.nbsp + constants.multiplicationSign + constants.nbsp;
	string =  string.replace(re, replacement);

	return string
}
