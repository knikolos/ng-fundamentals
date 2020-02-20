import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string;
  password: string;
  mouseOver: boolean;
  invalidLogin = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(formValues): void {
    this.authService.loginUser(formValues.userName, formValues.password)
      .subscribe(resp => {
        if (!resp) {
          this.invalidLogin = true;
        } else {
          this.router.navigate(["events"]);
        }
      });
  }

  cancel(): void {
    this.router.navigate(["events"]);
  }
}
