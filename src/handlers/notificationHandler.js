import { enviarCorreo } from '../email/mailer.js';

export const notificationHandlers = {
  async EnviarCorreoBienvenida(call, callback) {
    const { email, nombre } = call.request;
    const html = `<h1>Bienvenido, ${nombre}</h1><p>Gracias por unirte a nuestra plataforma.</p>`;
    try {
      await enviarCorreo(email, 'Bienvenido a la plataforma', html);
      callback(null, { exito: true, mensaje: 'Correo enviado' });
    } catch (error) {
      callback(null, { exito: false, mensaje: error.message });
    }
  },

  async EnviarCorreoConvocatoria(call, callback) {
    const { emailConvocado, emailCreador, nombreConvocado, nombreCreador, nombreProyecto, estado } = call.request;

    const asunto = `Actualización de convocatoria - ${nombreProyecto}`;
    const mensajeConvocado = `<p>Hola ${nombreConvocado}, has <strong>${estado}</strong> la convocatoria al proyecto "${nombreProyecto}".</p>`;
    const mensajeCreador = `<p>Hola ${nombreCreador}, el usuario ${nombreConvocado} ha <strong>${estado}</strong> tu convocatoria al proyecto "${nombreProyecto}".</p>`;

    try {
      await enviarCorreo(emailConvocado, asunto, mensajeConvocado);
      await enviarCorreo(emailCreador, asunto, mensajeCreador);
      callback(null, { exito: true, mensaje: 'Correos enviados' });
    } catch (error) {
      callback(null, { exito: false, mensaje: error.message });
    }
  }
};
