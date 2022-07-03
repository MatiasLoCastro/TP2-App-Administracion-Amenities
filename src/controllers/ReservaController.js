var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ReservaDaoMongodb } from '../repository/ReservaDaoMongodb.js';
import AmenityController from './AmenityController.js';
import { Email } from '../shared/Email.js';
class ReservaController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDaoMongodb = new ReservaDaoMongodb();
            res.status(200).send(yield reservaDaoMongodb.getAll());
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDaoMongodb = new ReservaDaoMongodb();
            if (yield reservaDaoMongodb.delete(parseInt(req.params.id))) {
                res.status(201).send({ mensaje: "Registro eliminado para reserva id: " + req.params.id });
            }
            else {
                res.status(400).send({ mensaje: "no se encuentran registros para id: " + req.params.id });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDaoMongodb = new ReservaDaoMongodb();
            /*         AmenityController.add(req.body.amenity, res) */
            res.status(200).send(yield reservaDaoMongodb.add(req.body));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDaoMongodb = new ReservaDaoMongodb();
            const rta = yield reservaDaoMongodb.get(parseInt(req.params.id));
            if (rta.id != -1) {
                res.status(200).send(rta);
            }
            else {
                res.status(404).send({ mensaje: "no se encuentran registros para Reserva:" + req.params.id });
            }
        });
    }
    getAllReservas(req, res) {
        const reservaDaoMongodb = new ReservaDaoMongodb();
        return reservaDaoMongodb.getAll();
    }
    getAmenitiesLibres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDaoMongodb = new ReservaDaoMongodb();
            const rta = yield reservaDaoMongodb.get(parseInt(req.params.id));
            if (rta.id != -1) {
                const amenities = yield AmenityController.getAllAmenity(req, res).then();
                console.log(amenities);
                let listaFormateada = new Array();
                amenities.forEach(a => {
                    if (rta.amenity.id == a.id && a.estaReservado == false) {
                        listaFormateada.push(JSON.stringify(`fecha ${rta.fecha} - Amenity ID: ${a.id} - Tipo: ${a.tipo} Estado: LIBRE`));
                    }
                });
                console.log(listaFormateada);
                res.status(200).send(listaFormateada);
                const email = new Email();
                /* email.enviar("kuitcadylan@yahoo.com","Amenities Libres", JSON.stringify(listaFormateada), "") */
            }
            else {
                res.status(404).send({ mensaje: "No se encontro reserva con esa clave" });
            }
        });
    }
}
export default new ReservaController();
