import { ObjectId } from "mongodb";
import Entry from "../models/entryModel";
import mongo from "..";

export const createEntry = async (entry:Entry) => {

    const entries = mongo.db('Bank').collection<Entry>('entries');
    const resp = await entries.insertOne(entry);
    if (!resp.acknowledged) {
        throw new Error("Não foi possível criar o lançamento")
    } else {
        return
    }
}

export const updateEntry = async (_id:ObjectId,entry:Entry) => {

    const entries = mongo.db('Bank').collection<Entry>('entries');
    const resp = await entries.findOneAndUpdate({_id},{$set: entry});
    if (!resp.value) {
        throw new Error("Não foi possível atualizar o lançamento");
    } else {
        return
    }

}

export const deleteEntry = async (_id:ObjectId) => {

    const entries = mongo.db('Bank').collection<Entry>('entries');
    const resp = await entries.findOneAndDelete({_id});
    if (!resp.value) {
        throw new Error("Não foi possível deletar o lançamento");
    } else {
        return 
    }

}

export const getEntries = async (userId:ObjectId) => {
    
    const entries = mongo.db('Bank').collection<Entry>('entries');
    return entries.find({userId}).toArray();
}

