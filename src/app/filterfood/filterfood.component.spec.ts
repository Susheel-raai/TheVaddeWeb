import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterfoodComponent } from './filterfood.component';

describe('FilterfoodComponent', () => {
  let component: FilterfoodComponent;
  let fixture: ComponentFixture<FilterfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterfoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
