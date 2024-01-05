import express from "express"
import { validateTokenAPI } from "../../utils/JWT";
import Module from "../../models/Module";
import School from "../../models/School";
import { CreateModule } from "../../controllers/v1/festivoController";

const router = express.Router()

router.get("/", async (req, res) => {
  let module = await Module.findAll({attributes:{exclude:["createdAt","updatedAt"]}})
  if(!module) return res.json("Module not Found")
  res.json(module)
});

router.get("/:module_name", async (req, res) => {
    let module = await Module.findOne({where:{module_name: req.params.module_name}})
    if(!module) return res.json("Module not Found")
    res.json(module)
});

router.post('/', CreateModule);


export default router;
