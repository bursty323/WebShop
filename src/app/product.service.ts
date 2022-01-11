import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  save(product: any) {
    return this.db.list('/products/').push(product);
  }
  getAll() {
    return this.db.list('/products').snapshotChanges();
  }
  get(id: any) {
    return this.db.object('/products/' + id).valueChanges();
  }
  update(id: any, product: any) {
    return this.db.object('/products/' + id).update(product);
  }
  delete(id: any) {
    return this.db.object('/products/' + id).remove();
  }
}
