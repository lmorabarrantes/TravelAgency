import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

//conectar a base de datos
db.authenticate()
        .then(()=>console.log("base de datos conectada"))
        .catch(error => console.log(error))

const app = express();
//definr puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set("view engine", "pug");

//obtener el año actuak
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia De Viajes";
    next();
});

//agregar bodyparser para leer datos del form
app.use(express.urlencoded({extended:true}));

//definir la carpeta public
app.use(express.static("public"));
//agregar router
app.use("/", router)



app.listen(port, ()=>{
    console.log(`el server esta funcionando ${port}`);
})