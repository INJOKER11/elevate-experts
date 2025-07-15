require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
console.log(process.env.MAIL_PASS)

app.post("/send-email", async (req, res) => {
    const { name, email, message, services, contact } = req.body;
    const serviceList = (services || []).map(s => `<li>${s}</li>`).join("");
    const contactList = (contact || []).map(c => `<li>${c}</li>`).join("");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })

    const mailOptions = {
        from: `${name} <${email}>`,
        to: process.env.MAIL_USER,
        subject: "New message from elevate-experts",
        html: `
            <h2>Сообщение с формы обратной связи</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
            <p><strong>Services:</strong><ul>${serviceList}</ul></p>
            <p><strong>Contact by:</strong><ul>${contactList}</ul></p>
        `
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("ok");
    } catch (e) {
        console.error("error:", e);
        res.status(500).send("error");
    }
})


app.listen(PORT, () => {
    console.log(`server up http://localhost:${PORT}`);
})