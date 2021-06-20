import { Pais } from "./Pais";
import { Marca } from "./Marca";

export class Proveedor {
    id? : number;
    dni: number;
    nombres: String;
    apellidos: String;
    razonSocial: String;
    direccion: String;
    celular: String;
    email: String;
    pais: Pais;
    marca: Marca;

    constructor(dni:number, nombres: string, apellidos: string, razonSocial: string, direccion: string,
                celular: string, email: string, pais:Pais, marca:Marca) {
        this.dni = dni;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.razonSocial = razonSocial;
        this.direccion = direccion;
        this.celular = celular;
        this.email = email;
        this.pais = pais;
        this.marca = marca;
    }
}