'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/backend"',
  FULL_URL: '"http://qmadmin.haitaogoods.com"' // 后台测试接口地址
})
