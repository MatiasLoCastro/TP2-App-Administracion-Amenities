import AmenityController from '../controllers/AmenityController.js';
class AmenityRouter {
    constructor(app, nombre) {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.route(this.nombre)
            .get(AmenityController.listar)
            .post(AmenityController.add);
        this.app.route(this.nombre + "/:id")
            .get(AmenityController.get)
            .delete(AmenityController.delete);
        return this.app;
    }
}
export default AmenityRouter;
