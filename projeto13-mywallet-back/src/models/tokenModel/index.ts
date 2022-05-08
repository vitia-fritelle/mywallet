import { ObjectId } from "mongodb"

export default class Token {

    constructor(
        public token:string,
        public user:ObjectId,
        public expires:Date
    ) {

    }
}