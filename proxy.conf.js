const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'https://us-central1-gobag-delivery.cloudfunctions.net',
        secure: true,
        logLevel: 'debug',
        pathRewrite: { '^/api':'' }
    }
];

module.exports = PROXY_CONFIG;