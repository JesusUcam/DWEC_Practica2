//Pagina https://www.aurgi.com/
//hacer header en condiciones

/* 
 Crear un JSON con los datos de un taller. En éste json tendremos todos los datos de clientes con sus vehículos y en cada vehículo tendremos que tener una lista con todas sus cita.revisiones.

Inicialmente se deberá cargar la información del json creado haciendo una llamada AJAX al servidor.

Crear una aplicación que me permita:

- Consultar todas las cita.revisiones de los clientes (filtrando por clientes o por fechas)

- Añadir nuevas cita.revisiones (usar formulario con validación de campos).

- Eliminar clientes.

- Mostrar una página inicial donde se muestren todos los servicios que ofrece el taller (ser creativos)



** IMPORTANTE: Organización y limpieza del código. El json debe llevar datos ficticios y tener bastante información de los clientes, coches, cita.revisiones, ...
*/

let clase_botones = "button";

let arrayRevisiones = [];
class Revision {
  constructor(cliente, vehiculo, fechaEntrada, fechaSalida) {
    this.Cliente = cliente;
    this.Vehiculo = vehiculo;
    this.fechaEntrada = fechaEntrada;
    this.fechaSalida = fechaSalida;
  }
}
let arrayClientes = [];
class Cliente {
  constructor(nombre, dni, cp, poblacion, provincia, domicilio, telefono) {
    this.nombre = nombre;
    this.dni = dni;
    this.cp = cp;
    this.poblacion = poblacion;
    this.provincia = provincia;
    this.domicilio = domicilio;
    this.telefono = telefono;
  }
}
let arrayVehiculos = [];
class Vehiculo {
  constructor(matricula, marca, modelo, chasis, km) {
    this.matricula = matricula;
    this.marca = marca;
    this.modelo = modelo;
    this.chasis = chasis;
    this.km = km;
  }
}

function datosSessionStorage() {
  sessionStorage.setItem("arrayClientes", JSON.stringify(arrayClientes));
  sessionStorage.setItem("arrayRevisiones", JSON.stringify(arrayRevisiones));
  sessionStorage.setItem("arrayVehiculos", JSON.stringify(arrayVehiculos));

  for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i);
    let value = sessionStorage.getItem(key);
    console.log(`Clave: ${key}, Valor: ${value}`);
  }
}

//MODAL
function crearModal(x) {
  /* 3 TIPOS DE MODAL (de momento)
    - Para pedir revisión
    - Para modificar Clientes
    - Para confirmar acción (si/no)
  Entonces: 
    - Sobran parámetros
    - Hay que cambiar la construcción del form
*/

  //DECLARACIÓN
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");

  let modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");

  let modalHeader = document.createElement("div");
  modalHeader.setAttribute("class", "modal-header");

  let modalBody = document.createElement("div");
  modalBody.setAttribute("class", "modal-body");

  let close = document.createElement("span");
  close.setAttribute("class", "close");
  close.innerHTML = `&times;`;
  close.addEventListener("click", function () {
    container.removeChild(modal);
  });

  //FORMULARIO
  let formulario = document.createElement("form");
  formulario.setAttribute(
    "style",
    "display: flex; flex-direction: column; justify-content: center;"
  );

  //CAMPOS DEL FORMULARIO
  let fnombre = document.createElement("input");
  fnombre.setAttribute("type", "text");
  fnombre.setAttribute("placeholder", "Nombre");

  let fdni = document.createElement("input");
  fdni.setAttribute("type", "text");
  fdni.setAttribute("placeholder", "DNI");

  let ffecha_entrada = document.createElement("input");
  ffecha_entrada.setAttribute("type", "date");

  let ffecha_salida = document.createElement("input");
  ffecha_salida.setAttribute("type", "date");

  let fcp = document.createElement("input");
  fcp.setAttribute("type", "number");
  fcp.setAttribute("placeholder", "Codigo Postal");

  let fpoblacion = document.createElement("input");
  fpoblacion.setAttribute("type", "text");
  fpoblacion.setAttribute("placeholder", "Poblacion");

  let fprovincia = document.createElement("input");
  fprovincia.setAttribute("type", "text");
  fprovincia.setAttribute("placeholder", "Provincia");

  let fdomicilio = document.createElement("input");
  fdomicilio.setAttribute("type", "text");
  fdomicilio.setAttribute("placeholder", "Domicilio");

  let ftelefono = document.createElement("input");
  ftelefono.setAttribute("type", "text");
  ftelefono.setAttribute("placeholder", "Telefono");

  let fmatricula = document.createElement("input");
  fmatricula.setAttribute("type", "text");
  fmatricula.setAttribute("placeholder", "Matricula");

  let fmarca = document.createElement("input");
  fmarca.setAttribute("type", "text");
  fmarca.setAttribute("placeholder", "Marca");

  let fmodelo = document.createElement("input");
  fmodelo.setAttribute("type", "text");
  fmodelo.setAttribute("placeholder", "modelo");

  let fchasis = document.createElement("input");
  fchasis.setAttribute("type", "text");
  fchasis.setAttribute("placeholder", "chasis");

  let fkm = document.createElement("input");
  fkm.setAttribute("type", "text");
  fkm.setAttribute("placeholder", "Kilometros");

  let fEnviar = document.createElement("button");
  fEnviar.setAttribute("class", clase_botones);

  //Factor común del modal
  let tituloHeader = document.createElement("h2");

  modalHeader.appendChild(close); 
  modalHeader.appendChild(tituloHeader); 

  modalBody.appendChild(formulario); 

  modalContent.appendChild(modalHeader); 
  modalContent.appendChild(modalBody); 
  modal.appendChild(modalContent); 

  let modo = "";
  //Comprobación para saber que modal necesitamos
  if (arrayClientes.includes(x)) {
    console.log("Es un cliente");
    modo = "cliente";
  } else if (arrayRevisiones.includes(x)) {
    console.log("Es una revisión");
  } else if (arrayVehiculos.includes(x)) {
    console.log("Es un vehiculo");
    modo = "vehiculo"; //No se usa todavia
  } else if (x == "nuevo") {
    console.log("Pedir cita");
    modo = x;
  } else {
    console.log("Confirmar");
    modo = "confirmar";
  }

  switch (modo) {
    //Pedir cita
    case "nuevo":
      tituloHeader.textContent = "Nueva cita";

      formulario.appendChild(fnombre);
      formulario.appendChild(fdni);
      formulario.appendChild(ffecha_entrada);
      formulario.appendChild(ffecha_salida);
      formulario.appendChild(fcp);
      formulario.appendChild(fpoblacion);
      formulario.appendChild(fprovincia);
      formulario.appendChild(fdomicilio);
      formulario.appendChild(ftelefono);
      formulario.appendChild(fmatricula);
      formulario.appendChild(fmarca);
      formulario.appendChild(fmodelo);
      formulario.appendChild(fchasis);
      formulario.appendChild(fkm);
      formulario.appendChild(fEnviar);

      //Boton de enviar
      fEnviar.textContent = "Confirmar cita";
      fEnviar.addEventListener("click", function (event) {
        // Evitar que el formulario se envíe
        event.preventDefault();

        // Obtenemos todos los valores de los campos del formulario
        let nombreCliente = fnombre.value;
        let dniCliente = fdni.value;
        let cpCliente = fcp.value;
        let poblacionCliente = fpoblacion.value;
        let provinciaCliente = fprovincia.value;
        let domicilioCliente = fdomicilio.value;
        let telefonoCliente = ftelefono.value;

        let matriculaVehiculo = fmatricula.value;
        let marcaVehiculo = fmarca.value;
        let modeloVehiculo = fmodelo.value;
        let chasisVehiculo = fchasis.value;
        let kmVehiculo = fkm.value;

        let fechaEntradaRevision = ffecha_entrada.value;
        let fechaSalidaRevision = ffecha_salida.value;

        // Creamos un nuevo cliente, un nuevo vehículo y una nueva revisión
        let cliente1 = new Cliente(
          nombreCliente,
          dniCliente,
          cpCliente,
          poblacionCliente,
          provinciaCliente,
          domicilioCliente,
          telefonoCliente
        );
        let vehiculo1 = new Vehiculo(
          matriculaVehiculo,
          marcaVehiculo,
          modeloVehiculo,
          chasisVehiculo,
          kmVehiculo
        );
        let revision1 = new Revision(
          cliente1,
          vehiculo1,
          fechaEntradaRevision,
          fechaSalidaRevision
        );

        // Guardamos el cliente, el vehículo y la revisión en el array "arrayRevisiones" y en el sessionStorage
        arrayClientes.push(cliente1);
        sessionStorage.setItem("arrayClientes", JSON.stringify(arrayClientes));

        arrayVehiculos.push(vehiculo1);
        sessionStorage.setItem(
          "arrayVehiculos",
          JSON.stringify(arrayVehiculos)
        );

        arrayRevisiones.push(revision1);
        sessionStorage.setItem(
          "arrayRevisiones",
          JSON.stringify(arrayRevisiones)
        );

        // Cerramos el modal y limpiamos los campos del formulario
        container.removeChild(modal);
        fnombre.value = "";
        fdni.value = "";
        fcp.value = "";
        fpoblacion.value = "";
        fprovincia.value = "";
        fdomicilio.value = "";
        ftelefono.value = "";
        fmatricula.value = "";
        fmarca.value = "";
        fmodelo.value = "";
        fchasis.value = "";
        fkm.value = "";

        console.log(arrayRevisiones);
      });

      container.appendChild(modal);
      break;

    // Boton de enviar
    case "cliente":
      let cliente = x;
      tituloHeader.textContent = "Modificar cita";

      // Agregar los datos del cliente al formulario
      formulario.appendChild(fnombre);
      formulario.appendChild(fdni);
      formulario.appendChild(fcp);
      formulario.appendChild(fpoblacion);
      formulario.appendChild(fprovincia);
      formulario.appendChild(fdomicilio);
      formulario.appendChild(ftelefono);
      formulario.appendChild(fEnviar);

      fnombre.value = cliente.nombre;
      fdni.value = cliente.dni;
      fcp.value = cliente.cp;
      fpoblacion.value = cliente.poblacion;
      fprovincia.value = cliente.provincia;
      fdomicilio.value = cliente.domicilio;
      ftelefono.value = cliente.telefono;

      // Boton de enviar
      fEnviar.textContent = "Modificar cliente";
      fEnviar.addEventListener("click", function (event) {
        event.preventDefault();

        // Recuperar los valores actualizados del formulario
        let nombreModificado = fnombre.value;
        let dniModificado = fdni.value;
        let cpModificado = fcp.value;
        let poblacionModificado = fpoblacion.value;
        let provinciaModificado = fprovincia.value;
        let domicilioModificado = fdomicilio.value;
        let telefonoModificado = ftelefono.value;

        // Actualizar los campos modificados en el objeto cliente
        cliente.nombre = nombreModificado;
        cliente.dni = dniModificado;
        cliente.cp = cpModificado;
        cliente.poblacion = poblacionModificado;
        cliente.provincia = provinciaModificado;
        cliente.domicilio = domicilioModificado;
        cliente.telefono = telefonoModificado;

        container.removeChild(modal);
        fnombre.value = "";
        fdni.value = "";
        fcp.value = "";
        fpoblacion.value = "";
        fprovincia.value = "";
        fdomicilio.value = "";
        ftelefono.value = "";
        fmatricula.value = "";
        fmarca.value = "";
        fmodelo.value = "";
        fchasis.value = "";
        fkm.value = "";

        // Aquí podrías realizar la lógica para enviar los datos actualizados del cliente al servidor, por ejemplo
        btn_GestionarClientes.click();
        console.log("Se ha hecho clic en Modificar cliente");
        console.log("Cliente modificado:", cliente);
      });

      container.appendChild(modal);

      break;

    case "confirmar":
      tituloHeader.textContent = x;

      let si = document.createElement("button");
      let no = document.createElement("button");
      si.setAttribute("class", clase_botones);
      no.setAttribute("class", clase_botones);
      si.textContent = "Confirmar";
      no.textContent = "Cancelar ";

      modalBody.setAttribute(
        "style",
        "display: flex; justify-content: center;"
      );
      modalBody.appendChild(si);
      modalBody.appendChild(no);

      //EventListeners
      si.addEventListener("click", function () {
        clientesSeleccionados =
          document.getElementsByClassName("filaSeleccionada");

        for (let i = 0; i < clientesSeleccionados.length; i++) {
          let c = clientesSeleccionados[i].id;

          arrayClientes.forEach((clienteA) => {
            if (c === clienteA.dni) {
              let index = arrayClientes.indexOf(clienteA);
              arrayClientes.splice(index, 1);
            }
          });
        }

        btn_GestionarClientes.click();
      });

      no.addEventListener("click", function () {
        container.removeChild(modal);
      });

      container.appendChild(modal);
      break;
  }
}

//METODOS AÑADIR AL ARRAY
function registrarCliente(cliente) {
  let clienteExiste = arrayClientes.find(
    (clienteE) => clienteE.dni === cliente.dni
  );
  if (!clienteExiste) {
    arrayClientes.push(cliente);
  } 
}
function registrarVehiculo(vehiculo) {
  let vehiculoExiste = arrayVehiculos.find(
    (vehiculoE) => vehiculoE.matricula === vehiculo.matricula
  );
  if (!vehiculoExiste) {
    arrayVehiculos.push(vehiculo);
  } else {
    console.log(`${vehiculo.matricula}---`);
  } 
}

let container = document.getElementById("container");
//Botones
let btn_ConsultarCitas = document.getElementById("botonCC");
let btn_PedirCita = document.getElementById("botonPC");
let btn_GestionarClientes = document.getElementById("botonGC");

fetch("datos.json")
  .then((res) => res.json())
  .then((data) => {
    data.result.forEach((cita) => {
      //Datos cliente
      let nombre = cita.Revision.Cliente.Nombre;
      let dni = cita.Revision.Cliente.CIF_DNI;
      let cp = cita.Revision.Cliente.CP;
      let poblacion = cita.Revision.Cliente.Poblacion;
      let provincia = cita.Revision.Cliente.Provincia;
      let domicilio = cita.Revision.Cliente.Domicilio;
      let telefono = cita.Revision.Cliente.Telefono;

      let cliente = new Cliente(
        nombre,
        dni,
        cp,
        poblacion,
        provincia,
        domicilio,
        telefono
      );
      registrarCliente(cliente);

      //Datos vehiculo
      let matricula = cita.Revision.Vehiculo.Matricula;
      let marca = cita.Revision.Vehiculo.Marca;
      let modelo = cita.Revision.Vehiculo.Modelo;
      let chasis = cita.Revision.Vehiculo.Numero_Chasis;
      let km = cita.Revision.Vehiculo.Km;

      let vehiculo = new Vehiculo(matricula, marca, modelo, chasis, km);
      registrarVehiculo(vehiculo);

      //Datos cita.revision
      let fechaEntrada = cita.Revision.datos.Fecha_entrada;
      let fechaSalida = cita.Revision.datos.Fecha_entrega_prevista;

      let revision = new Revision(cliente, vehiculo, fechaEntrada, fechaSalida);
      arrayRevisiones.push(revision);
    });
  });

btn_ConsultarCitas.addEventListener("click", function () {
  //Tabla de revisiones
  let tabla = document.createElement("table");

  datosSessionStorage();
  tabla.setAttribute("id", "table-prebuilt");

  //THEADER CON FILTROS
  let thfecha_entrada = document.createElement("th");
  let thfecha_salida = document.createElement("th");
  let thnombre = document.createElement("th");
  let thdni = document.createElement("th");
  let thcp = document.createElement("th");
  let thpoblacion = document.createElement("th");
  let thprovincia = document.createElement("th");
  let thdomicilio = document.createElement("th");
  let thtelefono = document.createElement("th");
  let thmatricula = document.createElement("th");
  let thmarca = document.createElement("th");
  let thmodelo = document.createElement("th");
  let thchasis = document.createElement("th");
  let thkm = document.createElement("th");

  thfecha_entrada.textContent = "Fecha de entrada";
  thfecha_salida.textContent = "Fecha de salida";
  thnombre.textContent = "Nombre";
  thdni.textContent = "DNI";
  thcp.textContent = "Codigo Postal";
  thpoblacion.textContent = "Poblacion";
  thprovincia.textContent = "Provincia";
  thdomicilio.textContent = "Domicilio";
  thtelefono.textContent = "Telefono";
  thmatricula.textContent = "Matricula";
  thmarca.textContent = "Marca";
  thmodelo.textContent = "Modelo";
  thchasis.textContent = "Chasis";
  thkm.textContent = "Kilometros";

  tabla.appendChild(thfecha_entrada);
  tabla.appendChild(thfecha_salida);
  tabla.appendChild(thnombre);
  tabla.appendChild(thdni);
  tabla.appendChild(thcp);
  tabla.appendChild(thpoblacion);
  tabla.appendChild(thprovincia);
  tabla.appendChild(thdomicilio);
  tabla.appendChild(thtelefono);
  tabla.appendChild(thmatricula);
  tabla.appendChild(thmarca);
  tabla.appendChild(thmodelo);
  tabla.appendChild(thchasis);
  tabla.appendChild(thkm);

  //FUNCIONALIDAD FILTROS

  //BUSCADOR
  let buscador = document.createElement("div");

  let buqueda = document.createElement("input");
  buqueda.setAttribute("type", "text");
  buqueda.setAttribute("placeholder", "Buscar por nombre, dni, matricula...");
  let btnBuscar = document.createElement("button");
  btnBuscar.setAttribute("type", "button");
  btnBuscar.textContent = "Buscar";
  let filtrarPor = document.createElement("select");
  filtrarPor.setAttribute("id", "filtrarPor");
  let opciones = [
    "Fecha de entrada",
    "Fecha de salida",
    "Nombre",
    "DNI",
    "Codigo Postal",
    "Poblacion",
    "Provincia",
    "Domicilio",
    "Telefono",
    "Matricula",
    "Marca",
    "Modelo",
    "Chasis",
    "Kilometros",
  ];
  opciones.forEach((opcion) => {
    let option = document.createElement("option");
    option.textContent = opcion;
    filtrarPor.appendChild(option);
  });

  buscador.appendChild(buqueda);
  buscador.appendChild(filtrarPor);
  buscador.appendChild(btnBuscar);

  //Funcionalidad Buscador
  btnBuscar.addEventListener("click", function () {
    let filtro = buqueda.value;
    let seleccion = filtrarPor.value;
    let arrayFiltrado = arrayRevisiones.filter((cita) => {
      let cliente = cita.Cliente;
      let vehiculo = cita.Vehiculo;
      let fechaEntrada = cita.fechaEntrada;
      let fechaSalida = cita.fechaSalida;
      let nombre = cliente.nombre;
      let dni = cliente.dni;
      let cp = cliente.cp;
      let poblacion = cliente.poblacion;
      let provincia = cliente.provincia;
      let domicilio = cliente.domicilio;
      let telefono = cliente.telefono;
      let matricula = vehiculo.matricula;
      let marca = vehiculo.marca;
      let modelo = vehiculo.modelo;
      let chasis = vehiculo.chasis;
      let km = vehiculo.km;
      switch (seleccion) {
        case "Fecha de entrada":
          return fechaEntrada.includes(filtro);
        case "Fecha de salida":
          return fechaSalida.includes(filtro);
        case "Nombre":
          return nombre.includes(filtro);
        case "DNI":
          return dni.includes(filtro);
        case "Codigo Postal":
          return cp.includes(filtro);
        case "Poblacion":
          return poblacion.includes(filtro);
        case "Provincia":
          return provincia.includes(filtro);
        case "Domicilio":
          return domicilio.includes(filtro);
        case "Telefono":
          return telefono.includes(filtro);
        case "Matricula":
          return matricula.includes(filtro);
        case "Marca":
          return marca.includes(filtro);
        case "Modelo":
          return modelo.includes(filtro);
        case "Chasis":
          return chasis.includes(filtro);
        case "Kilometros":
          return km.includes(filtro);
      }
    });

    tabla.innerHTML = "";
    tabla.appendChild(thfecha_entrada);
    tabla.appendChild(thfecha_salida);
    tabla.appendChild(thnombre);
    tabla.appendChild(thdni);
    tabla.appendChild(thcp);
    tabla.appendChild(thpoblacion);
    tabla.appendChild(thprovincia);
    tabla.appendChild(thdomicilio);
    tabla.appendChild(thtelefono);
    tabla.appendChild(thmatricula);
    tabla.appendChild(thmarca);
    tabla.appendChild(thmodelo);
    tabla.appendChild(thchasis);
    tabla.appendChild(thkm);

    arrayFiltrado.forEach((cita) => {
      tabla.appendChild(crearFila(cita));
    });
  });
  //FUNCIONALIDAD FILTROS
  //Ordenar por fecha de entrada
  thfecha_entrada.addEventListener("click", function () {
    arrayRevisiones.sort((revision1, revision2) => {
      if (revision1.fechaEntrada < revision2.fechaEntrada) {
        return -1;
      }
      if (revision1.fechaEntrada > revision2.fechaEntrada) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });

  //Ordenar por fecha de entrada
  thfecha_salida.addEventListener("click", function () {
    arrayRevisiones.sort((revision1, revision2) => {
      if (revision1.fechaSalida < revision2.fechaSalida) {
        return -1;
      }
      if (revision1.fechaSalida > revision2.fechaSalida) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por nombre
  thnombre.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Cliente.nombre < b.Cliente.nombre) {
        return -1;
      }
      if (a.Cliente.nombre > b.Cliente.nombre) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por dni
  thdni.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Cliente.dni < b.Cliente.dni) {
        return -1;
      }
      if (a.Cliente.dni > b.Cliente.dni) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por telefono
  thtelefono.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Cliente.telefono < b.Cliente.telefono) {
        return -1;
      }
      if (a.Cliente.telefono > b.Cliente.telefono) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por cp
  thcp.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Cliente.cp < b.Cliente.cp) {
        return -1;
      }
      if (a.Cliente.cp > b.Cliente.cp) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por poblacion
  thpoblacion.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Cliente.poblacion < b.Cliente.poblacion) {
        return -1;
      }
      if (a.Cliente.poblacion > b.Cliente.poblacion) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por provincia
  thprovincia.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Cliente.provincia < b.Cliente.provincia) {
        return -1;
      }
      if (a.Cliente.provincia > b.Cliente.provincia) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por domicilio
  thdomicilio.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Cliente.domicilio < b.Cliente.domicilio) {
        return -1;
      }
      if (a.Cliente.domicilio > b.Cliente.domicilio) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por matricula
  thmatricula.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Vehiculo.matricula < b.Vehiculo.matricula) {
        return -1;
      }
      if (a.Vehiculo.matricula > b.Vehiculo.matricula) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por marca
  thmarca.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Vehiculo.marca < b.Vehiculo.marca) {
        return -1;
      }
      if (a.Vehiculo.marca > b.Vehiculo.marca) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por modelo
  thmodelo.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Vehiculo.modelo < b.Vehiculo.modelo) {
        return -1;
      }
      if (a.Vehiculo.modelo > b.Vehiculo.modelo) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por chasis
  thchasis.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Vehiculo.chasis < b.Vehiculo.chasis) {
        return -1;
      }
      if (a.Vehiculo.chasis > b.Vehiculo.chasis) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });
  //Ordenar por km
  thkm.addEventListener("click", function () {
    arrayRevisiones.sort((a, b) => {
      if (a.Vehiculo.km < b.Vehiculo.km) {
        return -1;
      }
      if (a.Vehiculo.km > b.Vehiculo.km) {
        return 1;
      }
      return 0;
    });
    btn_ConsultarCitas.click();
  });

  //Creacion de la tabla
  arrayRevisiones.forEach((cita) => {
    tabla.appendChild(crearFila(cita));
  });
  container.innerHTML = "";
  container.appendChild(buscador);
  container.appendChild(tabla);
});

// FORMULARIO DE REGISTRO DE CLIENTES

//MODIFICAR CLIENTES
function crearFilaCliente(cliente) {
  let fila = document.createElement("tr");
  fila.setAttribute("id", cliente.dni);

  let nombreFila = document.createElement("td");
  nombreFila.textContent = cliente.nombre;

  let dniFila = document.createElement("td");
  dniFila.textContent = cliente.dni;

  let telefonoFila = document.createElement("td");
  telefonoFila.textContent = cliente.telefono;

  let cpFila = document.createElement("td");
  cpFila.textContent = cliente.cp;

  let poblacionFila = document.createElement("td");
  poblacionFila.textContent = cliente.poblacion;

  let provinciaFila = document.createElement("td");
  provinciaFila.textContent = cliente.provincia;

  let domicilioFila = document.createElement("td");
  domicilioFila.textContent = cliente.domicilio;

  fila.appendChild(nombreFila);
  fila.appendChild(dniFila);
  fila.appendChild(telefonoFila);
  fila.appendChild(cpFila);
  fila.appendChild(poblacionFila);
  fila.appendChild(provinciaFila);
  fila.appendChild(domicilioFila);

  //Acciones
  let btnsCelda = document.createElement("td");
  let btnEliminarCl = document.createElement("button");
  btnEliminarCl.setAttribute("class", clase_botones);
  btnEliminarCl.textContent = "Eliminar";
  let btnModificarCl = document.createElement("button");
  btnModificarCl.setAttribute("class", clase_botones);
  btnModificarCl.textContent = "Modificar";

  btnsCelda.setAttribute("style", "display: flex; margin;");

  btnsCelda.appendChild(btnEliminarCl);
  btnsCelda.appendChild(btnModificarCl);
  fila.appendChild(btnsCelda);

  //Eventos
  btnEliminarCl.addEventListener("click", function () {
    arrayClientes.forEach((clienteA) => {
      if (clienteA.dni === cliente.dni) {
        let index = arrayClientes.indexOf(clienteA);
        arrayClientes.splice(index, 1);
        btn_GestionarClientes.click();
      }
    });
  });
  btnModificarCl.addEventListener("click", function () {
    crearModal(cliente);
  });

  //Toggle

  fila.addEventListener("click", function () {
    fila.classList.toggle("filaSeleccionada");
  });

  return fila;
};
btn_PedirCita.addEventListener("click", function () {
  crearModal("nuevo");
});

btn_GestionarClientes.addEventListener("click", function () {
  console.log(arrayClientes);
  //TABLA
  let tablaCliente = document.createElement("table");
  tablaCliente.setAttribute("id", "table-prebuilt");
  tablaCliente.innerHTML = `<th>Nombre</th>
                        <th>DNI</th>
                        <th>telefono</th>
                        <th>Codigo Postal</th>
                        <th>poblacion</th>
                        <th>provincia</th>
                        <th>domicilio</th>
                        <th>Acciones</th>`;

  arrayClientes.forEach((cliente) => {
    tablaCliente.appendChild(crearFilaCliente(cliente));
  });

  //Boton de eliminar seleccionados
  let modificarSeleccionados = document.createElement("button");
  modificarSeleccionados.setAttribute("class", clase_botones);
  modificarSeleccionados.setAttribute("id", "modSeleccionados");
  modificarSeleccionados.textContent = "Eliminar Clientes seleccionados";

  container.innerHTML = "";
  container.appendChild(tablaCliente);
  container.appendChild(modificarSeleccionados);

  modificarSeleccionados.addEventListener("click", function () {
    crearModal("¿Desea eliminar permanentemente estos clientes?");
  });
});

function crearFila(cita) {
  let cliente = cita.Cliente;
  let vehiculo = cita.Vehiculo;

  //Datos cita.revision
  let fechaEntrada = cita.fechaEntrada;
  let fechaSalida = cita.fechaSalida;
  //Datos cliente
  let nombre = cliente.nombre;
  let dni = cliente.dni;
  let cp = cliente.cp;
  let poblacion = cliente.poblacion;
  let provincia = cliente.provincia;
  let domicilio = cliente.domicilio;
  let telefono = cliente.telefono;
  //Datos vehiculo
  let matricula = vehiculo.matricula;
  let marca = vehiculo.marca;
  let modelo = vehiculo.modelo;
  let chasis = vehiculo.chasis;
  let km = vehiculo.km;

  //console.log(cita);

  let fila = document.createElement("tr");

  let celda1 = document.createElement("td");
  celda1.textContent = fechaEntrada;
  let celda2 = document.createElement("td");
  celda2.textContent = fechaSalida;
  let celda3 = document.createElement("td");
  celda3.textContent = nombre;
  let celda4 = document.createElement("td");
  celda4.textContent = dni;
  let celda5 = document.createElement("td");
  celda5.textContent = cp;
  let celda6 = document.createElement("td");
  celda6.textContent = poblacion;
  let celda7 = document.createElement("td");
  celda7.textContent = provincia;
  let celda8 = document.createElement("td");
  celda8.textContent = domicilio;
  let celda9 = document.createElement("td");
  celda9.textContent = telefono;
  let celda10 = document.createElement("td");
  celda10.textContent = matricula;
  let celda11 = document.createElement("td");
  celda11.textContent = marca;
  let celda12 = document.createElement("td");
  celda12.textContent = modelo;
  let celda13 = document.createElement("td");
  celda13.textContent = chasis;
  let celda14 = document.createElement("td");
  celda14.textContent = km;

  fila.appendChild(celda1);
  fila.appendChild(celda2);
  fila.appendChild(celda3);
  fila.appendChild(celda4);
  fila.appendChild(celda5);
  fila.appendChild(celda6);
  fila.appendChild(celda7);
  fila.appendChild(celda8);
  fila.appendChild(celda9);
  fila.appendChild(celda10);
  fila.appendChild(celda11);
  fila.appendChild(celda12);
  fila.appendChild(celda13);
  fila.appendChild(celda14);

  return fila;
}
