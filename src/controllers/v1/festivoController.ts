import Admin from "../../models/Admin";
import ExamType from "../../models/ExamType";
import Module from "../../models/Module";
import School from "../../models/School";
import SchoolModule from "../../models/SchoolModule";
import response from "../response";
import bcrypt from "bcrypt"



export async function LoginMegaAdmin(req, res) {
    let megaData = req.body
    console.log(megaData);
    
    try {
        if(megaData.credentials == "mega"){
          return response(200, "success login", [], res)
        }else{
          return response(400, "Wrong Credentials", [], res)
        }
    } catch (error) {
        res.json(error)
    }  
}

export async function CreateSchool(req, res) {
    let schoolData = req.body
    try {
        let schoolLength = await School.count()
        schoolData.school_id = schoolLength.toString().padStart(4,"0")
        
        let SCHOOL = await School.create(schoolData)
        let MODULES = await Module.findAll()
        SCHOOL.setModules(MODULES)
        return response(201, "success create new school", SCHOOL, res)
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