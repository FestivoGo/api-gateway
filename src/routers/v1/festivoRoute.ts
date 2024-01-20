import express from "express"
import { LoginMegaAdmin, LogoutMegaAdmin } from "../../controllers/v1/festivoController";
import limiter from "../../utils/RateLimiter";

const router = express.Router()

router.post('/login', limiter, LoginMegaAdmin);
router.post('/logout', limiter, LogoutMegaAdmin);


export default router;
