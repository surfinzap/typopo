/* replace 2 periods at the end of the sentence with a single period */
export function removeExtraPeriod(string) {
	return string.replace(/\.{2}/g, '.')
}

export function fixPeriod(string) {
	return removeExtraPeriod(string)
}
