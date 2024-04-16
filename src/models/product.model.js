import mongoose from 'mongoose';

const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        description:{
            type:String,
            trim:true
        },
        price:{
            type:Number,
            default:0
        },
        image:{
            public_id:String, //Este se guarda para poder eliminar la imagen cuendo sea necesario
            secure_url:String,
        }
    },{
        timestamps:true //Esto es para que se guarde en base de datos la fecha de creación y actualización
    }
);

export default mongoose.model('Product',productSchema);