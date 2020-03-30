import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ProductResultsComponent } from './product-results.component'
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

describe('ProductResultsComponent', () => {
  let component: ProductResultsComponent
  let fixture: ComponentFixture<ProductResultsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductResultsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogModule, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductResultsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
