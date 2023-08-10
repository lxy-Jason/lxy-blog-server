import { ApiProperty } from '@nestjs/swagger';

export type UserType = 'admin' | 'collaborator' | 'visitor';

export class User {
  @ApiProperty({ description: '用户名', type: 'string', required: true })
  name: string;
  @ApiProperty({ description: '密码', type: 'string', required: true })
  password: string;
  @ApiProperty({ description: '用户类型' })
  type: UserType;
}
