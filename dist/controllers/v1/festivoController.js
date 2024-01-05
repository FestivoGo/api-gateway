"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSuperAdmin = exports.CreateModule = exports.CreateSchool = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const Module_1 = __importDefault(require("../../models/Module"));
const School_1 = __importDefault(require("../../models/School"));
const response_1 = __importDefault(require("../response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function CreateSchool(req, res) {
    let schoolData = req.body;
    try {
        let schoolLength = await School_1.default.count();
        schoolData.school_id = schoolLength.toString().padStart(4, "0");
        let SCHOOL = await School_1.default.create(schoolData);
        let MODULES = await Module_1.default.findAll();
        SCHOOL.setModules(MODULES);
        return (0, response_1.default)(201, "success create new school", SCHOOL, res);
    }
    catch (error) {
        res.json(error);
    }
}
exports.CreateSchool = CreateSchool;
async function CreateModule(req, res) {
    let moduleData = req.body;
    try {
        let SCHOOLS = await School_1.default.findAll();
        let NEW_MODULE = await Module_1.default.create(moduleData);
        SCHOOLS.forEach(SCHOOL => {
            SCHOOL.addModule(NEW_MODULE);
        });
        return (0, response_1.default)(201, "success create new school", NEW_MODULE, res);
    }
    catch (error) {
        res.json(error);
    }
}
exports.CreateModule = CreateModule;
async function CreateSuperAdmin(req, res) {
    try {
        let adminData = req.body;
        let SCHOOL = await School_1.default.findOne({ where: { school_id: adminData.school_id } });
        adminData.school_name = SCHOOL.school_name;
        // hash password input before save into database
        await bcrypt_1.default.hash(adminData.password, 10).then((hash) => {
            adminData.password = hash;
            Admin_1.default.create(adminData).then((respon) => {
                (0, response_1.default)(201, "success create new super admin", respon, res);
            });
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.CreateSuperAdmin = CreateSuperAdmin;
//# sourceMappingURL=festivoController.js.map