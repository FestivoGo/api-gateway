import express from "express"
import { validateTokenAPI } from "../../utils/JWT";
import Module from "../../models/Module";
import School from "../../models/School";
import SchoolModule from "../../models/SchoolModule";
import { CreateSchool, EditSchool } from "../../controllers/v1/festivoController";

const router = express.Router()

router.get("/", async (req, res) => {
  let school = await School.findAll({
    attributes:{exclude:["createdAt", "updatedAt"]},
    order: ["school_id"],
    include:[
      {model: Module, as: "modules", attributes:{exclude:["createdAt", "updatedAt"]}, through:{as:"status",attributes:["subscribed"]}}
    ]
  })
  if(!school) return res.json("school not Found")
  res.json(school)
});

router.get("/:id", async (req, res) => {
  let schoolId = req.params.id
  let school = await School.findByPk(schoolId,{
    attributes:{exclude:["createdAt", "updatedAt"]},
    include:[
      {model: Module, as: "modules", attributes:{exclude:["createdAt", "updatedAt"]}, through:{as:"status",attributes:["subscribed"]}}
    ]
  })
  if(!school) return res.json("school not Found")
  res.json(school)
});
router.post('/', CreateSchool);
router.put("/:id", EditSchool)


export default router;
