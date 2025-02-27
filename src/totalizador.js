// 📂 totalizador.js
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
    return impuestos[estado];
}

function obtenerDescuento(precioNeto) {
    if (precioNeto >= 30000) return 15;
    if (precioNeto >= 10000) return 10;
    if (precioNeto >= 7000) return 7;
    if (precioNeto >= 3000) return 5;
    if (precioNeto >= 1000) return 3;
    return 0;
}

function calcularTotalFinal(cantidad, precio, estado) {
    // Validaciones básicas
    const cantidadValidada = ingresarCantidad(cantidad);
    const precioValidado = ingresarPrecio(precio);
    
    // Cálculos
    const precioNeto = calcularPrecioNeto(cantidadValidada, precioValidado);
    const descuento = obtenerDescuento(precioNeto);
    const precioConDescuento = precioNeto * (1 - descuento / 100);
    const impuesto = obtenerImpuesto(estado);
    const total = precioConDescuento * (1 + impuesto / 100);
    
    // Redondeo a 2 decimales
    return {
        precioNeto: Number(precioNeto.toFixed(2)),
        descuento: `${descuento}%`,
        impuesto: `${impuesto}%`,
        total: Number(total.toFixed(2))
    };
}

module.exports = {
    ingresarCantidad,
    ingresarPrecio,
    calcularPrecioNeto,
    obtenerImpuesto,
    obtenerDescuento,
    calcularTotalFinal
};