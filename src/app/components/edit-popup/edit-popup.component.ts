import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder){}
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Input() product: Product = {
    price: '',
    name: '',
    image: '',
    rating: 0
  }
  @Output() confirm= new EventEmitter<Product>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    }
  }

  productForm = this.formBuilder.group({
    price: ['', [Validators.required]],
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    image: [''],
    rating: [0]
  });
  ngOnChanges(){
    this.productForm.patchValue(this.product)
  }
  onConfirm(){
    this.confirm.emit({
      price: this.productForm.value.price || '',
      name: this.productForm.value.name || '',
      image: this.productForm.value.image || '',
      rating: this.productForm.value.rating || 0
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel(){
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
