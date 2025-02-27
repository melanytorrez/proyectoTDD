function ingresarCantidad(cantidad) {
    return cantidad;
}
function ingresarPrecio(precio) {
    return precio;
}
function calcularPrecioNeto(cantidad, precio) {
    return cantidad * precio;
}

module.exports = { ingresarCantidad,ingresarPrecio,calcularPrecioNeto };