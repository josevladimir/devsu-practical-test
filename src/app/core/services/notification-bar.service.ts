import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {

  public notificationStatus: EventEmitter<any> = new EventEmitter<any>();

  alert(message: string, type: NotificationType){
    this.notificationStatus.emit({
      status: true,
      message,
      type: type == 'success' ? 'done' : type
    });
    this.hideNotification();
  }

  private hideNotification(): void {
    setTimeout(() => {
      this.notificationStatus.emit({status: false});
    }, 3000);
  }

}

export declare type NotificationType = 'info' | 'success' | 'error';
