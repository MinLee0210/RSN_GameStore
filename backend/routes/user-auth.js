const express = require('express')
const router = express.Router()
const connection = require('../connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const common = require('../utils/common')
const sendMail = require('../utils/sendMail')

//Hash Configuration
const salt = bcrypt.genSaltSync(12)

//JWT_SECRET_KEY
const JWT_SECRET_KEY = '9876543210'

router.get('/', (req, res) => {
    console.log('/user/')
    res.json({ status: 'Success' })
})

router.post('/signup', async (req, res) => {
    try {
        const {
            firstname,
            middlename,
            lastname,
            email,
            age,
            password,
            birthday,
        } = req.body
        console.log(
            'Received values:',
            firstname,
            middlename,
            lastname,
            email,
            age,
            password,
            birthday
        )

        const check = await connection.query(
            'SELECT EXISTS(SELECT 1 FROM rsn_user WHERE email = $1)',
            [email]
        )

        const isRegistered = check.rows[0]
        if (isRegistered.exists) {
            console.log('error')
            res.json({ error: true })
        } else {
            const hashPwd = await bcrypt.hash(password, salt)
            console.log('hashPwd: ', hashPwd)
            const newAdmin = await connection.query(
                'INSERT INTO rsn_user (firstname, middlename, lastname, email, age, password, role_id) VALUES($1, $2, $3, $4, $5, $6, 2) RETURNING *',
                [firstname, middlename, lastname, email, age, hashPwd]
            )

            // Insert the user's birthday into the rsn_user_birth table
            const newUserBirthday = await connection.query(
                'INSERT INTO rsn_user_birth (user_id, birthday) VALUES ($1, $2)',
                [newAdmin.rows[0].userid, new Date(birthday)]
            )

            res.json({ error: false })
            console.log('ok')
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.get('/signin', (req, res) => {
    res.json({ route: 'signin' })
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await connection.query(
            'SELECT * FROM rsn_user WHERE email = $1 AND EXISTS (SELECT 1 FROM rsn_user WHERE email = $1)',
            [email]
        )

        const registeredUser = user.rows[0]

        if (!registeredUser) {
            res.json({ isAuthenticated: false })
            console.log('Login Failed')
        } else {
            if (await bcrypt.compare(password, registeredUser.password)) {
                const token = jwt.sign(
                    {
                        email: registeredUser.email,
                        userid: registeredUser.userid,
                    },
                    JWT_SECRET_KEY
                )
                res.json({
                    isAuthenticated: true,
                    accessUserToken: token,
                    email: registeredUser.email,
                    userid: registeredUser.userid,
                })
                console.log('Login Successful')
            } else {
                res.json({ isAuthenticated: false })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
})

// LOST PASSWORD
router.get('/forget-password', (req, res) => {
    res.json({ status: 'forget-password' })
})

router.post('/forget-password', (req, res) => {
    const email = req.body.email
    console.log(email)
    var actionID = common.generateToken(Math.floor(Math.random() * 1000000000))
    var token = common.generateToken(Math.floor(Math.random() * 1000000000))
    statement = 'select * from rsn_user where email=$1'
    tokenStatment =
        'insert into rsn_user_psw  (action_id, user_email, token_reminder) values($1, $2, $3)'
    connection.query(statement, [email], (err, result) => {
        if (err) throw err
        if (result.rowCount > 0) {
            console.log(result.rows)
            connection.query(
                tokenStatment,
                [actionID, email, token],
                (err, result) => {
                    if (err) throw err
                    console.log(result)
                }
            )
            sendMail(req.body.email, token)
            res.json({ success: true })
        } else {
            console.log(result.rowCount)
            res.json({ success: false })
        }
    })
})

// RESET PASSWORD
router.get('/reset-password', (req, res) => {
    res.render('reset_password')
})
 
router.post('/reset-password/:id', (req, res) => {
    console.log('reset')
    var password = req.body.password
    // console.log(password)
    // Find url in the request, then extract it to find the token
    // var token = req.rawHeaders[33].split('/')[5]
    var token = req.body.id
    // console.log(token)
  
    checkExist = "select * from rsn_user_psw where token_reminder='" + token + "';"
    deleteToken =  "update rsn_user_psw set token_reminder='CHANGED' where token_reminder='" + token + "';"

    connection.query(checkExist, (err, result) => {
        if (err) throw err;
        if (result.rowCount > 0){
            var saltRounds = 10
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) throw err
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    connection.query("update rsn_user set password='" + hash + "'", (err, result) => {
                        if (err) throw err;
                        connection.query(deleteToken, (err, result) => {
                            if(err) throw err;
                            // console.log(result.rows[0])
                            console.log('Delete token_reminder')
                        })
                        console.log('Change succssfully')
                    })
                    
                })
            })
        }
    })
})

module.exports = router
