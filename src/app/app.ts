import { LucideHouse, LucideLayoutGrid, LucideBox, LucideShoppingCart, LucideUsers } from '@lucide/angular';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, SidebarSection } from './shared/components/sidebar/sidebar';
import { Input } from './shared/components/input/input';
import { Button } from './shared/directives/button';
import { Dropdown, DropdownItem } from './shared/components/dropdown/dropdown';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './shared/components/card/card';

@Component({
  imports: [Sidebar, RouterOutlet, Input, Button, Dropdown, Card, CardHeader, CardTitle, CardDescription, CardContent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly sidebarSections: SidebarSection[] = [
    { label: 'General', items: [{ label: 'Inicio', route: '/', icon: LucideHouse }, { label: 'Mesas y zonas', route: '/mesas', icon: LucideLayoutGrid }] },
    { label: 'Espacio de trabajo', items: [{ label: 'Inventario', icon: LucideBox, children: [
      { label: 'Productos', route: '/productos' }, { label: 'Categorías', route: '/categorias' },
      { label: 'Marcas', route: '/marcas' }, { label: 'Unidades de medida', route: '/unidades' },
    ] }, { label: 'Ventas', route: '/ventas', icon: LucideShoppingCart }] },
    { label: 'Administración', items: [{ label: 'Usuarios', route: '/usuarios', icon: LucideUsers }] },
  ];
  protected readonly dropdownItems: DropdownItem[] = [
    { value: 'new', label: 'Nuevo archivo' },
    { value: 'copy', label: 'Copiar enlace' },
    { value: 'edit', label: 'Editar archivo' },
    { value: 'delete', label: 'Eliminar archivo', destructive: true },
  ];
  protected readonly selectedAction = signal('');
  protected readonly theme = signal<'vasquez-dark' | 'vasquez-light'>('vasquez-dark');

  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === 'vasquez-dark' ? 'vasquez-light' : 'vasquez-dark'));
  }
}
