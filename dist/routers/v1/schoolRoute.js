"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Module_1 = __importDefault(require("../../models/Module"));
const School_1 = __importDefault(require("../../models/School"));
const festivoController_1 = require("../../controllers/v1/festivoController");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    let school = await School_1.default.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: ["school_id"],
        include: [
            { model: Module_1.default, as: "modules", attributes: { exclude: ["createdAt", "updatedAt"] }, through: { as: "status", attributes: ["subscribed", "tanggal_berakhir", "tanggal_mulai", "unique_id"] } }
        ]
    });
    if (!school)
        return res.json("school not Found");
    res.json(school);
});
router.get("/:id", async (req, res) => {
    let schoolId = req.params.id;
    let school = await School_1.default.findByPk(schoolId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            { model: Module_1.default, as: "modules", attributes: { exclude: ["createdAt", "updatedAt"] }, through: { as: "status", attributes: ["subscribed", "tanggal_berakhir", "tanggal_mulai", "unique_id"] } }
        ]
    });
    if (!school)
        return res.json("school not Found");
    res.json(school);
});
router.post('/', festivoController_1.CreateSchool);
router.put("/:id", festivoController_1.EditSchool);
router.put("/modules/:id", festivoController_1.ActivateSchoolModule);
router.delete('/:id', festivoController_1.DeactiveSchool);
exports.default = router;
//# sourceMappingURL=schoolRoute.js.map