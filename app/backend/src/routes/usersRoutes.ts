import { Request, Response, Router } from 'express';
import UsersServices from '../services/UsersServices';
import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersServices = new UsersServices();
const usersController = new UsersController(usersServices);

usersRoutes.post('/login', (req: Request, res: Response) => usersController.login(req, res));

export default usersRoutes;
