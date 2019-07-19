import { Component, OnInit } from '@angular/core';
import { SubgrupoService } from 'src/app/services/subgrupo.service';
import { Subgrupo } from 'src/app/entities/Subgrupo';

@Component({
  selector: 'app-subgrupo',
  templateUrl: './subgrupo.component.html',
  styleUrls: ['./subgrupo.component.scss']
})
export class SubgrupoComponent implements OnInit {

  subgrupos:Subgrupo[]=[]; 
  subgrupo:Subgrupo = null;
  constructor(private subgrupoService:SubgrupoService) { }

  ngOnInit() {
    this.subgrupoService.getAll().subscribe(sg=>{
      this.subgrupos = sg.subgrupos
    });
  }

  loadSG($event){
    this.subgrupo = $event
  }

  modificar($event:Subgrupo){
    this.subgrupos.forEach((s,index)=>{
      if(s.id == $event.id)
        this.subgrupos[index] = $event
    })
    console.log(this.subgrupos)

    this.subgrupo = null
  }
  cancelar(){
    this.subgrupo = null;
  }
}
