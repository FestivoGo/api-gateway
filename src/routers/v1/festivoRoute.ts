import express from "express"
import { LoginMegaAdmin } from "../../controllers/v1/festivoController";

const router = express.Router()

router.post('/login', LoginMegaAdmin);


export default router;
