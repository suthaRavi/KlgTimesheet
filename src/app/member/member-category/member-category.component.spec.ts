import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCategoryComponent } from './member-category.component';

describe('MemberCategoryComponent', () => {
  let component: MemberCategoryComponent;
  let fixture: ComponentFixture<MemberCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
