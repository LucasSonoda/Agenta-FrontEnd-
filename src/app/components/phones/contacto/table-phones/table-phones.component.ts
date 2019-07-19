import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { Contacto } from 'src/app/entities/Contacto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-table-phones',
  templateUrl: './table-phones.component.html',
  styleUrls: ['./table-phones.component.scss']
})
export class TablePhonesComponent implements OnInit, AfterContentChecked {
  
  @Input() contactos:Contacto[] = [];
  @Input() nombreGrupo:string;
  @Input() isSearch:boolean=false;
  constructor(private auth:AuthService) {  }
  
  ngOnInit() {
    
  }
  
  ngAfterContentChecked(): void {
    this.contactos.sort((a,b)=>{
      if(a.subgrupo.nombre > b.subgrupo.nombre) return 1;
      if(a.subgrupo.nombre < b.subgrupo.nombre) return -1;
      //
      if(a.nombre > b.nombre) return 1;
      if(a.nombre < b.nombre) return -1;
    })
  }
}
