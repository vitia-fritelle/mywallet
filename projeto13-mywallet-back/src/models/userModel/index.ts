import bcrypt from "bcryptjs";
import { ApiError } from "../../utils";
import { registerSchema } from "../../validations";

export default class User {

    constructor(
        public name:string,
        public email:string,
        public password:string
    ) { 
        const validation = registerSchema.validate({
            name,
            email,
            password
        })
        if (validation.error) {
            throw new ApiError(422, "User Validation Error")
        }
        this.password = bcrypt.hashSync(password);
    }
}

