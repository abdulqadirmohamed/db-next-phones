import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerFormComponent } from "../customer-form/customer-form.component";

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NgClass, NgIf, CustomerFormComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  closeDrawer(){
    this.onClose.emit();
  }
}
