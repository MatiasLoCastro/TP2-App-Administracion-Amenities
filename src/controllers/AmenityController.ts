import express from 'express'
import { AmenityDaoMongodb } from '../repository/AmenityDaoMongodb.js'

class AmenityController {

    async listar(req: express.Request, res: express.Response) {
        const amenityDaoMongodb: AmenityDaoMongodb = new AmenityDaoMongodb();
        res.status(200).send(await amenityDaoMongodb.getAll());
    }

    

}

export default new AmenityController();