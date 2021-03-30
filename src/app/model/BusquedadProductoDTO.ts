export interface BusquedadProductoDTO {
    marca: String,
    descripcion: String,
    cantidadDesde: number,
    cantidadHasta: number,
    precioDesde: number,
    precioHasta: number
    page: number,
    size: number,
    order: String,
    asc: boolean
}