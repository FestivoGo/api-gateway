"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playerController_1 = require("../../../controllers/muslim-raya/v1/playerController");
const router = express_1.default.Router();
router.get("/", playerController_1.GetAllPlayers);
router.post("/", playerController_1.LoginAndCreateNewPlayer);
router.get("/:id", playerController_1.GetPlayersByID);
router.put("/:id", playerController_1.UpdatePlayerDataByID);
exports.default = router;
//# sourceMappingURL=playerRouter.js.map