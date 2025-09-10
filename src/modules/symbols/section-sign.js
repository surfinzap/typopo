import { base } from "../../const.js";

function addSpaceBeforeSectionSign(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^${base.spaces}${base.sectionSign}${base.openingBrackets}])` + 
      `(${base.sectionSign})`,
      "g"
    ),
    `$1${base.space}$2`
  );
}

//

function addNbspAfterSectionSign(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${base.sectionSign})` + 
      `([^${base.spaces}${base.sectionSign}])`,
      "g"
    ),
    `$1${base.nbsp}$2`
  );
}

//

function replaceSpacesAfterSectionSign(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${base.sectionSign})` + 
      `([${base.spaces}])`,
      "g"
    ),
    `$1${base.nbsp}`
  );
}

//

export function fixSectionSign(string) {
  string = addSpaceBeforeSectionSign(string);
  string = addNbspAfterSectionSign(string);
  string = replaceSpacesAfterSectionSign(string);

  return string;
}
