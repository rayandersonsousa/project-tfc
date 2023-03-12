import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches';
import sequelize from '../database/models';
import performance from './board.helper';

export default class LeaderboardService {
  private _service: ModelStatic<Matches> = Matches;

  static async getLeaderboard() {
    const [fineshedMatches] = await sequelize.query(performance('home', 'away'));

    return fineshedMatches;
  }
}
