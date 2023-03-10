import Matches from '../database/models/Matches';

export default interface IMatches {
  getAll(): Promise<Matches[]>
  getInPRogress(progress: string): Promise<Matches[]>
  endMatch(id: number): Promise<number>
}
