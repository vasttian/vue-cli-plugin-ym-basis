const helpers = require('../utils/helpers');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));

  lines.splice(lastImportIndex += 1, 0, "import 'normalize.css/normalize.css';");

  return lines;
}

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      'normalize.css': '^8.0.1',
    },
  });
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, (lineups) => {
      const lines = addAbsoluteImports(lineups);

      lines.reverse();
      return lines;
    });
  });
};
