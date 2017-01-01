# Backlog for typopo


* fix false positives for URL www. Tota. Sk (ie. skip URLs from parsing)
* review algorithms with spaces and adjust them to work with all kinds of spaces
	* space_ellispsis_around_commas()
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

* rethink swapping interpunction based on context, ie. http://prirucka.ujc.cas.cz/?id=162
* change „… да святить ся into „…да святить ся
* Але теперь‚… is incorrectly corrected into Але теперь’… (issue left-single quote is incorrectly used instead of comma)
* behavior: (once) people use lower single quote instead of comma
