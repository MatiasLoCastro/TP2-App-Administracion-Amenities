import express from 'express'
import { ReservaDaoMongodb } from '../repository/ReservaDaoMongodb.js'
import { Reserva } from '../models/Reserva.js'
import AmenityController from './AmenityController.js';
import { Email } from '../shared/Email.js';

class ReservaController {

    async listar(req: express.Request, res: express.Response) {
        const reservaDaoMongodb: ReservaDaoMongodb = new ReservaDaoMongodb();
        res.status(200).send(await reservaDaoMongodb.getAll());
    }

    async delete (req: express.Request, res: express.Response) {
        const reservaDaoMongodb : ReservaDaoMongodb = new ReservaDaoMongodb();
        if (await reservaDaoMongodb.delete(parseInt(req.params.id))) {
            res.status(201).send( { mensaje : "Registro eliminado para reserva id: " + req.params.id} );
        } else {
            res.status(400).send( { mensaje : "no se encuentran registros para id: " + req.params.id} );
        }
    }

    async add (req: express.Request, res: express.Response) {
        const reservaDaoMongodb : ReservaDaoMongodb = new ReservaDaoMongodb();
/*         AmenityController.add(req.body.amenity, res) */
        res.status(200).send( await reservaDaoMongodb.add(req.body));

    }

    async get (req: express.Request, res: express.Response) {
        const reservaDaoMongodb : ReservaDaoMongodb = new ReservaDaoMongodb();
        const rta = await reservaDaoMongodb.get(parseInt(req.params.id));
        if (rta.id != -1) {
            res.status(200).send( rta );
        } else {
            res.status(404).send( { mensaje : "no se encuentran registros para Reserva:" + req.params.id} );
        }
    }

    getAllReservas(req:express.Request, res: express.Response) {
        const reservaDaoMongodb : ReservaDaoMongodb = new ReservaDaoMongodb(); 
        return reservaDaoMongodb.getAll()
    }

    async getAmenitiesLibres(req: express.Request, res: express.Response) {
        const reservaDaoMongodb : ReservaDaoMongodb = new ReservaDaoMongodb();
        const rta = await reservaDaoMongodb.get(parseInt(req.params.id));
        if (rta.id != -1) {
            
            const amenities = await AmenityController.getAllAmenity(req, res).then();
            console.log(amenities);
            
            let listaFormateada = new Array<JSON>();

            amenities.forEach(a => {
                if (rta.amenity.id == a.id && a.estaReservado == false) {
                    listaFormateada.push(
                        JSON.parse(`Fecha ${rta.fecha} - Amenity ID: ${a.id} - Tipo: ${a.tipo} Estado: LIBRE`)
                        )
                    
                }
            });
            console.log(listaFormateada);
            
            res.status(200).send(listaFormateada)
            const email : Email = new Email();
             email.enviar("kuitcadylan@gmail.com","Amenities Libres", JSON.stringify(listaFormateada), "") 
        } else {
             res.status(404).send( {mensaje: "No se encontro reserva con esa clave" }) 
        }

    }

  




}

export default new ReservaController();