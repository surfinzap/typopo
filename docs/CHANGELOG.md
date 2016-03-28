# Changelog for Typopo

## 2016-03-28
 * 1.0.0
 * correct single quotes and apostrophes
    * single quotes and apostrophes can be mixed and matched in various ways and it’s a bigger task to identify 100 % of incorrectly used single quotes/apostrophes. However, we have thought about different means of how we could identify and correct the most common cases. We're now able to correct them with following assumptions:
        * Double quotes are used in pairs
        * Single quotes are used in pairs
        * Single quotes are used as secondary (ie. within double quotes, which is a convention for currently supported languages — en-US, sk, cs, rue — [check wiki](https://en.wikipedia.org/wiki/Quotation_mark#Summary_table_for_various_languages))
            * As thay are used as
        * Intention to use quotes is shown by proper spacing, eg. _'word-beginning, word-end'_
            * Wrong intention that algorithm won’t be able to identify effectively, eg. _'_word-beginning, word-end_'_
 * [Breaking change] refactor clean_typos() to correct_typos()

## 2016-03-20
 * 0.0.11
 * replace space with non-breaking space after one-word prepositions and "&"

## 2016-03-13
 * 0.0.10
 * correct accidental uPerRCase
 * make typopo as an NPM package (thanks to Matus Duchon)

## 2016-02-20
 * 0.0.9
 * replace (tm) and (TM) with ™
 * replace +- and -+ with ±

## 2016-01-30
 * 0.08
 * remove space arround slashes that are used in dramatic texts
 * start sentence with a Capital letter
 * correct dash for hyphen when it is used for joining words

## 2015-11-22
 * 0.07
 * Typopo now corrects common typos in English language as well
 * temporary removal of support for the correction of single quotes (in exchange for English support)
 * corrects the apostrophes
 * removes extra spaces between a word and ;
 * minified version added  

## 2015-11-04
 * 0.06
 * support for correction of two consequenting single quotes ''
 * swap quotes for punctuation .,?!

## 2015-11-03
 * 0.05
 * removes too many new lines between paragraphs
 * removes spaces before additional punctuation [,:]
 * updates for
 * additional use cases to corrects „Slovak, Rusyn, Czech double quotation marks“

## 2015-11-02
 * 0.04
 * corrects „Slovak, Rusyn, Czech double quotation marks“
 * corrects ‚Slovak, Rusyn, Czech single quotation marks‘
 * removes extra spaces along ‚Slovak, Rusyn, Czech single quotation marks‘
 * sets up correct typography for multiplication sign
 * replaces hyphen or en dash with em dash

## 2015-11-01
 * 0.03
 * removes extra spaces between „Slovak, Rusyn, Czech double quotation marks“
 * removes extra spaces between parentheses ()
 * removes extra spaces & tabs at the beginning of the paragraph

## 2015-10-20
 * 0.02
 * transforms 2 and more periods with ellipsis
 * removes multiple spaces between the words
 * removes spaces before punctuation [.!?]
 * rewrites:
    * "(C)" : "©"
    * "(c)" : "©"
    * "(R)" : "®"
    * "(r)" : "®"


## 2015-10-19
 * 0.01 initial repo
 * initial tests written
