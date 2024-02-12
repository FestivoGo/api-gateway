import express, {Response, Request} from "express";
import { validateTokenMegaWebiste, validateTokenWebiste } from "../utils/JWT";

const router = express.Router();

router.get("/", (req:Request, res:Response) => {
  res.render("TestPage");
});
router.get("/protected", (req:Request, res:Response) => {
  res.render("ProtectedPage");
});



export = router;
