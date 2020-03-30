import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import { Constants } from '../../utils/constants'

import { ProductsHierarchyService } from './products-hierarchy.service'

describe('ProductsHierarchyService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsHierarchyService],
    })
  )

  it('should be created', () => {
    const service: ProductsHierarchyService = TestBed.get(
      ProductsHierarchyService
    )
    expect(service).toBeTruthy()
  })

  it('Request for configuration', fakeAsync(
    inject(
      [ProductsHierarchyService, HttpTestingController],
      (service: ProductsHierarchyService, backend: HttpTestingController) => {
        const responseObject = {
          body: {
            item1: ['subitem1', 'subitem2'],
            item2: ['subitem1', 'subitem2'],
          },
          status: 200,
        }
        let response = null

        service.get().subscribe(
          (receivedResponse: any) => {
            response = receivedResponse
          },
          (error: any) => {}
        )

        const requestWrapper = backend.expectOne({
          url: Constants.environment.staticAssets + Constants.PRODUCT_HIERARCHY,
        })
        requestWrapper.flush(responseObject)

        tick()

        expect(requestWrapper.request.method).toEqual('GET')
        expect(response.status).toBe(200)
      }
    )
  ))
})
