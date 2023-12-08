const passport = require('passport')
const config = require('../config/facebook')
const FacebookStrategy = require('passport-facebook').Strategy
const express = require('express')
const router = express.Router()
const connection = require('../connection')
const cors = require('cors')

// FACEBOOK_APP_ID = '1301099490620364'
// FACEBOOK_APP_SECRET = '33e4e2315c2bb6713e49d8011ce46d23'

// let accessToken;
// let refreshToken;
// let userProfile;

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:5000/auth/facebook/callback",
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile)
//     console.log(accessToken)
//     console.log(refreshToken)
//     // return cb(err, result)
//     connection.query(`select * from rsn_client_oauth where user_id='${userProfile}'`, (err, result) => {
//       if(err) throw err;
//       console.log(result)
//       if(result.rowCount < 0){
//         connection.query('insert into rsn_client_oauth values($1, $2, $3)', [profile.id, accessToken, refreshToken], (err, result) => {
//           return cb(err, result)
//          })
//       }
//       return cb(err, result)
//     })
//   }
// ));

// router.get('', passport.authenticate('facebook', { scope: 'email' }), (req, res) => {
//   console.log(res)
// });

// router.get(
//   '/callback',
//   passport.authenticate('facebook', {
//     failureRedirect: '/auth/facebook/error',
//   }),
//   function (req, res) {
//     console.log('/callback/success')
//     // Successful authentication, redirect to success screen.
//     // res.json({'res': res})
//     res.redirect('http://localhost:5000/auth/facebook/success')
//   }
// );

// router.get('/success', async (req, res) => {
//   console.log('/auth/facebook/success')
//   const userInfo = {
//     id: req.session.passport.user.id,
//     displayName: req.session.passport.user.displayName,
//     provider: req.session.passport.user.provider,
//     accessToken: accessToken,
//     refreshToken: refreshToken
//   };
//   res.json({user: userInfo});
// });

// router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

// router.get('/signout', (req, res) => {
//   try {
//     req.session.destroy(function (err) {
//       console.log('session destroyed.');
//     });
//     res.render('auth');
//   } catch (err) {
//     res.status(400).send({ message: 'Failed to sign out fb user' });
//   }
// });

router.post('/checkExist', async (req, res) => {
    // If there is no user, create one.
    console.log('CATCH EVENT')
    console.log(req.body.email)
    try {
        let email = req.body.email
        const user = await connection.query(
            'SELECT * FROM rsn_user WHERE email = $1 AND EXISTS (SELECT 1 FROM rsn_user WHERE email = $1)',
            [email]
        )
        const registeredUser = user.rows[0]

        if (!registeredUser) {
            connection
                .query(
                    'INSERT INTO rsn_user (firstname, middlename, lastname, email, age, password, role_id) VALUES($1, $2, $3, $4, $5, $6, 2) RETURNING *',
                    [' ', ' ', ' ', email, 0, ' ']
                )
                .then(() => {
                    console.log('Register new email successfully')
                })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})

module.exports = router
