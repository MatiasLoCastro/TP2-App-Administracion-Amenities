var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Reserva } from '../models/Reserva.js';
import { ConectarMongodb } from './ConectarMongodb.js';
import { Amenity } from '../models/Amenity.js';
/* import { Amenity } from '../models/Amenity';  */
class ReservaDaoMongodb /* implements Dao<Reserva, string> */ {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(element) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(element)
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('reservas');
            yield collection.insertOne(element);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('reservas');
            const findResult = yield collection.find({}).toArray();
            collection.listIndexes;
            findResult.forEach(e => reservas.push(new Reserva(e.amenity, e.estado, e.fecha, e.id)));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(reservas);
        });
    }
    // si no encuentra una reserva, devuelve un objeto vacio
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('reservas');
            const findResult = yield collection.findOne({ id: clave });
            yield this.conectarMongodb.desconectar();
            const reserva = new Reserva(new Amenity(false, 0, 0, 0), "", Date.now().toLocaleString(), 0);
            if (findResult !== null) {
                reserva.amenity = findResult.amenity;
                reserva.estado = findResult.estado;
                reserva.fecha = findResult.fecha;
                reserva.id = findResult.id;
            }
            return Promise.resolve(reserva);
        });
    }
    delete(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('reservas');
            const findResult = yield collection.deleteOne({ id: element });
            yield this.conectarMongodb.desconectar();
            let rta = false;
            if (findResult.deletedCount > 0) {
                rta = true;
            }
            console.log("Estado de rta " + rta);
            return Promise.resolve(rta);
        });
    }
}
export { ReservaDaoMongodb };
