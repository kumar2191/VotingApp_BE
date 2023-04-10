import {  User } from '../../Model/User'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { statusCode } from '../../utils/Constent'
import logger from '../../Middleware/logger'
interface Payload{ 
    Name: String,
    RegiserNumber: String,
    Department: String,
    Section: String,
    PhoneNumber: number,
    Batch: number,
    Course: String,
    Email: String,
    Password: String,
    
}
export interface AuthRequest extends Request {
    user: any;
   }
const UserRegister = async(req:Request, res:Response) => {
    let hash: string = await bcrypt.hash(req.body.Password, 10);
    
    const Payload:Payload = {
        Name:req.body.Name,
        RegiserNumber: req.body.RegiserNumber,
        Department: req.body.Department,
        Section:req.body.Section,
        PhoneNumber: req.body.PhoneNumber,
        Batch: req.body.Batch,
        Course: req.body.Course,
        Email: req.body.Email,
        Password:hash,
    }      
        try {

            let user = new User(Payload);
            let result = await user.save();
            const TokenData:any = {
                _id: result._id,
                RegisterNumber: result.RegiserNumber,
                Email: result.Email,
                Name:result.Name
            }
             const userToken = jwt.sign(TokenData,process.env.JWTKEY);
            res.status(statusCode.success).send(userToken)
            
          } catch (error) {
            logger.error(error.message)
                res.status(statusCode.badRequest).send(error)
          }
    }
    
const UserLogin = async (req: Request, res: Response) => {
    try {

        let userData: any = await User.findOne({ Email: req.body.Email });
        
        if (!userData) {
            return res.status(statusCode.badRequest).send("Please enter a valid email")
        }
        let validpassword = await bcrypt.compare(req.body.Password, userData.Password)

        
        if (!validpassword) {
           
        return res.status(statusCode.badRequest).send("not a valid password")
       }
         const TokenData:any = {
                _id: userData._id,
                RegisterNumber: userData.RegiserNumber,
                Email: userData.Email,
                Name:userData.Name
        }

            const userToken = jwt.sign(TokenData,process.env.JWTKEY);
           

      res.header('auth',userToken).send(userToken)
    } catch (error) {
         logger.error(error.message)
        res.status(statusCode.badRequest).send(error.message)
    }
    
}

const UserProfile = async (req: Request, res: Response) => {
    try {
        
        console.log(req.user);
        
    } catch (error) {
        res.send(error);
    }
}



export {
    UserRegister,
    UserLogin,
    UserProfile
}