import express from "express";
import { Amenity } from "./Amenity";
import { ReservaDaoMongodb } from '../repository/ReservaDaoMongodb.js'
import ReservaController from "../controllers/ReservaController";

export class Reserva {

    amenity: Amenity
    estado: string
    fecha: string
    id: number

    constructor(amenity: Amenity, estado: string, fecha: string, id: number) {
        this.amenity = amenity;
        this.estado = estado;
        this.fecha = fecha;
        this.id = id;
    }

}


