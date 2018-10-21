const path = require('path');
const express = require('express');


/**
 * Setea el puerto, y el path de la app
 */
function initApp() {
    const app = express();
    
    const publicPath = path.join(__dirname, '..', 'public');
    app.use(express.static(publicPath));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(publicPath, 'index.html'));
    });
    
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
        console.log('app is running on port: ' + PORT);
    });
    
}



module.exports = initApp;