import {fixExponents,
				fixSquares,
				fixCubes} from "../../lib/symbols/exponents";
import assert from 'assert';
import Locale from "../../locale/locale";

describe('Fix squares\n', () => {
	let testCase = {
		"100 m2" : "100 m²",
		"100 dam2" : "100 dam²",
		"100 hm2" : "100 hm²",
		"100 km2" : "100 km²",
		"100 Mm2" : "100 Mm²",
		"100 Gm2" : "100 Gm²",
		"100 Tm2" : "100 Tm²",
		"100 Pm2" : "100 Pm²",
		"100 Em2" : "100 Em²",
		"100 Zm2" : "100 Zm²",
		"100 Ym2" : "100 Ym²",
		"100 dm2" : "100 dm²",
		"100 cm2" : "100 cm²",
		"100 mm2" : "100 mm²",
		"100 µm2" : "100 µm²",
		"100 nm2" : "100 nm²",
		"100 pm2" : "100 pm²",
		"100 fm2" : "100 fm²",
		"100 am2" : "100 am²",
		"100 zm2" : "100 zm²",
		"100 ym2" : "100 ym²",
		"Holmen 80 g/m2" : "Holmen 80 g/m²",
		"Madam2" : "Madam2", //false positive

	// m2
	// dam2
	// hm2
	// km2
	// Mm2
	// Gm2
	// Tm2
	// Pm2
	// Em2
	// Zm2
	// Ym2
	// m2
	// dm2
	// cm2
	// mm2
	// µm2
	// nm2
	// pm2
	// fm2
	// am2
	// zm2
	// ym2
	};

	Object.keys(testCase).forEach((key) => {
		it("unit tests", () => {
			assert.strictEqual(fixSquares(key, new Locale("en-us")), testCase[key]);
		});
	});
	Object.keys(testCase).forEach((key) => {
		it("module tests", () => {
			assert.strictEqual(fixExponents(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Fix cubes\n', () => {
	let testCase = {
		"100 m3" : "100 m³",
		"100 dam3" : "100 dam³",
		"100 hm3" : "100 hm³",
		"100 km3" : "100 km³",
		"100 Mm3" : "100 Mm³",
		"100 Gm3" : "100 Gm³",
		"100 Tm3" : "100 Tm³",
		"100 Pm3" : "100 Pm³",
		"100 Em3" : "100 Em³",
		"100 Zm3" : "100 Zm³",
		"100 Ym3" : "100 Ym³",
		"100 dm3" : "100 dm³",
		"100 cm3" : "100 cm³",
		"100 mm3" : "100 mm³",
		"100 µm3" : "100 µm³",
		"100 nm3" : "100 nm³",
		"100 pm3" : "100 pm³",
		"100 fm3" : "100 fm³",
		"100 am3" : "100 am³",
		"100 zm3" : "100 zm³",
		"100 ym3" : "100 ym³",
		"Holmen 80 g/m3" : "Holmen 80 g/m³",
		"Madam3" : "Madam3", //false positive
	};

	Object.keys(testCase).forEach((key) => {
		it("unit tests", () => {
			assert.strictEqual(fixCubes(key, new Locale("en-us")), testCase[key]);
		});
	});
	Object.keys(testCase).forEach((key) => {
		it("module tests", () => {
			assert.strictEqual(fixExponents(key, new Locale("en-us")), testCase[key]);
		});
	});
});
