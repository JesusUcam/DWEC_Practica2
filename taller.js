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

  
  let modo = "";
  //Comprobación para saber que modal necesitamos
  if (arrayClientes.includes(x)) {
    console.log("Cliente");
    modo = "cliente";
    return true;
  } else if (arrayRevisiones.includes(x)) {
    console.log("Revision");
    console.log("False"); 
  } else if (arrayVehiculos.includes(x)) {
    console.log("Vehiculo");
    modo = "vehiculo"; //No se usa todavia
  } else if (x=="nuevo") {
    console.log("Nuevo");
    modo=x; 
  } else {
    console.log("Confirmar");
    modo="confirmar";
  }

  //MEJORA: ponerlo más estético
  function crearFormulario() {
    let formulario = document.createElement("form");
  //Se me ocurre crear los componentes del formulario con createelement para que sean más manejables según el tipo de modal
    let 
    formulario.innerHTML = `
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required>
        <label for="dni">DNI</label>
        <input type="text" id="dni" name="dni" required>
        <label for="cp">Codigo Postal</label>
        <input type="text" id="cp" name="cp" required>
        <label for="poblacion">Poblacion</label>
        <input type="text" id="poblacion" name="poblacion" required>
        <label for="provincia">Provincia</label>
        <input type="text" id="provincia" name="provincia" required>
        <label for="domicilio">Domicilio</label>
        <input type="text" id="domicilio" name="domicilio" required>
        <label for="telefono">Telefono</label>
        <input type="text" id="telefono" name="telefono" required>
        <label for "matricula">Matricula</label>
        <input type="text" id="matricula" name="matricula" required>
        <label for="marca">Marca</label>
        <input type="text" id="marca" name="marca" required>
        <label for="modelo">Modelo</label>
        <input type="text" id="modelo" name="modelo" required>
        <label for="chasis">Chasis</label>
        <input type="text" id="chasis" name="chasis" required>
        <label for="km">Kilometros</label>
        <input type="text" id="km" name="km" required>
        <input type="submit" value="Enviar">
        `;

    return formulario;
  }

  //Factor común del modal
  let tituloHeader = document.createElement("h2");

  modalHeader.appendChild(close); //
  modalHeader.appendChild(tituloHeader); //

  //modalBody.appendChild(crearFormulario()); Cuando todo esté arreglado irá aquí

  modalContent.appendChild(modalHeader); //
  modalContent.appendChild(modalBody);//
  modal.appendChild(modalContent);//

  switch (modo) {
    case "nuevo":
      
      tituloHeader.textContent = "Nueva cita";

      modalBody.appendChild(crearFormulario());

      container.appendChild(modal);
      break;
    case "cliente":

      let cliente = x;
      tituloHeader.textContent = "Modificar cita";

      // Agregar los datos del cliente al formulario
      let formulario = crearFormulario();

      formulario.querySelector("#nombre").value = cliente.nombre;
      formulario.querySelector("#dni").value = cliente.dni;
      formulario.querySelector("#cp").value = cliente.codigoPostal;
      formulario.querySelector("#poblacion").value = cliente.poblacion;
      formulario.querySelector("#provincia").value = cliente.provincia;
      formulario.querySelector("#domicilio").value = cliente.domicilio;
      formulario.querySelector("#telefono").value = cliente.telefono;
      formulario.querySelector("#matricula").value = cliente.matricula;
      formulario.querySelector("#marca").value = cliente.marca;
      formulario.querySelector("#modelo").value = cliente.modelo;
      formulario.querySelector("#chasis").value = cliente.chasis;
      formulario.querySelector("#km").value = cliente.km;

      modalBody.appendChild(formulario);

      console.log(cliente);

      container.appendChild(modal);
      break;
    case "confirmar":

      tituloHeader.textContent = x;

      let si = document.createElement("button");
      let no = document.createElement("button");
      si.setAttribute("class", "button");
      no.setAttribute("class", "button");
      si.textContent = "Confirmar";
      no.textContent = "Cancelar ";

      modalBody.setAttribute("style", "display: flex; justify-content: center;");
      modalBody.appendChild(si);
      modalBody.appendChild(no);

      //EventListeners
      si.addEventListener("click", function () {
        
      clientesSeleccionados = document.getElementsByClassName("filaSeleccionada");

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
        return false;
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
  } //MEJORA: controlar que un cliente con el mismo DNI deba tener los mismos datos
}
function registrarVehiculo(vehiculo) {
  let vehiculoExiste = arrayVehiculos.find(
    (vehiculoE) => vehiculoE.matricula === vehiculo.matricula
  );
  if (!vehiculoExiste) {
    arrayVehiculos.push(vehiculo);
  } else {
    console.log(`${vehiculo.matricula}---`);
  } //MEJORA: controlar que un vehiculo con la misma matricula deba tener los mismos datos
}

let container = document.getElementById("container");
//Botones
let btn_ConsultarCitas = document.getElementById("botonCC");
let btn_PedirCita = document.getElementById("botonPC");
let btn_GestionarClientes = document.getElementById("botonGC");
let btn_Tuneo = document.getElementById("botonT");

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
  let tabla = document.createElement("table");
  tabla.setAttribute("id", "table-prebuilt");
  tabla.innerHTML = `
    
    <thead>   
    </thead><th>Fecha de Entrada</th>
                        <th>Fecha Salida (estimada)</th>
                        <th>Cliente</th>
                        <th>DNI</th>
                        <th>Codigo Postal</th>
                        <th>poblacion</th>
                        <th>provincia</th>
                        <th>domicilio</th>
                        <th>telefono</th>
                        <th>matricula</th>
                        <th>marca</th>
                        <th>modelo</th>
                        <th>chasis</th>
                        <th>KM</th>`;

  arrayRevisiones.forEach((cita) => {
    tabla.appendChild(crearFila(cita));
  });
  container.innerHTML = "";
  container.appendChild(tabla);
});

// FORMULARIO DE REGISTRO DE CLIENTES

//MODIFICAR CLIENTES
crearFilaCliente = (cliente) => {
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
  btnEliminarCl.setAttribute("class", "button");
  btnEliminarCl.textContent = "Eliminar";
  let btnModificarCl = document.createElement("button");
  btnModificarCl.setAttribute("class", "button");
  btnModificarCl.textContent = "Modificar";

  btnsCelda.setAttribute("style", "display: flex; margin;");

  btnsCelda.appendChild(btnEliminarCl);
  btnsCelda.appendChild(btnModificarCl);
  fila.appendChild(btnsCelda);

  //Eventons
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

  //Prueba toggle

  fila.addEventListener("click", function () {
    fila.classList.toggle("filaSeleccionada");
  });

  return fila;
};
btn_PedirCita.addEventListener("click", function () {
  crearModal("nuevo");
});

btn_GestionarClientes.addEventListener("click", function () {
  //EN CONSTRUCCION
  //firmado: Jesús

  /* IDEAS 
    Al eliminar un cliente se elminan sus citas
    Opción para cambiar al cliente de la cita
    Oprión para registrar un nuevo cliente de forma eficaz
    */

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
  modificarSeleccionados.setAttribute("class", "button");
  modificarSeleccionados.setAttribute("id", "modSeleccionados");
  modificarSeleccionados.textContent = "Mofificar Clientes seleccionados";

  container.innerHTML = "";
  container.appendChild(tablaCliente);
  container.appendChild(modificarSeleccionados);

  modificarSeleccionados.addEventListener("click", function () {

    crearModal("¿Desea eliminar permanentemente estos clientes?");
    
  });

});

btn_Tuneo.addEventListener("click", function () {});

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

function inicio() {
  let menuContent = document.createElement("ul");

  let opcion1 = document.createElement("li");
  opcion1.textContent = "Consultar cita";

  let opcion2 = document.createElement("li");
  opcion2.textContent = "Pedir cita";

  let opcion3 = document.createElement("li");
  opcion3.textContent = "Gestionar clientes";

  let opcion4 = document.createElement("li");
  opcion4.textContent = "Tueno pro";

  menuContent.appendChild(opcion1);
  menuContent.appendChild(opcion2);
  menuContent.appendChild(opcion3);
  menuContent.appendChild(opcion4);

  container.after(menuContent);
}

inicio();
