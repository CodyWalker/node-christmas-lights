var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/browserVR.js',
  target: "web",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    modules: [
      "node_modules",
    ],

    extensions: [".js", ".css"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
    })
  ],
  /*plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ],*/
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000
  }
};
