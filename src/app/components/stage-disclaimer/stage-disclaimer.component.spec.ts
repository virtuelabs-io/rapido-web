import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { StageDisclaimerComponent } from "./stage-disclaimer.component"

describe("StageDisclaimerComponent", () => {
  let component: StageDisclaimerComponent
  let fixture: ComponentFixture<StageDisclaimerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageDisclaimerComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDisclaimerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
