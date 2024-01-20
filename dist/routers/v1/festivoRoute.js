"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const festivoController_1 = require("../../controllers/v1/festivoController");
const RateLimiter_1 = __importDefault(require("../../utils/RateLimiter"));
const router = express_1.default.Router();
router.post('/login', RateLimiter_1.default, festivoController_1.LoginMegaAdmin);
router.post('/logout', RateLimiter_1.default, festivoController_1.LogoutMegaAdmin);
exports.default = router;
//# sourceMappingURL=festivoRoute.js.map