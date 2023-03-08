import { ModelStatic } from 'sequelize';
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

  protected model: ModelStatic<Users> = Users;
}
