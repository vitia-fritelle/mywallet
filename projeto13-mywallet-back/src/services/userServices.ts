import mongo from "..";
import User from "../models/userModel";
import { ApiError } from "../utils";

export const createUser = async (user:User) => {

    if (await existsEmail(user.email)) {
        throw new ApiError(500,'Usuário já cadastrado');
    }
    const users = mongo.db('Bank').collection<User>('users');
    const resp = await users.insertOne(user);
    if(!resp.acknowledged) {
        throw new ApiError(500,'Não foi possível inserir um usuário')
    } else {
        return 
    }
}

export const getUser = async (email:string) => {

    const users = mongo.db('Bank').collection<User>('users');
    const user = await users.findOne({email});
    return user;
}

const existsEmail = async (email:string) => {
    
    return !!await getUser(email);
};