"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoute_1 = __importDefault(require("./indexRoute"));
const playerRouter_1 = __importDefault(require("./v1/playerRouter"));
const v1Router = express_1.default.Router();
v1Router.use("/", indexRoute_1.default);
v1Router.use("/players", playerRouter_1.default);
exports.default = v1Router;
//# sourceMappingURL=v1Router.js.map