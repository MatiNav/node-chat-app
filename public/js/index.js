


let socket = io();

socket.on('connect', () => {
    console.log('connected to Socket.');

    handleListenNewMsg();
});

socket.on('disconnect', () => {
    console.log('disconnected from Socket.');
})


function handleListenNewMsg(){
    socket.on('newMsg', (data)=>{
        console.log('newMsg ', JSON.stringify(data,undefined,2));
    })
}



//// public methods /////



function onSendMsg(){
    if(socket){
        socket.emit('createMsg',{
            from:'maticrack@gmail.com',
            text:'locuraaaa'
        });
    }
}