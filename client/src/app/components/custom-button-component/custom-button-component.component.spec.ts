import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonComponentComponent } from './custom-button-component.component';

describe('CustomButtonComponentComponent', () => {
  let component: CustomButtonComponentComponent;
  let fixture: ComponentFixture<CustomButtonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
