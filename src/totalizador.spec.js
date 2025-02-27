const { ingresarCantidad } = require('./totalizador');

test('Debe ingresar cantidad de ítems y mostrar el valor', () => {
    expect(ingresarCantidad(20)).toBe(20);
});
