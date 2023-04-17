module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["www.ekko-wp.com", "www.aiksol.com", "www.teamsuite.app"], //Domain of image host
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /.(mp4|webm)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: false,
          fallback: "file-loader",
          publicPath: "/_next/static/videos/",
          outputPath: "static/videos/",
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
};
