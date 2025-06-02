import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('USER:', process.env.MAIL_USER);
console.log('PASS:', process.env.MAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export async function enviarCorreo(destinatario, asunto, html) {
  const opciones = {
    from: `"Plataforma AI 👋" <${process.env.MAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    html
  };

  return await transporter.sendMail(opciones);
}
