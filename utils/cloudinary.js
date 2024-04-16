import {v2 as cloudinary} from 'cloudinary';
import {config} from 'dotenv'; //Para las variables de entorno
config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

export const uploadImage=async (filePath)=>{ //filePath es la ruta de la carpeta en mi proyecto que se generó para albergar mis archivos temporales
    return await cloudinary.uploader.upload(filePath,{
        folder:'fazt-node-cloudinary' //Crea la carpeta en cloudinary donde subiré mis imágenes
    });//Esta función retorna un objeto con los datos de la imagen ya subida el cloudinary
}

export const deleteImage=async(public_id)=>{
    return await cloudinary.uploader.destroy(public_id);
}

