import nodemailer from 'nodemailer'

class Email {

    enviar(para: string, asunto: string, cuerpoMensaje: string, pathArchivoAdjunto: string) : Promise<any> {
        return new Promise( (resolve,reject) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                port: 465,
                service:'yahoo',
                secure: false,                
                auth: {
                    user: 'adrianutnnode2019@yahoo.com',
                    pass: 'czrextadalosyqhy'
                },
                debug: false,
                logger: true 
            });
            const mailOptions = {
                from : 'adrianutnnode2019@yahoo.com',
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

export {Email}