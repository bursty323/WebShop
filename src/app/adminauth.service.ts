import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AdminauthService implements CanActivate {
  constructor(private auth: AuthService, private db: AngularFireDatabase) {}
  canActivate() {
    return this.auth.user$
      .pipe(
        switchMap((user) => {
          return this.db.object('/user/' + user?.uid).valueChanges();
        })
      )
      .pipe(
        map((x: any) => {
          return x.isAdmin;
        })
      );
  }
}
