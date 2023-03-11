import { Request, Response } from 'express';
import IMatches from '../interfaces/IMatches';

export default class MatchesController {
  private _service: IMatches;

  constructor(service: IMatches) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const matchesProgress = await this._service.getInProgress(inProgress as string);
      return res.status(200).json(matchesProgress);
    }

    const matches = await this._service.getAll();
    return res.status(200).json(matches);
  }

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this._service.endMatch(Number(id));

    return res.status(200).json(match);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this._service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Daijoubu' });
  }

  async createMatch(req: Request, res: Response) {
    const newMatch = await this._service.createMatch(req.body);
    return res.status(201).json(newMatch);
  }
}
