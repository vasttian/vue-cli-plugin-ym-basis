const helpers = require('../utils/helpers');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));

  lines.splice(lastImportIndex += 1, 0, "import auth from 'vue-hamlet';");
  lines.splice(lastImportIndex += 1, 0, "import { sync } from 'vuex-router-sync';");

  return lines;
}

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      'vue-hamlet': '^1.0.6',
      'vuex-router-sync': '^5.0.0',
    },
  });
  api.onCreateComplete(() => {
    helpers.updateFile(api, api.entryFile, (lineups) => {
      const lines = addAbsoluteImports(lineups);

      lines.reverse();
      const lastImportIndex = lines.findIndex(line => line.match(/^import/));

      lines[lastImportIndex] += '\n';
      lines[lastImportIndex] += `
// console.log('process.env', process.env);
Vue.use(auth, {
  appKey: process.env.VUE_APP_APP_KEY,
  // authRedirect: '/login',
  allowThirdpartyLogin: true,

  // get userinfo from own api
  // fetchUser: '/api/common/users/me',
});
`;
      lines[lastImportIndex] += '\nsync(store, router);';
      lines.reverse().join('\n');
      return lines;
    });
  });
};
