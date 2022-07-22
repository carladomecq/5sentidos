const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 8080;
const hbs = require('hbs');
const mysql = require('mysql2');
const path = require('path');
const nodemailer = require('nodemailer');



//Conectamos la app a una Base de Datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
});


//Conectamos la DB

 const conectar = (
    conexion.connect((error) =>{
        if(error) throw error;
        console.log('Base de Datos Conectada!!');
    })
); 
//configuracion de middlewares

app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:false}));

//Configuramos la Vista de la Aplicación
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
/* app.get('/', (req, res) =>{
    res.send('Nos estamos conectando a una Base de Datos')
}); */
app.get('/', (req, res) =>{
    res.render('index', {titulo: 'NUESTRO ESPACIO'})
});

app.get('/staff', (req, res) =>{
    res.render('staff', {titulo: 'NUESTRO STAFF'})
});




app.get('/contacto', (req, res) =>{
    res.render('contacto', {titulo: 'COMPLETE EL FORMULARIO DE CONTACTO'})
});
//verbo http para recibir datos
app.post('/contacto', (req, res) =>{
    //console.log(req.body);
    //Desestructuración
    const { nombre, apellido, telefono, email, diagnostico, consulta } = req.body;
    //validacion básica
        if ( consulta == "" || email== "" ){
        let validacion = ' Faltan datos para ingresar la consulta'
        res.render('contacto', {
            titulo: 'COMPLETE EL FORMULARIO NUEVAMENTE',
            validacion
        })
    }else{
    

/* para verificar que este funcionando...
    console.log(nombre);
    console.log(apellido);
    console.log(telefono);
    console.log(email);
    console.log(diagnostico);
    console.log(consulta);
*/
    //conectar();

    
    let data = {
        nombre_paciente: nombre,
        apellido_paciente: apellido,
        telefono_paciente: telefono,
        email_paciente: email,
        diagnostico_paciente: diagnostico,
        consulta_paciente: consulta,
    }
    let sql = "INSERT INTO consulta_paciente SET ?";

    let query = conexion.query(sql, data, (err, result)=>{
        if(err) throw err;       
         res.render('contacto', {titulo: 'COMPLETO EL FORMULARIO CON EXITO'})
    });
    }
});

app.post('/login', (req, res) =>{
    console.log(req.body);
    const { usuario, password } = req.body;
    console.log(usuario);
    console.log(password);
    res.send('Tus datos son correctos')
})
app.get('/login', (req, res) =>{
    res.render('login', {titulo: 'Ingresa tus datos para el Login'})
})
app.get('/pagelogin', (req, res) =>{
    res.render('pagelogin', {titulo: 'Escríbenos'})
});

app.get('/contacto_intro', (req, res) =>{

    let sql = "SELECT * FROM consulta_paciente";
    let query = conexion.query(sql,(err, results)=>{
        console.log(results);
         if(err) throw err;       
         res.render('contacto_intro', {
            titulo: 'Lista de consultas', results
        })
    });
});


app.listen(Port, ()=>{
    console.log(`Servidor corriendo en el Puerto ${Port}`);
});

app.on('error', (error) =>{
    console.log(`Tenemos un error ${error}`);
});

