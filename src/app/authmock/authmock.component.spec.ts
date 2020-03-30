import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"

import { AuthmockComponent } from "./authmock.component"

describe("AuthmockComponent", () => {
  let component: AuthmockComponent
  let fixture: ComponentFixture<AuthmockComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthmockComponent],
      imports: [FormsModule, HttpClientModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthmockComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
