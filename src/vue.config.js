module.exports = {
  configureWebpack: {
      resolve: {
          alias:{
              '@ant-design/icons/lib/dist$': resolve('./src/util/icon.js')
          }
      }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/global.less')
      ]
    }
  }

}