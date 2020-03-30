import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { FooterComponent } from './footer.component'
import { Router, Routes } from '@angular/router'
import { AboutUsComponent } from '../about-us/about-us.component'
import { Location } from '@angular/common'
import { CareerPageComponent } from '../career-page/career-page.component'
import { PressReleaseComponent } from '../press-release/press-release.component'
import { CreditsComponent } from '../credits/credits.component'
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component'
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component'
import { ProfileComponent } from '../my-profile/profile.component'
import { MatExpansionModule } from '@angular/material'

describe('FooterComponent', () => {
  let component: FooterComponent
  let fixture: ComponentFixture<FooterComponent>
  let router: Router

  let location: Location
  const routes: Routes = [
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'careers', component: CareerPageComponent },
    { path: 'press-release', component: PressReleaseComponent },
    { path: 'credits', component: CreditsComponent },
    { path: 'terms', component: TermsConditionsComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'profile', component: ProfileComponent }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatExpansionModule, RouterTestingModule.withRoutes(routes)],
      declarations: [
        FooterComponent,
        AboutUsComponent,
        CareerPageComponent,
        PressReleaseComponent,
        CreditsComponent,
        TermsConditionsComponent,
        PrivacyPolicyComponent,
        ProfileComponent
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(FooterComponent)
    fixture.ngZone.run(() => {
      router.initialNavigation()
    })
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    component.isLoggedIn = true
    expect(component).toBeTruthy()
  })

  it('should navigate to About Us page', () => {
    document.getElementById('FooterComponent-aboutus').click()
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/aboutus')
    })
  })

  it('should navigate to Careers page', () => {
    document.getElementById('FooterComponent-careers').click()
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/careers')
    })
  })

  it('should navigate to Press release page', () => {
    document.getElementById('FooterComponent-press').click()
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/press-release')
    })
  })

  it('should navigate to Credits page', () => {
    document.getElementById('FooterComponent-credits').click()
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/press-credits')
    })
  })

  it('should navigate to terms of service page', () => {
    document.getElementById('FooterComponent-terms').click()
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/terms')
    })
  })

  it('should navigate to Privacy policy page', () => {
    document.getElementById('FooterComponent-privacy').click()
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/privacy-policy')
    })
  })
})
