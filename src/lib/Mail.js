import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, auth, secure } = mailConfig;

    this.tranporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.tranporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
