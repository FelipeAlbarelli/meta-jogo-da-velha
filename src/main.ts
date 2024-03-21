import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AssistenteDashboardComponent } from './app/main/main.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AssistenteDashboardComponent],
  template: `
    <app-assistente-dashboard></app-assistente-dashboard>
  `,
})
export class App {
  name = 'Angular';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}

bootstrapApplication(App , {
  providers: [
    provideAnimations()
  ]
});
