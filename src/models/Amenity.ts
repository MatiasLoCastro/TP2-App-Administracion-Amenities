export class Amenity {

    estaReservado: boolean
    deptoReservado: number
    tipo: number
    id: number

    constructor(estaReservado: boolean, deptoReservado: number, tipo: number, id: number) {
        this.estaReservado = estaReservado;
        this.deptoReservado = deptoReservado;
        this.tipo = tipo
        this.id = id
    }

}

