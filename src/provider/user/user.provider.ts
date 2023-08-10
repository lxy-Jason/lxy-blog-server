/*
 * @Author: xiangyue_li
 * @Date: 2023-08-08 23:18:21
 * @LastEditors: xiangyue_li
 */
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { User } from '../../types/user';

@Injectable() //装饰器，用于表示该类可以被依赖注入系统进行管理
export class UserProvider {
  logger = new Logger(UserProvider.name); //用于日志记录的工具类。
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getUserByName(name: string): Promise<User> {
    return await this.userModel.findOne({ name }).exec();
  }

  async getNewId(): Promise<number> {
    const [lastUser] = await this.userModel.find({}).sort({ id: -1 }).limit(1);
    if (!lastUser) {
      return 1;
    } else {
      return lastUser.id + 1;
    }
  }

  async addUser(user: User): Promise<User> {
    const { name, password, type } = user;
    const hasName = await this.getUserByName(name);
    if (hasName) {
      throw new ForbiddenException('用户名已存在');
    }
    if (type !== 'admin' && type !== 'collaborator' && type !== 'visitor') {
      throw new ForbiddenException('用户类型错误');
    }
    return await this.userModel.create({
      id: await this.getNewId(),
      type: type || 'visitor',
      name,
      password,
    });
  }
}
