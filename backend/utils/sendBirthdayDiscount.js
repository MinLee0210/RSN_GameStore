const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const config = require('../config/google')
const OAuth2 = google.auth.OAuth2

const client = new OAuth2(config.clientGoogleId, config.clientGoogleSecret)

client.setCredentials({ refresh_token: config.refreshToken })

const pool = require('../connection')
const comment = require('../utils/common')

const getUsersWithBirthdayToday = async () => {
    // Query the database to get users with a birthday today
    // Adapt this code to your specific database setup
    const query = `
            SELECT rsn_user.email
            FROM rsn_user
            JOIN rsn_user_birth ON rsn_user.userid = rsn_user_birth.user_id
            WHERE EXTRACT(MONTH FROM rsn_user_birth.birthday) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(DAY FROM rsn_user_birth.birthday) = EXTRACT(DAY FROM CURRENT_DATE);
        `

    const result = await pool.query(query)
    return result.rows
}

const sendMail = (email, token, discountCode) => {
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
        subject: 'HAPPY BIRTHDAY! Here is your discount code',
        text: `Happy Birthday! Here's a discount code for you: ${discountCode}`,
        html: `<p>Happy Birthday! Here's a <strong>discount code</strong> for you: <strong>${discountCode}</strong></p>`,

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

const sendBirthdayDiscount = async () => {
    const users = await getUsersWithBirthdayToday()

    users.forEach((user) => {
        const discountCode = common.generateCode()
        sendMail(user.email, null, discountCode)
    })
}

module.exports = sendBirthdayDiscount
