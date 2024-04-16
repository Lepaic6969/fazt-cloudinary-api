import express from 'express';
import morgan from 'morgan'; //Para ver por consola las peticiones http que recibo
import cors from 'cors'; //Para que mi app se pueda comunicar con otros servidores
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {config} from 'dotenv'; //Para las variables de entorno
config();

import {connectToDB} from '../utils/mongoose.js'; //Esta es la función que me permite conectarme con Mongo Atlas...
//Importo las rutas...
import productRoutes from '../src/routes/products.routes.js' //Le pongo el nombre que quiera porque es una exportación por defecto


const app=express();

//Agrego los middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({ //Para recibir archivos
    useTempFiles : true,
    tempFileDir : './uploads'
}));
//Agrego las rutas a mi aplicación
app.use('/products',productRoutes);

//Nos conectamos con la base de datos
connectToDB();

app.get('/',(req,res)=>{
    res.json({message:'Te encuentras en el home de la api'});
});


app.listen(process.env.PORT,()=>{
    console.log("El servidor está escuchando en el puerto 3000");
});