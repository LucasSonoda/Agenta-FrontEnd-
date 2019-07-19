import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { Subgrupo } from 'src/app/entities/Subgrupo';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-details-subgroup',
  templateUrl: './details-subgroup.component.html',
  styleUrls: ['./details-subgroup.component.scss'],
})
export class DetailsSubgroupComponent implements OnInit, AfterContentChecked {

  subgrupo:Subgrupo = new Subgrupo();
  @Input() getSubgrupo:Subgrupo;
  @Output() modifica:EventEmitter<Subgrupo> = new EventEmitter();
  @Output() cancela:EventEmitter<void> = new EventEmitter();
  constructor() { 
  }

  ngOnInit() {
    if(this.getSubgrupo){
      this.subgrupo.id = this.getSubgrupo.id
      this.subgrupo.nombre = this.getSubgrupo.nombre
      this.subgrupo.grupo = this.getSubgrupo.grupo
      this.subgrupo.contactos = this.getSubgrupo.contactos
    }
  }
  ngAfterContentChecked(){
    
  }

  modificar(){
    this.modifica.emit(this.subgrupo)
  }

  cancelar(){
    console.log(this.subgrupo)
    this.getSubgrupo=this.subgrupo;
    this.cancela.emit()
  }

}
