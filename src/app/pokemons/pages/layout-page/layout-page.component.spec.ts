import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutPageComponent } from './layout-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LayoutPageComponent', () => {
  let component: LayoutPageComponent;
  let fixture: ComponentFixture<LayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, RouterModule.forRoot([])],
      declarations: [LayoutPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'mockId'
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
