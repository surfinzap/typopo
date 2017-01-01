# Backlog for typopo

## vNext
* fix false positives for URL www. Tota. Sk (ie. skip URLs from parsing)
	* http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
* review how punctuation is handled and make it more robust

## Backlog pool
* correct numeral format
* numeral range check how we aproach auto-correction of dashes among numerals, eg. 3–4 годины дообіда.
		* 5–6 eggs
		* 1st—5th October
		* 1.–13. marca
		* 1,15—3,25
		* 1 000–5 000.25
		* 1.15–1,000.25
		* typos
				* 5 - 6
				* wrong numeral format
