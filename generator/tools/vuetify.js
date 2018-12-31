const helpers = require('../utils/helpers');
const polyfill = require('../utils/polyfill');
const alaCarte = require('../utils/alaCarte');
const fonts = require('./fonts');

/**
 * If you switch from partial import to full import.
 * You need to remove the `transform-imports` configuration added for the partial import in the `babel.config.js` file.
 * Finally, you need to rerun the service.
 */
/* eslint-disable no-template-curly-in-string */
function removeTransformImports(api) {
  // ~~vuetify.preventFullImport = false;~~
  helpers.updateBabelConfig(api, (cfg) => {
    if (cfg.plugins) {
      for (let i = 0, len = cfg.plugins.length; i < len; i += 1) {
        const temp = cfg.plugins[i];
        if (temp[0] === 'transform-imports' && temp[1] && temp[1].vuetify) {
          const { vuetify } = temp[1];
          if (vuetify.transform === 'vuetify/es5/components/${member}' && vuetify.preventFullImport) {
            cfg.plugins.splice(i, 1);
            return cfg;
          }
        }
      }
    }

    return cfg;
  });
}

module.exports = (api, opts, rootOptions) => {
  api.extendPackage({
    dependencies: {
      vuetify: '^1.2.3',
    },
    devDependencies: {

    },
  });

  polyfill.addDependencies(api);
  opts.import === 'partial' && alaCarte.addDependencies(api);
  opts.installFonts && fonts.addDependencies(api, opts.iconFont);
  // opts.installFonts && fonts.addImports(api, opts.iconFont);

  api.injectImports(api.entryFile, "import './plugins/vuetify';");
  const files = {
    './src/plugins/vuetify.js': '../plugins/vuetify/index.js',
    './src/components/snackbar/index.js': '../plugins/vuetify/components/snackbar/index.js',
    './src/components/snackbar/src/main.js': '../plugins/vuetify/components/snackbar/src/main.js',
    './src/components/snackbar/src/VMain.vue': '../plugins/vuetify/components/snackbar/src/VMain.vue',
  };

  api.render(files, { opts: { ...opts, fontsData: fonts.fonts }}, { rootOptions });
  if (opts.customTheme) {
    const files = {
      './src/stylus/main.styl': '../plugins/vuetify/template/stylus/main.styl',
    };

    api.render(files, opts);
    api.extendPackage({
      dependencies: {

      },
      devDependencies: {
        stylus: '^0.54.5',
        'css-loader': '^1.0.0',
        'stylus-loader': '^3.0.2',
      },
    });
  }

  api.onCreateComplete(() => {
    polyfill.updateBabelConfig(api);
    polyfill.updateBrowsersList(api);
    polyfill.addImports(api);
    opts.import === 'partial' && alaCarte.updateBabelConfig(api);
    !opts.installFonts && fonts.addLinks(api, opts.iconFont);

    // hack
    opts.import === 'full' && removeTransformImports(api);
  });
};
