const nodemailer = require('nodemailer');

const sendEmail = (email, password, user_name) => {
        //Creamos el objeto de transporte
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
            }
        });
    
        mailOptions = {
            from: `"Cabotaje Supplier" <${process.env.EMAIL}>`,
            to: email,
            subject: 'Contraseña de acceso',
            html: `<span>Estimado </span> <b>${user_name},</b><br/><p>La contraseña de su cuenta de Cabotaje Supplier es: ${password}</p><p>Favor, cambiarla de inmediato.</p>`
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });

}

module.exports = sendEmail;