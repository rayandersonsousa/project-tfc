import Matches from '../database/models/Matches';

export interface IMatch extends Matches {
  homeTeam?: object,
  awayTeam?: object,
}
