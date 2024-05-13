import express from "express"
import passport from "passport"
import { GetAllPlayers, GetPlayersByID, LoginAndCreateNewPlayer, UpdatePlayerDataByID } from "../../../controllers/muslim-raya/v1/playerController";

const router = express.Router()

router.get("/", GetAllPlayers)
router.post("/", LoginAndCreateNewPlayer)
router.get("/:id", GetPlayersByID)
router.put("/:id", UpdatePlayerDataByID)


export default router;
