import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ LogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Header title present', async(() => {
    expect(component.headerText).toEqual('Sign in to Rapidobuild.com');
  }));

  it('should render title in h1 tag', async(() => {
    const fixture = TestBed.createComponent(LogInComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sign in to Rapidobuild.com');
  }));

  it('should set busy indicator to true on form submit', async(() => {
    component._mobileNumber = '+917032908112';
    component._password = 'Anirup@123';
    component.signIn('evt');
    expect(component._progressSpinner).toBeTruthy();
  }));
});