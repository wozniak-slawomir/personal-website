import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config';

const CORS_OPTIONS = {
    origin: process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.FRONTEND_PORT}`
        : process.env.PROD_URL,
}
const MY_EMAIL_SIGNATURE = `Slawomir Wozniak <${process.env.MY_EMAIL}>`;

const app = express();
app.use('/', express.static(path.join(__dirname, 'frontend')));
app.use(cors(CORS_OPTIONS));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MAIL_PASSWORD,
    },
});

app.post("/api/send-email", async (req: Request, res: Response) => {
    const { email, phone_number, message, name, surname } = req.body;
    const info = await transporter.sendMail({
        from: process.env.SENDER_EMAIL, // sender address
        to: MY_EMAIL_SIGNATURE, // list of receivers
        subject: `New message from website from: ${name} ${surname} ${email}`, // Subject line
        html: `<p>Phone number: ${phone_number}, email: ${email}<br>Message: ${message}`, // html body
    });
    res.status(200).send(info);
});

app.get("/", (req: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(__dirname, './frontend') });
});

app.get("*", (req: Request, res: Response) => {
    res.status(404);
    res.sendFile('404.html', { root: path.join(__dirname, './frontend') });
});

app.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});
