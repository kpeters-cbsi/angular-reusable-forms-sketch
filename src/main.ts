import './polyfills';

import { ApplicationRef, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideAnimations()],
})
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if ('ngRef' in window) {
      (window['ngRef'] as ApplicationRef).destroy();
    }
    (window as any)['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
