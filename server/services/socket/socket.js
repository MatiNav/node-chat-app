const socketIO = require('socket.io');

const {generateMsg, generateLocationMsg} = require('../../utils/utils');
const {isRealString} = require('../../utils/validation');
const {Users}= require('../../utils/users');

let io;
const users = new Users();

function broadcastNewMsg(socket, params) {

    socket.emit('newMsg', generateMsg('Admin','Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMsg',generateMsg('Admin',params.name + ' joined.'));
    // el 'to.(params.room)' le manda a toda la sala

}



function handleListenCreateMsg(socket) {
    socket.on('createMsg', (msg, callback)=>{

        let user = users.getUser(socket.id);

        if(!user && isRealString(msg.text)){
            io.to(user.room).emit('newMsg', generateMsg(user.name, msg.text));
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
        let user= users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMsg', generateMsg('Admin' , user.name + ' has left.'));
        }
    })
}


function handleListenLocationMsg(socket) {
    socket.on('createLocationMessage', (coords)=>{
        io.emit('locationMessage', generateLocationMsg('Admin',coords.lat, coords.long));
    })
}


function handleListenJoin(socket) {
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave(paramas.room);

        broadcastNewMsg(socket, params);

        callback();
    });
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

        handleListenJoin(socket);


        handleListenCreateMsg(socket);

        handleClientDisconnect(socket);

        handleListenLocationMsg(socket);
    });
}


// io emite un evento a todas las conexiones, socket (la variable generada) emite un evento a las conexiones para 
// ese canal en particular 

// Broadcasting es la denominacion del evento por el cual se le envia mensajes a todos menos al que lo envio 


module.exports = {
    initSocket
}