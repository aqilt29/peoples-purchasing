const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack')
const S3Uploader = require('webpack-s3-uploader')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Dotenv(),
    new S3Uploader({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-west-1',
      },
      s3UploadOptions: {
        Bucket: 'purchasing-bundle-bucket'
      },
    })
  ]
});