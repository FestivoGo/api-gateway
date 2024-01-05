import express from "express"
import { validateTokenAPI } from "../../utils/JWT";
import Module from "../../models/Module";
import School from "../../models/School";
import { CreateModule, DeleteModule, EditModule } from "../../controllers/v1/festivoController";

const router = express.Router()

router.get("/", async (req, res) => {
  let module = await Module.findAll({attributes:{exclude:["createdAt","updatedAt"]}})
  if(!module) return res.json("Module not Found")
  res.json(module)
});

router.get("/:id", async (req, res) => {
  const moduleId = req.params.id
  let module = await Module.findByPk(moduleId)
  if(!module) return res.json("Module not Found")
  res.json(module)
});

router.post('/', CreateModule);
router.put('/:id', EditModule);
router.delete('/:id', DeleteModule);


export default router;
