import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NotificationBarService } from '../../services/notification-bar.service';

@Component({
  selector: 'bp-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnDestroy {

  public notificationStatus: any;
  private notificationSubscription: Subscription;

  constructor(private notificationBarService: NotificationBarService) {
    this.notificationSubscription = this.notificationBarService.notificationStatus.subscribe({
      next: (status: any) => this.notificationStatus = status
    });
  }

  ngOnDestroy(): void {
      this.notificationSubscription.unsubscribe();
  }

}
