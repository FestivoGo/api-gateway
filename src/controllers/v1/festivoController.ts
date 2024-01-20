import Admin from "../../models/Admin";
import Exam from "../../models/Exam";
import ExamType from "../../models/ExamType";
import Module from "../../models/Module";
import School from "../../models/School";
import SchoolModule from "../../models/SchoolModule";
import Student from "../../models/Student";
import { generateMegaAccessToken } from "../../utils/JWT";
import response from "../response";
import bcrypt from "bcrypt"
import cron from "node-cron"



export async function LoginMegaAdmin(req, res) {
    let megaData = req.body
    console.log(megaData);
    
    try {
        if(megaData.credentials == "mega"){
          let megaToken = generateMegaAccessToken(megaData)
          res.cookie("mega-token", megaToken, {
            httpOnly: true
          });
          return response(200, "success login", [], res)
        }else{
          return response(400, "Wrong Credentials", [], res)
        }
    } catch (error) {
        res.json(error)
    }  
}
export async function LogoutMegaAdmin(req, res) {
  res.clearCookie("mega-token");
  res.redirect("/festivo/login");
}

export async function CreateSchool(req, res) {
    let schoolData = req.body
    try {
        let schoolLength = await School.max("school_id")
        schoolLength = +schoolLength + 1
        schoolData.school_id = schoolLength.toString().padStart(4,"0")
        
        let SCHOOL = await School.create(schoolData)
        let MODULES = await Module.findAll()
        SCHOOL.setModules(MODULES)

        let superAdminData = {
          username: `sudo${SCHOOL.school_id}`,
          nuptk: `admin-${generateUniqueId()}`,
          password: "123",
          school_id: SCHOOL.school_id,
          school_name: SCHOOL.school_name,
          role: "super_admin"
        }
        await bcrypt.hash(superAdminData.password, 10).then((hash) => {
          superAdminData.password = hash
          Admin.create(superAdminData).then((respon) => {
            response(201, "success create new school", [], res);
          });
        });
    } catch (error) {
        res.json(error)
    }  
}
export async function EditSchool(req, res) {
  let schoolId = req.params.id
  let moduleON = req.body.ON || ""
  let schoolData = req.body
  let SCHOOL = await School.findByPk(schoolId)
  try {
    if(SCHOOL){
      let modules = await SCHOOL.getModules()
      SCHOOL.update(schoolData)
      
      if(modules.length !== 0){
        modules.forEach(async module => {
          let schoolmodule = await SchoolModule.findOne({where:{ModuleUniqueId: module.unique_id, ownerId:schoolId}})
          if(moduleON.includes(module.unique_id)){
            schoolmodule.update({subscribed: true})
          }else{
            schoolmodule.update({subscribed: false})
          }
        })
        return response(200, "Success update school", [], res)
      }

      return response(200, "Success update school", [], res)
    }else{
      return response(400, "School not found", [], res)
    }
  } catch (error) {
    res.json(error)
  }
}
export async function DeactiveSchool(req, res) {
  let schoolId = req.params.id
  let schoolData = req.body
  let SCHOOL = await School.findByPk(schoolId)
  try {
    if(SCHOOL){
      SCHOOL.update(schoolData)
      await Admin.update(schoolData, {where:{school_id: SCHOOL.school_id}})
      await Student.update(schoolData, {where:{school_id: SCHOOL.school_id}})
      return response(200, "Success update status school", [], res)
    }else{
      return response(400, "School not found", [], res)
    }
  } catch (error) {
    res.json(error)
  }
}
export async function ActivateSchoolModule(req, res) {
  let schoolmoduleId = req.params.id
  let schoolmoduleBody = req.body
  let SCHOOL_MODULE = await SchoolModule.findByPk(schoolmoduleId)
  try {
    if(SCHOOL_MODULE){
      schoolmoduleBody.subscribed = true
      SCHOOL_MODULE.update(schoolmoduleBody)
      return response(200, "Success update school", [], res)
    }else{
      return response(400, "School not found", [], res)
    }
  } catch (error) {
    res.json(error)
  }
}

cron.schedule("* * * * *", async function(){
  let SCHOOL_MODULES = await SchoolModule.findAll()
  SCHOOL_MODULES.forEach(schoolmodule => {
    if(hitungSelisihTanggal(getTodayDate(), schoolmodule.tanggal_berakhir) == false){
      schoolmodule.update({subscribed: false})
    }
  })
})


export async function CreateModule(req, res) {
    let moduleData = req.body
    try {
        let SCHOOLS = await School.findAll()
        let NEW_MODULE = await Module.create(moduleData)
        SCHOOLS.forEach(SCHOOL => {
            SCHOOL.addModule(NEW_MODULE)
        })
        return response(201, "success create new school", NEW_MODULE, res)
    } catch (error) {
        res.json(error)
    }  
}
export async function EditModule(req, res) {
  let moduleData = req.body
  let moduleId = req.params.id
  try {
    let MODULE = await Module.findByPk(moduleId)
    if(MODULE){
      MODULE.update(moduleData)
      return response(200, "Module updated", MODULE, res)
    }else{
      return response(404, "Module Not Found", [], res)
    }
  } catch (error) {
    res.json(error)
  }  
}
export async function DeleteModule(req, res) {
  let moduleId = req.params.id
  let MODULE = await Module.findByPk(moduleId)
  try {
    if(MODULE){
      MODULE.destroy()
      return response(200, "Success delete module", [], res)
    }else{
      return response(400, "School not found", [], res)
    }
  } catch (error) {
    res.json(error)
  }
}

export async function CreateSuperAdmin(req, res) {
    try {
      let adminData = req.body;
      let SCHOOL = await School.findOne({where:{school_id: adminData.school_id}})
      adminData.school_name = SCHOOL.school_name      
  
      // hash password input before save into database
      await bcrypt.hash(adminData.password, 10).then((hash) => {
        adminData.password = hash
        Admin.create(adminData).then((respon) => {
          response(201, "success create new super admin", respon, res);
        });
      });
    } catch (error) {
      response(500,"server failed to create new user",{ error: error.message },res
      );
    }
}
export async function EditSuperAdmin(req, res) {
    try {
      const adminId = req.params.id
      let adminData = req.body;
      let SCHOOL = await School.findOne({where:{school_id: adminData.school_id}})
      adminData.school_name = SCHOOL.school_name   
  
      const SUPERADMIN = await Admin.findByPk(adminId)
      if(SUPERADMIN){
        // hash password input before save into database
        await bcrypt.hash(adminData.password, 10).then((hash) => {
          adminData.password = hash
          SUPERADMIN.update(adminData)
          return response(200, "Success update superadmin", SUPERADMIN, res)
        });
      }else{
        response(404, "Super Admin Not Found", [], res)
      }
    } catch (error) {
      response(500,"server failed to create new user",{ error: error.message },res
      );
    }
}
export async function DeleteSuperAdmin(req, res) {
  try {
    const adminId = req.params.id 
    const SUPERADMIN = await Admin.findByPk(adminId)
    if(SUPERADMIN){
      // hash password input before save into database
      SUPERADMIN.destroy()
      return response(200, "Success delete super admin", [], res)
    }else{
      return response(404, "Super Admin Not Found", [], res)
    }
  } catch (error) {
    response(500,"server failed to create new user",{ error: error.message },res
    );
  }
}



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
  }else{
    return true
  }
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
