import { AfterContentInit, Component, ContentChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'bp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements AfterContentInit, OnDestroy {

  @Input() label: string;
  @Input() control: AbstractControl|null;

  public error: string;
  private subscription: Subscription;

  constructor() { }
  
  ngAfterContentInit(): void {
    if(this.control){
      this.subscription = this.control.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(
        (changes) => {
          if(this.control!.errors) this.error = this.parseError(this.control!.errors);
          else this.error = '';
        }
      )
    }
  }

  parseError(errors: ValidationErrors): string{
    let error: string = '';
    if(errors.hasOwnProperty('required')) error = 'Este campo es requerido';
    else if(errors.hasOwnProperty('empty')) error = 'Este campo no puede quedar en blanco';
    else if(errors.hasOwnProperty('minlength')) error = `Debe tener al menos ${errors['minlength']['requiredLength']} caracteres`;
    else if(errors.hasOwnProperty('maxlength')) error = `Debe tener máximo ${errors['maxlength']['requiredLength']} caracteres`;
    else if(errors.hasOwnProperty('beforeToday')) error = `La fecha no puede ser anterior a la actual`;
    else if(errors.hasOwnProperty('productIDExists')) error = `El ID ingresado no está disponible`;
    return error;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
