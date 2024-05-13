import express from "express";
import indexRouter from "../indexRoute";
import {SendEmail} from "../../controllers/festivo.co/festivo.controller"

const festivoRouter = express.Router()

festivoRouter.post("/send-email", SendEmail)

export default festivoRouter