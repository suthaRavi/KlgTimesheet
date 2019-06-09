import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReportComponent } from './job-report.component';

describe('JobReportComponent', () => {
  let component: JobReportComponent;
  let fixture: ComponentFixture<JobReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
