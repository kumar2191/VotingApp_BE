import * as express from "express";
import {
    UserLogin,
    UserProfile,
    UserRegister
} from '../Controller/User/User'
import { AuthMiddleware} from '../Middleware/auth'
const router=express.Router()

router.post('/User/register',UserRegister)
router.post('/User/login',UserLogin)
router.get ('/User/GetProfile',AuthMiddleware,UserProfile)




export default router;