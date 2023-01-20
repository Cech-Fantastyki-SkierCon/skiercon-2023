require('dotenv').config()
const { generateApi } = require('swagger-typescript-api')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

axios
  .get(process.env.PUBLIC_API_URL.replace(/\/$/, '') + '/api-json')
  .then(res => {
    return generateApi({
      spec: res.data,
      httpClientType: 'axios',
    })
  })
  .then(({ files }) => {
    files.forEach(({ content }) => {
      fs.writeFileSync(
        path.join(__dirname, 'src/', '__gen-api.ts'),
        '// @ts-nocheck\n' + content
      )
    })
  })
