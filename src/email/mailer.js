
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_USER
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

export async function enviarCorreo(destinatario, asunto, mensaje) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporte = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    const opciones = {
      from: `Notificaciones <${GMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      text: mensaje
    };

    const resultado = await transporte.sendMail(opciones);
    console.log('[✅] Correo enviado con ID:', resultado.messageId);
    return true;
  } catch (error) {
    console.error('[❌] Error al enviar correo:', error.message);
    return false;
  }
}
