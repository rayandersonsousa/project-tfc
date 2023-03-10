import Users from '../database/models/Users';
import IUsersRole from './IUserRole';

export default interface IUsersService {
  login(data: string): Promise<Users>;
  getUserRole(username: string): Promise<IUsersRole>
}
