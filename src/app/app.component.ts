import { Component } from '@angular/core';
import { SidenavService } from './core/service/sidenav.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private titleService: Title) {
    this.setTitle('Super Peças');
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
