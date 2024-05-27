const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );

module.exports = function( env, argv ) {
  const isDev = 'development' === argv.mode ? true : false;
  return {
    devtool: isDev ? 'source-map' : false,
    entry: {
      'app': './app/app.js',
      'shortcode': './assets/src/js/shortcode.js'
    },
    output: {
      path: path.join( __dirname, 'assets/dist/js' ),
      filename: '[name].js'
    },
    watchOptions: {
      ignored: [ 'node_modules', path.join( __dirname, 'assets/dist' ) ]
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.css$/i,
          use: [ MiniCssExtractPlugin.loader, 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(js|jsx)$/, // Identifies which file or files should be transformed.
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          exclude: /(node_modules|bower_components)/ // JavaScript files to be ignored.
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({

        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '../css/[name].css'
      })
    ],
    optimization: isDev ?
      {
          minimizer: [
            new CssMinimizerPlugin(),
          ]
        } :
      {}
  };
};
