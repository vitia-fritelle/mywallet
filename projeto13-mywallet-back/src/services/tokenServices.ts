import mongo from '..';
import Token from '../models/tokenModel';

export const verifyToken = async (userToken:string) => {
    
    const tokens = mongo.db('Bank').collection<Token>('token');
    const token = await tokens.findOne({token:userToken});
    if (!token) {
        throw new Error;
    } else {
        return token;
    }
}

export const saveToken = async (userToken:Token) => {

    const tokens = mongo.db('Bank').collection<Token>('token');
    const token = await tokens.insertOne(userToken);
    if (!token) {
        throw new Error;
    } else {
        return token;
    }
}

export const deleteToken = async (userToken:string) => {

    const tokens = mongo.db('Bank').collection<Token>('token');
    const token = tokens.findOneAndDelete({token:userToken});
    if (!token) {
        throw new Error;
    } else {
        return token;
    }
}