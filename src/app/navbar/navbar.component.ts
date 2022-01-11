import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appuser: any;
  constructor(public auth: AuthService, public db: AngularFireDatabase) {
    auth.user$
      .pipe(
        switchMap((user: any) => {
          return this.db.object('/user/' + user?.uid).valueChanges();
        })
      ) //never use switchMap with async pipe or you will run in infinite loop
      .subscribe((x) => {
        this.appuser = x;
      });
  }

  ngOnInit(): void {}
  logout() {
    this.auth.logout();
  }
}
