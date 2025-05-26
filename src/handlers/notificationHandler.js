import { enviarCorreo } from '../email/mailer.js';
import { guardarNotificacion } from '../database/mongoClient.js'; // si decides guardar en Mongo

export async function manejarNotificacion(call, callback) {
  try {
    const { userId, mensaje, tipo } = call.request;

    // Aquí deberías obtener el correo real del usuario a partir de userId
    // Para pruebas, usamos uno fijo:
    const correoDestino = 'usuario@ejemplo.com';

    console.log(`[📨] Notificación recibida para usuario ${userId}: ${mensaje}`);

    await enviarCorreo(correoDestino, 'Nueva notificación', mensaje);

    // (Opcional) Guardar en Mongo
    await guardarNotificacion({ userId, mensaje, tipo, fecha: new Date() });

    callback(null, { enviado: true });
  } catch (error) {
    console.error('[❌] Error al manejar notificación:', error.message);
    callback(null, { enviado: false });
  }
}
