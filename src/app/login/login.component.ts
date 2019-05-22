import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
      email: '',
      password: ''
  };

  error: '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signInWithEmail() {
      this.authService.signInRegular(this.user.email, this.user.password)
          .then((res) => {
              console.log(res);
              this.router.navigate(['tasklist']);
          })
          .catch((err) => this.error = err);
  }

}
