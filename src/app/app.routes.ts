import { PostsPage } from './pages/posts/posts';
import { Demo } from './demo';
import { Component } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';

@Component({
  template:
    '<h1 class="mt-8 text-2xl font-semibold">{{ title }}</h1><p class="mt-2 opacity-70">Página de demostración</p>',
})
class DemoPage {
  readonly title: string;
  constructor(route: ActivatedRoute) {
    this.title = route.snapshot.data['title'];
  }
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'publicaciones' },
  { path: 'publicaciones', component: PostsPage, title: 'Publicaciones' },
  { path: 'demo', component: Demo, title: 'Demostración' },
  ...[
    ['mesas', 'Mesas y zonas'],
    ['productos', 'Productos'],
    ['categorias', 'Categorías'],
    ['marcas', 'Marcas'],
    ['unidades', 'Unidades de medida'],
    ['ventas', 'Ventas'],
    ['usuarios', 'Usuarios'],
  ].map(([path, title]) => ({ path, component: DemoPage, data: { title } })),
];
