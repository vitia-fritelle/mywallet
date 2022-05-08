import { ObjectId } from "mongodb";
import Entry from "../models/entryModel";
import mongo from "..";

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

