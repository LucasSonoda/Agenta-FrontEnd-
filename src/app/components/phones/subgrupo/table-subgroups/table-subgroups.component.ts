import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subgrupo } from 'src/app/entities/Subgrupo';

@Component({
  selector: 'app-table-subgroups',
  templateUrl: './table-subgroups.component.html',
  styleUrls: ['./table-subgroups.component.scss']
})
export class TableSubgroupsComponent implements OnInit {

  @Input() subgrupos:Subgrupo[]=[] 
  @Output() sendSubgrupo:EventEmitter<Subgrupo> = new EventEmitter<Subgrupo>()
  constructor() { }

  ngOnInit() {
  }

  showSubGroup(subGroup:Subgrupo){
    this.sendSubgrupo.emit(subGroup)
  }
}
