import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from '@firebase/app-compat';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.user$ = auth.authState;
  }

  login() {
    let y = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((x) => {
        this.db.object('/user/' + x.user?.uid).update({
          email: x.user?.email,
          name: x.user?.displayName,
        });
        this.route.navigateByUrl(y);
      });
  }
  logout() {
    this.auth.signOut();
  }
}
