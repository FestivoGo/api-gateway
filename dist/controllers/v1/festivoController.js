"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSuperAdmin = exports.EditSuperAdmin = exports.CreateSuperAdmin = exports.DeleteModule = exports.EditModule = exports.CreateModule = exports.ActivateSchoolModule = exports.DeactiveSchool = exports.EditSchool = exports.CreateSchool = exports.LogoutMegaAdmin = exports.LoginMegaAdmin = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const Module_1 = __importDefault(require("../../models/Module"));
const School_1 = __importDefault(require("../../models/School"));
const SchoolModule_1 = __importDefault(require("../../models/SchoolModule"));
const Student_1 = __importDefault(require("../../models/Student"));
const JWT_1 = require("../../utils/JWT");
const response_1 = __importDefault(require("../response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_cron_1 = __importDefault(require("node-cron"));
async function LoginMegaAdmin(req, res) {
    let megaData = req.body;
    console.log(megaData);
    try {
        if (megaData.credentials == "mega") {
            let megaToken = (0, JWT_1.generateMegaAccessToken)(megaData);
            res.cookie("mega-token", megaToken, {
                httpOnly: true
            });
            return (0, response_1.default)(200, "success login", [], res);
        }
        else {
            return (0, response_1.default)(400, "Wrong Credentials", [], res);
        }
    }
    catch (error) {
        res.json(error);
    }
}
exports.LoginMegaAdmin = LoginMegaAdmin;
async function LogoutMegaAdmin(req, res) {
    res.clearCookie("mega-token");
    res.redirect("/festivo/login");
}
exports.LogoutMegaAdmin = LogoutMegaAdmin;
async function CreateSchool(req, res) {
    let schoolData = req.body;
    try {
        let schoolLength = await School_1.default.max("school_id");
        schoolLength = +schoolLength + 1;
        schoolData.school_id = schoolLength.toString().padStart(4, "0");
        let SCHOOL = await School_1.default.create(schoolData);
        let MODULES = await Module_1.default.findAll();
        SCHOOL.setModules(MODULES);
        let superAdminData = {
            username: `sudo${SCHOOL.school_id}`,
            nuptk: `admin-${generateUniqueId()}`,
            password: "123",
            school_id: SCHOOL.school_id,
            school_name: SCHOOL.school_name,
            role: "super_admin"
        };
        await bcrypt_1.default.hash(superAdminData.password, 10).then((hash) => {
            superAdminData.password = hash;
            Admin_1.default.create(superAdminData).then((respon) => {
                (0, response_1.default)(201, "success create new school", [], res);
            });
        });
    }
    catch (error) {
        res.json(error);
    }
}
exports.CreateSchool = CreateSchool;
async function EditSchool(req, res) {
    let schoolId = req.params.id;
    let moduleON = req.body.ON || "";
    let schoolData = req.body;
    let SCHOOL = await School_1.default.findByPk(schoolId);
    try {
        if (SCHOOL) {
            let modules = await SCHOOL.getModules();
            SCHOOL.update(schoolData);
            if (modules.length !== 0) {
                modules.forEach(async (module) => {
                    let schoolmodule = await SchoolModule_1.default.findOne({ where: { ModuleUniqueId: module.unique_id, ownerId: schoolId } });
                    if (moduleON.includes(module.unique_id)) {
                        schoolmodule.update({ subscribed: true });
                    }
                    else {
                        schoolmodule.update({ subscribed: false });
                    }
                });
                return (0, response_1.default)(200, "Success update school", [], res);
            }
            return (0, response_1.default)(200, "Success update school", [], res);
        }
        else {
            return (0, response_1.default)(400, "School not found", [], res);
        }
    }
    catch (error) {
        res.json(error);
    }
}
exports.EditSchool = EditSchool;
async function DeactiveSchool(req, res) {
    let schoolId = req.params.id;
    let schoolData = req.body;
    let SCHOOL = await School_1.default.findByPk(schoolId);
    try {
        if (SCHOOL) {
            SCHOOL.update(schoolData);
            await Admin_1.default.update(schoolData, { where: { school_id: SCHOOL.school_id } });
            await Student_1.default.update(schoolData, { where: { school_id: SCHOOL.school_id } });
            return (0, response_1.default)(200, "Success update status school", [], res);
        }
        else {
            return (0, response_1.default)(400, "School not found", [], res);
        }
    }
    catch (error) {
        res.json(error);
    }
}
exports.DeactiveSchool = DeactiveSchool;
async function ActivateSchoolModule(req, res) {
    let schoolmoduleId = req.params.id;
    let schoolmoduleBody = req.body;
    let SCHOOL_MODULE = await SchoolModule_1.default.findByPk(schoolmoduleId);
    try {
        if (SCHOOL_MODULE) {
            schoolmoduleBody.subscribed = true;
            SCHOOL_MODULE.update(schoolmoduleBody);
            return (0, response_1.default)(200, "Success update school", [], res);
        }
        else {
            return (0, response_1.default)(400, "School not found", [], res);
        }
    }
    catch (error) {
        res.json(error);
    }
}
exports.ActivateSchoolModule = ActivateSchoolModule;
node_cron_1.default.schedule("* * * * *", async function () {
    let SCHOOL_MODULES = await SchoolModule_1.default.findAll();
    SCHOOL_MODULES.forEach(schoolmodule => {
        if (hitungSelisihTanggal(getTodayDate(), schoolmodule.tanggal_berakhir) == false) {
            schoolmodule.update({ subscribed: false });
        }
    });
});
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
async function EditModule(req, res) {
    let moduleData = req.body;
    let moduleId = req.params.id;
    try {
        let MODULE = await Module_1.default.findByPk(moduleId);
        if (MODULE) {
            MODULE.update(moduleData);
            return (0, response_1.default)(200, "Module updated", MODULE, res);
        }
        else {
            return (0, response_1.default)(404, "Module Not Found", [], res);
        }
    }
    catch (error) {
        res.json(error);
    }
}
exports.EditModule = EditModule;
async function DeleteModule(req, res) {
    let moduleId = req.params.id;
    let MODULE = await Module_1.default.findByPk(moduleId);
    try {
        if (MODULE) {
            MODULE.destroy();
            return (0, response_1.default)(200, "Success delete module", [], res);
        }
        else {
            return (0, response_1.default)(400, "School not found", [], res);
        }
    }
    catch (error) {
        res.json(error);
    }
}
exports.DeleteModule = DeleteModule;
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
async function EditSuperAdmin(req, res) {
    try {
        const adminId = req.params.id;
        let adminData = req.body;
        let SCHOOL = await School_1.default.findOne({ where: { school_id: adminData.school_id } });
        adminData.school_name = SCHOOL.school_name;
        const SUPERADMIN = await Admin_1.default.findByPk(adminId);
        if (SUPERADMIN) {
            // hash password input before save into database
            await bcrypt_1.default.hash(adminData.password, 10).then((hash) => {
                adminData.password = hash;
                SUPERADMIN.update(adminData);
                return (0, response_1.default)(200, "Success update superadmin", SUPERADMIN, res);
            });
        }
        else {
            (0, response_1.default)(404, "Super Admin Not Found", [], res);
        }
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.EditSuperAdmin = EditSuperAdmin;
async function DeleteSuperAdmin(req, res) {
    try {
        const adminId = req.params.id;
        const SUPERADMIN = await Admin_1.default.findByPk(adminId);
        if (SUPERADMIN) {
            // hash password input before save into database
            SUPERADMIN.destroy();
            return (0, response_1.default)(200, "Success delete super admin", [], res);
        }
        else {
            return (0, response_1.default)(404, "Super Admin Not Found", [], res);
        }
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.DeleteSuperAdmin = DeleteSuperAdmin;
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < 4; i++) {
        uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueId;
}
function hitungSelisihTanggal(tanggalMulai, tanggalBerakhir) {
    const dateMulai = new Date(tanggalMulai);
    const dateBerakhir = new Date(tanggalBerakhir);
    if (dateBerakhir < dateMulai) {
        return false;
    }
    else {
        return true;
    }
}
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
//# sourceMappingURL=festivoController.js.map