import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

export interface AuthRequest {
    login: string;
    senha: string;
}

class AuthUserService {
    async execute({ login, senha }: AuthRequest) {
        const user = await prismaClient.usuario.findFirst({ where: { login: login } });
        if (!user) {
            throw new Error("Usuário ou senha incorretos!");
        }

        if (!await compare(senha, user.senha)) {
            throw new Error("Usuário ou senha incorretos!");
        }

        const token = sign(
            {
                usuario: user.login
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '10d'
            }
        );

        return {
            id: user.id,
            nome: user.nome,
            token: token
        }
    }
}

export { AuthUserService };

