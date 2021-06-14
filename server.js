const handler = require('server-handler');
const http = require('http');

const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: 'dist',
        rewrites: [{source: '**', destination: '/index.html'}],
    });
});

server.listen(3000, () => {
    console.log('Server is running')
});