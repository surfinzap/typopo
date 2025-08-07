// performance-test.js
const { performance } = require("perf_hooks");

// Load the minified version
const typopo = require("../dist/typopo_dist.min.js");

function generateBadlyFormattedText(length) {
  const badPatterns = [
    'This is "badly formatted" text with wrong quotes.',
    "Numbers like 12 - 15 should have proper dashes.",
    "Spaces    are    inconsistent   throughout.",
    "Apostrophes like dont and wont are wrong.",
    "Ellipsis like ... should be proper.",
    "Copyright (c) should be ©.",
    "Multiple  spaces  everywhere.",
    "ISBN 978-80- 902734—1-6 is wrongly formatted.",
    "Temperature is +- 25 degrees.",
    '"Nested quotes are "problematic" here".',
    "Let's test this: “however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said”",
    "Philip K.Dick",
  ];

  let text = "";
  let patternIndex = 0;

  while (text.length < length) {
    text += badPatterns[patternIndex % badPatterns.length] + " ";
    patternIndex++;
  }

  return text.substring(0, length);
}

function runPerformanceTest(textLength, iterations = 1000) {
  const testText = generateBadlyFormattedText(textLength);
  const times = [];

  // Warm up
  for (let i = 0; i < 5; i++) {
    typopo.fixTypos(testText, "en-us");
  }

  // Actual test
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const result = typopo.fixTypos(testText, "en-us");
    const end = performance.now();
    times.push(end - start);
  }

  // Calculate statistics
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const medianTime = times.sort((a, b) => a - b)[Math.floor(times.length / 2)];

  console.log(`=== Performance Results (${testText.length} chars) ===`);
  console.log(`Avg time:  ${avgTime.toFixed(2)}ms`);
  console.log(`Med time:  ${medianTime.toFixed(2)}ms`);
  console.log(`Min time:  ${minTime.toFixed(2)}ms`);
  console.log(`Max time:  ${maxTime.toFixed(2)}ms`);
  console.log(`Char/ms:   ${(testText.length / avgTime).toFixed(0)}\n`);

  return { avgTime, minTime, maxTime, medianTime, textLength: testText.length };
}

console.log("Starting performance tests...");

// Run three batches with different character counts
const results = [];
results.push(runPerformanceTest(1000));
results.push(runPerformanceTest(10000));
results.push(runPerformanceTest(100000));
