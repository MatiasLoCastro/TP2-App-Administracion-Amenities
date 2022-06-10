import e from "express";
import Amenitie from "./Amenitie";

export class Reserva {

    amenitie: Amenitie
    estado: string
    fecha: Date

    constructor(amenitie: Amenitie, estado: string, fecha: Date) {
        this.amenitie = amenitie;
        this.estado = estado;
        this.fecha = fecha;
    }
}


