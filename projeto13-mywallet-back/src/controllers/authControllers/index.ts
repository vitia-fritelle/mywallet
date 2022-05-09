import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../../models/userModel";
import Session from "../../models/sessionModel";
import { catchAsync } from "../../utils";
import { createUser } from "../../services/userServices";
import { saveToken } from "../../services/tokenServices";
import { 
    login as loginUser, 
    logout as logoutUser
} from "../../services/authServices";

export const register = catchAsync(async (req:Request,res:Response) => {
    
    const {name,email,password} = req.body;
    await createUser(new User(name, email, password));
    return res.sendStatus(201);
});

export const login = catchAsync(async (req:Request,res:Response) => {
    
    const {email,password} = req.body;
    const user = await loginUser(email,password);
    const expiringTime = 1000*60*60;
    const session = new Session(
        new ObjectId(user._id),
        Date.now()+expiringTime
    );
    await saveToken(session);
    return res.status(200).json({token:session.token})
});

export const logout = catchAsync(async (req:Request,res:Response) => {

    const {authorization: token} = req.headers;
    if(!token) {
        throw new Error('Erro interno!');
    } else {
        await logoutUser(token);
        return res.sendStatus(204);
    }
});