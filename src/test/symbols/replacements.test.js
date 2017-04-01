import {fixSymbols} from "../../lib/symbols/replacements";
import assert from 'assert';

describe('Replace following symbols\n', () => {
	let testCase = {
		"+- +-": "± ±",
		"-+ -+": "± ±",
	};

	Object.keys(testCase).forEach((key) => {
		it("should replace following symbols", () => {
			assert.equal(fixSymbols(key), testCase[key]);
		});
	});
});
