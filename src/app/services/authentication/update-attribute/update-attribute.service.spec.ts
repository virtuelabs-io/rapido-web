import { TestBed } from '@angular/core/testing'

import { UpdateAttributeService } from './update-attribute.service'

describe('UpdateAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: UpdateAttributeService = TestBed.get(UpdateAttributeService)
    expect(service).toBeTruthy()
  })
})
