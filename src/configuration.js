import patterns from './patterns';


const defaultValues = {
  'remove-empty-lines': true,
  'language': 'en',
  'exceptions': {
    exceptionPatterns: ['webUrlPattern', 'emailAddressPattern'],
  },
  'patterns': patterns,
};


function objMap(obj, callback) {
  return Object.keys(obj).reduce((aggregate, key) => {
    aggregate[key] = callback(key, obj[key], obj);
    return aggregate;
  }, {});
}

function returnProp(propName) {
  return obj => obj[propName];
}

function normalizeExceptionsConfig(exceptionsConfiguration) {
  const exceptionConfig = exceptionsConfiguration || {};
  const exceptionDefaultValues = defaultValues['exceptions'];
  return objMap(exceptionDefaultValues, (key, value) => {
    if (typeof(value) !== typeof(exceptionConfig[key])) {
      return value;
    }

    return exceptionConfig[key];
  });
}

function denormalizeExceptions(config) {
  const exceptionPatterns = config.exceptions.exceptionPatterns.map(patternName => {
    if (!config.patterns[patternName]) {
      throw new Error(`Exception pattern ${patternName} is not in config.patterns.`);
    }
    return config.patterns[patternName];
  });

  return Object.assign({}, config.exceptions, {exceptionPatterns});
}

function isString(arg) {
  return typeof (arg) === 'string';
}

function isStringMap(arg) {
  return (typeof (arg) === 'object') && (Object.keys(arg).every(key => isString(arg[key])));
}

function verifyPatternsObject(patterns) {
  Object.keys(patterns).forEach((patternName) => {
    if (!isString(patterns[patternName]) && !isStringMap(patterns[patternName])) {
      throw new Error(`The pattern ${patternName} in configuration is neither a string nor a map of strings.`);
    }
  });
}

function normalizePatterns(patternsConfiguration) {
  const patternsConfig = patternsConfiguration || {};
  verifyPatternsObject(patternsConfig);

  return Object.assign({}, defaultValues['patterns'], patternsConfig);
}

const configurationNormalizer = {
  'remove-empty-lines': (value) => typeof(value) === typeof(true) ? value : defaultValues['remove-empty-lines'],
  'language': (value) => ['en', 'sk', 'cs', 'rue'].includes(value) ? value : defaultValues['language'],
  'patterns': normalizePatterns,
  'exceptions': normalizeExceptionsConfig,
};

const configurationDenormalizer = {
  'exceptions': denormalizeExceptions,
  'remove-empty-lines': returnProp('remove-empty-lines'),
  'language': returnProp('language'),
  'patterns': returnProp('patterns'),
};

export function getDefaultConfiguration() {
  return Object.assign({}, defaultValues);
}


export function normalizeConfiguration(configuration) {
  const config = configuration || {};
  const normalizedConfig = objMap(configurationNormalizer, (key, normalize) => normalize(config[key]));
  const denormalizedConfig = objMap(configurationDenormalizer, (key, denormalize) => denormalize(normalizedConfig));

  return denormalizedConfig;
}
