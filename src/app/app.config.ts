import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query';
import { withDevtools } from '@tanstack/angular-query-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideTanStackQuery(() => new QueryClient(), withDevtools()),
  ],
};
