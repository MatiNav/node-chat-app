class Users {
    constructor(){
        this.users = [];
    }

    addUser (id, name, room){
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id){

        let foundUser = this.getUser(id);
        
        if(foundUser) this.users = this.users.filter(u=>u.id !== id);

        return foundUser;
    }

    getUser (id){
        let foundUser = this.users.filter(u=> u.id === id)[0];
        return foundUser;
    }

    getUserList (room){
        let usersFiltered = this.users.filter(u=> u.room === room);
        let namesArray = usersFiltered.map(uf=> uf.name);
        return namesArray;
    }
}


module.exports = {
    Users
}