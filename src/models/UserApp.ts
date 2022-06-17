import './Reserva'
import { Reserva } from './Reserva'

export class UserApp {

    nombre: string
    apellido: string
    dni: string
    password: string
    depto: number
    email: string
    reservas: Array<Reserva>

    constructor(nombre: string, apellido: string, dni: string, password: string, depto: number, email: string, reservas: Array<Reserva>) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.password = password;
        this.depto = depto;
        this.email = email;
        this.reservas = Array<Reserva>();
    }
}

