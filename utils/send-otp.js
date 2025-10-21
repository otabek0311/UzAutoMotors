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
        await transport.sendMail({
            from: "abdullayevotabek414@gmail.com",
            to:email,
            subject: "DevBook",
            text: "Verification code from devbook",
            html: `<p style="font-size: 24px">Verify code: <strong style="color: green">${otp}</strong></p>`
        })
    } catch (error) {
        throw new Error(error)
    }
}