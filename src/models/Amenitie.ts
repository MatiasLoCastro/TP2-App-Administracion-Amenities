abstract class Amenitie {

    estaReservado: boolean
    deptoReservado: number

    constructor(estaReservado: boolean, deptoReservado: number) {
        this.estaReservado = estaReservado;
        this.deptoReservado = deptoReservado;
    }

}

export default Amenitie