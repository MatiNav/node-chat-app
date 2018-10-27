
let socket = io();



socket.on('connect', () => {
    console.log('connected to Socket.');

    handleListenNewMsg();

    handleListenLocMsg();
});

socket.on('disconnect', () => {
    console.log('disconnected from Socket.');
})


function handleListenNewMsg() {
    socket.on('newMsg', function (data) {
        let formattedTime = moment(data.createdAt).format('h:mm a');
        console.log('newMsg ', JSON.stringify(data, undefined, 2));
        let li = jQuery('<li></li>');
        li.text(`${data.from} ${formattedTime}: ${data.text}`);

        jQuery('#msgs').append(li);
    });
}


function handleListenLocMsg() {
    socket.on('locationMessage', function (data) {
        let formattedTime = moment(data.createdAt).format('h:mm a');

        console.log('locationMessage ', JSON.stringify(data, undefined, 2));
        let li = jQuery('<li></li>');
        let a = jQuery('<a target="_blank">My current location</a>')

        li.text(`${data.from} ${formattedTime}: `);
        a.attr('href', data.url);
        li.append(a);

        jQuery('#msgs').append(li);
    });
}





const messageBox = jQuery('[name=msg]');
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    if (socket) {
        socket.emit('createMsg', {
            from: 'maticrack@gmail.com',
            text: jQuery('[name=msg]').val()
        }, function () {
            messageBox.val('');
        });
    }
})


const locationBtn = jQuery('#send-location');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert(`You can't use this app !!`);
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationBtn.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
        
    }, function(){
        locationBtn.removeAttr('disabled').text('Send location');
        return alert(`Enable to fetch location!!`);
    })
})