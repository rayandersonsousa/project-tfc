import { Request, Response, Router } from 'express';
import UsersServices from '../services/UsersServices';
import UsersController from '../controllers/UsersController';
import auth from '../middlewares/auth';

const usersRoutes = Router();
const usersServices = new UsersServices();
const usersController = new UsersController(usersServices);

usersRoutes.post('/login', (req: Request, res: Response) => usersController.login(req, res));
usersRoutes.get('/login/role', auth.verifyToken, (req, res, next) => usersController
  .getUserRole(req, res, next));

export default usersRoutes;
