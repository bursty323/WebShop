import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { take, map, switchMap, filter } from 'rxjs/operators';
import { ProductService } from './../../product.service';
import { Products } from './../../models/products';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: Products[] = [];
  filtered: any[] = [];
  constructor(private productservice: ProductService) {
    this.productservice
      .getAll()
      .pipe(take(1))
      .subscribe((x: any[]) => {
        x.map((y) => {
          let data = y.payload.val();
          data.id = y.payload.key;
          this.products.push(data);
        });
      });
    this.filtered = this.products;
  }
  handleChange(x: String) {
    if (x) {
      this.filtered = this.products.filter((y) =>
        y.title.toLowerCase().includes(x.toLowerCase())
      );
    } else this.filtered = this.products;
  }
  ngOnInit(): void {}
}
