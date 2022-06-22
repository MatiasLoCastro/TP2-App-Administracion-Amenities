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
            if (yield reservaDaoMongodb.delete(req.params.id)) {
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
            res.status(200).send(yield reservaDaoMongodb.add(req.body));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDaoMongodb = new ReservaDaoMongodb();
            const rta = yield reservaDaoMongodb.get(req.params.id);
            if (rta.id != -1) {
                res.status(200).send(rta);
            }
            else {
                res.status(404).send({ mensaje: "no se encuentran registros para " + req.params.id });
            }
        });
    }
}
export default new ReservaController();
