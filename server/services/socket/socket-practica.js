const socketIO = require('socket.io');


/**
 * Recibe en el server el evento 'ceateEmail'
 * @param {*} socket 
 */
function handleListenCreateEmail(socket) {
    socket.on('createEmail', (email)=>{
        console.log('ceateEmail', JSON.stringify(email,undefined,2));
    })
}



/**
 * Emite desde el server el evento 'newEmail'
 * @param {*} socket 
 */
function handleEmitNewEmail(socket) {
    socket.emit('newEmail',{
        from: 'matio@gmail.com',
        text:'Somos cracks',
        createdAt: 123
    });
}




/**
 * Maneja la desconexion del socket enviada desde el lado cliente
 * @param {*} socket 
 */
function handleClientDisconnect(socket) {
    // este es para cuando el usuario se desconecta
    socket.on('disconnect', () => {
        console.log('user was disconnected.');
    })
}



/**
 * Inicia el socket 
 * @param {*} server 
 */
function initSocket(server) {
    let io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('new user connected');

        handleEmitNewEmail(socket);

        handleListenCreateEmail(socket);

        handleClientDisconnect(socket);
    });
}


module.exports = {
    initSocket
}