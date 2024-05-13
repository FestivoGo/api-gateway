import express, {Response, Request, NextFunction} from "express";
import fs from "fs"
import path from "path";
import multer from 'multer';
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express();

// default membuat folder untuk penempatan file upload
if (!fs.existsSync("public/files/uploads")) {
  if (!fs.existsSync("public/files")) {
    fs.mkdirSync("public/files");
  }
  if (!fs.existsSync("public/files/uploads")) {
    fs.mkdirSync("public/files/uploads");
  }
  if (!fs.existsSync("public/files/exports")) {
    fs.mkdirSync("public/files/exports");
  }
}

// multer setup disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/files/uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + Math.floor(Math.random() * 99) + 1 + "." + extension);
  },
});


app.set("trust proxy",1);
app.use(multer({ storage: storage, limits: { fileSize: 1000000 } }).any());
app.use(cors({origin: "*"}));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/files", express.static(path.join(__dirname, "../public", "files")));
app.use("/", express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// ROUTER
import { connectToDatabase } from "./models";
import webRouter from "./routers/webRouter";
import muslimRayaRouter from './routers/muslim-raya/v1Router';
import festivoRouter from "./routers/festivo.co/festivo.router"

let PORT = process.env.PORT || 8000;

connectToDatabase()
  .then(async() => {

    app.use("/", webRouter);
    app.use("/muslim-raya/v1", muslimRayaRouter);
    app.use("/festivo/v1", festivoRouter);

    // Error Handling
    app.all("*", (req, res, next) => {
      const err = new Error(`can't find ${req.originalUrl} on the server!`);
      next(err);
    });
    app.use((error, req, res, next) => {
      error.statusCode = error.statusCode || 404;
      error.status = error.status || "error";
      res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    });
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Koneksi database gagal:", error);
  });
