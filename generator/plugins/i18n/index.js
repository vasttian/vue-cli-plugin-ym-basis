const helpers = require('../../utils/helpers');

function addLocale(api, rootOptions, lines, lastImportIndex) {
  lines[lastImportIndex] += '\n';
  lines[lastImportIndex] += `
const supportedLangs = ['zh-CN', 'en'];
const userLocale = navigator.language || navigator.userLanguage;

if (userLocale.match(/^zh/i)) {
  userLocale = 'zh';
} else if (userLocale.match(/^en/i)) {
  userLocale = 'en';
}

Vue.router.beforeEach((to, from, next) => {
  const { locale } = to.query;

  if (locale) {
    /* eslint-disable no-param-reassign */
    delete to.query.locale;
    if (supportedLangs.includes(locale)) {
      i18n.locale = locale;
      localStorage.setItem('${rootOptions.projectName.toUpperCase()}_LANGUAGE', locale);
    }
  }

  next();
});
i18n.locale = localStorage.getItem('${rootOptions.projectName.toUpperCase()}_LANGUAGE')
  || (supportedLangs.includes(userLocale) ? userLocale : 'zh-CN');
Vue.prototype.$locale.use(i18n.locale);`;

  return lines;
}

module.exports = (api, opts, rootOptions) => {
  api.render('./template', opts);
  api.extendPackage({
    dependencies: {
      'vue-i18n': '^8.0.0',
    },
  });
  api.injectImports(api.entryFile, "import i18n from './i18n';");
  api.injectRootOptions(api.entryFile, 'i18n');
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, (lines) => {
      lines.reverse();
      const lastImportIndex = lines.findIndex(line => line.match(/^import/));

      addLocale(api, rootOptions, lines, lastImportIndex);
      lines.reverse().join('\n');
      return lines;
    });
  });
};

