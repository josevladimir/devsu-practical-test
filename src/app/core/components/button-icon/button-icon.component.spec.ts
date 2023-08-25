import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonIconComponent } from './button-icon.component';
import { By } from '@angular/platform-browser';

describe('ButtonIconComponent', () => {
  let component: ButtonIconComponent;
  let fixture: ComponentFixture<ButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emit onClick event to out', () => {
    let entered = true;
    component.onClick.subscribe(
      onClick => {
        expect(entered).toBe(true);
      }
    );

    let button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
  });

});
