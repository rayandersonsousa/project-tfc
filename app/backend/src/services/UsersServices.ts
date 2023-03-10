import { ModelStatic } from 'sequelize';
import IUsersRole from '../interfaces/IUserRole';
import Users from '../database/models/Users';
import IUsersService from '../interfaces/IUsersService';

export default class UsersServices implements IUsersService {
  async login(email: string): Promise<Users> {
    const user = await this.model.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    return user;
  }

  async getUserRole(email: string): Promise<IUsersRole> {
    const user = await this.model.findOne({
      where: { email },
    });

    const userRole = user?.role;
    return userRole as unknown as IUsersRole;
  }

  protected model: ModelStatic<Users> = Users;
}
