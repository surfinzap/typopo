function addSpaceBeforeSectionSign(string, locale) {
	let pattern =
		'([^' +
		locale.spaces +
		locale.sectionSign +
		locale.openingBrackets +
		'])(' +
		locale.sectionSign +
		')'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1' + locale.space + '$2'

	return string.replace(re, replacement)
}

function addNbspAfterSectionSign(string, locale) {
	let pattern =
		'(' +
		locale.sectionSign +
		')([^' +
		locale.spaces +
		locale.sectionSign +
		'])'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1' + locale.nbsp + '$2'

	return string.replace(re, replacement)
}

function replaceSpacesAfterSectionSign(string, locale) {
	let pattern = '(' + locale.sectionSign + ')([' + locale.spaces + '])'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1' + locale.nbsp

	return string.replace(re, replacement)
}

export function fixSectionSign(string, locale) {
	string = addSpaceBeforeSectionSign(string, locale)
	string = addNbspAfterSectionSign(string, locale)
	string = replaceSpacesAfterSectionSign(string, locale)

	return string
}
