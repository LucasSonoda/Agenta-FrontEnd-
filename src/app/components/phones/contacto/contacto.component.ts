import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { Contacto } from 'src/app/entities/Contacto';
import { Subgrupo } from 'src/app/entities/Subgrupo';
import { ContactoService } from 'src/app/services/contacto.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { SubgrupoService } from 'src/app/services/subgrupo.service';
import { Grupo } from 'src/app/entities/Grupo';

@Component({
  selector: 'app-nuevo',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})

export class ContactoComponent implements OnInit {

  nuevoSubgrupo: boolean = false;
  contacto: Contacto = new Contacto();
  update: Boolean = false;
  errors: string[];
  private subgrupos: Subgrupo[] = [];
  private subgrupo: Subgrupo = new Subgrupo();
  private grupos: Grupo[] = [];

  constructor(private _contactoService: ContactoService,
    private _grupoService: GrupoService,
    private _subgrupoService: SubgrupoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location:Location
  ) {
    this.getSubgrupoAll();
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"] != null) {
        let id = params['id'];
        this._contactoService.getById(id).subscribe(response => {
          this.contacto = response.contacto;
          this.update = true;
        });
      }
    })
  }

  ngOnInit() {
  }


  nuevoSubgrupoF() {
    this.nuevoSubgrupo = !this.nuevoSubgrupo;
    this.getGrupoAll();
  }


  //////////////////SAVES//////////////////////
  saveSubgrupo() {
    this._subgrupoService.save(this.subgrupo).subscribe(response => {
      this.contacto.subgrupo = response.subgrupo
      this.getSubgrupoAll();
      this.nuevoSubgrupo = false;
    })
  }



  saveContacto() {
    if (!this.update) { /// Lo da de Alta   
      this._contactoService.save(this.contacto).subscribe(reponse => {
        this.router.navigate(['/phones'])
      }
        , badResponse => {
          this.errors = badResponse.error.errors;
        })
    } else { /// Actualiza los datos en caso de ya existir
      this.location.back();
      this._contactoService.update(this.contacto).subscribe(response => {
        this.router.navigate(['/phones'])
      }, badResponse => {
        this.errors = badResponse.error.errors;
      });
    }

  }

  deleteContacto() {
    if (confirm("Desea eliminar este contacto?")) {
      this._contactoService.delete(this.contacto).subscribe(contacto => {

        alert("Contacto eliminado correctamente!");

        this._subgrupoService.getAll().subscribe(response => {
          for (let i = 0; i < response.subgrupos.length; i++) {
            if (response.subgrupos[i].nombre == this.contacto.subgrupo.nombre) {
              if (response.subgrupos[i].contactos.length == 0) {
                if (confirm("Desea eliminar el subgrupo tambien?")) {
                  this._subgrupoService.delete(response.subgrupos[i]).subscribe(response => {
                    alert("Subgrupo eliminado correctamente");
                  }, err => {
                    console.log(err);
                  })
                }
              }
            }
          }
          setTimeout(() => {
            this.router.navigate(['/phones']);
          }, 0);
        })
      })
    }
  }

  //////////////////GETS//////////////////////
  getGrupoAll() {
    this._grupoService.getAll().subscribe(grupos => {
      this.grupos = grupos

    })
  }
  getSubgrupoAll() {
    this._subgrupoService.getAll().subscribe(response => {

      this.subgrupos = response.subgrupos;
    })
  }

  ///////////////////EXTRAS//////////////////////
  compareSubgrupo(o1: any, o2: any): boolean {
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id == o2.id
  }


  goBack(){
    this.location.back();
  }
}
