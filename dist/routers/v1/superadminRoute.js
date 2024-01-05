"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const festivoController_1 = require("../../controllers/v1/festivoController");
const router = express_1.default.Router();
router.post('/', festivoController_1.CreateSuperAdmin);
router.put('/:id', festivoController_1.EditSuperAdmin);
router.delete('/:id', festivoController_1.DeleteSuperAdmin);
exports.default = router;
//# sourceMappingURL=superadminRoute.js.map