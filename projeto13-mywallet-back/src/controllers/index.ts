import {Request, Response} from "express";

export default async (_req:Request, res:Response) => {
    res.sendStatus(200);
}