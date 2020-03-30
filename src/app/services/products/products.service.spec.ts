import { TestBed, inject, fakeAsync, tick } from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing"
import { Constants } from "../../utils/constants"
import { ProductsService } from "./products.service"
import { Query } from "./query.interface"

describe("ProductsService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    })
  )

  it("should be created", () => {
    const service: ProductsService = TestBed.get(ProductsService)
    expect(service).toBeTruthy()
  })

  it("Request to mandatory query fields", fakeAsync(
    inject(
      [ProductsService, HttpTestingController],
      (service: ProductsService, backend: HttpTestingController) => {
        // Set up
        const _query: Query = {
          q: "watch",
          size: 1,
          cursor: null, // always use either cursor or start, but bot both
          start: null, // always use either cursor or start, but bot both
          sort: null, // optional
        }
        const responseObject = {
          success: true,
          status: 200,
        }
        let response = null
        // End Setup

        service.get(_query).subscribe(
          (receivedResponse: any) => {
            response = receivedResponse
          },
          (error: any) => {}
        )

        const requestWrapper = backend.expectOne({
          url: Constants.environment.productSearchEndPoint + "q=watch&size=1",
        })
        requestWrapper.flush(responseObject)

        tick()

        expect(requestWrapper.request.method).toEqual("GET")
        expect(response.status).toBe(200)
      }
    )
  ))

  it("Request to all fields", fakeAsync(
    inject(
      [ProductsService, HttpTestingController],
      (service: ProductsService, backend: HttpTestingController) => {
        // Set up
        const _query: Query = {
          q: "watch",
          size: 1,
          cursor: "initial", // always use either cursor or start, but bot both
          start: 1, // always use either cursor or start, but bot both
          sort: "_score desc", //optional
        }
        const responseObject = {
          success: true,
          status: 200,
        }
        let response = null
        // End Setup

        service.get(_query).subscribe(
          (receivedResponse: any) => {
            response = receivedResponse
          },
          (error: any) => {}
        )

        const requestWrapper = backend.expectOne({
          url:
            Constants.environment.productSearchEndPoint +
            "q=watch&size=1&cursor=initial&start=1&sort=_score desc",
        })
        requestWrapper.flush(responseObject)

        tick()

        expect(requestWrapper.request.method).toEqual("GET")
        expect(response.status).toBe(200)
      }
    )
  ))
})
