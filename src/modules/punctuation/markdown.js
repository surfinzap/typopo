/* 
	Utility classes to identify and handle exceptions for Markdown files



/*
	Identify markdown code ticks that wrap code blocks, so they’re not fixed as apostrophes

	Examples
	inline `code block`

	``escaping inline `code block` in Markdown file``


	```
	fenced code block
	```

	Docs
	https://www.markdownguide.org/basic-syntax

	@param {string} string: input text for identification
	@returns {string} output with identified markdown ticks that wrap code blocks
*/
export function identifyMarkdownCodeTicks(string, configuration) {	

	if (configuration.keepMarkdownCodeBlocks) {

		// ```
		// fenced code block
		// ```
		string = string.replace(
			new RegExp(
				"(\\s*)"
			+ "(```)", 
				"g"
			),
				"$1"
			+ "{{typopo__markdown_tick}}"
			+ "{{typopo__markdown_tick}}"
			+ "{{typopo__markdown_tick}}"
		)
	
		// ``escaping inline `code block` in Markdown file``
		string = string.replace(
			new RegExp(
				"(``)"
			+ "(.+?)"
			+ "(``)", 
				"g"
			),
				"{{typopo__markdown_tick}}"
			+ "{{typopo__markdown_tick}}"
			+ "$2"
			+ "{{typopo__markdown_tick}}"
			+ "{{typopo__markdown_tick}}"
		)
	
	
		// inline `code block`
		string = string.replace(
			new RegExp(
				"(`)"
			+ "(.+?)"
			+ "(`)", 
				"g"
			),
				"{{typopo__markdown_tick}}"
			+ "$2"
			+ "{{typopo__markdown_tick}}"
		)

	}

	return string;
}



/*
	Place markdown code ticks, identified in identifyMarkdownCodeTicks

	Docs
	https://www.markdownguide.org/basic-syntax

	@param {string} string: input text for identification
	@returns {string} output with placed Markdown code tick
*/
export function placeMarkdownCodeTicks(string, configuration) {	

	if (configuration.keepMarkdownCodeBlocks) {
		string = string.replace(
			new RegExp(
				"{{typopo__markdown_tick}}",
				"g"
			),
				"`"
		)
	}

	return string;
}

