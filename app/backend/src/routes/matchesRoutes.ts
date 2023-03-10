import { Request, Response, Router } from 'express';
import auth from '../middlewares/auth';
import MatchesController from '../controllers/MatchesController';
import MatchesServices from '../services/MatchesServices';

const matchesRoutes = Router();
const matchesServices = new MatchesServices();
const matchesController = new MatchesController(matchesServices);

matchesRoutes.get('/matches', (req: Request, res: Response) => matchesController.getAll(req, res));
matchesRoutes.patch('/matches/:id/finish', auth.verifyToken, (req, res) => matchesController
  .endMatch(req, res));

export default matchesRoutes;
