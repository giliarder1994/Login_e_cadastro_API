import { User, CreateUserDTO } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

const userDatabase: User[] = [];
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

export class AuthService {

    async register ({name, email, passwordHash}: CreateUserDTO): Promise<Omit<User, 'passwordHash'>>{

        const userExist = userDatabase.find(u => u.email === email);
        if(userExist) {
            throw new Error('E-mail já cadastrado!');
        }

        const hashPassword = await bcrypt.hash(passwordHash, 10);

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            passwordHash: hashPassword,
            createdAt: new Date()
        };

        userDatabase.push(newUser);

        const {passwordHash: _, ...userWithoutPassword} = newUser;
        return userWithoutPassword;
    };

    async login(email: string, passwordPlain: string): Promise< {user: Omit<User, 'passwordHash'>; token: string}> {

        const user = userDatabase.find(u => u.email === email);
        if(!user) {
            throw new Error('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(passwordPlain, user.passwordHash);
        if(!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1d'});

        const {passwordHash: _, ...userWithoutPassword} = user;
        return {user: userWithoutPassword, token};
    }
}