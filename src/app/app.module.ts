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
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderControlsComponent } from './shared/header-controls/header-controls.component';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalAddCarComponent } from './pages/modal/modal-add-car/modal-add-car.component';
import { ModalAddPartComponent } from './pages/modal/modal-add-part/modal-add-part.component';
import { ModalEditCarComponent } from './pages/modal/modal-edit-car/modal-edit-car.component';
import { ModalEditPartComponent } from './pages/modal/modal-edit-part/modal-edit-part.component';
import { ModalDeleteCarComponent } from './pages/modal/modal-delete-car/modal-delete-car.component';
import { ModalDeletePartComponent } from './pages/modal/modal-delete-part/modal-delete-part.component';
import { ModalDeleteMultipleCarComponent } from './pages/modal/modal-delete-multiple-car/modal-delete-multiple-car.component';
import { ModalDeleteMultiplePartsComponent } from './pages/modal/modal-delete-multiple-parts/modal-delete-multiple-parts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    SidenavLinkComponent,
    CarsComponent,
    PartsComponent,
    HeaderControlsComponent,
    ModalAddCarComponent,
    ModalAddPartComponent,
    ModalEditCarComponent,
    ModalEditPartComponent,
    ModalDeleteCarComponent,
    ModalDeletePartComponent,
    ModalDeleteMultipleCarComponent,
    ModalDeleteMultiplePartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButton,
    MatIcon,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    NgbModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
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
    MatProgressSpinnerModule,
  ]
})
export class AppModule { }
