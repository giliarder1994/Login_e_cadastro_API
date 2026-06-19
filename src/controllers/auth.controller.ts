import {Request, Response} from "express";
import { AuthService } from "../service/auth.service";

const authService = new AuthService();

export class AuthController {

    async register (req: Request, res: Response): Promise<void> {
        try {
            const {name, email, password} = req.body;

            if(!name || !email || !password) {
                res.status(400).json({ error: "Campos obrigatorios ausentes" });
                return;
            };

            const user = await authService.register({name, email, passwordHash: password});
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    async login(req:Request, res:Response): Promise<void> {
        try {
            const {email, password} = req.body;
            
            const data = await authService.login(email, password);
            res.status(200).json(data);
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }
}