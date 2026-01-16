import { identifyMarkdownCodeTicks, placeMarkdownCodeTicks } from "../../src/utils/markdown.js";
import { m } from "../../src/markers.js";

import { describe, it, expect } from "vitest";

let configKeepMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: true,
};

let configIgnoreMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: false,
};

describe("Identify markdown code ticks:", () => {
  let testCase = {
    [`\`\`\`\ncode\n\`\`\``]: `${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`,

    [`\t\`\`\`\ncode\n\`\`\``]: `\t${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`,

    [`\t\t\`\`\`\ncode\n\`\`\``]: `\t\t${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`,

    [` \`\`\`\ncode\n\`\`\``]: ` ${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`,

    [`  \`\`\`\ncode\n\`\`\``]: `  ${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`,

    [`\`\`code\`\``]: `${m.tick}${m.tick}code${m.tick}${m.tick}`,

    [`\`\`code code\`\``]: `${m.tick}${m.tick}code code${m.tick}${m.tick}`,

    [`\`\`code\`\` \`\`code\`\``]: `${m.tick}${m.tick}code${m.tick}${m.tick} ${m.tick}${m.tick}code${m.tick}${m.tick}`,

    [`\`code\``]: `${m.tick}code${m.tick}`,

    [`\`code code\``]: `${m.tick}code code${m.tick}`,

    [`\`code\` \`code\``]: `${m.tick}code${m.tick} ${m.tick}code${m.tick}`,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(identifyMarkdownCodeTicks(key, configKeepMarkdownCodeBlocks)).toBe(testCase[key]);
    });
  });
});

describe("Place markdown code ticks:", () => {
  let testCase = {
    [`${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`]: `\`\`\`\ncode\n\`\`\``,

    [`\t${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`]: `\t\`\`\`\ncode\n\`\`\``,

    [`\t\t${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`]: `\t\t\`\`\`\ncode\n\`\`\``,

    [` ${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`]: ` \`\`\`\ncode\n\`\`\``,

    [`  ${m.tick}${m.tick}${m.tick}\ncode\n${m.tick}${m.tick}${m.tick}`]: `  \`\`\`\ncode\n\`\`\``,

    [`${m.tick}${m.tick}code${m.tick}${m.tick}`]: `\`\`code\`\``,

    [`${m.tick}${m.tick}code code${m.tick}${m.tick}`]: `\`\`code code\`\``,

    [`${m.tick}${m.tick}code${m.tick}${m.tick} ${m.tick}${m.tick}code${m.tick}${m.tick}`]: `\`\`code\`\` \`\`code\`\``,

    [`${m.tick}code${m.tick}`]: `\`code\``,

    [`${m.tick}code code${m.tick}`]: `\`code code\``,

    [`${m.tick}code${m.tick} ${m.tick}code${m.tick}`]: `\`code\` \`code\``,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(placeMarkdownCodeTicks(key, configKeepMarkdownCodeBlocks)).toBe(testCase[key]);
    });
  });
});

describe("Ignore markdown code ticks:", () => {
  let testCase = {
    [`\`\`\`\ncode\n\`\`\``]: `\`\`\`\ncode\n\`\`\``,

    [`\t\`\`\`\ncode\n\`\`\``]: `\t\`\`\`\ncode\n\`\`\``,

    [`\t\t\`\`\`\ncode\n\`\`\``]: `\t\t\`\`\`\ncode\n\`\`\``,

    [` \`\`\`\ncode\n\`\`\``]: ` \`\`\`\ncode\n\`\`\``,

    [`  \`\`\`\ncode\n\`\`\``]: `  \`\`\`\ncode\n\`\`\``,

    [`\`\`code\`\``]: `\`\`code\`\``,

    [`\`\`code code\`\``]: `\`\`code code\`\``,

    [`\`\`code\`\` \`\`code\`\``]: `\`\`code\`\` \`\`code\`\``,

    [`\`code\``]: `\`code\``,

    [`\`code code\``]: `\`code code\``,

    [`\`code\` \`code\``]: `\`code\` \`code\``,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(identifyMarkdownCodeTicks(key, configIgnoreMarkdownCodeBlocks)).toBe(testCase[key]);
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(placeMarkdownCodeTicks(key, configIgnoreMarkdownCodeBlocks)).toBe(testCase[key]);
    });
  });
});
