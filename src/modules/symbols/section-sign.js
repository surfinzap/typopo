function addSpaceBeforeSectionSign(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^${locale.spaces}${locale.sectionSign}${locale.openingBrackets}])` + 
      `(${locale.sectionSign})`,
      "g"
    ),
    `$1${locale.space}$2`
  );
}

//

function addNbspAfterSectionSign(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${locale.sectionSign})` + 
      `([^${locale.spaces}${locale.sectionSign}])`,
      "g"
    ),
    `$1${locale.nbsp}$2`
  );
}

//

function replaceSpacesAfterSectionSign(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${locale.sectionSign})` + 
      `([${locale.spaces}])`,
      "g"
    ),
    `$1${locale.nbsp}`
  );
}

//

export function fixSectionSign(string, locale) {
  string = addSpaceBeforeSectionSign(string, locale);
  string = addNbspAfterSectionSign(string, locale);
  string = replaceSpacesAfterSectionSign(string, locale);

  return string;
}
