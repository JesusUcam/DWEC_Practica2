//Pagina https://www.aurgi.com/
//hacer header en condiciones

fetch('datos.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
