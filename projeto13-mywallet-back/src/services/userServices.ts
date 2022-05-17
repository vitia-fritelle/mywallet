import { ObjectId } from 'mongodb';
import mongo from '../';
import User from '../models/userModel';
import { ApiError } from '../utils';

export const createUser = async (user:User) => {
    if (await existsEmail(user.email)) {
        throw new ApiError(404, 'Usuário já cadastrado');
    }
    const users = mongo.db('Bank').collection<User>('users');
    const resp = await users.insertOne(user);
    if (!resp.acknowledged) {
        throw new ApiError(404, 'Não foi possível inserir um usuário');
    }
};

export const getUser = async (email:string) => {
    const users = mongo.db('Bank').collection<User>('users');
    const user = await users.findOne({ email });
    return user;
};

export const getUserById = async (userId:ObjectId) => {
    const users = mongo.db('Bank').collection<User>('users');
    const user = await users.findOne(new ObjectId(userId));
    return user;
};

const existsEmail = async (email:string) => !!await getUser(email);
