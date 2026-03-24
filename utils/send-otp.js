const nodemailer = require("nodemailer")

module.exports = async function(email, otp) {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "abdullayevotabek414@gmail.com",
                pass: process.env.APP_PASS
            }
        })
        const info = await transport.sendMail({
            from: "abdullayevotabek414@gmail.com",
            to: email,
            subject: "UzAutoMotors - Tasdiqlash kodi",
            html: `<p style="font-size: 24px">Tasdiqlash kodi: <strong style="color: green">${otp}</strong></p>`
        })
        console.log("Email yuborildi:", info.messageId)
    } catch (error) {
        console.error("Email xatosi:", error.message)
        throw new Error(error)
    }
}