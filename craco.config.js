const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use(
        '/gemini',
        createProxyMiddleware({
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          pathRewrite: { '^/gemini': '' },
          on: {
            proxyReq: (proxyReq) => {
              // API key URL se automatically pass hoti hai
            },
          },
        })
      );
      return middlewares;
    },
  },
};