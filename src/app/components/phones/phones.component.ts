import { Component, OnInit, Input, QueryList } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { Grupo } from 'src/app/entities/Grupo';
import { Contacto } from 'src/app/entities/Contacto';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {

  grupos:Grupo[] = [];
  contactos:Contacto[] =[];
  navbarShow:boolean=false;
  nombreGrupo:string;
  isSearch:boolean=false;
  @Input() id:number;

  constructor(private grupoService:GrupoService,
              private contactoService:ContactoService           
    ) { }

  ngOnInit() {
    this.grupoService.getIdNombre().subscribe(g=>{
      this.grupos=g
      this.navbarShow=true;
      this.getFirts()
    })
  }


  getContactosByGrupo(id:number){
    this.contactoService.getByGrupo(id).subscribe(c=>{
      this.contactos=c;


    })
  }

  showGrupo($event){
    this.contactoService.getByGrupo($event.id).subscribe(c=>{
      this.contactos = c.contactos;
      this.nombreGrupo = $event.nombre;
    })
  }

  searchContacto($event){
    console.log($event)
    if($event.length>0){
      this.contactoService.searchContaco($event).subscribe(c=>{
        this.nombreGrupo = "Busqueda";
        this.contactos = c.contactos;
        this.isSearch=true;
      })
    }else {
      this.getFirts()
      this.isSearch=false;
    }
  }

  getFirts(){
    this.contactoService.getByGrupo(this.grupos[0].id).subscribe(c=>{
      this.contactos = c.contactos;
      this.nombreGrupo = this.grupos[0].nombre;
    })
  }

}
