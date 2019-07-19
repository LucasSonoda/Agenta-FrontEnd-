import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhonesComponent } from './components/phones/phones.component';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/phones/contacto/contacto.component';
import { LoginComponent } from './components/global/login/login.component';
import { SubgrupoComponent } from './components/phones/subgrupo/subgrupo.component';
import { GrupoComponent } from './components/phones/grupo/grupo.component';

const routes: Routes = [
  {path:"phones/contacts",component:PhonesComponent},
  {path:"home",component:HomeComponent},
  {path:"contacto/:id",component:ContactoComponent},
  {path:"phones/subgroups",component:SubgrupoComponent},
  {path:"phones/groups",component:GrupoComponent},
  {path:"login",component:LoginComponent},
  {path:"**",pathMatch:"full", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
