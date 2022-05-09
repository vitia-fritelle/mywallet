import mongo from '..';
import Session from '../models/sessionModel';
import { ApiError } from '../utils';

export const verifyToken = async (token:string) => {
    
    const sessions = mongo.db('Bank').collection<Session>('sessions');
    const session = await sessions.findOne({token});
    if (!session) {
        throw new ApiError(500,"Não se encontrou o token");
    } else {
        return session;
    }
}

export const saveToken = async (session:Session) => {

    const sessions = mongo.db('Bank').collection<Session>('sessions');
    const ssn = await sessions.insertOne(session);
    if (!ssn.acknowledged) {
        throw new ApiError(500,"Não foi possível salvar o token");
    } else {
        return ;
    }
}

export const deleteToken = async (token:string) => {

    const sessions = mongo.db('Bank').collection<Session>('sessions');
    const session = await sessions.findOneAndDelete({token});
    if (!session.value) {
        throw new ApiError(500,"Não foi possível deletar o token");
    } else {
        return ;
    }
}