const path = require('path');
const express = require('express');
const http = require('http');

const socketSrvc = require('../socket/socket');



/**
 * Setea el puerto, y el path de la app
 */
function initApp() {
    const app = express();

    const publicPath = path.join(__dirname, '..', '..','..', 'public');
    app.use(express.static(publicPath));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(publicPath, 'index.html'));
    });


    // tenemos que configurar el server con http en vez de hacer app.listen.
    // igual app.listen literalmente que hace http.createServer entonces es practicamente lo mismo
    let server = http.createServer(app);
    
    socketSrvc.initSocket(server);

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log('app is running on port: ' + PORT);
    });
    
}



module.exports = initApp;