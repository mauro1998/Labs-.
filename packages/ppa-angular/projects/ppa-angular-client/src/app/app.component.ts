import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PpaAngularSharedComponent } from 'ppa-angular-shared';

@Component({
  selector: 'ppa-root',
  standalone: true,
  imports: [RouterOutlet, PpaAngularSharedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ppa-angular-client';
}
