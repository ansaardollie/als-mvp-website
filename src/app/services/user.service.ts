import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private user$ = new BehaviorSubject<User>(TestUser);

  get user() {
    return this.user$.asObservable();
  }

  get userIsWholesaleClient(): Observable<boolean> {
    return this.user.pipe(
      map((user) => {
        if (!user || !user.isWholesaleClient) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
  constructor() {}

  loginUser(user: UserInfo): void {
    this.user$.next(user);
  }
}
