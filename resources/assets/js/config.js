if(process.env.NODE_ENV === 'production')
    var path = 'https://api.yourproductondomain.com/'
else
    var path = 'http://api.yourlocalvirtualdomain.local/'

const apiPath = path;
const imagePath = 'https://example.s3.eu-west-1.amazonaws.com/'
const gAnalyticsId = 'UA-123456789-1'
export {
    apiPath,
    imagePath,
    gAnalyticsId
}