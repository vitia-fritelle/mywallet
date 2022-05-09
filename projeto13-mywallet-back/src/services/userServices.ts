import mongo from "..";
import User from "../models/userModel";

export const createUser = async (user:User) => {

    if (await existsEmail(user.email)) {
        throw new Error('Usuário já cadastrado');
    }
    const users = mongo.db('Bank').collection<User>('users');
    const resp = await users.insertOne(user);
    if(!resp.acknowledged) {
        throw new Error('Não foi possível inserir um usuário')
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