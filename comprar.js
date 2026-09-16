document.addEventListener("DOMContentLoaded", function () {
  const camposCantidad = document.querySelectorAll(".cantidad-producto");
  const productosPedidos = document.getElementById("productos-pedidos");
  const unidadesTotales = document.getElementById("unidades-totales");
  const totalEstimado = document.getElementById("total-estimado");
  const formatoPesos = new Intl.NumberFormat("es-AR");

  function calcularPedido() {
    let cantidadProductos = 0;
    let cantidadUnidades = 0;
    let total = 0;
    const productosSeleccionados = [];

    camposCantidad.forEach(function (campo) {
      const cantidad = Math.max(0, Number(campo.value) || 0);
      const precio = Number(campo.dataset.precio);
      const subtotal = cantidad * precio;
      const fila = campo.closest(".order-line");
      const nombre = fila.querySelector(".item-name").textContent;
      const subtotalElemento = fila.querySelector(".item-subtotal strong");

      subtotalElemento.textContent = "$ " + formatoPesos.format(subtotal);

      if (cantidad > 0) {
        cantidadProductos++;
        cantidadUnidades += cantidad;
        total += subtotal;
        productosSeleccionados.push({ nombre, cantidad, subtotal });
      }
    });

    productosPedidos.textContent = cantidadProductos;
    unidadesTotales.textContent = cantidadUnidades;
    totalEstimado.textContent = "$ " + formatoPesos.format(total);
    actualizarComprobantes(productosSeleccionados, total);
  }

  function actualizarComprobantes(productos, total) {
    let filasProductos = "";

    if (productos.length === 0) {
      filasProductos = `
        <tr>
          <td>Sin productos seleccionados</td>
          <td class="qty">x0</td>
          <td class="amount">$ 0</td>
        </tr>`;
    } else {
      productos.forEach(function (producto) {
        filasProductos += `
          <tr>
            <td>${producto.nombre}</td>
            <td class="qty">x${producto.cantidad}</td>
            <td class="amount">$ ${formatoPesos.format(producto.subtotal)}</td>
          </tr>`;
      });
    }

    const contenido = filasProductos + `
      <tr>
        <td>Envío estándar</td>
        <td class="qty">—</td>
        <td class="amount">$ 0</td>
      </tr>
      <tr class="total">
        <td colspan="2">Total</td>
        <td class="amount">$ ${formatoPesos.format(total)}</td>
      </tr>`;

    document.querySelectorAll(".modal-summary tbody").forEach(function (tabla) {
      tabla.innerHTML = contenido;
    });
  }

  camposCantidad.forEach(function (campo) {
    campo.addEventListener("input", calcularPedido);
  });

  calcularPedido();
});
