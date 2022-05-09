import bcrypt from "bcryptjs";
import mongo from "..";
import Session from "../models/sessionModel";
import { ApiError } from "../utils";
import { getUser } from "./userServices";

export const login = async (email:string,password:string) => {
    
    const user = await getUser(email);
    if (!user || !(await isSamePassword(password,user.password))) {
        throw new ApiError(500,"A senha não corresponde a esse usuário.");
    } else {
        return user;
    }
}

export const logout = async (token:string) => {

    const sessions = mongo.db('Bank').collection<Session>('sessions');
    const session = await sessions.findOneAndDelete({token});
    if (!session.value) {
        throw new ApiError(500,"Problema de autenticação.");
    } else {
        return ;
    }
}

const isSamePassword = async (password:string,hash:string) => {
    return bcrypt.compare(password,hash);
}