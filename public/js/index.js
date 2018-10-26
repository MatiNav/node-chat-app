
let socket = io();

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();
    
    if(socket){
        socket.emit('createMsg',{
            from:'maticrack@gmail.com',
            text:jQuery('[name=msg]').val()
        }, function (data){
            console.log(data);
        });
    }
})

socket.on('connect', () => {
    console.log('connected to Socket.');

    handleListenNewMsg();
});

socket.on('disconnect', () => {
    console.log('disconnected from Socket.');
})


function handleListenNewMsg(){
    socket.on('newMsg', function (data){
        console.log('newMsg ', JSON.stringify(data,undefined,2));
        let li = jQuery('<li></li>');
        li.text(`${data.from}: ${data.text}`);
        
        jQuery('#msgs').append(li);
    });
}



//// public methods /////


