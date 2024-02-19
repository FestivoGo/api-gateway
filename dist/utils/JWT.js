"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenMegaWebiste = exports.generateMegaAccessToken = exports.generateInGameAccessToken = exports.validateTokenWebiste = exports.validateTokenAPI = exports.createToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const response_1 = __importDefault(require("../controllers/response"));
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.resolve(__dirname + "/./../../.env") });
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "SECRET";
const createToken = (user) => {
    const accessToken = (0, jsonwebtoken_1.sign)({
        id: user.id,
    }, ACCESS_TOKEN_SECRET);
    return accessToken;
};
exports.createToken = createToken;
const generateAccessToken = (user) => {
    const accessToken = (0, jsonwebtoken_1.sign)({
        id: user.unique_id,
        username: user.username,
        school_id: user.school_id,
        school_name: user.school_name,
        email: user.email ? user.email : "",
        role: user.role,
    }, ACCESS_TOKEN_SECRET);
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateInGameAccessToken = (user) => {
    const accessToken = (0, jsonwebtoken_1.sign)({
        unique_id: user.unique_id,
        school_id: user.school_id,
        school_name: user.school_name,
    }, ACCESS_TOKEN_SECRET);
    return accessToken;
};
exports.generateInGameAccessToken = generateInGameAccessToken;
const generateMegaAccessToken = (user) => {
    const accessToken = (0, jsonwebtoken_1.sign)({
        credentials: user.credentials,
    }, ACCESS_TOKEN_SECRET);
    return accessToken;
};
exports.generateMegaAccessToken = generateMegaAccessToken;
const validateTokenAPI = (req, res, next) => {
    const accessToken = req.cookies["login-token"];
    if (!accessToken)
        return res.sendStatus(403);
    try {
        (0, jsonwebtoken_1.verify)(accessToken, ACCESS_TOKEN_SECRET, function (err, user) {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    catch (error) {
        return (0, response_1.default)(500, "server error", { error: error.message }, res);
    }
};
exports.validateTokenAPI = validateTokenAPI;
const validateTokenWebiste = (req, res, next) => {
    const accessToken = req.cookies["login-token"];
    // if token expired or not login
    if (!accessToken)
        return res.redirect("/login");
    try {
        (0, jsonwebtoken_1.verify)(accessToken, ACCESS_TOKEN_SECRET, function (err, user) {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    catch (error) {
        return (0, response_1.default)(500, "server error", { error: error.message }, res);
    }
};
exports.validateTokenWebiste = validateTokenWebiste;
const validateTokenMegaWebiste = (req, res, next) => {
    const megaToken = req.cookies["mega-token"];
    // if token expired or not login
    if (!megaToken)
        return res.redirect("/festivo/login");
    try {
        (0, jsonwebtoken_1.verify)(megaToken, ACCESS_TOKEN_SECRET, function (err, user) {
            if (err)
                return res.sendStatus(403);
            next();
        });
    }
    catch (error) {
        return (0, response_1.default)(500, "server error", { error: error.message }, res);
    }
};
exports.validateTokenMegaWebiste = validateTokenMegaWebiste;
//# sourceMappingURL=JWT.js.map