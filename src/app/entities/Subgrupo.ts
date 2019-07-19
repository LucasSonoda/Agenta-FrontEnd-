import { Grupo } from "./Grupo";
import { Contacto } from "./Contacto";

export class Subgrupo {
  id: number;
  nombre: string;
  grupo: Grupo;
  contactos: Contacto[];
}
