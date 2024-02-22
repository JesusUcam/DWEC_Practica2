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

  //FORMULARIO
  let formulario = document.createElement("form");
  formulario.setAttribute("style", "display: flex; flex-direction: column; justify-content: center;");
  
  
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
  fEnviar.setAttribute("class", "button");
  
  //Factor común del modal
  let tituloHeader = document.createElement("h2");
  
  modalHeader.appendChild(close); //
  modalHeader.appendChild(tituloHeader); //
  
  modalBody.appendChild(formulario); //
  
  modalContent.appendChild(modalHeader); //
  modalContent.appendChild(modalBody);//
  modal.appendChild(modalContent);//
  
  
  
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
  } else if (x=="nuevo") {
    console.log("Pedir cita");
    modo=x; 
  } else {
    console.log("Confirmar");
    modo="confirmar";
  }

  switch (modo) {
    //Pedir cita
    case "nuevo":
      
      tituloHeader.textContent = "Nueva cita";

      //MEJORA: Los campos de cliente se pueden simplificar con un select
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
      fEnviar.textContent = "Pedir Cita";

      container.appendChild(modal);

      break;
    //Modificar cliente
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
      
      //Boton de enviar
      fEnviar.textContent = "Guardar Modificaciones";

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


  /* IDEAS
      - Boton que permita ocultar campos
      - Filtrar por campos (bucador)
  */

  //Buscador de revisiones

  container.innerHTML = "";
  
  let buscadorConsultas = document.createElement("input");
  buscadorConsultas.setAttribute("type", "text");

  let btnBuscar = document.createElement("button");
  btnBuscar.setAttribute("type", "button");
  btnBuscar.textContent = "Buscar";

  let campoSeleccionado = document.createElement("select");
  campoSeleccionado.setAttribute("id", "campoSeleccionado");
  let opciones = ["Nombre", "DNI", "Matricula", "Marca", "Modelo", "Chasis"]; //Faltan
  opciones.forEach((opcion) => {
    let option = document.createElement("option");
    option.textContent = opcion;
    campoSeleccionado.appendChild(option);
  });

  container.appendChild(buscadorConsultas);
  container.appendChild(btnBuscar);
  container.appendChild(campoSeleccionado);


  //Tabla de revisiones
  let tabla = document.createElement("table");
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
  
  tabla.appendChild(thfecha_entrada);
  thfecha_entrada.textContent = "Fecha de entrada";

  tabla.appendChild(thfecha_salida);
  thfecha_salida.textContent = "Fecha de salida";

  tabla.appendChild(thnombre);
  thnombre.textContent = "Nombre";

  tabla.appendChild(thdni);
  thdni.textContent = "DNI";

  tabla.appendChild(thcp);
  thcp.textContent = "Codigo Postal";

  tabla.appendChild(thpoblacion);
  thpoblacion.textContent = "Poblacion";

  tabla.appendChild(thprovincia);
  thprovincia.textContent = "Provincia";

  tabla.appendChild(thdomicilio);
  thdomicilio.textContent = "Domicilio";

  tabla.appendChild(thtelefono);
  thtelefono.textContent = "Telefono";

  tabla.appendChild(thmatricula);
  thmatricula.textContent = "Matricula";

  tabla.appendChild(thmarca);
  thmarca.textContent = "Marca";

  tabla.appendChild(thmodelo);
  thmodelo.textContent = "Modelo";

  tabla.appendChild(thchasis);
  thchasis.textContent = "Chasis";

  tabla.appendChild(thkm);
  thkm.textContent = "Kilometros";

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
