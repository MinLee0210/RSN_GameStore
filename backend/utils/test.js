const config = require('dotenv').config({ path: '../.env' })

url = config.process.env.URL

console.log(url)
