import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getcategories() {
    let categories: any[] = [];
    this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((x: any[]) => {
        x.map((y) => {
          let data = y.payload.val();
          data.id = y.payload.key;
          categories.push(data);
        });
      });
    return categories;
  }
}
