const socketIO = require('socket.io');

/**
 * Inicia el socket 
 * @param {*} server 
 */
function initSocket(server){
    let io = socketIO(server);

    io.on('connection', (socket)=>{
        console.log('new user connected');

        // este es para cuando el usuario se desconecta
        socket.on('disconnect', ()=>{
        console.log('user was disconnected.');

        })
    });
}


module.exports = {
    initSocket
}