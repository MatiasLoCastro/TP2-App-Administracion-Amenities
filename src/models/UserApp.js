import './Reserva';
export class UserApp {
    constructor(nombre, apellido, dni, password, depto, email, reservas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.password = password;
        this.depto = depto;
        this.email = email;
        this.reservas = Array();
    }
}
