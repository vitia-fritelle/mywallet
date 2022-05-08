import { Router } from "express";
import authRoute from "./authRoutes";
import entryRoute from "./entryRoutes";

const router = Router();

const routes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/entry',
        route: entryRoute
    }
];

routes.forEach(({path,route}) => router.use(path,route));

export default router;