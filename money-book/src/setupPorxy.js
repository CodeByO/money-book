const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api'),
        proxy.createProxyMiddleware({
            target:'http://192.168.0.14:8081',
            changeOrigin: true,
        })
    );
};