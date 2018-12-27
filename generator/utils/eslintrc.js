const helpers = require('./helpers');

module.exports = (api) => {
  helpers.updateEslintrc(api, (cfg) => {
    if (!cfg.rules) {
      cfg.rules = {};
    }

    const { rules } = cfg;

    Object.assign(rules, { 'no-console': 0 });
    Object.assign(rules, { 'no-shadow': 0 });
    Object.assign(rules, { 'operator-linebreak': [2, 'before'] });
    Object.assign(rules, {
      'max-len': ['error', {
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        code: 120,
      }],
    });
    Object.assign(rules, {
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
        ],
      }],
    });

    return cfg;
  });
};
