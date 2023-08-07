import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const {nombre,email,token} = datos
    console.log(datos)
//TODO: Mover hacia variables de entorno
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos <cuentas@uptask.com>',
        to:email,
        subject: "UpTask - Confirma tu Cuenta",
        text: 'Comprueba tu cuenta en UpTask',
        html: `
        <p>Hola ${nombre}, comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
      })
}



export const emailOlvidePassword = async (datos) => {
    const {nombre,email,token} = datos
    console.log(datos)
//TODO: Mover hacia variables de entorno
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos <cuentas@uptask.com>',
        to:email,
        subject: "UpTask - Recupera tu password",
        text: 'Recupera tu contraseña de UpTask',
        html: `
        <p>Hola ${nombre}, recupera tu contraseña en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Generar nuevo password</a>
        <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
        `
      })
}


