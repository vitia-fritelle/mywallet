import { ObjectId } from "mongodb";
import {v4 as uuid} from 'uuid';

export default class Session {

    public token:string;

    constructor(
        public user:ObjectId,
        public expires:number
    ) {
        this.token = uuid()
    }
}
