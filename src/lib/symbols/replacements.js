const symbols = {
  "\\(R\\)": "®",
  "\\(r\\)": "®",
  "\\+\\-": "±",
  "\\-\\+": "±",
};

export function fixSymbols(string) {
	for (var symbol in symbols) {
		const re = new RegExp(symbol, "g");
		string = string.replace(re, symbols[symbol]);
	}
	return string;
}
