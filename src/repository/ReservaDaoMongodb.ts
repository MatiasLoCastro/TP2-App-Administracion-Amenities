import { Reserva } from '../models/Reserva.js';
import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js'
 import { Amenity } from '../models/Amenity.js'; 
/* import { Amenity } from '../models/Amenity';  */

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

    // si no encuentra una reserva, devuelve un objeto vacio
    async get(clave: number): Promise<Reserva> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('reservas');
        const findResult = await collection.findOne({id: clave});
        await this.conectarMongodb.desconectar();
        const reserva = new Reserva(new Amenity(false, 0, 0, 0), "", Date.now().toLocaleString(), 0);
        if (findResult !== null) {
            reserva.amenity = findResult.amenity
            reserva.estado = findResult.estado
            reserva.fecha = findResult.fecha
            reserva.id = findResult.id;
        }
        return Promise.resolve(reserva);
    }

    async delete(element: number): Promise<boolean> {
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