import {Router} from 'express';
//Importo los controladores de la aplicación
import { getProducts,postProduct,putProduct,deleteProduct, getProduct } from '../controllers/products.controller.js';
const router=Router();

router.get('/',getProducts);
router.get('/:id',getProduct);
router.post('/',postProduct);
router.delete('/:id',deleteProduct);
router.put('/:id',putProduct);


 export default router;