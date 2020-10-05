import { addSpaceBeforeSymbol } from '../whitespace/spaces'
import {
	addNbspAfterSymbol,
	replaceSpacesWithNbspAfterSymbol,
} from '../whitespace/nbsp'

function replaceCwithCopyright(string, locale) {
	let pattern =
		'(\\(c\\))([' + locale.spaces + ']?)(' + locale.cardinalNumber + ')'
	let re = new RegExp(pattern, 'gi')
	let replacement = locale.copyright + '$2$3'

	return string.replace(re, replacement)
}

export function fixCopyright(string, locale) {
	string = replaceCwithCopyright(string, locale)
	string = addSpaceBeforeSymbol(string, locale, locale.copyright)
	string = addNbspAfterSymbol(string, locale, locale.copyright)
	string = replaceSpacesWithNbspAfterSymbol(string, locale, locale.copyright)

	return string
}
