import ReservaController from '../controllers/ReservaController.js';
class ReservaRouter {
    constructor(app, nombre) {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.route(this.nombre)
            .get(ReservaController.listar)
            .post(ReservaController.add);
        this.app.route(this.nombre + "/:id")
            .get(ReservaController.get)
            .delete(ReservaController.delete);
        this.app.route(this.nombre + "/libres/:id")
            .get(ReservaController.getAmenitiesLibres);
        return this.app;
    }
}
export default ReservaRouter;
