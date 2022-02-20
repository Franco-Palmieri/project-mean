import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  title = 'Create Product'
  id: string | null;
  
  constructor(public fb: FormBuilder, private router: Router, private _productService: ProductService, private aRoute: ActivatedRoute) { 
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esModify()
  }

  addProduct(){
    
    const product: Product ={
      name: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
    }

    if(this.id != null){
      //Edit Product
      this._productService.putProduct(this.id, product).subscribe(data=>{
        this.router.navigate(['/'])
        console.log('il prodotto è stato modificato')
      })
    }else{
      //Add Product
      this._productService.postProduct(product).subscribe(data =>{
  
        this.router.navigate(['/'])
        console.log('il prodotto è stato aggiunto')
        this.productForm.reset()
      })
    }
  }

  esModify(){
    if(this.id !== null){
      this.title = 'Edit Product'
      this._productService.getProduct(this.id).subscribe(data =>{
        this.productForm.setValue({
          product: data.name,
          category: data.category,
          location: data.location,
          price: data.price,
        })
      })
    }
  }


}
