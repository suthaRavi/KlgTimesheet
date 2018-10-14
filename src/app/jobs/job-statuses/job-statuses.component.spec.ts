import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusesComponent } from './job-statuses.component';

describe('JobStatusesComponent', () => {
  let component: JobStatusesComponent;
  let fixture: ComponentFixture<JobStatusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStatusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
