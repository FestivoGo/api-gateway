"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({
        postman_docs: "https://documenter.getpostman.com/view/17399437/2s93eYTrCu",
    });
});
exports.default = router;
//# sourceMappingURL=indexRoute.js.map