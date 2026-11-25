import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Input } from './shared/components/input/input';
import { Button } from './shared/directives/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './shared/components/card/card';

@Component({
  imports: [RouterOutlet, Input, Button, Card, CardHeader, CardTitle, CardDescription, CardContent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly theme = signal<'vasquez-dark' | 'vasquez-light'>('vasquez-dark');

  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === 'vasquez-dark' ? 'vasquez-light' : 'vasquez-dark'));
  }
}
