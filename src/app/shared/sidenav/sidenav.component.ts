import { Component, HostBinding } from '@angular/core';
import { SidenavService } from '../../core/service/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  logoPath: string = 'assets/img/super-pecas-logo.png';

  constructor(public sidenavService: SidenavService) {}

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }
}