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

let container = document.getElementById("container");
//Botones
let btn_ConsultarCitas = document.getElementById("boton");
let btn_PdirCita = document.getElementById("boton");
let btn_GestionarClientes = document.getElementById("boton");
let btn_Tuneo = document.getElementById("boton");

fetch('datos.json')
    .then(res => res.json())
    .then(data => {

        btn_ConsultarCitas.addEventListener("click", function() {

            let tabla = document.createElement("table");

            data.result.forEach(cita => {
                //Datos cita.revision
                let fechaEntrada = cita.Revision.datos.Fecha_entrada;
                let fechaSalida = cita.Revision.datos.Fecha_entrega_prevista;
                //Datos cliente
                let nombre = cita.Revision.Cliente.Nombre;
                let dni = cita.Revision.Cliente.CIF_DNI;
                let cp = cita.Revision.Cliente.CP;
                let poblacion = cita.Revision.Cliente.Poblacion;
                let provincia = cita.Revision.Cliente.provincia;
                let domicilio = cita.Revision.Cliente.Domicilio;
                let telefono = cita.Revision.Cliente.Telefono;
                //Datos vehiculo
                let matricula = cita.Revision.Vehiculo.Matricula;
                let marca = cita.Revision.Vehiculo.Marca;
                let modelo = cita.Revision.Vehiculo.Modelo;
                let chasis = cita.Revision.Vehiculo.Numero_chasis;
                let km = cita.Revision.Vehiculo.KM;

                crearFila(tabla, nombre);
            });

        });


    })


function crearFila(tabla, nombreC, dni){ 
    if (nombreC == undefined) {
        console.log("No hay datos");
    }
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