module.exports = {
    devServer: {
        port: 4545,
        //we use the proxy to use the API without CORS problems
        //see: https://www.youtube.com/watch?v=WsYrDu7xkEw
        //If this does not work, see if your baseUrl is the same as the one that is show on main.js
        proxy: 'http://localhost:8080',
    }
}