import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User, UserInfo } from './../models/user.model';

const TestUser: UserInfo = {
  email: 'ansaard123@gmail.com',
  password: 'password',
  isWholesaleClient: true,
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = new BehaviorSubject<User>(null);

  get user() {
    return this.user$.asObservable();
  }
  constructor() {}

  loginUser(user: UserInfo): void {
    this.user$.next(user);
  }
}
