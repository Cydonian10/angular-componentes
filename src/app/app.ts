import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { SearchSelect, SelectOption } from './shared/components/search-select/search-select';
import { Table, TableColumn, TableRow } from './shared/components/table/table';
import { Pagination } from './shared/components/pagination/pagination';
import { DemoPageService } from './demo-page-service';
import {
  LucideHouse,
  LucideLayoutGrid,
  LucideBox,
  LucideShoppingCart,
  LucideUsers,
} from '@lucide/angular';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, SidebarSection } from './shared/components/sidebar/sidebar';
import { Input } from './shared/components/input/input';
import { Button } from './shared/components/button/button';
import { Dropdown, DropdownItem } from './shared/components/dropdown/dropdown';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './shared/components/card/card';

@Component({
  imports: [
    FormField, SearchSelect,
    Table,
    Pagination,
    Sidebar,
    RouterOutlet,
    Input,
    Button,
    Dropdown,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly selectOptions: SelectOption[] = [
    { value: 'bebidas', label: 'Bebidas' }, { value: 'alimentos', label: 'Alimentos' },
    { value: 'insumos', label: 'Insumos' }, { value: 'limpieza', label: 'Limpieza' },
    { value: 'postres', label: 'Postres' }, { value: 'otros', label: 'Otros' },
  ];
  protected readonly selectModel = signal({ category: '', favorites: [] as string[] });
  protected readonly selectForm = form(this.selectModel, path => {
    required(path.category, { message: 'Selecciona una categoría.' });
    validate(path.favorites, ({ value }) => value().length ? undefined : { kind: 'required', message: 'Selecciona al menos una categoría.' });
  });
  protected readonly selectSubmitted = signal(false);
  protected saveSelections(): void {
    this.selectSubmitted.set(false);
    void submit(this.selectForm, async () => { this.selectSubmitted.set(true); });
  }

  private readonly demoService = inject(DemoPageService);
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'Código' },
    { key: 'nombre', label: 'Producto' },
    { key: 'categoria', label: 'Categoría' },
    { key: 'estado', label: 'Estado' },
  ];
  protected readonly rows = signal<TableRow[]>([]);
  protected readonly page = signal(1);
  protected readonly total = signal(0);
  protected readonly pageSize = 10;
  protected readonly totalPages = computed(() => Math.ceil(this.total() / this.pageSize));
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  private requestId = 0;

  constructor() {
    void this.loadPage(1);
  }

  protected async loadPage(page: number): Promise<void> {
    const requestId = ++this.requestId;
    this.loading.set(true);
    this.error.set(false);
    try {
      const result = await this.demoService.getPage(page, this.pageSize);
      if (requestId !== this.requestId) return;
      this.rows.set(result.items);
      this.total.set(result.total);
      this.page.set(page);
    } catch {
      if (requestId === this.requestId) this.error.set(true);
    } finally {
      if (requestId === this.requestId) this.loading.set(false);
    }
  }

  protected readonly sidebarSections: SidebarSection[] = [
    {
      label: 'General',
      items: [
        { label: 'Inicio', route: '/', icon: LucideHouse },
        { label: 'Mesas y zonas', route: '/mesas', icon: LucideLayoutGrid },
      ],
    },
    {
      label: 'Espacio de trabajo',
      items: [
        {
          label: 'Inventario',
          icon: LucideBox,
          children: [
            { label: 'Productos', route: '/productos' },
            { label: 'Categorías', route: '/categorias' },
            { label: 'Marcas', route: '/marcas' },
            { label: 'Unidades de medida', route: '/unidades' },
          ],
        },
        { label: 'Ventas', route: '/ventas', icon: LucideShoppingCart },
      ],
    },
    {
      label: 'Administración',
      items: [{ label: 'Usuarios', route: '/usuarios', icon: LucideUsers }],
    },
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
