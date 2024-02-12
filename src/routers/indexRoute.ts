import express from "express"
import { validateTokenAPI } from "../utils/JWT";
import TEMP_DATA from '../utils/TempData';

const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    postman_docs: "https://documenter.getpostman.com/view/17399437/2s93eYTrCu",
  });
});

export default router;
