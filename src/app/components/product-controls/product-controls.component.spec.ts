import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { ProductControlsComponent } from "./product-controls.component"

describe("ProductControlsComponent", () => {
  let component: ProductControlsComponent
  let fixture: ComponentFixture<ProductControlsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductControlsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductControlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
