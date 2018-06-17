import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestudyComponent } from './timestudy.component';

describe('TimestudyComponent', () => {
  let component: TimestudyComponent;
  let fixture: ComponentFixture<TimestudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimestudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
