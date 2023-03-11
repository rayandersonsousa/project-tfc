import Matches from '../database/models/Matches';
import { INewMatch } from './INewMatch';

export default interface IMatches {
  getAll(): Promise<Matches[]>
  getInProgress(progress: string): Promise<Matches[]>
  endMatch(id: number): Promise<number>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void | object>
  createMatch(newMatch: INewMatch): Promise<Matches>
}
