/* replace 2 periods at the end of the sentecne with a single period */
function removeExtraPeriod(string) {
	return string.replace(/\.{2}/g, ".");
}

export function fixPeriod(string) {
	return removeExtraPeriod(string);
}
