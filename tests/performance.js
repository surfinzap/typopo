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

  const chunks = [];
  let currentLength = 0;
  let patternIndex = 0;

  while (currentLength < length) {
    const pattern = badPatterns[patternIndex % badPatterns.length] + " ";
    chunks.push(pattern);
    currentLength += pattern.length;
    patternIndex++;
  }

  return chunks.join("").substring(0, length);
}

function runPerformanceTest(textLength, iterations = 1000) {
  const testText = generateBadlyFormattedText(textLength);

  // For large texts, reduce iterations to avoid excessive runtime
  const actualIterations = textLength > 50000 ? Math.min(iterations, 100) : iterations;

  // Tracking variables for statistics (streaming calculations)
  let totalTime = 0;
  let minTime = Infinity;
  let maxTime = -Infinity;
  const sampleTimes = []; // Only store samples for median, not all times

  // Warm up
  for (let i = 0; i < 5; i++) {
    typopo.fixTypos(testText, "en-us");
  }

  for (let i = 0; i < actualIterations; i++) {
    const start = performance.now();
    const result = typopo.fixTypos(testText, "en-us");
    const end = performance.now();

    const duration = end - start;
    totalTime += duration;
    minTime = Math.min(minTime, duration);
    maxTime = Math.max(maxTime, duration);

    // Store only every 10th sample for median calculation to save memory
    if (i % Math.max(1, Math.floor(actualIterations / 100)) === 0) {
      sampleTimes.push(duration);
    }
  }

  // Calculate statistics
  const avgTime = totalTime / actualIterations;
  const medianTime =
    sampleTimes.length > 0
      ? sampleTimes.sort((a, b) => a - b)[Math.floor(sampleTimes.length / 2)]
      : avgTime;

  console.log(
    `=== Performance Results (${testText.length} chars, ${actualIterations} iterations) ===`
  );
  console.log(`Avg time:  ${avgTime.toFixed(2)}ms`);
  console.log(`Med time:  ${medianTime.toFixed(2)}ms`);
  console.log(`Min time:  ${minTime.toFixed(2)}ms`);
  console.log(`Max time:  ${maxTime.toFixed(2)}ms`);
  console.log(`Char/ms:   ${(testText.length / avgTime).toFixed(0)}`);
  console.log(`Total time: ${(totalTime / 1000).toFixed(2)}s\n`);

  return {
    avgTime,
    minTime,
    maxTime,
    medianTime,
    textLength: testText.length,
    iterations: actualIterations,
  };
}

console.log("Starting performance tests...");

// Run three batches with different character counts
const results = [];
results.push(runPerformanceTest(1000));
results.push(runPerformanceTest(10000));
results.push(runPerformanceTest(100000));
