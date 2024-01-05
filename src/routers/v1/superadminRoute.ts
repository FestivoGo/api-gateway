import express from "express"
import { CreateSuperAdmin, DeleteSuperAdmin, EditSuperAdmin } from "../../controllers/v1/festivoController";

const router = express.Router()

router.post('/', CreateSuperAdmin);
router.put('/:id', EditSuperAdmin);
router.delete('/:id', DeleteSuperAdmin);


export default router;
