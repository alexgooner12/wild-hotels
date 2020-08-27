const contentful = require('contentful')
const contentfulConfig = require('./../config/contentfulConfig.json')

const config = {
  space: contentfulConfig.CTF_SPACE_ID,
  accessToken: process.env.environment === 'development' ? contentfulConfig.CTF_PREVIEW_TOKEN : contentfulConfig.CTF_ACCESS_TOKEN,
  host: process.env.environment === 'development' ? contentfulConfig.CTF_DEV_HOST : contentfulConfig.CTF_PROD_HOST
}

// export `createClient` to use it in page components
module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}
