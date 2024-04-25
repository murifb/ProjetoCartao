import { Request, Response } from "express";
import { ValidateCardService } from "../../services/card/ValidateCardService";

class ValidateCardController {
    async handle(req: Request, res: Response) {

        const userId: string = req.user_id;
        const digitoSeguranca: string = req.body.digitoSeguranca;
        const numero: string = req.body.numero;

        const validateCardService: ValidateCardService = new ValidateCardService();
        const isValid = await validateCardService.execute(userId, numero, digitoSeguranca);

        return res.json(isValid ? 'Cartão válido!' : 'Cartão inválido!');

    }
}
export { ValidateCardController };

