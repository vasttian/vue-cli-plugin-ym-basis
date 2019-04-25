module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'vue-echarts': '^4.0.1',
      echarts: '^4.2.1',
    },
  });

  const files = {
    './src/plugins/echarts.js': '../plugins/echarts/index.js',
  };

  api.render(files, { opts });
  api.injectImports(api.entryFile, "import './plugins/echarts';");
};
