import { Reserva } from '../models/Reserva.js';
import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js'
import { Amenity } from '../models/Amenity.js';

class ReservaDaoMongodb /* implements Dao<Reserva, string> */ {

    private conectarMongodb: ConectarMongodb = new ConectarMongodb();

    async add(element: Reserva): Promise<Reserva> {
        //console.log(element)
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('reservas');
        await collection.insertOne(element);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(element);
    }
    async getAll(): Promise<Reserva[]> {
        const reservas: Array<Reserva> = [];
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('reservas');
        const findResult = await collection.find({}).toArray();
        collection.listIndexes
        findResult.forEach(e => reservas.push(new Reserva(e.amenity, e.estado, e.fecha, e.id)));
        await this.conectarMongodb.desconectar();
        return Promise.resolve(reservas);
    }

    // si no encuentra un vehiculo, devuelve un objeto vacio
    async get(clave: string): Promise<Reserva> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('reservas');
        const findResult = await collection.findOne({ id: clave });
        await this.conectarMongodb.desconectar();
        const amenity = new Reserva(new Amenity(false, 0, 0, 0), "", Date.now().toLocaleString(), 0);
        if (findResult !== null) {
            amenity.id = findResult.dni;
        }
        return Promise.resolve(amenity);
    }

    async delete(element: string): Promise<boolean> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('reservas');
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

export { ReservaDaoMongodb }