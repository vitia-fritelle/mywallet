import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ApiError, catchAsync } from '../../utils';
import {
    createEntry as create,
    updateEntry as update,
    deleteEntry as del,
    getEntries as get,
    getUserId,
} from '../../services/entryServices';
import Entry from '../../models/entryModel';

export const createEntry = catchAsync(async (req:Request, res:Response) => {
    console.log('como assim?')
    const token = (
        req
            .headers
            .authorization
            ?.replace('Bearer','')
            .trim()
    );
    if (token) {
        console.log('autenticado')
        const { description, value } = req.body;
        const userId = await getUserId(token);
        console.log('peguei o userId')
        await create(
            new Entry(description, value, userId),
        );
        res.sendStatus(201);
    } else {
        throw new ApiError(401,'Unauthorized');
    }
});

export const updateEntry = catchAsync(async (req:Request, res:Response) => {
    const token = (
        req
            .headers
            .authorization
            ?.replace('Bearer','')
            .trim()
    );
    if (token) {
        const { description, value } = req.body;
        const { entryId } = req.params;
        const userId = await getUserId(token);
        await update(
            new ObjectId(entryId),
            new Entry(description, value, new ObjectId(userId)),
        );
        res.sendStatus(204);
    } else {
        throw new ApiError(401,'Unauthorized');
    }
});

export const deleteEntry = catchAsync(async (req:Request, res:Response) => {
    const token = (
        req
            .headers
            .authorization
            ?.replace('Bearer','')
            .trim()
    );
    if (token) {
        const { entryId } = req.params;
        await del(new ObjectId(entryId));
        res.sendStatus(204);
    } else {
        throw new ApiError(401,'Unauthorized');
    }
});

export const getEntries = catchAsync(async (req:Request, res:Response) => {
    const token = (
        req
            .headers
            .authorization
            ?.replace('Bearer','')
            .trim()
    );
    if (token) {
        const userId = await getUserId(token);
        const entries = await get(userId);
        res.status(200).send(entries);
    } else {
        throw new ApiError(401,'Unauthorized');
    }
});
