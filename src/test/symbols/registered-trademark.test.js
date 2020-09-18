import {fixRegisteredTrademark} from "../../lib/symbols/registered-trademark";
import assert from 'assert';
import Locale from "../../locale/locale";

describe('Fix registered trademark ®\n', () => {
	let testCase = {
		"(r)": "®",
		"(R)": "®",
		"( r )": "®",
		"Company (r)": "Company®",
		"Company ®": "Company®",
		"Section 7(r)": "Section 7(r)",
	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.strictEqual(fixRegisteredTrademark(key, new Locale("en-us")), testCase[key]);
		});
	});
});
