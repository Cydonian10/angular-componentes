import { TestBed } from '@angular/core/testing';
import { Demo } from './demo';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Demo],
      providers: [provideRouter([])],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Demo);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the products demo', async () => {
    const fixture = TestBed.createComponent(Demo);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#products-title')?.textContent).toContain('Productos');
  });
  it('shows required errors when the selection form is submitted empty', async () => {
    const fixture = TestBed.createComponent(Demo);
    await fixture.whenStable();
    const form = (fixture.nativeElement as HTMLElement).querySelector('form')!;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Selecciona una categoría.');
    expect(fixture.nativeElement.textContent).toContain('Selecciona al menos una categoría.');
  });
});
