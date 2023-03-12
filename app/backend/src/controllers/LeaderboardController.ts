import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

export default class LeaderboardController {
  private _service: LeaderboardService;

  constructor() {
    this._service = new LeaderboardService();
  }

  static async getLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard();

    return res.status(200).json(leaderboard);
  }
}
