var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Amenity } from '../models/Amenity.js';
//import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js';
class AmenityDaoMongodb /* implements Dao<Amenity, string> */ {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('amenities');
            yield collection.insertOne(element);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const amenities = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('amenities');
            const findResult = yield collection.find({}).toArray();
            collection.listIndexes;
            findResult.forEach(e => amenities.push(new Amenity(e.estaReservado, e.deptoReservado, e.tipo, e.id)));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(amenities);
        });
    }
    // si no encuentra un vehiculo, devuelve un objeto vacio
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('amenities');
            const findResult = yield collection.findOne({ id: clave });
            yield this.conectarMongodb.desconectar();
            const amenity = new Amenity(false, 0, 0, 0);
            if (findResult !== null) {
                amenity.id = findResult.dni;
            }
            return Promise.resolve(amenity);
        });
    }
    delete(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('amenities');
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
export { AmenityDaoMongodb };
