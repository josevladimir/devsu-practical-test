import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBarComponent } from './notification-bar.component';
import { NotificationBarService } from '../../services/notification-bar.service';
import { By } from '@angular/platform-browser';

describe('NotificationBarComponent', () => {
  let component: NotificationBarComponent;
  let fixture: ComponentFixture<NotificationBarComponent>;
  let notificationBarService: NotificationBarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBarComponent ],
      providers: [NotificationBarService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationBarComponent);
    component = fixture.componentInstance;
    notificationBarService = TestBed.get(NotificationBarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listens and sets notificationStatus', (done: DoneFn) => {
    
    notificationBarService.alert('Ejemplo de notificacion', 'success');
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.notificationStatus).toEqual({
        status: true,
        message: 'Ejemplo de notificacion',
        type: 'done'
      });
      let bar = fixture.debugElement.query(By.css('#notification-bar'));
      expect(bar).toBeTruthy();
      done();
    },1000);

  });

});
