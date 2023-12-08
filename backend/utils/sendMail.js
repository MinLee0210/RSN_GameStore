const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const config = require('../config/google')
const OAuth2 = google.auth.OAuth2

const client = new OAuth2(config.clientGoogleId, config.clientGoogleSecret)

client.setCredentials({ refresh_token: config.refreshToken })
require('dotenv').config({ path: '../.env' })

sendMail = (email, token) => {
    const accessToken = client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.user,
            clientId: config.clientGoogleId,
            clientSecret: config.clientGoogleSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken,
        },
    })

    const mail_options = {
        from: `🦏RISEN <${config.user}}>`,
        to: email,
        subject: 'RESET PASSWORD',
        text: 'Dear Client',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/user/reset-password/' + token + '">link</a> to reset your password</p>',
        
        textEncoding: 'base64',
        headers: [
            { key: 'X-Application-Developer', value: 'Amit Agarwal' },
            { key: 'X-Application-Version', value: 'v1.0.0.2' },
        ],
    }

    transport.sendMail(mail_options, (error, result) => {
        if (error) {
            console.error(error)
        } else {
            console.log(result)
        }
        transport.close()
    })
}

module.exports = sendMail
