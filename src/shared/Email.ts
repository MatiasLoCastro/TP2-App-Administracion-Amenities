import nodemailer from 'nodemailer'

export class Email {

    enviar(para: string, asunto: string, cuerpoMensaje: string, pathArchivoAdjunto: string) : Promise<any> {
        return new Promise( (resolve,reject) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                port: 465,
                service:'yahoo',
                secure: false,                
                auth: {
                    user: 'nt2_final@yahoo.com',
                    pass: 'nt2Final.'
                },
                debug: false,
                logger: true 
            });
            const mailOptions = {
                from : 'nt2_final@yahoo.com',
                to: 'nt2_final@yahoo.com',
                subject: 'test',
                text: 'reserva test',
                attachments : [{path:pathArchivoAdjunto}]
            }
            transporter.sendMail(mailOptions,function(err,info) {
                if(err) {
                    throw err;
                } else {
                    console.log(info);
                    
                }
            });    
        })
    }

}

//export default {Email}