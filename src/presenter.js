document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.querySelector("#formulario");
  const resultadoDiv = document.querySelector("#resultado");

  formulario.addEventListener("submit", function(event) {
      event.preventDefault();

      // Obtener valores
      const cantidad = Number(document.querySelector("#cantidad").value);
      const precio = Number(document.querySelector("#precio").value);
      const estado = document.querySelector("#estado").value;

      if (cantidad <= 0 || precio <= 0) {
          resultadoDiv.innerHTML = "<p style='color: red;'>Ingresa valores válidos.</p>";
          return;
      }

      // Calcular subtotal
      let subtotal = cantidad * precio;

      // Aplicar descuento según la tabla
      let descuento = 0;
      if (subtotal >= 30000) {
          descuento = 0.15;
      } else if (subtotal >= 10000) {
          descuento = 0.10;
      } else if (subtotal >= 7000) {
          descuento = 0.07;
      } else if (subtotal >= 3000) {
          descuento = 0.05;
      } else if (subtotal >= 1000) {
          descuento = 0.03;
      }

      let montoDescuento = subtotal * descuento;
      let totalConDescuento = subtotal - montoDescuento;

      // Aplicar impuestos según el estado seleccionado
      const tasasImpuestos = {
          "UT": 0.0685,
          "NV": 0.08,
          "TX": 0.0625,
          "AL": 0.04,
          "CA": 0.0825
      };

      let impuesto = totalConDescuento * tasasImpuestos[estado];
      let totalFinal = totalConDescuento + impuesto;

      // Mostrar resultado
      resultadoDiv.innerHTML = `
          <p>Subtotal: $${subtotal.toFixed(2)}</p>
          <p>Descuento (${(descuento * 100)}%): -$${montoDescuento.toFixed(2)}</p>
          <p>Total después del descuento: $${totalConDescuento.toFixed(2)}</p>
          <p>Impuesto (${(tasasImpuestos[estado] * 100)}%): $${impuesto.toFixed(2)}</p>
          <p><strong>Total a pagar: $${totalFinal.toFixed(2)}</strong></p>
      `;
  });
});
