import express from 'express'
import { ReservaDaoMongodb } from '../repository/ReservaDaoMongodb.js'
import { Reserva } from '../models/Reserva.js'

class ReservaController {

    async listar(req: express.Request, res: express.Response) {
        const reservaDaoMongodb: ReservaDaoMongodb = new ReservaDaoMongodb();
        res.status(200).send(await reservaDaoMongodb.getAll());
    }

    async delete (req: express.Request, res: express.Response) {
        const reservaDaoMongodb : ReservaDaoMongodb = new ReservaDaoMongodb();
        if (await reservaDaoMongodb.delete(req.params.id)) {
            res.status(201).send( { mensaje : "Registro eliminado para reserva: " + req.params.id} );
        } else {
            res.status(400).send( { mensaje : "no se encuentran registros para " + req.params.id} );
        }
    }

}

export default new ReservaController();