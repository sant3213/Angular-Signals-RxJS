import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputedComponent } from './computed.component';

describe('ComputedComponent', () => {
  let component: ComputedComponent;
  let fixture: ComponentFixture<ComputedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
