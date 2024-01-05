import Admin from "../../models/Admin";
import ExamType from "../../models/ExamType";
import Module from "../../models/Module";
import School from "../../models/School";
import response from "../response";
import bcrypt from "bcrypt"

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