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

//METODOS AÑADIR AL ARRAY
function registrarCliente(cliente) {
    let clienteExiste = arrayClientes.find(clienteE => clienteE.dni === cliente.dni);
    if (!clienteExiste) {
        arrayClientes.push(cliente);
    } //MEJORA: controlar que un cliente con el mismo DNI deba tener los mismos datos
}
function registrarVehiculo(vehiculo) {
    let vehiculoExiste = arrayVehiculos.find(vehiculoE => vehiculoE.matricula === vehiculo.matricula);
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

fetch('datos.json')
    .then(res => res.json())
    .then(data => {

        data.result.forEach(cita => {
            //Datos cliente
            let nombre = cita.Revision.Cliente.Nombre;
            let dni = cita.Revision.Cliente.CIF_DNI;
            let cp = cita.Revision.Cliente.CP;
            let poblacion = cita.Revision.Cliente.Poblacion;
            let provincia = cita.Revision.Cliente.Provincia;
            let domicilio = cita.Revision.Cliente.Domicilio;
            let telefono = cita.Revision.Cliente.Telefono;

            let cliente = new Cliente(nombre, dni, cp, poblacion, provincia, domicilio, telefono);
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

    })

btn_ConsultarCitas.addEventListener("click", function() {

    let tabla = document.createElement("table");
    tabla.setAttribute("id", "table-prebuilt");
    tabla.innerHTML = `<th>Fecha de Entrada</th>
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

    arrayRevisiones.forEach(cita => {
        tabla.appendChild(crearFila(cita));
    });
    container.innerHTML = "";
    container.appendChild(tabla);
});

btn_PedirCita.addEventListener("click", function() {
    console.log("Pedir cita");
    let formulario = document.createElement("form");
    let input1 = document.createElement("input");

    console.log(arrayRevisiones);
    arrayRevisiones.forEach(revision => {
        //console.log(revision);
    });

});

btn_GestionarClientes.addEventListener("click", function() {

    //EN CONSTRUCCION 
    //firmado: Jesús 
    
    /* IDEAS 
    Al eliminar un cliente se elminan sus citas
    Opción para cambiar al cliente de la cita
    Oprión para registrar un nuevo cliente de forma eficaz
    */
    let gestionarC_Eliminar = document.createElement("button");
    gestionarC_Eliminar.setAttribute("class", "button");
    gestionarC_Eliminar.textContent = "Eliminar cliente";

    let gestionarC_Cambiar = document.createElement("button");
    gestionarC_Cambiar.setAttribute("class", "button");
    gestionarC_Cambiar.textContent = "Cambiar cliente citado";

    let gestionarC_Registrar = document.createElement("button");
    gestionarC_Registrar.setAttribute("class", "button");
    gestionarC_Registrar.textContent = "Registrar nuevo cliente";

    container.innerHTML = "";
    container.appendChild(gestionarC_Eliminar);
    container.appendChild(gestionarC_Cambiar);
    container.appendChild(gestionarC_Registrar);

    gestionarC_Eliminar.addEventListener("click", function() {
        console.log("Eliminar cliente");
    });

    console.log(arrayClientes);
    console.log(arrayVehiculos);
    
    arrayRevisiones.forEach(revision => {
        //console.log(revision.Cliente);
    });

});

btn_Tuneo.addEventListener("click", function() {
    


});

function crearFila(cita){ 

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