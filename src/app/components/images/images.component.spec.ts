import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ImagesComponent } from './images.component'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

describe('ImagesComponent', () => {
  let component: ImagesComponent
  let fixture: ComponentFixture<ImagesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
