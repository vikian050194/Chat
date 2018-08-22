module.exports = class Repository {
    constructor() {
        this.users = [];
        this.messages = [];
    }

    getMessages() {
        return this.messages;
    }

    addMessage(data) {
        this.messages.push(data);
        
        if (this.messages.length > 10) {
            this.messages.shift();
        }
    }

    addUser(userName) {
        if(this.users.indexOf(userName)===-1){
            this.users.push(userName);
        }
    }

    getUsers() {
        return this.users;
    }

    removeUser(userName){
        var index = this.users.indexOf(userName);
        this.users.splice(index);
    }
};