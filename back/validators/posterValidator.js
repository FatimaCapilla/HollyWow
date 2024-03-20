import {body, check } from "express-validator"
import {validateResult} from "../helpers/validatorHelper.js"
import PosterModel from "../models/PosterModel.js"

export const validateCreatePoster = [
    body('name')
        //.exists() para decir que tiene que existir este campo
        .notEmpty() //para que haya caracteres dentro
        .withMessage('El nombre es requerido'),  //esto es para que te aparezca este mensaje
    body('director')
        .notEmpty()
        .withMessage('Director no debe estar vacío'),
    body('year')
        .isInt() //para que haya números dentro
        .withMessage('Year debe tener números enteros'),
    body('imageUrl')
        .notEmpty()
        .withMessage('La imagen es obligatoria'),
    (req, res, next)=>{
        validateResult(req, res, next)
    }  
    
]; 

export const validateDeletePoster=[
    check("id")
        .exists().notEmpty().withMessage('ID is required')
        .custom(async (id) => {
            const poster = await PosterModel.findByPk(id);
            if (!poster) {
                throw new Error('The poster you want to delete does not exist.');
            }
        }),
     validateResult
]

export const  validatePutPosters= [
    check('name')
         //.exists() para decir que tiene que existir este campo
        .notEmpty() //para que haya caracteres dentro
        .withMessage('El nombre es requerido'),  //esto es para que te aparezca este mensaje
    check('director')
        .notEmpty()
        .withMessage('Director no debe estar vacío'),
    check('year')
        .isInt() //para que haya números dentro
        .withMessage('Year debe tener números enteros'),
    check('imageUrl')
        .notEmpty()
        .withMessage('La imagen es obligatoria'),
    check("id").exists().notEmpty().custom(
        async (id)=>{
            const poster = await PosterModel.findByPk(id);
            if(!poster){
                throw new Error('The poster was not found')
            }
        }
    ),
    validateResult
]