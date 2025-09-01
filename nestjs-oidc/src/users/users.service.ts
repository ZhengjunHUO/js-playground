import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

export class User {
  userId: number;
  username: string;
  password: string;
  roles: Role[];
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'foo',
      password: 'foopwd',
      roles: [Role.User],
    },
    {
      userId: 2,
      username: 'bar',
      password: 'barpwd',
      roles: [Role.User, Role.Admin],
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
