import mongo from "..";
import User from "../models/userModel";

export const createUser = async (user:User) => {

    if (await existsEmail(user.email)) {
        throw new Error;
    }
    const users = mongo.db('Bank').collection<User>('users');
    return users.insertOne(user);
}

export const getUser = async (email:string) => {

    const users = mongo.db('Bank').collection<User>('users');
    const user = await users.findOne({email});
    return user;
}

const existsEmail = async (email:string) => !!getUser(email);