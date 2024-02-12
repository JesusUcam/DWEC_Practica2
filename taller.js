//Pagina https://www.aurgi.com/
//hacer header en condiciones

/* 
 Crear un JSON con los datos de un taller. En éste json tendremos todos los datos de clientes con sus vehículos y en cada vehículo tendremos que tener una lista con todas sus revisiones.

Inicialmente se deberá cargar la información del json creado haciendo una llamada AJAX al servidor.

Crear una aplicación que me permita:

- Consultar todas las revisiones de los clientes (filtrando por clientes o por fechas)

- Añadir nuevas revisiones (usar formulario con validación de campos).

- Eliminar clientes.

- Mostrar una página inicial donde se muestren todos los servicios que ofrece el taller (ser creativos)



** IMPORTANTE: Organización y limpieza del código. El json debe llevar datos ficticios y tener bastante información de los clientes, coches, revisiones, ...
*/

let boton = document.getElementById("boton");

fetch('datos.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        //cliente
        boton.addEventListener("click", function name() {
            console.log("hola");

            data.result.forEach(Vehiculo => {
                console.log(Vehiculo);
            });

        });


    })
