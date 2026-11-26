import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideHouse, LucideLayoutGrid, LucideBox, LucideShoppingCart, LucideUsers } from '@lucide/angular';
import { Sidebar, SidebarSection } from './shared/components/sidebar/sidebar';
import { Button } from './shared/components/button/button';

@Component({ selector: 'app-root', imports: [Sidebar, RouterOutlet, Button], templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  protected readonly theme = signal<'vasquez-dark' | 'vasquez-light'>('vasquez-dark');
  protected toggleTheme(): void { this.theme.update(t => t === 'vasquez-dark' ? 'vasquez-light' : 'vasquez-dark'); }
  protected readonly sidebarSections: SidebarSection[] = [
    { label: 'General', items: [
      { label: 'Publicaciones', route: '/publicaciones', icon: LucideHouse },
      { label: 'Demostración', route: '/demo', icon: LucideLayoutGrid },
      { label: 'Mesas y zonas', route: '/mesas', icon: LucideLayoutGrid },
    ] },
    { label: 'Espacio de trabajo', items: [
      { label: 'Inventario', icon: LucideBox, children: [
        { label: 'Productos', route: '/productos' }, { label: 'Categorías', route: '/categorias' },
        { label: 'Marcas', route: '/marcas' }, { label: 'Unidades de medida', route: '/unidades' },
      ] },
      { label: 'Ventas', route: '/ventas', icon: LucideShoppingCart },
    ] },
    { label: 'Administración', items: [{ label: 'Usuarios', route: '/usuarios', icon: LucideUsers }] },
  ];
}
