import express from "express"
import {authCheck, Login, Logout, Signup} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router()

router.post("/signup", Signup);
router.post("/login",Login);
router.post("/logout",Logout);

router.get("/authCheck", protectRoute, authCheck)


export default router