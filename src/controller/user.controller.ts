import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserProvider } from '../provider/user/user.provider';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '../types/user';

@ApiTags('用户接口')
@Controller('/user/')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Post('/addUser')
  async addUser(@Body() userParam: User) {
    const data = await this.userProvider.addUser(userParam);
    return {
      code: 200,
      data,
    };
  }

  @Get('/getUserNameByName/:username')
  @ApiParam({
    name: 'username',
    description: '根据用户名获取用户信息',
    required: true,
  })
  async getUserByName(@Param('username') username: string) {
    const data = await this.userProvider.getUserByName(username);
    return {
      code: 200,
      data,
    };
  }
}
