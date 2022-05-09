import bcrypt from "bcryptjs";

export default class User {

    constructor(
        public name:string,
        public email:string,
        public password:string
    ) {
        this.password = bcrypt.hashSync(password);
    }
}

