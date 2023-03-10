import { ModelStatic } from 'sequelize';
import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesServices implements IMatches {
  async getAll(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  protected model: ModelStatic<Matches> = Matches;
}
