import {Email} from '../src/shared/Email.js'
import {Pdf} from '../src/shared/Pdf.js'

async function main() {

    const archivo = `./output/prueba3.pdf`

    const pdf : Pdf = new Pdf();
    await pdf.crear("hola mundo",archivo);
   
    const email : Email = new Email();
    email.enviar("nt2_final@yahoo.com","Asunto","Cuerpo mensaje",archivo);
    console.log('test');

}

main();
