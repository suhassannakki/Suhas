import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
   })
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List: ';
    imagewidth : number = 50;
    imagemargin = 2;
    showImage: boolean = false;
    showFilter: boolean = false;
    errorMessage: string;
    i : boolean;
    
    _listFilter: string;
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products ;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];
    constructor(private productService: ProductService){
    }

    toggleImage(): void{
        this.showImage = !this.showImage
        localStorage.setItem("img", JSON.stringify(this.showImage));
    }
  displayFilter(): void{
      if(this.listFilter)
        this.showFilter = true;
      else
        this.showFilter = false;
  }
  ngOnInit (): void {
    if( this.i= JSON.parse(localStorage.getItem("img")) == true){
      this.showImage = this.i;
    }
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts=this.products
      },
      error: err => this.errorMessage = err
    });
  }
  
  onRatingClicked(message: string) :void{
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter (filterBy : string) : IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product : IProduct) => {
      return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }
}