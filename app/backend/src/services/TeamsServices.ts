import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams';
import ITeams from '../interfaces/ITeams';

export default class TeamsServices implements ITeams {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<Teams> {
    const team = await this.model.findByPk(id);
    return team as Teams;
  }
}
