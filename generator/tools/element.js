const helpers = require('../utils/helpers');

function checkExistence(temp) {
  return temp[0] === 'component' &&
  temp[1] &&
  temp[1].libraryName === 'element-ui' &&
  temp[1].styleLibraryName;
}

/**
 * If you switch from partial import to full import.
 * You need to remove the `component` configuration added for the partial import in the `babel.config.js` file.
 * Finally, you need to rerun the service.
 */
function removeComponentPlugin(api) {
  helpers.updateBabelConfig(api, (cfg) => {
    if (cfg.plugins) {
      for (let i = 0, len = cfg.plugins.length; i < len; i += 1) {
        if (checkExistence(cfg.plugins[i])) {
          cfg.plugins.splice(i, 1);
          return cfg;
        }
      }
    }

    return cfg;
  });
}

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
    },
  });

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-component': '^1.1.1',
        'sass-loader': '^7.1.0',
        'node-sass': '^4.9.3',
      },
    });
  }

  api.injectImports(api.entryFile, "import './plugins/element';");
  const files = {
    './src/plugins/element.js': '../plugins/element/index.js',
    './src/styles/element-variables.scss': '../plugins/element/template/element-variables.scss',
  };

  api.render(files, { opts });
  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      helpers.updateBabelConfig(api, (cfg) => {
        const pluginComponent = ['component', {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk',
        }];

        cfg.plugins = cfg.plugins || [];

        // Prevent duplication
        for (let i = 0, len = cfg.plugins.length; i < len; i += 1) {
          if (checkExistence(cfg.plugins[i])) {
            return cfg;
          }
        }

        cfg.plugins.push(pluginComponent);
        return cfg;
      });
    } else {
      removeComponentPlugin(api);
    }
  });
};
