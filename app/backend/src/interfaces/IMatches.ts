import Matches from '../database/models/Matches';

export default interface IMatches {
  getAll(): Promise<Matches[]>
}