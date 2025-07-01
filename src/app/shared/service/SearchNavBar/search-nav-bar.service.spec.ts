import { TestBed } from '@angular/core/testing';

import { SearchNavBarService } from './search-nav-bar.service';

describe('SearchNavBarService', () => {
  let service: SearchNavBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchNavBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
