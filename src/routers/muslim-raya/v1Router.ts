import express from "express";
import indexRouter from "../indexRoute";
import playerRouter from "./v1/playerRouter"

const v1Router = express.Router()

v1Router.use("/", indexRouter);
v1Router.use("/players", playerRouter)

export default v1Router