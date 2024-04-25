import prismaClient from "../../prisma";

export interface CardRequst {
    numero: string,
    nomeProprietario: string,
    validade: string,
    digitoSeguranca: string,
    userId: string
}

class CreateCardService {
    async execute({ numero, nomeProprietario, validade, digitoSeguranca, userId }: CardRequst) {
        if (!numero || !validade || !digitoSeguranca) {
            throw new Error("Número, validade e dígito de segurança devem ser informados!");
        }

        const numeroExists = await prismaClient.cartao.findFirst({ where: { numero: numero } });
        if (numeroExists) {
            throw new Error("Número de cartão informado, já encontra-se cadastrado!");
        }

        const card = await prismaClient.cartao.create({
            data: { numero: numero, nomeProprietario: nomeProprietario, validade: validade, digitoSeguranca: digitoSeguranca, idUsuario: userId },
            select: { id: true, numero: true, nomeProprietario: true, validade: true }
        })
        return card;
    }
}

export { CreateCardService };

