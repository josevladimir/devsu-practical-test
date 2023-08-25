import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should emit loading start/stop', (done: DoneFn)=> {
    let flow = 'start';
    service.status.subscribe(
      status => {
        if(flow == 'start') expect(status).toBe(true);
        else {
          expect(status).toBe(false);
          done();
        }
      }
    );

    service.startLoading();
    setTimeout(() => {
      flow = 'stop';
      service.stopLoading();
    }, 2000);
  });

});
