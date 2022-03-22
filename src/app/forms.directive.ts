import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[no-val-on-focus]',
})
export class NoValidationOnFocusDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private control: NgControl
  ) {}

  private validator: ValidatorFn | null = null;

  @HostListener('focus', ['$event'])
  public onFocus(): void {
    this.validator = this.control.control.validator;
    this.control.control.clearValidators();
    this.control.control.updateValueAndValidity();
  }

  @HostListener('blur', ['$event'])
  public onBlur(): void {
    this.control.control.setValidators(this.validator);
    this.control.control.updateValueAndValidity();
  }
}
