import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CarouselScrollComponent } from './carousel-scroll.component'
import { HomeComponent } from 'src/app/components/home/home.component'

describe('CarouselScrollComponent', () => {
  let component: CarouselScrollComponent
  let fixture: ComponentFixture<CarouselScrollComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CarouselScrollComponent, HomeComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselScrollComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
