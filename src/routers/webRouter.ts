import express, {Response, Request} from "express";
import { validateTokenMegaWebiste, validateTokenWebiste } from "../utils/JWT";

const router = express.Router();

router.get("/muslim-raya", (req:Request, res:Response) => {
  res.render("Muslim-Raya");
});
router.get("/protected", (req:Request, res:Response) => {
  res.render("ProtectedPage");
});



export = router;
