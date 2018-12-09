import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyMasterComponent } from './currency-master.component';

describe('CurrencyMasterComponent', () => {
  let component: CurrencyMasterComponent;
  let fixture: ComponentFixture<CurrencyMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
