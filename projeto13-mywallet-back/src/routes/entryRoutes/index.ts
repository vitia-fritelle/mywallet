import { Router } from 'express';
import {
    createEntry, deleteEntry, getEntries, updateEntry,
} from '../../controllers/entryControllers';

const router = Router();

router
    .route('/')
    .post(createEntry)
    .get(getEntries);

router
    .route('/:entryId')
    .put(updateEntry)
    .delete(deleteEntry);

export default router;
