import express from 'express'
import ReservaController from '../controllers/ReservaController.js'

class ReservaRouter {
    app : express.Application;
    nombre : string;
    constructor(app : express.Application,nombre : string)    {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.route(this.nombre)
        .get( ReservaController.listar )
        .post( ReservaController.add )

        this.app.route(this.nombre + "/:id")
        .get(ReservaController.get)
        .delete(ReservaController.delete)

        return this.app;
    }
}

export default ReservaRouter