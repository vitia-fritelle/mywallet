import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import { ApiError } from '../../utils';
import { createEntrySchema } from '../../validations';

export default class Entry {
    public date:string;

    constructor(
        public description:string,
        public value:string,
        public userId:ObjectId,
    ) {
        const validation = createEntrySchema.validate({
            description,
            value
        });
        if (validation.error) {
            throw new ApiError(422, 'Entry Validation Error');
        }
        this.date = dayjs().format('YYYY-MM-DD#HH:mm:ss');
    }
}
