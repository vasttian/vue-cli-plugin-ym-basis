module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'vue-echarts': '^5.0.0-beta.0',
      echarts: '^4.8.0',
    },
  });

  const files = {
    './src/plugins/echarts.js': '../plugins/echarts/index.js',
  };

  api.render(files, { opts });
  api.injectImports(api.entryFile, "import './plugins/echarts';");
};
