import { Router } from "express";
import { register, show_login } from "../controller/user_controller";

const userRoutes = Router();

userRoutes.get('/user/login', show_login);
userRoutes.post('/user/register', register);

export{
    userRoutes
}