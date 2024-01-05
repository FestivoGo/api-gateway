import express from "express"
import { CreateSuperAdmin, EditSuperAdmin } from "../../controllers/v1/festivoController";

const router = express.Router()

router.post('/', CreateSuperAdmin);
router.put('/:id', EditSuperAdmin);


export default router;
