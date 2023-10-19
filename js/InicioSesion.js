class Usuario{
    constructor(nombre, apellido, username, contraseña, email, fechaNacimiento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.contraseña = contraseña;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
    }
}
class Administrador extends Usuario{
    constructor(nombre, apellido, username, contraseña, email, fechaNacimiento){
        super(nombre, apellido, username, contraseña, email, fechaNacimiento);
    }
    static crearAdministrador(){
            alert("Ingrese los datos del usuario que desea volver administrador");
            const nombre = prompt("Nombre:");
            const apellido = prompt("Apellido:");
            const username = prompt("Username");
            const contraseña = prompt("Contraseña:");
            const email = prompt("Email");
            const fechaNacimiento = prompt("Fecha de Nacimiento");
            const nuevoAdministrador = new Administrador(nombre, apellido, username, contraseña, email, fechaNacimiento);
            administradores.push(nuevoAdministrador);
    }
}
let administradores = [];
let usuarios = [];
const administradorOriginal = new Administrador("Matias", "Frassia", "Nybras", "12345", "mfrassia27@gmail.com", "27/06/2000"); 
administradores.push(administradorOriginal);
usuarios.push(administradorOriginal);

  
//LOGIN
function login() {
    const emailLogin = document.getElementById("emailLogin").value;
    const passwordLogin = document.getElementById("passwordLogin").value;

    const userDataLogin = {
        email: emailLogin,
        contraseña: passwordLogin
    };
    
    let loginAccess = false;
    for(let usuario of usuarios){
        if((usuario.email == userDataLogin.email) && (usuario.contraseña == userDataLogin.contraseña)){
            loginAccess = true;
            alert(`   Bienvenido ${usuario.username}. 
            Toma asiento y disfruta tu estadia.`)
            for(let administrador of administradores){
                if(administrador.email == userDataLogin.email){
                    alert("Usted posee acceso admnistrador");
                    let respuesta = prompt("Desea crear un nuevo administrador?");
                    if(respuesta == "Si"){
                        Administrador.crearAdministrador();
                    }
                }
            }
            break;
        }
    }
    if(loginAccess == false){
        alert(`Usuario y/o contraseña incorrecta`)
    }
}
//REGISTRO
function registro() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const username = document.getElementById("username").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        nombre: nombre,
        apellido: apellido,
        username: username,
        fechaNacimiento: fechaNacimiento,
        email: email,
        password: password
    }
    let usernameNoExistente = true;
    let emailNoExistente = true;
    for(let usuario of usuarios){
        if(usuario.username == userData.username){
            usernameNoExistente = false;
            alert(`El nombre de usuario ${userData.username} ya esta tomado`);
            break;
        }
        if(usuario.email == userData.email){
            emailNoExistente = false;
            alert(`El email ${userData.email} ya esta en uso`);
            break;
        }
    }
    if(usernameNoExistente && emailNoExistente ){
        usuarios.push(userData);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert(`    ¡Bienvenido ${userData.username}!
            Su usuario fue creado exitosamente`);
        return usuarios;
    }    
}

window.onload = function () {
    const usuariosStorage = localStorage.getItem('usuarios');
    if (usuariosStorage) {
        usuarios = JSON.parse(usuariosStorage);
    }
};



