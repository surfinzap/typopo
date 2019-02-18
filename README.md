# Typopo

Typopo is a JavaScript library that saves your time by auto-correcting frequent typographic errors in English, Slovak, Czech and Rusyn language. Make a proofreading quicker by auto-correcting the common typos first.

## Features
Fixes punctuation:
* double quotes (and accidentally-typed punctuation related to the use of double quotes)
* double primes
* single quotes (with assumption they are used as [secondary](https://en.wikipedia.org/wiki/Quotation_mark#Summary_table_for_various_languages) and in pairs)
* single primes
* apostrophes
* hyphens & dashes
* period & ellipsis

Fixes whitespace characters:
* removes extra white spaces
	* at the beginning and the end of sentences (leading and trailing spaces)
	* between words and paragraphs
	* before or after a punctuation
	* around ellipsis and aposiopesis (where applicable)
* removes empty lines
* fixes non-breaking spaces
	* removes nbsp between multi-letter words
	* adds nbsp
		* after one-word prepositions
		* around “×”
		* after “&”
		* after cardinal numbers
		* after ordinal numbers
		* ordinal Roman numerals
		* after name initials (i.e. Philip K. Dick)
		* after common multi-word abbreviations

Fixes words:
* accidental uPPERCASE
* spelling of e.g., i.e., a.m. and p.m.

Fixes symbols:
* multiplication sign (×)
* section sign (§)
* copyright (©)
* sound recording copyright (℗)
* registered trademark (®)
* trademark (™)
* plus-minus sign (+-, -+ → ±)
* square and cube exponents (e.g. 100 µm² → 100 µm², 50 km³ → 50 km³)

## Use

### Online app — [http://typopo.tota.sk/](http://typopo.tota.sk/)
Use (especially) when:
* you’re a typesetter, who wants to proofread raw text before pasting into DTP software (e.g. InDesign)
* you’re a developer, who don’t want to escape quotes in User Interface messages or bother with whitespace characters
* you just want your email to be typographically correct

[![alt correct typos with typopo](http://typopo.tota.sk/img/typopo--og-9001.png "correct typos with typopo")](http://typopo.tota.sk/)

### JS library
* Download dist/typopo.min.js and include it in your web application or CMS to fix typos on demand, automatically or after the web page is loaded.

### NPM package
Include Typopo as an NPM package in your web project:

```
npm install typopo
```

### Documentation

fix typos in given text and locale:
```javascript
fixTypos(string, locale)
```

supported languages:
* "en-us" (English, default)
* "rue" (Rusyn)
* "sk" (Slovak)
* "cs" (Czech)
* "de-de" (German)

optional configuration:
```javascript
fixTypos(string, locale, configuration)
```

example of configuration:
```javascript
configuration = {
	removeLines : true,
}
```
(removeLines is the online available configuration option for now, the situation will get better based on your feedback)

## Feedback
Iʼd love to hear:
* how do you use or plan to use Typopo
* whatʼs missing
* when you expect Typopo is not fixing typos as it should; in such cases following example would help e the most:
	* your input: [provide your text example here]
	* expected output: [show how you want your example to be corrected]

In any case, feel free to drop me a line at <typopo@tota.sk>.

## License
Licensed under MIT license. (See [LICENCE.TXT](//github.com/surfinzap/typopo/blob/master/LICENSE.txt).)
