import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { ImageCarouselComponent } from './image-carousel.component'

describe('ImageCarouselComponent', () => {
  let component: ImageCarouselComponent
  let fixture: ComponentFixture<ImageCarouselComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCarouselComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCarouselComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
