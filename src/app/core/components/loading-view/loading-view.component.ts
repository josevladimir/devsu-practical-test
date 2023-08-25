import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'bp-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.css']
})
export class LoadingViewComponent {

  loadingStatus$: Observable<boolean>

  constructor(
    private spinnerService: SpinnerService
  ) {
    this.loadingStatus$ = this.spinnerService.status;
  }

}
