const contenido = document.getElementById("wrapper");
function mostrarFormularioRegistro() {
    contenido.innerHTML = `
        <form id="registrationForm">
            <h2>Registrarse</h2>
            <div class="input-box">
                <input type="text" id="nombre" required>
                <label>Nombre</label>
            </div>
            <div class="input-box">
                <input type="text" id="apellido"required>
                <label>Apellido</label>
            </div>
            <div class="input-box">
                <input type="text" id="username"required>
                <label>Username</label>
            </div>
            <div class="input-box">
                <input type="date" id="fechaNacimiento" required>
                <label>Fecha de nacimiento</label>
            </div>
            <div class="input-box">
                <input type="email" id="email" required>
                <label>Email</label>
            </div>
            <div class="input-box">
                <input type="password" id="password" required>
                <label>Password</label>
            </div>
            <div class="input-box">
                <input type="checkbox" required>
                <label>Acepto Terminos y Condiciones</label>
            </div>
            <button type="submit" class="btn" onclick="registro()">Crear cuenta</button>
            <button type="button" id="volverLoginButton">Volver al inicio de sesión</button>
        </form>
    `;

    const volverLoginButton = document.getElementById("volverLoginButton");
    volverLoginButton.addEventListener("click", () => {
        mostrarFormularioInicioSesion();
    });
}

function mostrarFormularioInicioSesion() {
    contenido.innerHTML = `
         <form id="loginForm">
            <h2>Login</h2>
            <div class="input-box">
                    <input type="email" id="emailLogin">
                    <label>Email</label>
            </div>
            <div class="input-box">
                <input type="password" id="passwordLogin">
                <label>Password</label>
            </div>
            <div class="forget">
                <label for=""><input type="checkbox">Recuerdame</label>
                <a href="#">Olvide mi Contraseña</a>
            </div>
                <button type="submit" class="btn" onclick="login()">Ingresar</button>
            <div class="login-register">
                <p>No tienes una cuenta? <button id="registroButton" onclick="mostrarFormularioRegistro()">Registrarse</button></p>
            </div>
         </form>
    `;
    const registroButton = document.getElementById("registroButton");
    registroButton.addEventListener("click", () => {
        mostrarFormularioRegistro();
    });
}
class Usuario{
    constructor(nombre, apellido, username, password, email, fechaNacimiento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.password = password;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
    }
}
class Administrador extends Usuario{
    constructor(nombre, apellido, username, password, email, fechaNacimiento){
        super(nombre, apellido, username, password, email, fechaNacimiento);
    }
    static crearAdministrador(){
            alert("Ingrese los datos del usuario que desea volver administrador");
            const nombre = prompt("Nombre:");
            const apellido = prompt("Apellido:");
            const username = prompt("Username");
            const password = prompt("Contraseña:");
            const email = prompt("Email");
            const fechaNacimiento = prompt("Fecha de Nacimiento");
            const nuevoAdministrador = new Administrador(nombre, apellido, username, password, email, fechaNacimiento);
            administradores.push(nuevoAdministrador);
            usuarios.push(nuevoAdministrador);
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
        password: passwordLogin
    };
    let loginAccess = false;
    for(let usuario of usuarios){
        if((usuario.email == userDataLogin.email) && (usuario.password == userDataLogin.password)){
            loginAccess = true;
            alert(`   Bienvenido ${usuario.username}. 
            Toma asiento y disfruta tu estadia.`)
            for(let administrador of administradores){
                if(administrador.email == userDataLogin.email){
                    alert("Usted posee acceso admnistrador");
                    let respuesta = prompt("Desea crear un nuevo administrador?");
                    if(respuesta == "si"){
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

    const userData = new Usuario(nombre, apellido, username, fechaNacimiento, email, password);
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
        alert(`    ¡Bienvenido ${userData.username}!
            Su usuario fue creado exitosamente`);
    }    
}