import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogboxComponent } from './dilogbox.component';

describe('DilogboxComponent', () => {
  let component: DilogboxComponent;
  let fixture: ComponentFixture<DilogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilogboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
