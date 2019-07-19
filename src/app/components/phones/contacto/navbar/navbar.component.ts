import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Grupo } from 'src/app/entities/Grupo';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() open:EventEmitter<Grupo> = new EventEmitter<Grupo>();
  @Output() search:EventEmitter<string> = new EventEmitter<string>();
  @Input() grupos:Grupo[]=[];
  constructor() { 
  }

  ngOnInit() {
  }

  emitIdGrupo(grupo:Grupo){
    this.open.emit(grupo);
  }
  searchContacto(dato:string, $event?){
    let search = ($event.target.attributes[2].value == 'true');
    dato = dato.trim();
    if($event.key =="Enter" || search){
      this.search.emit(dato)
    }
    
  }
}
