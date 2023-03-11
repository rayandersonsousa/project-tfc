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

  async getInProgress(progress: string): Promise<Matches[]> {
    const inProgress = JSON.parse(progress);
    const matchesProgress = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });
    return matchesProgress;
  }

  async endMatch(id: number): Promise<number> {
    const match = await this.model.update({
      inProgress: false,
    }, { where: { id } });
    return match[0];
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  protected model: ModelStatic<Matches> = Matches;
}
