import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'Abdul', email: ' abdul@gmail.com' },
    { username: 'Hashim', email: ' hashim@gmail.com' },
    { username: 'Ticha', email: ' ticha@gmail.com' },
    { username: 'Kai', email: ' kai@gmail.com' },
  ];

  fetchUsers() {
    return this.fakeUsers;
  }
  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }

  // fetching users by ID
  fetchUserById(id: number) {
    return { id, username: 'Hansen', email: 'hansen@gmail.com' };
  }

  // ? a situation where we have no user
  //   fetchUserById(id: number) {
  //     return null;
  //   }
}
