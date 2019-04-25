// example
<%_ if (organization || hamlet) { _%>
const authApi = 'http://172.16.24.42:17510/';
<%_ } else { _%>
const authApi = 'xxx';
<%_ } _%>
const commonApi = 'xxx';

module.exports = {
  devServer: {
    proxy: {
      '/api/auth': {
        target: authApi,
        changeOrigin: true,
        pathRewrite: { '/api/auth': '/auth' },
      },
      '/api/common': {
        target: commonApi,
        changeOrigin: true,
        pathRewrite: { '/api/common': '/api' },
      },
    },
    host: '0.0.0.0',
    port: 8090,
    https: false,
    open: false,
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  css: {
    sourceMap: true,
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  <%_ if (echarts) { _%>
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
  ],
  <%_ } _%>
};

