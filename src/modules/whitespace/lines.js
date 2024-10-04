/*
	Removes empty lines

	@param {string} string — input text for identification
	@returns {string} — output with removed empty lines
*/
export function removeEmptyLines(string) {
	return string.replace(/[\n\r]{2,}/gm, "\n");
}
