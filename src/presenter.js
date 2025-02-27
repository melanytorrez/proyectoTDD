document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formulario");
  const cantidadInput = document.querySelector("#cantidad");
  const precioInput = document.querySelector("#precio");
  const estadoSelect = document.querySelector("#estado");
  const resultadoDiv = document.querySelector("#resultado");

  formulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const cantidad = Number.parseInt(cantidadInput.value);
      const precio = Number.parseFloat(precioInput.value);
      const estado = estadoSelect.value;

      if (isNaN(cantidad) || isNaN(precio) || cantidad <= 0 || precio <= 0) {
          resultadoDiv.innerHTML = "<p style='color: red;'>Ingrese valores válidos.</p>";
          return;
      }

      // Impuestos por estado
      const impuestos = {
          "UT": 0.0685,
          "NV": 0.08,
          "TX": 0.0625,
          "AL": 0.04,
          "CA": 0.0825
      };

      const subtotal = cantidad * precio;
      const impuesto = subtotal * impuestos[estado];
      const total = subtotal + impuesto;

      resultadoDiv.innerHTML = `
          <p>Subtotal: $${subtotal.toFixed(2)}</p>
          <p>Impuesto (${(impuestos[estado] * 100).toFixed(2)}%): $${impuesto.toFixed(2)}</p>
          <p><strong>Total a pagar: $${total.toFixed(2)}</strong></p>
      `;
  });
});
