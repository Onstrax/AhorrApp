import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosFijosFormComponent } from './gastos-fijos-form.component';

describe('GastosFijosFormComponent', () => {
  let component: GastosFijosFormComponent;
  let fixture: ComponentFixture<GastosFijosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosFijosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosFijosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
