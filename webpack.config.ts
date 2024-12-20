// webpack.config.ts

import webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';
import dotenv from 'dotenv';

// Загрузите переменные окружения из .env файла
const env = dotenv.config().parsed || {};

// Преобразуйте переменные окружения в формат, подходящий для DefinePlugin
const envKeys: Record<string, string> = Object.keys(env).reduce<
  Record<string, string>
>((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
    environment: {
      arrowFunction: false,
    },
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '404.html',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  devServer: {
    compress: true,
    port: 9000,
    watchFiles: ['src/index.html'],
    historyApiFallback: true,
  },
};

export default config;
