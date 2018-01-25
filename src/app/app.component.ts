import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CustomValidators } from './validators/custom-validator.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  validateForm: FormGroup;


  constructor(private form: FormBuilder) {
  this.validateForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, CustomValidators.validEmail]),
      'mobile': new FormControl('', [Validators.required, CustomValidators.validMobile]),
      'age': new FormControl('', [Validators.required, CustomValidators.age]),
      'password': new FormControl('', [Validators.required, CustomValidators.validPassword]),
      'confirmPassword': new FormControl('', [Validators.required, CustomValidators.confirmPassword]),
      'address': new FormGroup({
        'country': new FormControl('', [Validators.required, CustomValidators.validCountry]),
        'city': new FormControl('', Validators.required)
      }),
      'planDetails': new FormGroup({
        'plan': new FormControl('', [Validators.required, CustomValidators.validPlan]),
        'description': new FormControl('', Validators.required)
      })

    });
  }


  register(validateForm: NgForm) {
    console.log(this.validateForm);
    console.log('Registration successful.');
    console.log(validateForm.value);
    alert('Hi ' + validateForm.value.name + ' you information are valid.');
    this.validateForm.reset();
  }
}
