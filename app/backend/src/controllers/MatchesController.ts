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
      const matchesProgress = await this._service.getInPRogress(inProgress as string);
      return res.status(200).json(matchesProgress);
    }

    const matches = await this._service.getAll();
    return res.status(200).json(matches);
  }
}
