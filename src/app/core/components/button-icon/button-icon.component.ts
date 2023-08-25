import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bp-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.css']
})
export class ButtonIconComponent {

  @Input() type: string = 'button';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  handleClick() {
    this.onClick.emit();
  }

}
