const updatePremain = require('./pre-main');
const updateMain = require('./main');
// const updateFiles = require('./utils/files');
const updateEslintrc = require('./utils/eslintrc');
const prettier = require('prettier');
const i18n = require('./plugins/i18n');
const normalize = require('./tools/normalize');
const element = require('./tools/element');
const vuetify = require('./tools/vuetify');
const vueHamlet = require('./tools/vue-hamlet');
const moment = require('./tools/moment');
const vueEcharts = require('./tools/vue-echarts');

module.exports = (api, opts, rootOptions) => {
  api.render('./template', opts);

  api.extendPackage({
    scripts: {
      'build-staging': 'vue-cli-service build --mode staging',
    },
    dependencies: {
      axios: '^0.18.0',
    },
    devDependencies: {},
  });
  delete opts.registry;
  console.log('options:', opts);
  updatePremain(api, opts);
  if (opts.i18n !== 'none') {
    i18n(api, opts, rootOptions);
  }

  opts.ui === 'element' && element(api, opts, rootOptions);
  opts.ui === 'vuetify' && vuetify(api, opts, rootOptions);

  opts.hamlet && vueHamlet(api, opts);
  opts.normalize && normalize(api);
  opts.moment && moment(api);
  opts.echarts && vueEcharts(api, opts);
  opts.organization && api.render({
    './deploy': './tools/deploy',
    './fabfile.py': './tools/fabfile.py',
  }, opts);

  api.onCreateComplete(() => {
    // update main.js
    updateMain(api);

    // update .eslintrc.js
    updateEslintrc(api);
  });

  if (api.invoking) {
    api.postProcessFiles((files) => {
      // updateFiles(api, opts, files);
      // console.log('files', Object.keys(files));

      // format main.js
      files['src/main.js'] = prettier.format(files['src/main.js'], {
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        parser: 'babylon',
        trailingComma: 'all',
      });
      const needDeleteFiles = [
        'router.js',
        'store.js',
        'components/HelloWorld.vue',
        'views/About.vue',
        'views/Home.vue',
      ];
      needDeleteFiles.forEach((name) => {
        delete files[`src/${name}`];
      });
    });
  }
};
