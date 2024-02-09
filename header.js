$(window).scroll(function() {
  var sc = $(window).scrollTop()
  if (sc > 100) {
    $("#header-scroll").addClass("small")
  } else {
    $("#header-scroll").removeClass("small")
  }
});







//contador

var tiempoRestante = 4 * 60 * 60; // 4 horas en segundos

function actualizarCuentaRegresiva() {
  var horas = Math.floor(tiempoRestante / 3600);
  var minutos = Math.floor((tiempoRestante % 3600) / 60);
  var segundos = tiempoRestante % 60;

  // Añadir ceros delante si es necesario
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  var cuentaRegresivaString = horas + ":" + minutos + ":" + segundos;
  document.getElementById("countdown").innerHTML = cuentaRegresivaString;

  if (tiempoRestante > 0) {
    tiempoRestante--;
  } else {
    document.getElementById("countdown").innerHTML = "¡Perdiste el tren!";
  }
}

// Actualizar cada segundo
setInterval(actualizarCuentaRegresiva, 1000);

// Llamar a la función al cargar la página
window.onload = actualizarCuentaRegresiva;
