import {createCorrector,getDefaultConfiguration} from '../src/typopo.js';
import assert from 'assert';

describe('Multiple run tests', () => {
  describe('Exceptions', () => {
    it('Does not preserve exceptions', () => {
      const input1 = 'some text http://exception.com/ some text';
      const input2 = 'some text http://exception2.com/ some text';

      const correctTypos = createCorrector(getDefaultConfiguration());

      assert.equal(correctTypos(input1), input1);
      assert.equal(correctTypos(input2), input2);
    });
  });
});
