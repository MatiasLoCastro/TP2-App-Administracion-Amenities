import { Amenity } from '../models/Amenity.js';
//import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js'

class AmenityDaoMongodb /* implements Dao<Amenity, string> */ {

    private conectarMongodb: ConectarMongodb = new ConectarMongodb();

    async add(element: Amenity): Promise<Amenity> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('amenities');
        await collection.insertOne(element);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(element);
    }
    async getAll(): Promise<Amenity[]> {
        const amenities: Array<Amenity> = [];
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('amenities');
        const findResult = await collection.find({}).toArray();
        collection.listIndexes
        findResult.forEach(e => amenities.push(new Amenity(e.estaReservado, e.deptoReservado, e.tipo, e.id)));
        await this.conectarMongodb.desconectar();
        return Promise.resolve(amenities);
    }


    // si no encuentra un amenitiy, devuelve un objeto vacio
    async get(clave: number): Promise<Amenity> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('amenities');
        const findResult = await collection.findOne({ id: clave });
        await this.conectarMongodb.desconectar();
        const amenity = new Amenity(false, 0, 0, 0);
        if (findResult !== null) {
            amenity.estaReservado = findResult.estaReservado
            amenity.deptoReservado = findResult.deptoReservado
            amenity.tipo = findResult.tipo
            amenity.id = findResult.id;
        }
        return Promise.resolve(amenity);
    }


    async delete(element: number): Promise<boolean> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('amenities');
        const findResult = await collection.deleteOne({ id: element });
        await this.conectarMongodb.desconectar();
        let rta = false;
        if (findResult.deletedCount > 0) {
            rta = true;
        }
        console.log("Estado de rta " + rta);

        return Promise.resolve(rta);
    }
}

export { AmenityDaoMongodb }