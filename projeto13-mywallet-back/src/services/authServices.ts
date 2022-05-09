import bcrypt from "bcryptjs";
import mongo from "..";
import Session from "../models/sessionModel";
import { getUser } from "./userServices";

export const login = async (email:string,password:string) => {
    
    const user = await getUser(email);
    if (!user || !(await isSamePassword(password,user.password))) {
        throw new Error("A senha não corresponde a esse usuário.");
    } else {
        return user;
    }
}

export const logout = async (token:string) => {

    const sessions = mongo.db('Bank').collection<Session>('sessions');
    const session = await sessions.findOneAndDelete({token});
    if (!session.value) {
        throw new Error("Problema de autenticação.");
    } else {
        return ;
    }
}

const isSamePassword = async (password:string,hash:string) => {
    return bcrypt.compare(password,hash)
}