import express from 'express'
import { AmenityDaoMongodb } from '../repository/AmenityDaoMongodb.js'

class AmenityController {

    async listar(req: express.Request, res: express.Response) {
        const amenityDaoMongodb: AmenityDaoMongodb = new AmenityDaoMongodb();
        res.status(200).send(await amenityDaoMongodb.getAll());
    }

    async add (req: express.Request, res: express.Response) {
        const amenityDaoMongodb : AmenityDaoMongodb = new AmenityDaoMongodb();
        res.status(200).send( await amenityDaoMongodb.add(req.body));
    }

    async get (req: express.Request, res: express.Response) {
        const amenityDaoMongodb : AmenityDaoMongodb = new AmenityDaoMongodb();
        const rta = await amenityDaoMongodb.get(parseInt(req.params.id));
        if (rta.id != -1) {
            res.status(200).send( rta );
        } else {
            res.status(404).send( { mensaje : "no se encuentran registros para " + req.params.id} );
        }
    }

    async delete (req: express.Request, res: express.Response) {
        const amenityDaoMongodb : AmenityDaoMongodb = new AmenityDaoMongodb();
        if (await amenityDaoMongodb.delete(parseInt(req.params.id))) {
            res.status(201).send( { mensaje : "Registro eliminado para Amenity: " + req.params.id} );
        } else {
            res.status(400).send( { mensaje : "no se encuentran registros para " + req.params.id} );
        }
    }

    getAllAmenity(req:express.Request, res: express.Response) {
        const amenityDaoMongodb : AmenityDaoMongodb = new AmenityDaoMongodb(); 
        return amenityDaoMongodb.getAll()
    }
    
}

export default new AmenityController();