import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/entities/Usuario';

@Component({
  selector: 'app-userwidget',
  templateUrl: './userwidget.component.html',
  styleUrls: ['./userwidget.component.scss']
})
export class UserwidgetComponent implements OnInit, AfterContentChecked {
  
  usuario:Usuario = new Usuario();
  login:boolean = false;
  constructor(private authService:AuthService) { }
  
  ngOnInit() {
  }
  
  ngAfterContentChecked(): void {
    this.login = this.authService.isAuthenticated();  

    this.usuario = this.authService.usuario;
  }

  logout(){
    this.authService.logout();
  }
}
