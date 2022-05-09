import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { catchAsync } from "../../utils";
import { 
    createEntry as create, 
    updateEntry as update, 
    deleteEntry as del,
    getEntries as get 
} from "../../services/entryServices";
import Entry from "../../models/entryModel";


export const createEntry = catchAsync(async (req:Request,res:Response) => {

    const {description, value, userId} = req.body;
    await create(
        new Entry(description, value, new ObjectId(userId))
    );
    res.sendStatus(201);
});

export const updateEntry = catchAsync(async (req:Request,res:Response) => {
    
    const {description, value, userId} = req.body;
    const {entryId} = req.params;
    await update(
        new ObjectId(entryId), 
        new Entry(description, value, new ObjectId(userId))
    );
    res.sendStatus(204);
});

export const deleteEntry = catchAsync(async (req:Request,res:Response) => {
    
    const {entryId} = req.params;
    await del(new ObjectId(entryId));
    res.sendStatus(204);
});

export const getEntries = catchAsync(async (req:Request,res:Response) => {

    const {userId} = req.body;
    const entries = await get(new ObjectId(userId));
    res.status(200).send(entries);
});