import { Router } from 'express';
import authRoute from './authRoutes';
import entryRoute from './entryRoutes';
import userRoute from './userRoutes';

const router = Router();

const routes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/entry',
        route: entryRoute,
    },
    {
        path: '/user',
        route: userRoute,
    }
];

routes.forEach(({ path, route }) => router.use(path, route));

export default router;
