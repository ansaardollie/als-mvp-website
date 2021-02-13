import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  isLoading: boolean = false;

  email: string = '';
  password: string = '';

  constructor(private us: UserService, private router: Router) {}

  ngOnInit(): void {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      const isWholesale = this.email.indexOf('wholesale') >= 0;
      const user: User = {
        email: this.email,
        password: this.password,
        isWholesaleClient: isWholesale,
      };
      this.us.loginUser(user);
      this.isLoading = false;
      this.router.navigate(['/shop', 'products']);
    }, 4000);
  }
}
