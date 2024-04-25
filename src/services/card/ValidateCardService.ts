import prismaClient from "../../prisma";

class ValidateCardService {
    async execute(userId: string, numero: string, digitoSeguranca: string) {
        if (!numero || !digitoSeguranca) {
            throw Error("Número e dígito de segunraça devem ser informados!")
        }
        const card = await prismaClient.cartao.findFirst({ where: { numero: numero, digitoSeguranca: digitoSeguranca } });
        if (!card) {
            return false;
        }
        return card.idUsuario === userId;
    }
}

export { ValidateCardService };

