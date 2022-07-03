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
                    user: 'kuitcadylanfoto@yahoo.com',
                    pass: 'ygmrvzabdwvhritc'
                },
                debug: false,
                logger: true 
            });
            const mailOptions = {
                from : 'kuitcadylanfoto@yahoo.com',
                to: para,
                subject: asunto,
                text: cuerpoMensaje,
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