const expect = require('expect');


const {generateMsg, generateLocationMsg} = require('../utils/utils');

describe('generateMsg', ()=>{


    it('should generate correct message object', ()=>{

        const res = generateMsg('Santiago', 'Sos Puto');

        expect(typeof res).toBe('object');
        expect(res).toMatchObject({
            from: 'Santiago',
            text: 'Sos Puto'
        });
        expect(typeof res.createdAt).toBe('number');

    });

});


describe('generateLocationMsg', ()=>{

    it('should generate correct location object', ()=>{
        
        const res = generateLocationMsg('Admin', 10, 10);

        expect(res.from).toBe('Admin')
        expect(res.url).toBe(`https://www.google.com/maps?q=${10},${10}`)
    })
})