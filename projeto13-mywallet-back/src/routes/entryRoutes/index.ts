import { Router } from "express"
import dummy from "../../controllers";

const router = Router();

router
    .route('/')
    .post(dummy)
    .get(dummy)

router.param('entryId',(_req,_res,next,_id) => {
    
    //Validar id
    //Pesquisar no bd o id
    //Passar o lançamento encontrado para
    //o próximo middleware
    next()
})

router
    .route('/:entryId')
    .get(dummy)
    .put(dummy)
    .delete(dummy)

export default router;