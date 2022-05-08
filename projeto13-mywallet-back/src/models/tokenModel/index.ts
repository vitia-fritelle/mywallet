import { ObjectId } from "mongodb";
import {v4 as uuid} from 'uuid';

export default class Token {

    public token:string;

    constructor(
        public user:ObjectId,
        public expires:Date
    ) {
        this.token = uuid()
    }
}
