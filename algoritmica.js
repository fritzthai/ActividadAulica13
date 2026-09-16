document.addEventListener("DOMContentLoaded", function () {
  const numero1 = document.getElementById("numero1");
  const numero2 = document.getElementById("numero2");
  const botonCalcular = document.getElementById("calcular");
  const resultado = document.getElementById("resultado");

  botonCalcular.addEventListener("click", function () {
    const valor1 = Number(numero1.value);
    const valor2 = Number(numero2.value);
    const total = valor1 + valor2;

    resultado.classList.remove("positivo", "cero", "negativo");

    if (total > 0) {
      resultado.textContent = total + " — positivo";
      resultado.classList.add("positivo");
    } else if (total === 0) {
      resultado.textContent = total + " — cero";
      resultado.classList.add("cero");
    } else {
      resultado.textContent = total + " — negativo";
      resultado.classList.add("negativo");
    }
  });
});
