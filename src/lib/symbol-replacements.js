const symbols = {
  "\\(C\\)": "©",
  "\\(c\\)": "©",
	"\\(P\\)": "℗",
	"\\(p\\)": "℗",
  "\\(R\\)": "®",
  "\\(r\\)": "®",
  "\\(TM\\)": "™",
  "\\(tm\\)": "™",
  "\\+\\-": "±",
  "\\-\\+": "±",
};

export function replaceSymbols(string) {
	for (var symbol in symbols) {
		const re = new RegExp(symbol, "g");
		string = string.replace(re, symbols[symbol]);
	}
	return string;
}
