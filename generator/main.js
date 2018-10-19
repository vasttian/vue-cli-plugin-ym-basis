const helpers = require('./utils/helpers');

module.exports = (api) => {
  helpers.updateFile(api, api.entryFile, (lines) => {
    lines.reverse();
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += "\nimport './styles/index.scss';";

    lines[lastImportIndex] += '\n';
    lines[lastImportIndex] += '\nVue.router = router;';
    lines[lastImportIndex] += '\nVue.store = store;';
    lines[lastImportIndex] += '\n';

    // prototype
    lines[lastImportIndex] += '\nVue.prototype.$api = API;';
    lines[lastImportIndex] += '\nVue.prototype.$consts = consts;';
    lines.reverse().join('\n');

    return lines;
  });
};
