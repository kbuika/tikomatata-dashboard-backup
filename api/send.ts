import type { VercelRequest, VercelResponse } from "@vercel/node"
import nodemailer from "nodemailer"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(request: VercelRequest, response: VercelResponse) {
  const req = JSON.parse(request.body)
  const { emailHtml, subject } = req
  const email = process.env.VITE_RECIPIENT_EMAIL

  const transporter = nodemailer.createTransport({
    host: "smtp.migadu.com",
    port: 465,
    secure: true, // Change it to false if you wanted another port than 465
    auth: {
      user: process.env.VITE_SENDER_EMAIL, // Your email address
      pass: process.env.VITE_SENDER_EMAIL_PASS, // Your password
    },
  })

  const mailOptions = {
    from: process.env.VITE_SENDER_EMAIL,
    to: email,
    subject: subject,
    html: emailHtml,
  }

  // ensure name and email are included
  if (!email) {
    response.status(400).send({ message: "could not find recipent email"})
  }

  // send email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      response.status(404).send({ message: "Could not send email"})
    }
    response.status(200).send({ message: "Email sent successfully"})
  })
}
