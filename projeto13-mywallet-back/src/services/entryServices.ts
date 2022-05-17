import { ObjectId } from 'mongodb';
import Entry from '../models/entryModel';
import mongo from '..';
import { ApiError } from '../utils';
import Session from '../models/sessionModel';

export const getUserId = async (token:string) => {
    const sessions = mongo.db('Bank').collection<Session>('sessions');
    const session = await sessions.findOne({token});
    if (session) {
        return session.user;
    } else {
        throw new Error;
    }
};

export const createEntry = async (entry:Entry) => {
    const entries = mongo.db('Bank').collection<Entry>('entries');
    const resp = await entries.insertOne(entry);
    if (!resp.acknowledged) {
        throw new ApiError(500, 'Não foi possível criar o lançamento');
    } 
};

export const updateEntry = async (_id:ObjectId, entry:Entry) => {
    const entries = mongo.db('Bank').collection<Entry>('entries');
    const resp = await entries.findOneAndUpdate({ _id }, { $set: entry });
    if (!resp.value) {
        throw new ApiError(500, 'Não foi possível atualizar o lançamento');
    } 
};

export const deleteEntry = async (_id:ObjectId) => {
    const entries = mongo.db('Bank').collection<Entry>('entries');
    const resp = await entries.findOneAndDelete({ _id });
    if (!resp.value) {
        throw new ApiError(500, 'Não foi possível deletar o lançamento');
    } 
};

export const getEntries = async (userId:ObjectId) => {
    const entries = mongo.db('Bank').collection<Entry>('entries');
    return entries.find({ userId }).toArray();
};