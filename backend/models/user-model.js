const uniqid = require("uniqid");
class User{
    constructor(username ,email, password){
        this.username = username;
        this.userId = uniqid();
        this.email = email,
        this.password = password; //hashed form : bcrpt
        this.createdAt = Date.now();
    }
}
module.exports = User;