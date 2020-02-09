import nodemailer from 'nodemailer';
import { resolve } from 'path';
import nodemailerhbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
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

    this.configureTemplates();
  }

  sendMail(message) {
    return this.tranporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.tranporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }
}

export default new Mail();
