const { ingresarCantidad } = require('./totalizador');
const { ingresarPrecio } = require('./totalizador');
const { calcularPrecioNeto } = require('./totalizador');
const { obtenerImpuesto } = require('./totalizador');
const { calcularTotalConImpuesto } = require('./totalizador');
test('Debe ingresar cantidad de ítems y mostrar el valor', () => {
    expect(ingresarCantidad(20)).toBe(20);
});

test('Debe ingresar precio por ítem y mostrar el valor', () => {
    expect(ingresarPrecio(3)).toBe(3);
});

test('Debe calcular el precio neto', () => {
    expect(calcularPrecioNeto(20, 3)).toBe(60);
});
test('Debe retornar el porcentaje de impuesto según el estado', () => {
    expect(obtenerImpuesto('CA')).toBe(8.25);
    expect(obtenerImpuesto('TX')).toBe(6.25);
    expect(obtenerImpuesto('AL')).toBe(4.00);
});


test('Debe calcular el total con impuestos', () => {
    expect(calcularTotalConImpuesto(60, 'CA')).toBe(64.95); // 60 + (60 * 8.25 / 100)
});
