import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicarComponentComponent } from './publicar-component.component';

describe('PublicarComponentComponent', () => {
  let component: PublicarComponentComponent;
  let fixture: ComponentFixture<PublicarComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PublicarComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
