import { addSpaceBeforeSymbol } from '../whitespace/spaces'
import {
	addNbspAfterSymbol,
	replaceSpacesWithNbspAfterSymbol,
} from '../whitespace/nbsp'

function replaceCwithCopyright(string, locale) {
	let pattern =
		'(\\(p\\))([' + locale.spaces + ']?)(' + locale.cardinalNumber + ')'
	let re = new RegExp(pattern, 'gi')
	let replacement = locale.soundRecordingCopyright + '$2$3'

	return string.replace(re, replacement)
}

export function fixSoundRecordingCopyright(string, locale) {
	string = replaceCwithCopyright(string, locale)
	string = addSpaceBeforeSymbol(string, locale, locale.soundRecordingCopyright)
	string = addNbspAfterSymbol(string, locale, locale.soundRecordingCopyright)
	string = replaceSpacesWithNbspAfterSymbol(
		string,
		locale,
		locale.soundRecordingCopyright
	)

	return string
}
