const expect = require('expect');

const {isRealString} = require('../utils/validation');


describe('isRealString', ()=>{

    it('should reject non string values', ()=>{
        const res = isRealString('');

        expect(res).toBe(false);
    });


    it('should reject string with only spaces', ()=>{
        const res = isRealString('     ');

        expect(res).toBe(false);
    });


    it('should allow string with allowed characters', ()=>{
        const res = isRealString('asdad');

        expect(res).toBe(true);
    });

});