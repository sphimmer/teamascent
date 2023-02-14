import { TestBed } from '@angular/core/testing';

import { LinkService } from './link.service';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find link for toplevel page', ()=>{
    const link = service.getLink('home')
    expect(link).toBe('/')
  })

  it('should find nested page', ()=>{
    const link = service.getLink('profile')
    expect(link).toBe('/account/profile')
  })
});
