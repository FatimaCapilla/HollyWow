// En tests/PosterController.test.js
//import require  from 'express';
import request from 'supertest'; 
import {server, app} from '../app.js'; // Asegúrate de importar tu aplicación Express
import connection_db from '../database/connection_db.js';
import { Poster } from '../models/PosterModel.js';
//import supertest from 'supertest';

const api = request(app); // método de supertest para hacer peticiones sobre nuestra aplicación


describe('Testing CRUD posters', ()=> {
 
  
  test('Response body must be an array and the show 200 status', async() => {
    const response = await api.get('/api');
    expect(Array.isArray(response.body)).toBe(true); //que objeto quiero recibir, modificar
    expect(response.status).toBe(200);
  });
  
  test('should create a new poster', async () =>{
    const response = await api.post('/api').send({
      "name": "test",
      "director": "test",
      "year": 1998,
      "imageUrl": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DA6276A38DC2CA69688E1BB1C3766DAE7C56825BF481D34B6B413446AEB8F6CD/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp"
    });
    expect(typeof response.body).toBe('object');
    expect(response.status).toBe(201);
    
  });
  afterAll(async () => {
    await Poster.destroy({ where : { name: 'test'}});  // Esto borrará todas las tablas
        // await Poster.truncate(); // esto si funciona
        await Poster.destroy({ where : { name: 'update test'}});
        await connection_db.close();
        server.close();
    console.log('Every table is deleted');
  });

  test('should delete poster', async() =>{
    const response = await api.delete("/api/:id");
    expect(response.status).toBe(400);
  });
  

  // update
  test('Should update poster', async()=>{
      
    const newPoster = await Poster.create({
      name: 'test',
      director: "test",
      year: 1989,
      imageUrl:"www.google.es"
    }
);
    const response = await api.put(`/api/${newPoster.id}`).send({
      name: 'update test',
      director: "update test",
      year: 1990,
      imageUrl:"www.google.es"
    }
        
      )
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
  })


});


