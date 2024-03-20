import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AssistenteDashboardComponent } from './app/main/main.component';

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
}

bootstrapApplication(App);
