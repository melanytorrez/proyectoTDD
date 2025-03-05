// 📂 totalizador.js
function ingresarCantidad(cantidad) {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new Error(`Cantidad inválida: ${cantidad}. Debe ser un entero mayor a 0.`);
    }
    return cantidad;
}

function ingresarPrecio(precio) {
    if (!Number.isFinite(precio) || precio <= 0) {
        throw new Error(`Precio inválido: ${precio}. Debe ser un número mayor a 0.`);
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
        throw new Error(`Código de estado inválido: ${estado}`);
    }
    return impuestos[estado];
}

function obtenerDescuento(precioConImpuesto) {
    if (precioConImpuesto >= 30000) return 15;
    if (precioConImpuesto >= 10000) return 10;
    if (precioConImpuesto >= 7000) return 7;
    if (precioConImpuesto >= 3000) return 5;
    if (precioConImpuesto >= 1000) return 3;
    return 0;
}

function calcularTotalFinal(cantidad, precio, estado) {
    // Validaciones
    const cantidadValidada = ingresarCantidad(cantidad);
    const precioValidado = ingresarPrecio(precio);
    
    // Cálculo del precio neto
    const precioNeto = calcularPrecioNeto(cantidadValidada, precioValidado);

    // Aplicar impuesto primero
    const impuesto = obtenerImpuesto(estado);
    const montoImpuesto = (precioNeto * impuesto / 100).toFixed(2);
    const precioConImpuesto = (parseFloat(precioNeto) + parseFloat(montoImpuesto)).toFixed(2);

    // Aplicar descuento después del impuesto
    const descuento = obtenerDescuento(precioConImpuesto);
    const montoDescuento = (precioConImpuesto * descuento / 100).toFixed(2);
    const total = (parseFloat(precioConImpuesto) - parseFloat(montoDescuento)).toFixed(2);

    // Retornar el resultado con valores redondeados
    return {
        precioNeto: Number(precioNeto.toFixed(2)),
        impuesto: `${impuesto}% (+$${montoImpuesto})`,
        precioConImpuesto: Number(precioConImpuesto),
        descuento: `${descuento}% (-$${montoDescuento})`,
        total: Number(total)
    };
}
// nuevas funcionalidades
function obtenerEstadoValido(estado) {
    const estadosValidos = ["UT", "NV", "TX", "AL", "CA"];
    return estadosValidos.includes(estado) ? estado : "CA";
}
function obtenerCategoriaValida(categoria) {
    const categoriasValidas = ["Alimentos", "Bebidas alcohólicas", "Material de escritorio", 
                               "Muebles", "Electrónicos", "Vestimenta", "Varios"];
    return categoriasValidas.includes(categoria) ? categoria : "Varios";
}

function obtenerAjustesPorCategoria(categoria) {
    const ajustes = {
        "Alimentos": { impuesto: 0, descuento: 2 },
        "Bebidas alcohólicas": { impuesto: 7, descuento: 0 },
        "Material de escritorio": { impuesto: 0, descuento: 1.5 },
        "Muebles": { impuesto: 3, descuento: 0 },
        "Electrónicos": { impuesto: 4, descuento: 1 },
        "Vestimenta": { impuesto: 2, descuento: 0 },
        "Varios": { impuesto: 0, descuento: 0 }
    };
    return ajustes[categoria] || { impuesto: 0, descuento: 0 };
}

function calcularCostoEnvio(cantidad, pesoUnidad) {
    let costoPorUnidad = 0;
    if (pesoUnidad > 200) costoPorUnidad = 9;
    else if (pesoUnidad > 100) costoPorUnidad = 8;
    else if (pesoUnidad > 80) costoPorUnidad = 6.5;
    else if (pesoUnidad > 40) costoPorUnidad = 6;
    else if (pesoUnidad > 20) costoPorUnidad = 5;
    else if (pesoUnidad > 10) costoPorUnidad = 3.5;

    return cantidad * costoPorUnidad;
}

function obtenerDescuentoEnvioPorCliente(tipoCliente) {
    const descuentos = {
        "Normal": 0,
        "Recurrente": 0.5,
        "Antiguo Recurrente": 1,
        "Especial": 1.5
    };
    return descuentos[tipoCliente] || 0;
}
function obtenerDescuentoFijoPorClienteYCategoria(tipoCliente, categoria, precioNeto) {
    if (tipoCliente === "Recurrente" && categoria === "Alimentos" && precioNeto > 3000) return 100;
    if (tipoCliente === "Especial" && categoria === "Electrónicos" && precioNeto > 7000) return 200;
    return 0;
}


module.exports = {
    ingresarCantidad,
    ingresarPrecio,
    calcularPrecioNeto,
    obtenerImpuesto,
    obtenerDescuento,
    calcularTotalFinal,
    obtenerEstadoValido,
    obtenerCategoriaValida,
    obtenerAjustesPorCategoria,
    calcularCostoEnvio,
    obtenerDescuentoEnvioPorCliente,
    obtenerDescuentoFijoPorClienteYCategoria
};
