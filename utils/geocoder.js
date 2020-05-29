const NodeGeocoder = require('node-geocoder')

const options = {
    provider: process.env.GEO_CODER_PROVIDER,
    apiKey: process.env.GEO_CODER_API, // for Mapquest, OpenCage, Google Premier
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder