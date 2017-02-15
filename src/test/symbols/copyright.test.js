import {fixCopyright} from "../../lib/symbols/copyright";
import assert from 'assert';
import Locale from "../../locale/locale";

describe('Fix copyright ©\n', () => {
	let testCase = {
		"Company (c)2017": "Company © 2017",
		"Company (C)2017": "Company © 2017",
		"Company ©2017": "Company © 2017",
		"Company © 2017": "Company © 2017",
		"Company(c) 2017": "Company © 2017",
		"Company(C) 2017": "Company © 2017",
		"Company© 2017": "Company © 2017",
		"Sec­tion 7(c)": "Sec­tion 7(c)",
	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixCopyright(key, new Locale("en-us")), testCase[key]);
		});
	});
});
