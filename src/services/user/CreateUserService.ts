import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

export interface UserRequest {
    nome: string;
    email: string;
    login: string;
    senha: string;
}

class CreateUserService {
    async execute({ nome, email, login, senha }: UserRequest) {
        if (!email || !login) {
            throw new Error("Login ou e-mail não informados!");
        }

        const senhaHash = await hash(senha, 8);

        const loginAlreadyExists = await prismaClient.usuario.findFirst({ where: { login: login } });

        if (loginAlreadyExists) {
            throw new Error("Login informado já está cadastrado!");
        }
        const user = await prismaClient.usuario.create({
            data: { email: email, nome: nome, login: login, senha: senhaHash },
            select: { id: true, nome: true, email: true, dataCriacao: true }
        });

        return user;
    }
}

export { CreateUserService };

