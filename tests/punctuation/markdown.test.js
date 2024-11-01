import {identifyMarkdownCodeTicks,
        placeMarkdownCodeTicks} 
        from "../../src/modules/punctuation/markdown";

import assert from 'assert';


let configKeepMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: true,
}

let configIgnoreMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: false,
}

describe('Identify markdown code ticks:\n', () => {
  let testCase = {
    "```\ncode\n```":
    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

    "\t```\ncode\n```":
    "\t{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

    "\t\t```\ncode\n```":
    "\t\t{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

    " ```\ncode\n```":
    " {{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

    "  ```\ncode\n```":
    "  {{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

    "``code``":
    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}code{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

      "``code code``":
    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}code code{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

    "``code`` ``code``":
    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}code{{typopo__markdown_tick}}{{typopo__markdown_tick}} {{typopo__markdown_tick}}{{typopo__markdown_tick}}code{{typopo__markdown_tick}}{{typopo__markdown_tick}}",

    "`code`":
    "{{typopo__markdown_tick}}code{{typopo__markdown_tick}}",

    "`code code`":
    "{{typopo__markdown_tick}}code code{{typopo__markdown_tick}}",

    "`code` `code`":
    "{{typopo__markdown_tick}}code{{typopo__markdown_tick}} {{typopo__markdown_tick}}code{{typopo__markdown_tick}}",
  };


  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(		
        identifyMarkdownCodeTicks(
          key, 
          configKeepMarkdownCodeBlocks
        ), 
        testCase[key]);
    });
  });
});



describe('Place markdown code ticks:\n', () => {
  let testCase = {
    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    "```\ncode\n```",

    "\t{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    "\t```\ncode\n```",

    "\t\t{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    "\t\t```\ncode\n```",

    " {{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    " ```\ncode\n```",

    "  {{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}\ncode\n{{typopo__markdown_tick}}{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    "  ```\ncode\n```",

    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}code{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    "``code``",

    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}code code{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    "``code code``",

    "{{typopo__markdown_tick}}{{typopo__markdown_tick}}code{{typopo__markdown_tick}}{{typopo__markdown_tick}} {{typopo__markdown_tick}}{{typopo__markdown_tick}}code{{typopo__markdown_tick}}{{typopo__markdown_tick}}":
    "``code`` ``code``",

    "{{typopo__markdown_tick}}code{{typopo__markdown_tick}}":
    "`code`",

    "{{typopo__markdown_tick}}code code{{typopo__markdown_tick}}":
    "`code code`",

    "{{typopo__markdown_tick}}code{{typopo__markdown_tick}} {{typopo__markdown_tick}}code{{typopo__markdown_tick}}":
    "`code` `code`",
  };


  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(		
        placeMarkdownCodeTicks(
          key, 
          configKeepMarkdownCodeBlocks
        ), 
        testCase[key]);
    });
  });
});


describe('Ignore markdown code ticks:\n', () => {
  let testCase = {
    "```\ncode\n```":
    "```\ncode\n```",

    "\t```\ncode\n```":
    "\t```\ncode\n```",

    "\t\t```\ncode\n```":
    "\t\t```\ncode\n```",

    " ```\ncode\n```":
    " ```\ncode\n```",

    "  ```\ncode\n```":
    "  ```\ncode\n```",

    "``code``":
    "``code``",

      "``code code``":
    "``code code``",

    "``code`` ``code``":
    "``code`` ``code``",

    "`code`":
    "`code`",

    "`code code`":
    "`code code`",

    "`code` `code`":
    "`code` `code`",
  };


  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(		
        identifyMarkdownCodeTicks(
          key, 
          configIgnoreMarkdownCodeBlocks
        ), 
        testCase[key]);
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(		
        placeMarkdownCodeTicks(
          key, 
          configIgnoreMarkdownCodeBlocks
        ), 
        testCase[key]);
    });
  });
});
