/* 
  Utility functions to identify and handle exceptions for Markdown files.
*/

import { m } from "../markers.js";

/** 
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
  if (!configuration.keepMarkdownCodeBlocks) return string;

  return string
    .replace(/(\s*)(```)/g, `$1${m.tick}${m.tick}${m.tick}`)
    .replace(/(``)(.*?)(``)/g, `${m.tick}${m.tick}$2${m.tick}${m.tick}`)
    .replace(/(`)(.*?)(`)/g, `${m.tick}$2${m.tick}`);
}

//

/**
  Place markdown code ticks, identified in identifyMarkdownCodeTicks

  Docs
  https://www.markdownguide.org/basic-syntax

  @param {string} string: input text for identification
  @returns {string} output with placed Markdown code tick
*/
export function placeMarkdownCodeTicks(string, configuration) {
  if (!configuration.keepMarkdownCodeBlocks) return string;

  // prettier-ignore
  return string.replace(
    new RegExp(
      `${m.tick}`,
      "g"
    ),
      `\``
  )
}
