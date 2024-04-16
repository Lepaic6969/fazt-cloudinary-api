//Importo el Modelo para mis controladores...
import Product from '../models/product.model.js';
import {uploadImage,deleteImage} from '../../utils/cloudinary.js'; //Función para subir las imágenes a cloudinary
import fs from 'fs'; //Para eliminar las imágenes que voy subiendo a cloudinary de la carpeta de archivos temporales.


export const getProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.json(products);
    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
}
export const getProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await Product.findById(id);
        if(!product){
            //404 -> Recurso no encontrado
            return res.status(404).json({message:'El producto no existe'})
        }
        return res.json(product);

    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
 
}
export const postProduct=async(req,res)=>{

   const {name,description,price} =req.body;
   const product=new Product(
    {
        name,
        description,
        price
    });

    if(req.files?.image){
        //Si viene archivo pues lo subimos a cloudinary y extraemos la url de la imagen en la nube
        const {public_id,secure_url}=await uploadImage(req.files.image.tempFilePath); //Le debo pasar la ruta de la carpeta temporal donde se encuentre la imagen
        product.image={
            public_id,
            secure_url
        };
            //Una vez todo listo en cloudinary, elimino la imagen de la carpeta de archivos temporales
        fs.unlink(req.files.image.tempFilePath,(err)=>{
            if(err){
                console.error('Error al eliminar el archivo temporal');
                return;
            }
            console.log('Archivo temporal eliminado correctamente');
        });
    }



    try{
        const newProduct=await product.save();
        //201 -> Created
        res.status(201).json(newProduct);
    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
}

export const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await Product.findByIdAndDelete(id);
        
        if(!product){
            //404 -> Recurso no encontrado
            return res.status(404).json({message:'El producto no existe'});
        }
        //Si existe un public_id elimíneme de cloudinary su imagen correspondiente
        if(product.image.public_id){
            await deleteImage(product.image.public_id); //Aquí es donde elimino la imagen que está en la nube
        }
        return res.json(product);

    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
 
}

export const putProduct=async(req,res)=>{
    const {id}=req?.params;
    try{
        let uploadedImage=null; //Por defecto sin imagen, a menos de que si la envíen
        if(req.files?.image){
            //Si viene archivo pues lo subimos a cloudinary y extraemos la url de la imagen en la nube
            const {public_id,secure_url}=await uploadImage(req.files.image.tempFilePath); //Le debo pasar la ruta de la carpeta temporal donde se encuentre la imagen
            uploadedImage={
                public_id,
                secure_url
            };
            req.body.image=uploadedImage;
            //Procedo a eliminar si es que existe la imagen vieja que se encuentra en la nube...
            const product=await Product.findById(id);
            if(product.image.public_id){
                await deleteImage(product.image.public_id);
            }
         
        }

        const productUpdated=await Product.findByIdAndUpdate(id,req.body,{
             new:true
        });

        res.json(productUpdated);

    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }
}

