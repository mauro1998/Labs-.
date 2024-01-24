import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpaAngularSharedComponent } from './ppa-angular-shared.component';

describe('PpaAngularSharedComponent', () => {
  let component: PpaAngularSharedComponent;
  let fixture: ComponentFixture<PpaAngularSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpaAngularSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PpaAngularSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
