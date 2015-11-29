# Typopo

Typopo is a JavaScript library to autocorrect frequent typographic errors in English, Slovak, Czech and Rusyn language. Typopo is meant to make proofreading shorter, when you filter out the common errors first.

Typopo:
* removes extra white spaces at the beginning of the sentence, between words and paragraphs, before or after a punctuation
* corrects double quotes
* corrects apostrophes
* replaces multiple dots with ellipsis (…)
* replaces x with multiplication sign (×) at appropriate places
* replaces hyphen or en dash with em dash where needed
* replaces (r) and (c) with ® and ©

Take a look at [Roadmap](#roadmap) to see what's planned next or give me a [feedback](#feedback) on what could be improved.

## Usage
I can imagine that Typopo could be utilized in following scenarios:
* you can copy-paste text into [my demo](http://surfinzap.github.io/typopo/), clean typos according your language and work with the result elsewhere
* you can call clean-up script everytime one of your editors saves text in CMS
* you can hook up a special action in your favorite editor/CMS to clean typos anytime thatʼs needed; youʼll clean the most of typos before getting to manual proofreading
* you can call once your content is loaded on a website and clean typos afterwards, if you are fine with just catching top typos

Where I donʼt see Typopo being used (yet or never? — you tell me)
* to clean your typos in Markdown files (since script is stripping extra spaces between paragraphs)
* to clean your typos as you type (real-time autocorrect) and thatʼs for 2 reasons:
	* itʼs not a good authoring experience when you got always corrected as you type (at least I wasnʼt satisfied with such results)
	* some chunks of the script need to take a look in broader perspective in order to find some of them typos

### Technical details
call a function:
```javascript
clean_typos(string, language)
```
supported languages:
* "en" (English, default)
* "rue" (Rusyn)
* "sk" (Slovak)
* "cs" (Czech)




## Roadmap
These are few things Iʼm planning to do, help figure out whatʼs important to you, give me a [feedback](#Feedback)
* include autocorrection for single quotes
* include autocorrection for other common typos (examples & tips are more than welcomed welcomed)
* figure out distribution (JS lib, NPM package, InDesign plugin, GDocs plugin or else?)

## Feedback
Iʼd love to hear:
* how you use or plan to use typopo
* what's missing
* when script does not work as you expected it to; and in such cases following example would help the most
	* my input: [provide your text example here]
	* expected outcome: [show how you want your example to be corrected]
	* typopoʼs outcome: [show how typopo corrected it]

In any case, feel free to drop a line at <typopo@tota.sk>.

## License
Licensed under MIT license.
