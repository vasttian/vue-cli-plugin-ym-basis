const helpers = require('./utils/helpers');

module.exports = (api) => {
  api.injectImports(api.entryFile, "import API from './api';");
  api.injectImports(api.entryFile, "import * as consts from './utils/consts';");
  api.injectImports(api.entryFile, "import './utils/compatible-ie';");
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, (lines) => {
      let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));
      lines.splice(lastImportIndex += 1, 0, "import '@/styles/index.scss';");
      return lines;
    });
  });
};
