import { Router } from "express"
import dummy from "../../controllers";

const router = Router();

router.post('/register',dummy);
router.post('/login',dummy);
router.post('/logout',dummy);

export default router;