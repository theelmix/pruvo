import nodemailer from "nodemailer";
const HOST = process.env.USER;
const PORT = process.env.USER;
const USER = process.env.SMTP_USER;
const PASSWORD = process.env.SMTP_PASS;

class Mailer {

    // For Custom SMTP Server
    // private transporter = nodemailer.createTransport({
    //     host: HOST,
    //     port: PORT,
    //     secure: false,
    //     auth: {
    //         user: USER,
    //         pass: PASSWORD
    //     }
    // });

    // For GMAIL SMTP Server
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: USER,
            pass: PASSWORD,
        },
    });

    public enviarmail(to: string, conversion: number) {
        const mailOptions = {
            from: USER,
            to: to,
            subject: "PRUVO: You processed conversion rate",
            html: `<p>Your conversion rate ${conversion}</p>`,
        };

        this.transporter.sendMail(mailOptions, function (err: any, info: any) {
            if (err) {
                console.error(err);
                console.error("Error sending mail to client. (Error SMTP service)");
                console.info(`Your conversion rate ${conversion}`);
            } else console.info(info);
        });
    }
}

export default Mailer;