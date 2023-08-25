import { TestBed } from '@angular/core/testing';

import { NotificationBarService } from './notification-bar.service';

describe('NotificationBarService', () => {
  let service: NotificationBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a success alert', (done: DoneFn)=> {
    let counter = 0;
    service.notificationStatus.subscribe(
      status => {
        counter++;
        if(counter > 1 ){
          expect(status).toEqual({status: false});
          done();
        }else{
          expect(status).toEqual({
            status: true,
            message: 'Ejemplo de mensaje',
            type: 'done'
          });
        }
      }
    );

    service.alert('Ejemplo de mensaje', 'success');
  });
  
  it('should emit an error alert', (done: DoneFn)=> {
    let counter = 0;
    service.notificationStatus.subscribe(
      status => {
        counter++;
        if(counter > 1 ){
          expect(status).toEqual({status: false});
          done();
        }else{
          expect(status).toEqual({
            status: true,
            message: 'Ejemplo de mensaje',
            type: 'error'
          });
        }
      }
    );

    service.alert('Ejemplo de mensaje', 'error');
  });

});
