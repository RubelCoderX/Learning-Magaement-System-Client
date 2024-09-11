import nodmailer, { Transporter } from "nodemailer";
import config from "../config";
import path from "path";
import ejs from "ejs";

interface EamilOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const sendMail = async (options: EamilOptions): Promise<void> => {
  const transporter: Transporter = nodmailer.createTransport({
    host: config.smtp_host,
    port: parseInt(config.smtp_port || "587"),
    service: config.smtp_service,
    auth: {
      user: config.smtp_mail,
      pass: config.smtp_pass,
    },
  });
  const { email, subject, template, data } = options;
  // get the path to the email template file

  const templatePath = path.join(__dirname, "../../mails", template);

  // Render the email template with EJS
  const html: string = await ejs.renderFile(templatePath, data);
  // send the email
  const mailOptions = {
    from: config.smtp_mail,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
export default sendMail;
