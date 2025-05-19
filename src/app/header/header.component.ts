import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public products: string[] = ['QH', 'Micro', 'Antifraud'];
  public selectedProduct: string = this.products[0];
  public filterValues: string[] = ['Daily', 'Monthly', 'Quarterly', 'Yearly'];
  public filterValue: string = this.filterValues[0];
  public setActiveTab(product: string): void {
    this.selectedProduct = product;
  }

}
