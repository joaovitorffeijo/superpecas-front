import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SidenavLinkComponent } from './shared/sidenav-link/sidenav-link.component';
import { CarsComponent } from './pages/cars/cars.component';
import { PartsComponent } from './pages/parts/parts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    SidenavLinkComponent,
    CarsComponent,
    PartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButton,
    MatIcon,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [
    MatSidenavModule,
    MatButton,
    MatIcon,
  ]
})
export class AppModule { }
