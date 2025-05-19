import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutsListComponent } from './scouts-list.component';

describe('ScoutsListComponent', () => {
  let component: ScoutsListComponent;
  let fixture: ComponentFixture<ScoutsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoutsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
