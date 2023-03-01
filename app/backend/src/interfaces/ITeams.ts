import Teams from '../database/models/Teams';

export default interface ITeams {
  getAll(): Promise<Teams[]>;
}
