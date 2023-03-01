import Users from '../database/models/Users';

export default interface IUsersService {
  login(data: string): Promise<Users>;
}
