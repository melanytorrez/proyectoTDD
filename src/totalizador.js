function ingresarCantidad(cantidad) {
    if (cantidad <= 0 || !Number.isInteger(cantidad)) {
        throw new Error("Cantidad debe ser un entero mayor a 0");
    }
    return cantidad;
}
function ingresarPrecio(precio) {
    if (precio <= 0 || typeof precio !== "number") {
        throw new Error("Precio debe ser un número mayor a 0");
    }
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
    if (!impuestos.hasOwnProperty(estado)) {
        throw new Error("Código de estado no válido");
    }
    return impuestos[estado] || 0;
}
function calcularTotalConImpuesto(precioNeto, estado) {
    const impuesto = obtenerImpuesto(estado);
    return precioNeto + (precioNeto * impuesto / 100);
}
function obtenerDescuento(total) {
    if (total >= 30000) return 15;
    if (total >= 10000) return 10;
    if (total >= 7000) return 7;
    if (total >= 3000) return 5;
    if (total >= 1000) return 3;
    return 0;
}


module.exports = { ingresarCantidad,ingresarPrecio,calcularPrecioNeto,obtenerImpuesto,calcularTotalConImpuesto,obtenerDescuento };