import express from "express"
import passport from "passport"
import { GetAllPlayers, GetPlayersByID, LoginWithGoogle, UpdatePlayerDataByID,  } from "../../controllers/v1/playerController";

const router = express.Router()

router.get("/", GetAllPlayers)
router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/' , session: false}), LoginWithGoogle)
router.get("/:id", GetPlayersByID)
router.put("/:id", UpdatePlayerDataByID)


export default router;
