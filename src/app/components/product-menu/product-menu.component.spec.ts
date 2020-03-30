import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { ProductMenuComponent } from './product-menu.component'
import { HomeComponent } from '../home/home.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { Location } from '@angular/common'
import { LeftSectionComponent } from '../leftsection/leftsection.component'
import { Router, Routes } from '@angular/router'
import { ProductResultsComponent } from '../product-results/product-results.component'

describe('ProductMenuComponent', () => {
  let component: ProductMenuComponent
  let fixture: ComponentFixture<ProductMenuComponent>
  let router: Router
  let location: Location

  const routes: Routes = [
    { path: 'products', component: ProductResultsComponent }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      declarations: [
        ProductMenuComponent,
        HomeComponent,
        LeftSectionComponent,
        ProductResultsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(ProductMenuComponent)
    fixture.ngZone.run(() => {
      router.initialNavigation()
    })
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('route to product card page', fakeAsync(() => {
    component.handleNavigation('plastic')
    tick()
    expect(location.path()).toEqual('/products?q=plastic')
  }))
})
