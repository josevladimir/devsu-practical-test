import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';

@NgModule({
  declarations: [
    MainToolbarComponent,
    ButtonComponent,
    ButtonIconComponent,
    InputComponent,
    LoadingViewComponent,
    NotificationBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainToolbarComponent,
    ButtonComponent,
    ButtonIconComponent,
    InputComponent,
    LoadingViewComponent,
    NotificationBarComponent
  ]
})
export class CoreModule { }
