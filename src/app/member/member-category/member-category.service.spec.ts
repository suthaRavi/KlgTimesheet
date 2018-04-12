import { TestBed, inject } from '@angular/core/testing';

import { MemberCategoryService } from './member-category.service';

describe('MemberCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberCategoryService]
    });
  });

  it('should be created', inject([MemberCategoryService], (service: MemberCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
