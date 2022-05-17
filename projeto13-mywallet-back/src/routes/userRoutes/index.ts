import { Router } from 'express';
import getUser from '../../controllers/userControllers';


const router = Router();

router
    .route('/')
    .get(getUser);

export default router;