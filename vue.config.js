module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        return {
          transformAssetUrls: {
            video: ["src", "poster"],
            source: "src",
            img: "src",
            image: ["xlink:href", "href"],
            use: ["xlink:href", "href"],
            "vl-style-icon": "src",
          },
        };
      });
  },
}
