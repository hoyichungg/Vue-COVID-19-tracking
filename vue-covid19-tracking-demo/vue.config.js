module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.covidtracking.com/v1/us/daily.json',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
<<<<<<< HEAD
          '^/api': ''
=======
          '^/api': '',
>>>>>>> 8fe965ff030dca83c01589cb73e565dbbb7713ec
        },
      },
    }
  }
}