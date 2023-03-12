import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', (req: Request, res: Response) =>
  LeaderboardController.getLeaderboard(req, res));

export default leaderboardRouter;
