import { Router } from "express";

import { CreateCardController } from "./controllers/card/CreateCardController";
import { ValidateCardController } from "./controllers/card/ValidateCardController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { isAuthenticated } from "./services/user/middlewares/IsAuthenticated";

const router: Router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.post('/card', isAuthenticated, new CreateCardController().handle);
router.get('/card/validation', isAuthenticated, new ValidateCardController().handle);

export { router };

