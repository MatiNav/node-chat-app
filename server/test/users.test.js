const expect = require('expect');

const {Users} = require('../utils/users');


describe('Users', ()=>{
    let users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Node course'
        },
        {
            id:'2',
            name:'Lucas',
            room:'Node course'
        },
        {
            id:'3',
            name:'Matio',
            room:'Node course'
        }]
    });

    it('should add a new user', ()=>{

        const users = new Users();
        const user = {
            id:'1',
            name:'mati',
            room:'Home'
        };
        const resUser = users.addUser(user.id, user.name, user.room);

        expect(typeof resUser).toBe('object');
        expect(users.users).toEqual([user]);

    })


    it('should return names for node course', ()=>{

        const resNames = users.getUserList('Node course');

        expect(Array.isArray(resNames)).toBe(true);
        expect(resNames.length).toBe(3);
        console.log(resNames);
        resNames.forEach((n, i) => {
            expect(typeof n).toBe('string');
            expect(n).toBe(users.users[i].name);
        });

    })

    it('should find user', ()=>{
        const resUser = users.getUser("1");

        expect(resUser).toBeTruthy();
    })

    it('should not find user', ()=>{
        const resUser = users.getUser(4);

        expect(resUser).toBeFalsy();
    })

    it('should not remove a user', ()=>{
        const resUser = users.removeUser("4");

        expect(resUser).toBeFalsy();
    })

    it('should remove a user', ()=>{
        const resUser = users.removeUser("1");

        expect(resUser).toBeTruthy();
        expect(users.users).toContainEqual({
            id:'2',
            name:'Lucas',
            room:'Node course'
        },
        {
            id:'3',
            name:'Matio',
            room:'Node course'
        })
    })

})