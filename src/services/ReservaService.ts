import {Email} from '../shared/Email.js'
import {Pdf} from '../shared/Pdf.js'

class ReservaService {

    async proceso() {

        const archivo = `./output/prueba3.pdf`

        const pdf : Pdf = new Pdf();
        await pdf.crear("Información importante",archivo);
    
        const email : Email = new Email();
        await email.enviar("adriancaceres980@gmail.com","Asunto","Cuerpo mensaje",archivo);

    }

}

export default ReservaService