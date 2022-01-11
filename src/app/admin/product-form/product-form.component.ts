import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories: any[] = [];
  product: any = {};
  id: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryservice: CategoryService,
    private productservice: ProductService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productservice.get(this.id).subscribe((x) => {
        this.product = x;
      });
    this.categories = categoryservice.getcategories(); //array of categories not observer
  }
  save(product: any) {
    if (this.id) this.productservice.update(this.id, product);
    else this.productservice.save(product);
    this.router.navigate(['/admin/products']);
  }
  handleDelete() {
    if (!confirm('Are you sure you want to Delete Product?')) return;
    this.productservice.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit(): void {}
}
