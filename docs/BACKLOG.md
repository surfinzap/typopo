Backlog for typopo

## 1.0.4
* fix e.g. special rule for eg. it's correcting e. g. to —> E. G.
* remove non-breaking space between multiple-letter expressions
* replace -- with – and --- with —
* remove trailing spaces after the last paragraph
* add nbsp before/after dash, depending on its preferred position at the end of the paragraph

## 1.0.5
* differentiate em rules for english language and other languages
* add more use-cases for apostrophes, primes, etc.
* fix false positives for URL www. Tota. Sk (ie. skip URLs from parsing)
* fix extra punctuation in direct speech, ie. "?,", "!,", ".,", ...

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
* „Joj! Što to?!“– Ďivčata s’a storhly > „Joj! Što to?!“ — Ďivčata s’a storhly
* behavior: (once) people use lower single quote instead of comma
