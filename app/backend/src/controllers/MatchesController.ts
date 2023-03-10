import { Request, Response } from 'express';
import IMatches from '../interfaces/IMatches';

export default class MatchesController {
  private _service: IMatches;

  constructor(service: IMatches) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const matches = await this._service.getAll();
    return res.status(200).json(matches);
  }
}
