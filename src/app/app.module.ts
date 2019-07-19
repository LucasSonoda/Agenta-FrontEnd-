import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsidebarComponent } from './components/global/asidebar/asidebar.component';
import { PhonesComponent } from './components/phones/phones.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/phones/contacto/navbar/navbar.component';
import { TablePhonesComponent } from './components/phones/contacto/table-phones/table-phones.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { GlobalConst } from './entities/GlobalConst';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContactoComponent } from './components/phones/contacto/contacto.component';
import { UserwidgetComponent } from './components/global/asidebar/userwidget/userwidget.component';
import { LoginComponent } from './components/global/login/login.component';
import { ProfileComponent } from './components/global/profile/profile.component';
import { SigninComponent } from './components/global/signin/signin.component';
import { SubgrupoComponent } from './components/phones/subgrupo/subgrupo.component';
import { GrupoComponent } from './components/phones/grupo/grupo.component';
import { DetailsSubgroupComponent } from './components/phones/subgrupo/details-subgroup/details-subgroup.component';
import { TableSubgroupsComponent } from './components/phones/subgrupo/table-subgroups/table-subgroups.component';

@NgModule({
  declarations: [
    AppComponent,
    AsidebarComponent,
    PhonesComponent,
    HomeComponent,
    NavbarComponent,
    TablePhonesComponent,
    ContactoComponent,
    UserwidgetComponent,
    LoginComponent,
    ProfileComponent,
    SigninComponent,
    SubgrupoComponent,
    GrupoComponent,
    DetailsSubgroupComponent,
    TableSubgroupsComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
  { provide: LocationStrategy, useClass: HashLocationStrategy},
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  GlobalConst
],
  bootstrap: [AppComponent]
})
export class AppModule { }
