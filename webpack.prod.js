require('dotenv').config()
const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack')
const S3Uploader = require('webpack-s3-uploader')
const DIST_DIR = path.join(__dirname, './client/dist');

console.log(process.env)

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
		path: DIST_DIR,
		filename: 'bundle.js',
		publicPath: process.env.CDN_PATH
	},
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
      cloudfrontInvalidateOptions: {
        DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
        Items: ["/*"]
      }
    })
  ]
});


//d3cgp54j81te2s.cloudfront.net