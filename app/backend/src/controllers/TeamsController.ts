import { Request, Response } from 'express';
import ITeams from '../interfaces/ITeams';

export default class TeamsController {
  private _service: ITeams;

  constructor(service: ITeams) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAll();
    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this._service.getById(Number(id));
    return res.status(200).json(team);
  }
}
