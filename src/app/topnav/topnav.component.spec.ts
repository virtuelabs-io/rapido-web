import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { TopnavComponent } from './topnav.component';
import { ButtonComponent } from '../common/button/button.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TopnavComponent', () => {
  let component: TopnavComponent;
  let fixture: ComponentFixture<TopnavComponent>;
  let de: DebugElement;
  let ele: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatMenuModule, MatToolbarModule, FormsModule, RouterModule.forRoot([]) ],
      declarations: [ TopnavComponent, ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title name as RapidoBuild', () => {
    expect(component.bannerName).toEqual('Rapidobuild');
  }); // replace with banner
  
  it('should have search input box', () => {
    fixture = TestBed.createComponent(TopnavComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    ele = de.nativeElement;
    let input = ele.getElementsByTagName('input');
    expect(input).toBeTruthy();
  });

});