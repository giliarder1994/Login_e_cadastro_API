export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}

// Um tipo auxiliar para quando o usuario estiver se cadastrando
export type CreateUserDTO = Omit<User, 'id' | 'createdAt'>;