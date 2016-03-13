# Typopo

Typopo is a JavaScript library that saves time by autocorrecting frequent typographic errors in English, Slovak, Czech and Rusyn language. Typopo is meant to make proofreading shorter, by filtering out the common errors first.

Typopo:
* removes extra white spaces at the beginnings of sentences, between words and paragraphs, before or after punctuations
* corrects
	* double quotes
	* apostrophes
	* accidental uPerRCase
* replaces multiple dots with ellipsis (…)
* replaces x with multiplication sign (×) when appropriate
* replaces hyphen or en dash with em dash where needed
* replaces:
	* (r) or (R) with ®
	* (c) or (C) with ©
	* (tm) or (TM) with ™
	* +- or -+ with ±

Take a look at [Roadmap](#roadmap) to see what's planned next or give me [feedback](#feedback) on what could be improved.

## Usage
I can imagine that Typopo could be useful in following scenarios:
* you can copy-paste text into [my demo](http://surfinzap.github.io/typopo/), clean typos according your language and work with the result elsewhere
* you can call clean-up script everytime one of your editors saves text in a CMS
* you can hook up a special action in your favorite editor/CMS to clean typos anytime needed; youʼll clean most typos before getting to manual proofreading
* you can call it once your content is loaded on a website and clean typos afterwards, if you are fine with getting rid only of the most common typos
* you can add Typopo to the process of generating a static website

Where I donʼt see Typopo being used (yet or never? — you tell me)
* to clean your typos in Markdown files (since script is stripping extra spaces between paragraphs)
* to clean your typos as you type (real-time autocorrect) and thatʼs for 2 reasons:
	* itʼs not a good authoring experience when you get always corrected as you type (at least I wasnʼt satisfied with such results)
	* some chunks of the script need to be aware of the context in order to find some of the typos

### Install & use
NPM package install

```
npm install typopo
```

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
These are few things Iʼm planning to do, help me figure out whatʼs important to you, give me [feedback](#Feedback)
* include autocorrect for single quotes
* include autocorrect for other common typos (examples & tips are more than welcome)
* figure out distribution (JS lib, NPM package, InDesign plugin, GDocs plugin or else?)

## Feedback
Iʼd love to hear:
* how do you use or plan to use Typopo
* what's missing
* when you expect Typopo to behave differently; in such cases following example would help the most:
	* your input: [provide your text example here]
	* expected output: [show how you want your example to be corrected]

In any case, feel free to drop me a line at <typopo@tota.sk>.

## License
Licensed under MIT license. (See [LICENCE.TXT](//github.com/surfinzap/typopo/blob/master/LICENSE.txt).)
