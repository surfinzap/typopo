import {replaceSymbols} from "../../lib/symbols/replacements";
import assert from 'assert';

describe('Replace following symbols\n', () => {
	let testCase = {
		"(C) (C)": "© ©",
		"(c) (c)": "© ©",
		"(P) (P)": "℗ ℗",
		"(p) (p)": "℗ ℗",
		"(R) (R)": "® ®",
		"(r) (r)": "® ®",
		"(tm) (tm)": "™ ™",
		"(TM) (TM)": "™ ™",
		"+- +-": "± ±",
		"-+ -+": "± ±",
	};

	Object.keys(testCase).forEach((key) => {
		it("should replace following symbols", () => {
			assert.equal(replaceSymbols(key), testCase[key]);
		});
	});
});
