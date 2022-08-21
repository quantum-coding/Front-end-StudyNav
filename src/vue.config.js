module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': resolve('./src/util/icon.js')
      }
    },
    devtool: 'cheap-module-eval-source-map'
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/global.less')
      ]
    }
  },

  devServer: {
    proxy: 'http://localhost:3000'
  }

}