import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export default class Entry {

    public date:string;

    constructor(
        public description:string,
        public value:string,
        public userId:ObjectId
    ) {
        this.date = dayjs().format('YYYY-MM-DD#HH:mm:ss')
    }
}