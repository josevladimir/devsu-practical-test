import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() redirectTo: string[];

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  handleClick(){
    this.onClick.emit();
  }

}

export declare type ButtonAppearance = 'primary' | 'secondary';
