var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserApp } from '../models/UserApp';
import { ConectarMongodb } from './ConectarMongodb.js';
class UserAppDaoMongodb {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            yield collection.insertOne(element);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            const findResult = yield collection.find({}).toArray();
            collection.listIndexes;
            findResult.forEach(e => usuarios.push(new UserApp(e.nombre, e.apellido, e.dni, e.password, e.depto, e.email, e.reservas)));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(usuarios);
        });
    }
    // si no encuentra un vehiculo, devuelve un objeto vacio
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            const findResult = yield collection.findOne({ patente: clave });
            yield this.conectarMongodb.desconectar();
            const usuario = new UserApp("", "", "", "", 0, "", []);
            if (findResult !== null) {
                usuario.dni = findResult.dni;
            }
            return Promise.resolve(usuario);
        });
    }
    delete(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('usuarios');
            const findResult = yield collection.deleteOne({ dni: element.dni });
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
export { UserAppDaoMongodb };
