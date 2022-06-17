import express from "express";
import { Amenity } from "./Amenity";

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


