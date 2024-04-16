## Trabajando con clodinary.

### Habilitando a mi servidor para que pueda recibir archivos

Usaremos cloudinary pero debemos tenes presente que existen en el mercado otros servidores
para alojar archivo con "amazon s3", "Google cloud storage".
Primero me aseguro que la aplicación pueda recibir las imágenes que le enviaré a través de un form data desde postman. Para ello instalo en mi proyecto el paquete **express-fileupload**
Ahora le digo a la api que use este middleware
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'  //Carpeta que se crea para alojar el archivo temporal (La imagen que me llega)
}));

Una vez la app ya esté usando el middleware en los controladores de mi app además del req.body que sigue funcionando exactamente igual, ahora tenemos acceso al req.files que es donde me llegan las imágenes.
Desde Postman podemos seguir haciendo las mismas pruebas y si queremos ahora enviar los archivos los enviamos ahora pero a través de un form data.

### Datos para conexión de cloudinary
En cloudinary en la opción "Programmable media" aparecen datos que nos sirven para la conexión como:
Cloud name, API key, API secret. También aparece el Api de conexión para que la configuremos como variable de entorno de nuestro servidor "API environment variable".

### Trabajando con claudinary
Lo primero que debo hacer es instalar el paquete de cloudinary
npm i cloudinary
Una vez descargado yo debo configurarlo, para esto en este proyecto hay un archivo de nombre **'cloudinary.js'**
que se encuentra en la carpeta utils, que se encarga de las configuraciones de este paquete para que se conecte al servidor de cloudinary. Además de las configuraciones tiene los métodos necesarios para subir y eliminar imagenes de la nube.
Este archivo para realizar esta conexión utiliza las variables de cloudinary que yo debo definir previamente como variables de entorno llamadas: **cloud_name, api_key, api_secret**



