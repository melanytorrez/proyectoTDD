// 📂 totalizador.test.js
const {
    ingresarCantidad,
    ingresarPrecio,
    calcularPrecioNeto,
    obtenerImpuesto,
    obtenerDescuento,
    calcularTotalFinal
} = require('./totalizador');

// Tests para ingresarCantidad
test('Cantidad válida retorna mismo valor', () => {
    expect(ingresarCantidad(5)).toBe(5);
});

test('Cantidad inválida lanza error', () => {
    expect(() => ingresarCantidad(-2)).toThrow();
    expect(() => ingresarCantidad(3.5)).toThrow();
});

// Tests para ingresarPrecio
test('Precio válido retorna mismo valor', () => {
    expect(ingresarPrecio(10.5)).toBe(10.5);
});

// Tests para calcularPrecioNeto
test('Calcula correctamente precio neto', () => {
    expect(calcularPrecioNeto(3, 10.5)).toBe(31.5);
});

// Tests para obtenerImpuesto
test('Retorna impuesto correcto para TX', () => {
    expect(obtenerImpuesto('TX')).toBe(6.25);
});

test('Estado inválido lanza error', () => {
    expect(() => obtenerImpuesto('XX')).toThrow();
});

// Tests para calcularTotalFinal
test('Ejemplo del PDF: 20 items, $3, TX', () => {
    const resultado = calcularTotalFinal(20, 3, 'TX');
    expect(resultado).toEqual({
        precioNeto: 60,
        descuento: "0%",
        impuesto: "6.25%",
        total: 63.75
    });
});

test('Caso con descuento e impuesto', () => {
    const resultado = calcularTotalFinal(1000, 10, 'NV');
    // 1000*10 = 10000 (descuento 10%)
    // 10000 - 10% = 9000
    // 9000 + 8% = 9720
    expect(resultado.total).toBe(9720);
});