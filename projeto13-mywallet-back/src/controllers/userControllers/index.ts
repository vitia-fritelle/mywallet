import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getUserId as get } from '../../services/entryServices';
import { getUserById } from '../../services/userServices';
import { ApiError, catchAsync } from '../../utils';

const getUser = catchAsync(async (req:Request, res:Response) => {
    const token = (
        req
            .headers
            .authorization
            ?.replace('Bearer','')
            .trim()
    );
    if (token) {
        const userId = await get(token);
        const user = await getUserById(new ObjectId(userId));
        res.sendStatus(200).json(user);
    } else {
        throw new ApiError(401,'Unauthorized');
    }
})

export default getUser;