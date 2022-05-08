import { compare } from "bcryptjs";
import mongo from "..";
import Token from "../models/tokenModel";
import { getUser } from "./userServices";

export const login = async (email:string,password:string) => {
    
    const user = await getUser(email);
    if (!user || !(await isSamePassword(password,user.password))) {
        throw new Error;
    } else {
        return user;
    }
}

export const logout = async (userToken:string) => {

    const tokens = mongo.db('Bank').collection<Token>('tokens');
    const token = await tokens.findOneAndDelete({userToken});
    if (!token) {
        throw new Error;
    } else {
        return token;
    }
}

const isSamePassword = async (password:string,hash:string) => {
    return compare(password,hash)
}