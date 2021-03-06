const fs = require('fs');

/* eslint-disable global-require */
function updateBabelConfig(api, callback) {
  let config = null;
  let configPath = null;
  const rcPath = api.resolve('./babel.config.js');
  const pkgPath = api.resolve('./package.json');

  if (fs.existsSync(rcPath)) {
    configPath = rcPath;
    config = callback(require(rcPath));
  } else if (fs.existsSync(pkgPath)) {
    configPath = pkgPath;
    config = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf8' }));
    if (config.babel) {
      config.babel = callback(config.babel);
    } else {
      // TODO: error handling here?
    }
  }

  if (configPath) {
    const moduleExports = configPath !== pkgPath ? 'module.exports = ' : '';
    fs.writeFileSync(
      configPath,
      `${moduleExports}${JSON.stringify(config, null, 2)}`,
      { encoding: 'utf8' },
    );
  } else {
    // TODO: handle if babel config doesn't exist
  }
}

function updateEslintrc(api, callback) {
  let config = null;
  let configPath = null;
  const rcPath = api.resolve('.eslintrc.js');
  const pkgPath = api.resolve('./package.json');

  if (fs.existsSync(rcPath)) {
    configPath = rcPath;
    config = callback(require(rcPath));
  } else if (fs.existsSync(pkgPath)) {
    configPath = pkgPath;
    config = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf8' }));
    if (config.babel) {
      config.babel = callback(config.babel);
    } else {
      // TODO: error handling here?
    }
  }

  if (configPath) {
    const moduleExports = configPath !== pkgPath ? 'module.exports = ' : '';

    fs.writeFileSync(
      configPath,
      `${moduleExports}${JSON.stringify(config, null, 2)}`,
      { encoding: 'utf8' },
    );
  } else {
    // TODO: handle if babel config doesn't exist
  }
}

function updateFile(api, file, callback) {
  const tempFile = api.resolve(file);
  let content = fs.existsSync(tempFile) ? fs.readFileSync(tempFile, { encoding: 'utf8' }) : '';

  content = callback(content.split(/\r?\n/g)).join('\n');
  fs.writeFileSync(tempFile, content, { encoding: 'utf8' });
}

module.exports = {
  updateBabelConfig,
  updateEslintrc,
  updateFile,
};
