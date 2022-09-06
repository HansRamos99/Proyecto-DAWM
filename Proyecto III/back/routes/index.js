var express = require('express');
var router = express.Router();
var casas_datos= require('../models/casas_datos.json')
var path = require('path');


const {Sequelize, Op} = require('sequelize');
const Casas= require('../models').casas;  

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @swagger
 * /casas:
 *    get:
 *      description: Para retornar todas las casas en la base relacional
 *    responses:
 *      '201':
 *        description: Successfully created user
 *      '400':
 *        description: error 
 */
router.get('/casas', function(req, res, next) {
  Casas.findAll({  
    attributes: { exclude: ["updatedAt", "createdAt"] }  
})  
.then(casas=> {  
    res.json(casas)
})  
.catch(error => res.status(400).send(error)) 
});

/**
 * @swagger
 * /casas/{tipo}:
 *    get:
 *      description: Retorna todas las casas que hagan match con el argumento tipo (de casa)
 * 
 *    parameters:
 *      - in: path 
 *        name: tipo
 *        schema:
 *        type: string
 *        description: Escriba el tipo de vivienda que busca
 *    responses:
 *      '201':
 *        description: Successfully created user
 *      '400':
 *        description: error 
 */

router.get('/casas/:tipo', function(req, res, next) {
  let tipo=req.params.tipo
  Casas.findAll({  
    attributes: { exclude: ["updatedAt", "createdAt"]},
    where:{
      [Op.and]:[
        {tipo:tipo}
      ]
    }
})  
.then(casas=> {  
    res.json(casas)
})  
.catch(error => res.status(400).send(error)) 
});

/**
 * @swagger
 * /casas/reporte/{id}:
 *    get:
 *      description: Consulta a la base de datos no relacional, devulve un historial de las veces que se ha alquilado una casa.
 * 
 *    parameters:
 *      - in: path 
 *        name: id
 *        schema:
 *        type: string
 *        description: Escriba el id de la casa de la cual se quiere generar el reporte
 *    responses:
 *      '304':
 *        description: Successfully created user
 *      '400':
 *        description: error 
 */
router.get('/casa/reporte/:id', function(req, res, next) {
  let id=req.params.id
  let resultado=Object.filter(casas_datos, (casa)=>{
    return casa.id==id
  })
  res.send(resultado)
});

Object.filter = function(mainObject, filterFunction){
  return Object.keys(mainObject)
        .filter( function(ObjectKey){
            return filterFunction(mainObject[ObjectKey])
        } )
        .reduce( function (result, ObjectKey){
            result[ObjectKey] = mainObject[ObjectKey];
            return result;
          }, {} );
}



module.exports = router;
