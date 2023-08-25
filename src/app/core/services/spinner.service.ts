import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public status: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  startLoading(): void {
    this.status.emit(true);
  }

  stopLoading(): void {
    this.status.emit(false);
  }

}
