import express from "express"
import passport from "passport"
import { CreateNewPlayer, GetAllPlayers, GetPlayersByID, UpdatePlayerDataByID,  } from "../../controllers/v1/playerController";

const router = express.Router()

router.get("/", GetAllPlayers)
router.post("/", CreateNewPlayer)
router.get("/:id", GetPlayersByID)
router.put("/:id", UpdatePlayerDataByID)


export default router;
