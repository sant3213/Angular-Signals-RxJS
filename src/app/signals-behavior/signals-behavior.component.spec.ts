import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsBehaviorComponent } from './signals-behavior.component';

describe('SignalsBehaviorComponent', () => {
  let component: SignalsBehaviorComponent;
  let fixture: ComponentFixture<SignalsBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsBehaviorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
