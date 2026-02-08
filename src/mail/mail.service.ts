import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT!) || 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendToken(to: string, nombre: string, token: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Token de confirmación de pago - EPayCo',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #003366;">Confirmación de Pago</h2>
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>Has solicitado realizar un pago. Usa el siguiente token para confirmar:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #003366;">
              ${token}
            </span>
          </div>
          <p style="color: #666;">Este token expira en 3 minutos.</p>
          <p>Si no solicitaste este pago, ignora este correo.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">ePayco - Paga, crece juntos</p>
        </div>
      `,
    });
  }
}
