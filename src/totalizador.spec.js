const { ingresarCantidad } = require('./totalizador');
const { ingresarPrecio } = require('./totalizador');
const { calcularPrecioNeto } = require('./totalizador');

test('Debe ingresar cantidad de ítems y mostrar el valor', () => {
    expect(ingresarCantidad(20)).toBe(20);
});

test('Debe ingresar precio por ítem y mostrar el valor', () => {
    expect(ingresarPrecio(3)).toBe(3);
});

test('Debe calcular el precio neto', () => {
    expect(calcularPrecioNeto(20, 3)).toBe(60);
});