//https://codepen.io/igloude/pen/JjOoQz

var lastScrollTop = 0;
let header = document.querySelector("#header");
let hbanner = document.querySelector(".header-banner").clientHeight;


window.addEventListener("scroll", function(){ 
    var st = window.pageY || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
        console.log("abajo");
        header.setAttribute("style",`color: blue; top: -${hbanner}px;`)

    } else if (st < lastScrollTop) {
        console.log("arriba");
        header.setAttribute("style",`color: red; top: 0px;`)
    } // else was horizontal scroll
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

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
    document.getElementById("countdown").innerHTML = "¡Tiempo terminado!";
  }
}

// Actualizar cada segundo
setInterval(actualizarCuentaRegresiva, 1000);

// Llamar a la función al cargar la página
window.onload = actualizarCuentaRegresiva;
