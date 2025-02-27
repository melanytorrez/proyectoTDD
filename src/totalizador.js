function ingresarCantidad(cantidad) {
    return cantidad;
}
function ingresarPrecio(precio) {
    return precio;
}
function calcularPrecioNeto(cantidad, precio) {
    return cantidad * precio;
}
function obtenerImpuesto(estado) {
    const impuestos = {
        UT: 6.65,
        NV: 8.00,
        TX: 6.25,
        AL: 4.00,
        CA: 8.25
    };
    return impuestos[estado] || 0;
}
function calcularTotalConImpuesto(precioNeto, estado) {
    const impuesto = obtenerImpuesto(estado);
    return precioNeto + (precioNeto * impuesto / 100);
}


module.exports = { ingresarCantidad,ingresarPrecio,calcularPrecioNeto,obtenerImpuesto,calcularTotalConImpuesto };