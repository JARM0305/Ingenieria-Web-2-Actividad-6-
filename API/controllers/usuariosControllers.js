let usuariosData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "phone": "1-770-736-8031 x56442"
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "phone": "010-692-6593 x09125"
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "phone": "1-463-123-4447"
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "phone": "493-170-9623 x156"
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca",
        "phone": "(254)954-1289"
    },
    {
        "id": 6,
        "name": "Mrs. Dennis Schulist",
        "username": "Leopoldo_Corkery",
        "email": "Karley_Dach@jasper.info",
        "phone": "1-477-935-8478 x6430"
    },
    {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz",
        "phone": "210.067.6132"
    },
    {
        "id": 8,
        "name": "Nicholas Runolfsdottir V",
        "username": "Maxime_Nienow",
        "email": "Sherwood@rosamond.me",
        "phone": "586.493.6943 x140"
    },
    {
        "id": 9,
        "name": "Glenna Reichert",
        "username": "Delphine",
        "email": "Chaim_McDermott@dana.io",
        "phone": "(775)976-6794 x41206"
    },
    {
        "id": 10,
        "name": "Clementina DuBuque",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz",
        "phone": "024-648-3804"
    }
];

const getUsuarios = (req, res) => {
    res.status(200).json(usuariosData);
};


const getUsuariosById = (req, res) => {
    const idUsuario = parseInt(req.params.id);
    let result = -1;

    usuariosData.map((usu, index) => {

        if(usu.id === idUsuario){
            result = index;
        }

    });


    if(result !== -1){
        res.send(usuariosData[result]);
    }
    else{
        res.send("No se encontro el usuario con id: " + idUsuario);
    }
};


const crearUsuario = (req, res) => {
    let { id, name, username, email, phone } = req.body;

    id = usuariosData.length + 1;

    usuariosData.push({ id, name, username, email, phone });
    res.send('Usuario ' + username + ' creado correctamente');
};


const eliminarUsuario = (req, res) => {
    const idUsuario = parseInt(req.params.id);
    let result = -1;
    
    usuariosData.map((usu, index) => {

        if(usu.id === idUsuario){
            result = index;
        }

    });


    if(result !== -1){
        usuariosData = usuariosData.filter(usuario => usuario.id !== idUsuario);
        res.send('El usuario con id ' + idUsuario + ' ha sido eliminado');
    }
    else{
        res.send('No se encontro el usuario con id: ' + idUsuario + ', por lo tano, no puede ser eliminado');
    }
};

const actualizarUsuario = (req, res) =>{
    const { id, name, username, email, phone } = req.body;
    let result = -1;
    
    usuariosData.map((usu, index) => {

        if(usu.id === id){
            result = index;
        }

    });

    
    if(result !== -1){
        usuariosData[result].name = name;
        usuariosData[result].username = username;
        usuariosData[result].email = email;
        usuariosData[result].phone = phone;

        usuariosData = usuariosData.slice();
        
        res.send('El usuario con id ' + id + ' ha sido actualizado');
    }
    else{
        res.send('No se encontro el usuario con id: ' + id + ', por lo tano, no puede ser eliminado');
    }
};

module.exports = {
    getUsuarios,
    getUsuariosById,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario
};