
const {
    ingresarCantidad,
    ingresarPrecio,
    calcularPrecioNeto,
    obtenerImpuesto,
    obtenerDescuento,
    calcularTotalFinal,
    obtenerEstadoValido,
    obtenerAjustesPorCategoria,
    obtenerDescuentoEnvioPorCliente,
    obtenerDescuentoFijoPorClienteYCategoria,
    calcularCostoEnvioConDescuento
} = require('./totalizador');
// Tests para ingresarCantidad
test('Cantidad válida retorna mismo valor', () => {
    expect(ingresarCantidad(5)).toBe(5);
});

test('Cantidad inválida lanza error', () => {
    expect(() => ingresarCantidad(-2)).toThrow();
    expect(() => ingresarCantidad(3.5)).toThrow();
    expect(() => ingresarCantidad(0)).toThrow();
    expect(() => ingresarCantidad("texto")).toThrow();
});

// Tests para ingresarPrecio
test('Precio válido retorna mismo valor', () => {
    expect(ingresarPrecio(10.5)).toBe(10.5);
    expect(ingresarPrecio(1)).toBe(1);
});

test('Precio inválido lanza error', () => {
    expect(() => ingresarPrecio(-10)).toThrow();
    expect(() => ingresarPrecio("texto")).toThrow();
    expect(() => ingresarPrecio(NaN)).toThrow();
});

// Tests para calcularPrecioNeto
test('Calcula correctamente precio neto', () => {
    expect(calcularPrecioNeto(3, 10.5)).toBe(31.5);
    expect(calcularPrecioNeto(10, 2)).toBe(20);
});

// Tests para obtenerImpuesto
test('Retorna impuesto correcto para estados válidos', () => {
    expect(obtenerImpuesto('TX')).toBe(6.25);
    expect(obtenerImpuesto('CA')).toBe(8.25);
    expect(obtenerImpuesto('NV')).toBe(8.00);
    expect(obtenerImpuesto('AL')).toBe(4.00);
    expect(obtenerImpuesto('UT')).toBe(6.65);
});

test('Estado inválido lanza error', () => {
    expect(() => obtenerImpuesto('XX')).toThrow();
    expect(() => obtenerImpuesto('NY')).toThrow();
    expect(() => obtenerImpuesto('')).toThrow();
});

// Tests para obtenerDescuento
test('Devuelve el descuento correcto según el precio con impuesto', () => {
    expect(obtenerDescuento(500)).toBe(0);
    expect(obtenerDescuento(1000)).toBe(3);
    expect(obtenerDescuento(3000)).toBe(5);
    expect(obtenerDescuento(7000)).toBe(7);
    expect(obtenerDescuento(10000)).toBe(10);
    expect(obtenerDescuento(30000)).toBe(15);
});

// Tests para calcularTotalFinal
test('Ejemplo del PDF: 20 items, $3, TX', () => {
    const resultado = calcularTotalFinal(20, 3, 'TX');
    expect(resultado).toEqual({
        precioNeto: 60,
        impuesto: "6.25% (+$3.75)",
        precioConImpuesto: 63.75,
        descuento: "0% (-$0.00)",
        total: 63.75
    });
});

test('Caso con descuento e impuesto', () => {
    const resultado = calcularTotalFinal(1000, 10, 'NV');
    expect(resultado).toEqual({
        precioNeto: 10000,
        impuesto: "8% (+$800.00)",
        precioConImpuesto: 10800.00,
        descuento: "10% (-$1080.00)",
        total: 9720.00
    });
});

test('Caso con el mayor descuento (15%)', () => {
    const resultado = calcularTotalFinal(2000, 15, 'CA');
    expect(resultado).toEqual({
        precioNeto: 30000,
        impuesto: "8.25% (+$2475.00)",
        precioConImpuesto: 32475.00,
        descuento: "15% (-$4871.25)",
        total: 27603.75
    });
});

//nuevas funcionalidades

test('Debe retornar el estado ingresado si es válido', () => {
    expect(obtenerEstadoValido("TX")).toBe("TX");
    expect(obtenerEstadoValido("NV")).toBe("NV");
});

test('Debe retornar el estado por defecto (CA) si el estado no es válido', () => {
    expect(obtenerEstadoValido("XX")).toBe("CA");
    expect(obtenerEstadoValido("")).toBe("CA");
});
const { obtenerCategoriaValida } = require('./totalizador');

test('Debe retornar la categoría ingresada si es válida', () => {
    expect(obtenerCategoriaValida("Alimentos")).toBe("Alimentos");
    expect(obtenerCategoriaValida("Electrónicos")).toBe("Electrónicos");
});

test('Debe retornar "Varios" si la categoría ingresada no es válida', () => {
    expect(obtenerCategoriaValida("Juguetes")).toBe("Varios");
    expect(obtenerCategoriaValida("")).toBe("Varios");
});


test('Debe retornar impuesto y descuento adicional por categoría', () => {
    expect(obtenerAjustesPorCategoria("Alimentos")).toEqual({ impuesto: 0, descuento: 2 });
    expect(obtenerAjustesPorCategoria("Electrónicos")).toEqual({ impuesto: 4, descuento: 1 });
    expect(obtenerAjustesPorCategoria("Muebles")).toEqual({ impuesto: 3, descuento: 0 });
});
const { calcularCostoEnvio } = require('./totalizador');

test('Debe calcular el costo de envío según el peso volumétrico por unidad', () => {
    expect(calcularCostoEnvio(5, 10)).toBe(0);
    expect(calcularCostoEnvio(3, 15)).toBe(10.5);  // 3 * 3.5
    expect(calcularCostoEnvio(4, 50)).toBe(24);  // 4 * 6
});


test('Debe retornar el descuento en costo de envío según el tipo de cliente', () => {
    expect(obtenerDescuentoEnvioPorCliente("Normal")).toBe(0);
    expect(obtenerDescuentoEnvioPorCliente("Recurrente")).toBe(0.5);
    expect(obtenerDescuentoEnvioPorCliente("Antiguo Recurrente")).toBe(1);
    expect(obtenerDescuentoEnvioPorCliente("Especial")).toBe(1.5);
});

test('Debe retornar 0 si el tipo de cliente es inválido', () => {
    expect(obtenerDescuentoEnvioPorCliente("Desconocido")).toBe(0);
    expect(obtenerDescuentoEnvioPorCliente("")).toBe(0);
});

test('Debe retornar el descuento fijo según el tipo de cliente y la categoría de producto', () => {
    expect(obtenerDescuentoFijoPorClienteYCategoria("Recurrente", "Alimentos", 3500)).toBe(100);
    expect(obtenerDescuentoFijoPorClienteYCategoria("Especial", "Electrónicos", 7500)).toBe(200);
    expect(obtenerDescuentoFijoPorClienteYCategoria("Normal", "Alimentos", 5000)).toBe(0);
});

test('Debe retornar 0 si el cliente no cumple las condiciones', () => {
    expect(obtenerDescuentoFijoPorClienteYCategoria("Recurrente", "Alimentos", 2000)).toBe(0);
    expect(obtenerDescuentoFijoPorClienteYCategoria("Especial", "Electrónicos", 6000)).toBe(0);
});


test('Debe calcular el costo de envío con el descuento por tipo de cliente', () => {
    expect(calcularCostoEnvioConDescuento(50, "Normal")).toBe(50);
    expect(calcularCostoEnvioConDescuento(50, "Recurrente")).toBe(49.75);
    expect(calcularCostoEnvioConDescuento(50, "Especial")).toBe(49.25);
});

test('Si el descuento es 0%, el costo de envío no cambia', () => {
    expect(calcularCostoEnvioConDescuento(30, "Normal")).toBe(30);
});
