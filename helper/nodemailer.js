
import nodemailer from "nodemailer";
// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rathorejee074@gmail.com',
        pass: '' // App Password
    }
});


export async function sendemail(obj) {
    try {
        // Email options
        const mailOptions = {
            from: 'rathorejee074@gmail.com',
            to: obj?.email,
            subject: "job applied successfully",
            text: `${obj?.text}`
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (er) {
        console.log(er, "eroro")
    }
}
