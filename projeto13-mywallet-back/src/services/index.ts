import { ObjectId } from "mongodb";
import Entry from "../models/entryModel";
import User from "../models/userModel";
import mongo from "..";
import { compare } from "bcryptjs";

const existsEmail = async (email:string) => !!getUser(email);

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

export const createEntry = async (entry:Entry) => {

    const entries = mongo.db('Bank').collection<Entry>('entries');
    return entries.insertOne(entry);
}

export const updateEntry = async (_id:ObjectId,entry:Entry) => {

    const entries = mongo.db('Bank').collection<Entry>('entries');
    return entries.findOneAndUpdate({_id},entry);
}

export const deleteEntry = async (_id:ObjectId) => {

    const entries = mongo.db('Bank').collection<Entry>('entries');
    return entries.findOneAndDelete({_id});
}

export const getEntries = async (userId:ObjectId) => {
    
    const entries = mongo.db('Bank').collection<Entry>('entries');
    return entries.find({userId}).toArray();
}

export const login = async (email:string,password:string) => {
    
    const user = await getUser(email);
    if (!user || !(await isSamePassword(password,user.password))) {
        throw new Error;
    } else {
        return user;
    }
}

const isSamePassword = async (password:string,hash:string) => {
    return compare(password,hash)
}