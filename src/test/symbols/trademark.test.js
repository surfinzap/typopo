import {fixTrademark} from "../../lib/symbols/trademark";
import {fixTypos} from "../../typopo";
import assert from 'assert';
import Locale from "../../locale/locale";

describe('Fix trademark ™\n', () => {
	let testCase = {
		"(tm)": "™",
		"(TM)": "™",
		"( tm )": "™",
		"Company (tm)": "Company™",
		"Company ™": "Company™",
	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixTrademark(key, new Locale("en-us")), testCase[key]);
		});
	});
});
