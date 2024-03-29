"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.render("Home");
});
router.get("/muslim-raya", (req, res) => {
    res.render("Muslim-Raya");
});
module.exports = router;
//# sourceMappingURL=webRouter.js.map