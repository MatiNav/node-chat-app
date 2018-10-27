const moment = require('moment');

let generateMsg = (from, text)=>{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

let generateLocationMsg = (from, lat, long) => {

    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    }

}


module.exports = {
    generateMsg,
    generateLocationMsg
}