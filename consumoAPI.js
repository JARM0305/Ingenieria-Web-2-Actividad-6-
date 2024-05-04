const contenedor = document.querySelector('tbody');
const modalUsuarios = new bootstrap.Modal(document.getElementById('modalPersonas'));
const formulario = document.querySelector('form');
let nombre = document.getElementById('nombre');
let nombreUsu = document.getElementById('nombreUsu');
let email = document.getElementById('email');
let telefono = document.getElementById('tel');
const btnCrear = document.getElementById('btnCrear');
let resultados = '';
let opcion = '';


btnCrear.addEventListener('click', () => {
    nombre.value = '';
    nombreUsu.value = '';
    email.value = '';
    telefono.value = '';    
    opcion = 'crear'; 
    modalUsuarios.show();
});

//Lista de usuarios
const mostrar = (usuarios) =>{

    usuarios.forEach(usuario => {
        resultados += '<tr>'+
                            '<td>' + usuario.id + '</td>'+
                            '<td>' + usuario.name + '</td>'+
                            '<td>' + usuario.username + '</td>'+
                            '<td>' + usuario.email + '</td>'+
                            '<td>' + usuario.phone + '</td>'+
                            '<td class="text-center"> <a class="btnEditar btn btn-primary">Editar</a> <a class="btnBorrar btn btn-danger">Eliminar</a> </td>'+
                        '</tr>';
    });


    contenedor.innerHTML = resultados;
};


fetch('http://localhost:3000/usuarios')
    .then(resp => resp.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))



const on = (element, event, selector, handler) =>{
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e);
        }
    });
};

//Método para borrar
on(document, 'click', '.btnBorrar', e =>{
    const fila = e.target.parentNode.parentNode;
    const id = fila.children[0].innerHTML;

    alertify.confirm("¿Esta seguro de eliminar el usuario " + fila.children[1].innerHTML + " ?",
    function(){

        fetch('http://localhost:3000/usuarios/eliminar/' + id, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(() => location.reload())

        alertify.success('Usuario eliminado');
    },
    function(){
        alertify.error('No se elimino el usuario');
    });
    
});


//Método para actualizar
let idForm = 0;
on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const nom = fila.children[1].innerHTML;
    const nomUsu = fila.children[2].innerHTML;
    const email2 = fila.children[3].innerHTML;
    const telefono2 = fila.children[4].innerHTML;

    nombre.value = nom;
    nombreUsu.value = nomUsu;
    email.value = email2;
    telefono.value = telefono2;
    opcion = 'editar';
    modalUsuarios.show();    
});


formulario.addEventListener('submit', (e) =>{
    

    if(opcion === 'crear'){
        e.preventDefault();

        fetch('http://localhost:3000/usuarios/crear', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nombre.value,
                username: nombreUsu.value,
                email: email.value,
                phone: telefono.value
            })
        })
        .then(res => res.json())
        .then(data => {
            const nuevoUsuario = [];
            nuevoUsuario.push(data);
            mostrar(nuevoUsuario);
        })
    }
    
    if(opcion === 'editar'){
        
        fetch('http://localhost:3000/usuarios/actualizar', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idForm,
                name: nombre.value,
                username: nombreUsu.value,
                email: email.value,
                phone: telefono.value
            })
        })
        .then(resp => resp.json())
        .then(() => location.reload())
    }

    modalUsuarios.hide();
});