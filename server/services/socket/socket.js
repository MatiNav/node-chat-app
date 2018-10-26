const socketIO = require('socket.io');

const {generateMsg} = require('../../utils/utils');

let io;


function greetNewUserAndTellToOthers(socket) {

    socket.emit('newMsg', generateMsg('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMsg',generateMsg('Admin','New user joined.'));
    
}



function handleListenCreateMsg(socket) {
    socket.on('createMsg', (msg, callback)=>{

        if(!msg){
            return console.log('No msg was found !!');
        }

        io.emit('newMsg', generateMsg(msg.from,msg.text));
        callback('This is from the server');
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

        // // emite a todos menos a este socket
        // socket.broadcast.emit('newMsg', {
        //     from:'Admin',
        // })

        greetNewUserAndTellToOthers(socket);

        handleListenCreateMsg(socket);

        handleClientDisconnect(socket);
    });
}


// io emite un evento a todas las conexiones, socket (la variable generada) emite un evento a las conexiones para 
// ese canal en particular 

// Broadcasting es la denominacion del evento por el cual se le envia mensajes a todos menos al que lo envio 


module.exports = {
    initSocket
}