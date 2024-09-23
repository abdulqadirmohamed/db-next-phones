import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-sales-form',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './sales-form.component.html',
  styleUrl: './sales-form.component.css'
})
export class SalesFormComponent implements OnInit  {
 
  products: any[] | undefined;

    selectedProduct: string | undefined;

    ngOnInit() {
        this.products = [
            { name: 'Iphone 11'},
            { name: 'Keyboard'},
            { name: 'Charger'},
            { name: 'Earophone'},
        ];
    }
}
