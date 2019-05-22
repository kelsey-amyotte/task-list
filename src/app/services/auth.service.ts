import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private user: Observable<firebase.User>;
    public userDetails: firebase.User = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
      this.user = afAuth.authState;

      this.user.subscribe(
          (user) => {
              if (user) {
                  this.userDetails = user;
              }
              else {
                  this.userDetails = null;
              }
          }
      )
  }

  signInRegular(email, password) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
      return this.afAuth.authState.pipe(map(user => user !== null));
  }

  logout() {
      this.afAuth.auth.signOut().then((res) => this.router.navigate(['/']));
  }
}
