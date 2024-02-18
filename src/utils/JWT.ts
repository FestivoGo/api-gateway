import { sign, verify } from "jsonwebtoken";
import response from "../controllers/response";
import { Request, Response, NextFunction } from "express";
import path from "path";

require("dotenv").config({ path: path.resolve(__dirname + "/./../../.env") });

declare module 'express' {
  interface Request {
    user?: any; // Ganti 'any' dengan jenis data yang sesuai untuk 'user'.
    authenticate?: boolean
  }
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "SECRET"

const createToken = (user) => {
  const accessToken = sign(
    {
      id: user.id,
    },
    ACCESS_TOKEN_SECRET
  );
  return accessToken;
};

const generateAccessToken = (user) => {
  const accessToken = sign(
    {
      id: user.unique_id,
      username: user.username,
      school_id: user.school_id,
      school_name: user.school_name,
      email: user.email ? user.email : "",
      role: user.role,
    },
    ACCESS_TOKEN_SECRET
  );
  return accessToken
};

const generateInGameAccessToken = (user) => {
  const accessToken = sign(
    {
      unique_id: user.unique_id,
      school_id: user.school_id,
      school_name: user.school_name,
    },
    ACCESS_TOKEN_SECRET
  );
  return accessToken
};

const generateMegaAccessToken = (user) => {
  const accessToken = sign(
    {
      credentials: user.credentials,
    },
    ACCESS_TOKEN_SECRET
  );
  return accessToken
};

const validateTokenAPI = (req:Request, res:Response, next:NextFunction) => {
  const accessToken = req.cookies["login-token"];
  if (!accessToken) return res.sendStatus(403)
  try {
    verify(accessToken, ACCESS_TOKEN_SECRET, function(err, user){
      if(err) return res.sendStatus(403)
      req.user = user
      next()
    });
  } catch (error) {
    return response(500, "server error", { error: error.message }, res);
  }
};

const validateTokenWebiste = (req:Request, res:Response, next:NextFunction) => {
  const accessToken = req.cookies["login-token"];
  // if token expired or not login
  if (!accessToken) return res.redirect("/login")
  try {
    verify(accessToken, ACCESS_TOKEN_SECRET, function(err, user){
      if(err) return res.sendStatus(403)
      req.user = user
      next()
    });
  } catch (error) {
    return response(500, "server error", { error: error.message }, res);
  }
};

const validateTokenMegaWebiste = (req:Request, res:Response, next:NextFunction) => {
  const megaToken = req.cookies["mega-token"];
  // if token expired or not login
  if (!megaToken) return res.redirect("/festivo/login")
  try {
    verify(megaToken, ACCESS_TOKEN_SECRET, function(err, user){
      if(err) return res.sendStatus(403)
      next()
    });
  } catch (error) {
    return response(500, "server error", { error: error.message }, res);
  }
};

export {
  generateAccessToken,
  createToken,
  validateTokenAPI,
  validateTokenWebiste,
  generateInGameAccessToken,
  generateMegaAccessToken,
  validateTokenMegaWebiste
};
