import {
  fixPubId,
  fixISSN,
  fixISBN10,
  fixISBN13,
  fixISBNnumber,
} from "../../src/modules/words/pub-id.js";
import { describe, it, expect } from "vitest";

const issnSet = {
  "ISSN 0000 - 0000":  "ISSN 0000-0000",
  "Issn 0000 - 0000":  "ISSN 0000-0000",
  "issn 0000 - 0000":  "ISSN 0000-0000",
  "ISSN 0000—0000":    "ISSN 0000-0000",
  "ISSN: 0000 - 0000": "ISSN: 0000-0000",
  "ISSN:0000 - 0000":  "ISSN: 0000-0000",
};

const isbn10Set = {
  "ISBN 80 - 902734 - 1 - 6":  "ISBN 80-902734-1-6",
  "Isbn 80 - 902734 - 1 - 6":  "ISBN 80-902734-1-6",
  "isbn 80 - 902734 - 1 - 6":  "ISBN 80-902734-1-6",
  "ISBN 80—902734—1—6":        "ISBN 80-902734-1-6",
  "ISBN: 80 - 902734 - 1 - 6": "ISBN: 80-902734-1-6",
  "ISBN:80 - 902734 - 1 - 6":  "ISBN: 80-902734-1-6",
  "ISBN:0-9752298-0-X":        "ISBN: 0-9752298-0-X",
};

const isbn13Set = {
  "ISBN 978 - 80 - 902734 - 1 - 6":  "ISBN 978-80-902734-1-6",
  "Isbn 978 - 80 - 902734 - 1 - 6":  "ISBN 978-80-902734-1-6",
  "isbn 978 - 80 - 902734 - 1 - 6":  "ISBN 978-80-902734-1-6",
  "ISBN 978 - 80—902734—1—6":        "ISBN 978-80-902734-1-6",
  "ISBN: 978 - 80 - 902734 - 1 - 6": "ISBN: 978-80-902734-1-6",
  "ISBN:978 - 80 - 902734 - 1 - 6":  "ISBN: 978-80-902734-1-6",
  "ISBN:978 - 0-9752298-0-X":        "ISBN: 978-0-9752298-0-X",
};

const isbnNumberSet = {
  "978 - 80 - 902734 - 1 - 6": "978-80-902734-1-6",
  "978- 80- 902734- 1- 6":     "978-80-902734-1-6",
  "978 -80 -902734 -1 -6":     "978-80-902734-1-6",
  "978 - 80—902734—1—6":       "978-80-902734-1-6",
  "978 - 0-9752298-0-X":       "978-0-9752298-0-X",
  "978 - 99921 - 58 - 10 - 7": "978-99921-58-10-7",
  "978 - 9971 - 5 - 0210 - 0": "978-9971-5-0210-0",
  "978 - 960 - 425 - 059 - 0": "978-960-425-059-0",
  "978 - 85 - 359 - 0277 - 5": "978-85-359-0277-5",
  "978 - 1 - 84356 - 028 - 3": "978-1-84356-028-3",
  "978 - 0 - 684 - 84328 - 5": "978-0-684-84328-5",
  "978 - 0 - 8044 - 2957 - X": "978-0-8044-2957-X",
  "978 - 0 - 85131 - 041 - 9": "978-0-85131-041-9",
  "978 - 93 - 86954 - 21 - 4": "978-93-86954-21-4",
  "978 - 0 - 943396 - 04 - 2": "978-0-943396-04-2",
  "978 - 0 - 9752298 - 0 - X": "978-0-9752298-0-X",
};

const testConfigs = [
  { name: "Fix ISSN format", testSet: issnSet, unitFn: fixISSN },
  { name: "Fix ISBN10 format", testSet: isbn10Set, unitFn: fixISBN10 },
  { name: "Fix ISBN13 format", testSet: isbn13Set, unitFn: fixISBN13 },
  { name: "Fix ISBN number", testSet: isbnNumberSet, unitFn: fixISBNnumber },
];

testConfigs.forEach(({ name, testSet, unitFn }) => {
  describe(`${name}\n`, () => {
    Object.keys(testSet).forEach((key) => {
      it("unit test", () => {
        expect(unitFn(key)).toBe(testSet[key]);
      });
      it("module test", () => {
        expect(fixPubId(key)).toBe(testSet[key]);
      });
    });
  });
});

export const pubIdSet = {
  ...issnSet,
  ...isbn10Set,
  ...isbn13Set,
  ...isbnNumberSet,
};
