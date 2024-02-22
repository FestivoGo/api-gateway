import express, {Response, Request} from "express";
import { validateTokenMegaWebiste, validateTokenWebiste } from "../utils/JWT";

const router = express.Router();

router.get("/", (req:Request, res:Response) => {
  res.render("Home");
});
router.get("/muslim-raya", (req:Request, res:Response) => {
  res.render("Muslim-Raya");
});



export = router;
