import express from "express"
import { CreateSuperAdmin } from "../../controllers/v1/festivoController";

const router = express.Router()

router.post('/', CreateSuperAdmin);


export default router;
