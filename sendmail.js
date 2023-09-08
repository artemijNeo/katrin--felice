const http = require('http')
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const port = 5501
let cors = require("cors")

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(bodyParser.json())

app.listen(port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("listening to port 5501")
    }
})

app.post("/sendmail", (req, res) => {
    console.log("here")
    console.log(req.body)
    const data = req.body
    main(data.name, data.email, data.phone, data.productName, data.messenger).catch(console.error);
    res.end()
})


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "iv.artemij@gmail.com",
    pass: "xaybeflyfygvuoqd",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(name, email, phone, productName, messenger) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Новый заказ" <iv.artemij@gmail.com>', // sender address
    to: "katrin.felice@mail.ru", // list of receivers  katrin.felice@mail.ru
    subject: "Новый заказ", // Subject line
    text: "Email: " + email + "Имя: " + name + "Телефон: " + phone, // plain text body
    html: `<h2>Новый заказ</h2>
    <p><strong>Название товара: ${productName}</strong></p>
    <p>Имя: ${name}</p>
    <p>Email: ${email}</p>
    <p>Телефон: ${phone}</p>
    <br/>
    <p>Удобный мессенджер: ${messenger}</p>`
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}