import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosOcasionalesFormComponent } from './gastos-ocasionales-form.component';

describe('GastosOcasionalesFormComponent', () => {
  let component: GastosOcasionalesFormComponent;
  let fixture: ComponentFixture<GastosOcasionalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosOcasionalesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosOcasionalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
