const expect = require('expect');


const {generateMsg} = require('../utils/utils');

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