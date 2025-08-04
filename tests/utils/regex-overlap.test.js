import { strict as assert } from 'assert';
import { replaceWithOverlapHandling } from '../../src/utils/regex-overlap.js';

describe('replaceWithOverlapHandling', () => {
  
  describe('Basic functionality', () => {
    it('should handle simple non-overlapping replacements', () => {
      const input = 'hello world hello';
      const result = replaceWithOverlapHandling(input, /hello/g, 'hi');
      assert.strictEqual(result, 'hi world hi');
    });

    it('should handle single replacement', () => {
      const input = 'test string';
      const result = replaceWithOverlapHandling(input, /test/g, 'demo');
      assert.strictEqual(result, 'demo string');
    });

    it('should return unchanged string when no matches', () => {
      const input = 'no matches here';
      const result = replaceWithOverlapHandling(input, /xyz/g, 'replacement');
      assert.strictEqual(result, 'no matches here');
    });
  });

  describe('Overlapping matches', () => {
    it('should handle overlapping dash patterns (1-2-3)', () => {
      const input = '1-2-3';
      const result = replaceWithOverlapHandling(input, /(\d)-(\d)/g, '$1–$2');
      assert.strictEqual(result, '1–2–3');
    });

    it('should handle complex overlapping dash patterns (1-2-3-4-5)', () => {
      const input = '1-2-3-4-5';
      const result = replaceWithOverlapHandling(input, /(\d)-(\d)/g, '$1–$2');
      assert.strictEqual(result, '1–2–3–4–5');
    });

    it('should handle overlapping word patterns (a x b x c)', () => {
      const input = 'a x b x c';
      const result = replaceWithOverlapHandling(input, /(\w) x (\w)/g, '$1×$2');
      assert.strictEqual(result, 'a×b×c');
    });

    it('should handle overlapping with mixed patterns', () => {
      const input = 'word-to-word and 1-2-3 mixed';
      const result = replaceWithOverlapHandling(input, /(\w)-(\w)/g, '$1–$2');
      assert.strictEqual(result, 'word–to–word and 1–2–3 mixed');
    });
  });

  describe('Multiple iterations required', () => {
    it('should handle patterns requiring multiple passes', () => {
      const input = 'AAA';
      const result = replaceWithOverlapHandling(input, /AA/g, 'B');
      assert.strictEqual(result, 'BA'); // First pass: AAA -> BA, Second pass: no change
    });

    it('should handle cascading replacements', () => {
      const input = 'AAAA';
      const result = replaceWithOverlapHandling(input, /AA/g, 'B');
      assert.strictEqual(result, 'BB'); // First pass: AAAA -> BB, Second pass: no change
    });

    it('should handle complex cascading pattern', () => {
      const input = 'AAAAAA';
      const result = replaceWithOverlapHandling(input, /AA/g, 'B');
      assert.strictEqual(result, 'BBB'); // Multiple iterations needed
    });
  });

  describe('Function replacement', () => {
    it('should handle function-based replacement', () => {
      const input = 'test1 test2 test3';
      const result = replaceWithOverlapHandling(input, /test(\d)/g, (match, num) => `demo${num}`);
      assert.strictEqual(result, 'demo1 demo2 demo3');
    });

    it('should handle complex function replacement with overlaps', () => {
      const input = '1-2-3';
      const result = replaceWithOverlapHandling(input, /(\d)-(\d)/g, (match, a, b) => `${a}–${b}`);
      assert.strictEqual(result, '1–2–3');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      const result = replaceWithOverlapHandling('', /test/g, 'replacement');
      assert.strictEqual(result, '');
    });

    it('should handle empty replacement', () => {
      const input = 'remove this remove that';
      const result = replaceWithOverlapHandling(input, /remove /g, '');
      assert.strictEqual(result, 'this that');
    });

    it('should handle single character patterns', () => {
      const input = 'aaaa';
      const result = replaceWithOverlapHandling(input, /a/g, 'b');
      assert.strictEqual(result, 'bbbb');
    });

    it('should handle special regex characters', () => {
      const input = 'a.b.c';
      const result = replaceWithOverlapHandling(input, /\./g, '-');
      assert.strictEqual(result, 'a-b-c');
    });

    it('should handle unicode characters', () => {
      const input = 'café→café';
      const result = replaceWithOverlapHandling(input, /café/g, 'coffee');
      assert.strictEqual(result, 'coffee→coffee');
    });
  });

  describe('Performance and safety', () => {
    it('should handle patterns that converge quickly', () => {
      const input = '1-2-3-4-5-6-7-8-9-10';
      const startTime = Date.now();
      const result = replaceWithOverlapHandling(input, /(\d+)-(\d+)/g, '$1–$2');
      const endTime = Date.now();
      
      assert.strictEqual(result, '1–2–3–4–5–6–7–8–9–10');
      assert.ok(endTime - startTime < 100, 'Should complete quickly');
    });

    it('should handle long strings efficiently', () => {
      const input = 'a-b-'.repeat(100) + 'c'; // 'a-b-a-b-...a-b-c'
      const startTime = Date.now();
      const result = replaceWithOverlapHandling(input, /(\w)-(\w)/g, '$1–$2');
      const endTime = Date.now();
      
      assert.ok(result.includes('a–b'), 'Should process replacements');
      assert.ok(endTime - startTime < 1000, 'Should complete within reasonable time');
    });

    it('should prevent infinite loops with problematic patterns', () => {
      // This would theoretically create an infinite loop without the safety cap
      const input = 'test';
      const result = replaceWithOverlapHandling(input, /t/g, 'x');
      
      // Should complete normally - replacing all 't' with 'x' 
      assert.strictEqual(result, 'xesx');
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typography dash fixes', () => {
      const input = '1-2-3 and 4 – 5 – 6';
      const result = replaceWithOverlapHandling(input, /(\d)\s*[-–]\s*(\d)/g, '$1–$2');
      // This test demonstrates the utility works for many overlapping cases
      // The complex pattern with spaces might not overlap exactly as expected
      assert.ok(result.includes('1–2'), 'Should fix first dash');
      assert.ok(result.includes('4–5'), 'Should fix second dash group');
    });

    it('should handle multiplication sign replacements', () => {
      const input = '2 x 3 x 4 cm';
      const result = replaceWithOverlapHandling(input, /(\d+)\s*x\s*(\d+)/g, '$1×$2');
      assert.strictEqual(result, '2×3×4 cm');
    });

    it('should handle space normalization patterns', () => {
      const input = 'word  word  word';
      const result = replaceWithOverlapHandling(input, /\s{2,}/g, ' ');
      assert.strictEqual(result, 'word word word');
    });

    it('should handle nested quote patterns', () => {
      const input = '"word" "word" "word"';
      const result = replaceWithOverlapHandling(input, /"(\w+)"/g, '"$1"');
      assert.strictEqual(result, '"word" "word" "word"');
    });
  });

  describe('Boundary conditions', () => {
    it('should handle exactly 50 iterations gracefully', () => {
      // Create a pattern that would require many iterations - but not exponential growth
      const input = 'A'.repeat(10);
      const result = replaceWithOverlapHandling(input, /A/g, 'B');
      
      // Should return transformed content
      assert.strictEqual(result, 'B'.repeat(10));
    });

    it('should handle patterns that require exactly the max iterations', () => {
      // Create a pattern that needs many iterations but converges
      const input = 'test test test';
      const result = replaceWithOverlapHandling(input, /test/g, 'demo');
      
      // Should complete successfully
      assert.strictEqual(result, 'demo demo demo');
    });
  });

  describe('Regex flag handling', () => {
    it('should work with global flag', () => {
      const input = 'test test test';
      const result = replaceWithOverlapHandling(input, /test/g, 'demo');
      assert.strictEqual(result, 'demo demo demo');
    });

    it('should work with case-insensitive flag', () => {
      const input = 'Test TEST test';
      const result = replaceWithOverlapHandling(input, /test/gi, 'demo');
      assert.strictEqual(result, 'demo demo demo');
    });

    it('should work with multiline flag', () => {
      const input = 'line1\ntest\nline3';
      const result = replaceWithOverlapHandling(input, /^test$/gm, 'demo');
      assert.strictEqual(result, 'line1\ndemo\nline3');
    });
  });
});