const helpers = require('../utils/helpers');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));
  lines.splice(lastImportIndex += 1, 0, "import moment from 'moment';");
  return lines;
}

function addFormatDateFilter(lines, lastImportIndex) {
  lines[lastImportIndex] += '\n';
  lines[lastImportIndex] += `
Vue.filter('formatDate', (v, isUTC = true, dateFormat = 'YYYY-MM-DD HH:mm:ss') => {
  if (v) {
    return isUTC ? moment.utc(v).local().format(dateFormat) : moment.utc(v).format(dateFormat);
  }

  return '';
});`;
  return lines;
}

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      moment: '^2.27.0',
    },
  });
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, (lineups) => {
      let lines = addAbsoluteImports(lineups);

      lines.reverse();
      const lastImportIndex = lines.findIndex(line => line.match(/^import/));
      lines[lastImportIndex] += '\nVue.prototype.$moment = moment;';
      lines = addFormatDateFilter(lines, lastImportIndex);
      lines.reverse().join('\n');
      return lines;
    });
  });
};
