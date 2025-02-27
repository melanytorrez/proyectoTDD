const { ingresarCantidad } = require('./totalizador');

test('Debe ingresar cantidad de ítems y mostrar el valor', () => {
    expect(ingresarCantidad(20)).toBe(20);
});
const { ingresarPrecio } = require('./totalizador');

test('Debe ingresar precio por ítem y mostrar el valor', () => {
    expect(ingresarPrecio(3)).toBe(3);
});
