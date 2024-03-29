"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Module_1 = __importDefault(require("../../models/Module"));
const festivoController_1 = require("../../controllers/v1/festivoController");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    let module = await Module_1.default.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
    if (!module)
        return res.json("Module not Found");
    res.json(module);
});
router.get("/:id", async (req, res) => {
    const moduleId = req.params.id;
    let module = await Module_1.default.findByPk(moduleId);
    if (!module)
        return res.json("Module not Found");
    res.json(module);
});
router.post('/', festivoController_1.CreateModule);
router.put('/:id', festivoController_1.EditModule);
router.delete('/:id', festivoController_1.DeleteModule);
exports.default = router;
//# sourceMappingURL=moduleRouter.js.map