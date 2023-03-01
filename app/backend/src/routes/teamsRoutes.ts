import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsServices from '../services/TeamsServices';

const teamsRoutes = Router();
const teamsService = new TeamsServices();
const teamsController = new TeamsController(teamsService);

teamsRoutes.get('/teams', (req: Request, res: Response) => teamsController.getAll(req, res));

export default teamsRoutes;
