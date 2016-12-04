Backlog for typopo

## 1.0.5
* fix extra punctuation in direct speech, ie. "?,", "!,", ".,", ...
* make fixing i.e., e.g. by removing them before replacement and pasting them after replacement + make a initial support for such exceptions

## 1.0.6
* add more use-cases for apostrophes, primes, etc.

## 1.0.7
* fix false positives for URL www. Tota. Sk (ie. skip URLs from parsing)
* review algorithms with spaces and adjust them to work with all kinds of spaces
	* remove_space_before_punctuation()
	* remove_space_after_punctuation()
	* remove_trailing_spaces()
	* remove_spaces_at_paragraph_beginning()
	* space_ellispsis_around_commas()

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

* rethink swapping interunction based on context, ie. http://prirucka.ujc.cas.cz/?id=162
* change „… да святить ся into „…да святить ся
* Але теперь‚… is incorrectly corrected into Але теперь’…
* behavior: (once) people use lower single quote instead of comma
