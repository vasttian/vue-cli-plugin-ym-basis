module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      'ym-svg-sprite': '^1.3.0',
    },
  });
  const files = {
    './src/plugins/ym-svg-sprite.js': '../plugins/svg/index.js',
  };

  api.render(files);
  api.injectImports(api.entryFile, "import './plugins/ym-svg-sprite';");
};
