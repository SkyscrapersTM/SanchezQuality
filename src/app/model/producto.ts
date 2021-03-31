import { Marca } from "./Marca";

export class Producto {
    id? : number;
    descripcion: string;
    cantidad: number;
    precio: number;
    marca: Marca;

    constructor(descripcion: string, cantidad:number, precio:number, marca:Marca) {
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precio = precio;
        this.marca = marca;
    }
}

