import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  listProducts: Product[]
  
  constructor(public _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this._productService.getProducts().subscribe(data =>{
      console.log(data)
      this.listProducts = data;
    })
  }

  deleteProduct(id: any){
    if(window.confirm('Are you sure?')){
      this._productService.deleteProduct(id).subscribe(data=> {
        this.getProducts()
      })
    }
  }
}
