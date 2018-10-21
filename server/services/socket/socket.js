const socketIO = require('socket.io');

let io;

function handleListenCreateMsg(socket) {
    socket.on('createMsg', (msg)=>{

        if(!msg){
            return console.log('No msg was found !!');
        }

        io.emit('newMsg', ({
            text: msg.text,
            from: msg.from,
            createdAt: new Date().getTime()
        }))
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
    io = socketIO(server);
    io.on('connection', (socket) => {
        console.log('new user connected');

        handleListenCreateMsg(socket);

        handleClientDisconnect(socket);
    });
}


// io emite un evento a todas las conexiones, socket (la variable generada) emite un evento a las conexiones para 
// ese canal en particular 


module.exports = {
    initSocket
}