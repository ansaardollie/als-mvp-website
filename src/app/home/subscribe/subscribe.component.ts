import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LayoutService, ScreenSize } from '../../services/layout.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {

  screenSize!: ScreenSize;
  screenSub!: Subscription;

  form!: FormGroup;
  showErrors = false;
  errorMessages: string[] = ['First name required', 'Last name required', 'Email required'];

  constructor(private ls: LayoutService) { }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.screenSub.unsubscribe();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, this.dotInEmailValidator]),
    });

    this.form.valueChanges.subscribe(
      (next) => {
        this.errorMessages = [];
        if (this.form.get('firstName')?.invalid){
          this.errorMessages.push('First name required');
        }
        if (this.form.get('lastName')?.invalid){
          this.errorMessages.push('Last name required');
        }
        if (this.form.get('email')?.errors?.required){
          this.errorMessages.push('Email required');
        }
        if (this.form.get('email')?.errors?.email){
          this.errorMessages.push('Invalid email address');
        }

      }
    );

    this.screenSub = this.ls.screenSize$.subscribe(
      (next) => {
        this.screenSize = next;
      }
    );

  }

  submitClicked(): void {
    this.showErrors = true;
    this.form.markAllAsTouched();
    this.form.get('email')?.markAsDirty();
    this.form.get('firstName')?.markAsDirty();
    this.form.get('lastName')?.markAsDirty();

    if (this.form.valid){
      this.submitForm();
    }
  }


  dotInEmailValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const value = control.value as string;
    const domain = value.split('@').reverse()[0];
    if (domain.indexOf('.') < 0){
      return {
        email: true
      };
    }
    return null;
  }

  submitForm(): void {
    console.log(this.form.value);
  }

}
