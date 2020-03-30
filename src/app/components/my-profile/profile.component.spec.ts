import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ProfileComponent } from './profile.component'
import { MatExpansionModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router, Routes } from '@angular/router'
import { Location } from '@angular/common'
import { OrdersComponent } from '../orders/orders.component'

describe('MyProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>
  let router: Router
  let location: Location
  const routes: Routes = [{ path: 'orders', component: OrdersComponent }]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatExpansionModule,
        BrowserAnimationsModule
      ],
      declarations: [ProfileComponent, OrdersComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    component.logInStatus = true

    expect(component).toBeTruthy()
  })

  /*it('should navigate to Orders page ', () => {
    
    component.logInStatus = true
    console.log(document.getElementById('id0'))
    console.log(document.getElementById('id1'))
    document.getElementById('id1').click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/orders');
    });
  }); */
})
