const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const fs = require('fs')
const { unlink } = require('fs/promises')
const multiparty = require('multiparty')
const ejs = require('ejs')
const googleAuth = require('./routes/google-auth')
const facebookAuth = require('./routes/facebook-auth')
const clientAuth = require('./routes/user-auth')
const cron = require('node-cron')
const schedule = require('node-schedule')

const sendBirthdayDiscount = require('./utils/sendBirthdayDiscount')

const pool = require('./connection')
const { verify } = require('crypto')
const { get } = require('http')
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport')

//Middleware
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs')

//Hash Configuration
const salt = bcrypt.genSaltSync(12)

//JWT_SECRET_KEY
const JWT_SECRET_KEY = '9876543210'
const JWT_SECRET_REFRESH = 'refresh12345'

//User Routes
app.use('/auth/google', googleAuth)
app.use('/auth/facebook', facebookAuth)
app.use('/user', clientAuth)

// app.get('/user', (req, res) => {
//     console.log("/user/")
//     res.json({'status': 'Success'})
// })

//Create Admin
app.post('/admin/signup', async (req, res) => {
    try {
        const { firstname, middlename, lastname, email, age, password } =
            req.body

        const check = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM rsn_admin WHERE email = $1)',
            [email]
        )

        const isRegistered = check.rows[0]
        if (isRegistered.exists) {
            console.log('error')
            res.json({ error: true })
        } else {
            const hashPwd = await bcrypt.hash(password, salt)
            const newAdmin = await pool.query(
                'INSERT INTO rsn_admin (firstname, middlename, lastname, email, age, password, role_id) VALUES($1, $2, $3, $4, $5, $6, 1) RETURNING *',
                [firstname, middlename, lastname, email, age, hashPwd]
            )
            res.json({ error: false })
            console.log('ok')
        }

        // console.log(newAdmin)
    } catch (err) {
        console.log(err.message)
    }
})

//Get all Admins

//Check login info of an Admin by Email
app.post('/admin/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await pool.query(
            'SELECT * FROM rsn_admin WHERE email = $1 AND EXISTS (SELECT 1 FROM rsn_admin WHERE email = $1)',
            [email]
        )

        const registeredAdmin = admin.rows[0]

        if (!registeredAdmin) {
            res.json({ isAuthenticated: false })
            console.log('Login Failed')
        } else {
            if (await bcrypt.compare(password, registeredAdmin.password)) {
                // console.log(req.body)
                const token = jwt.sign(
                    {
                        email: registeredAdmin.email,
                        password: registeredAdmin.password,
                    },
                    JWT_SECRET_KEY
                )
                res.json({ isAuthenticated: true, accessToken: token })
                console.log('Login Successful')
                console.log(token)
            } else {
                res.json({ isAuthenticated: false })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
})

//Get User Details

app.post('/user', async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, (err, userDetails) => {
                if (err) {
                    console.log('Token is not valid.')
                    // const status = res.status(401).json("invalid")
                    return res.status(401).json('invalid')
                }

                const validUser = jwt.decode(token)
                // console.log(validUser)
                const getUser = async () => {
                    const user = await pool.query(
                        'SELECT * FROM rsn_user WHERE email = $1',
                        [validUser.email]
                    )
                    userDetails = user.rows[0]
                    const wishNumb = await pool.query(
                        'SELECT COUNT (productid) FROM rsn_wishlist INNER JOIN rsn_user ON rsn_wishlist.userid = rsn_user.userid WHERE rsn_user.userid = $1',
                        [userDetails.userid]
                    )
                    const wishDetails = await pool.query(
                        'SELECT productid, title, filecover1, price, wished_At FROM rsn_wishlist NATURAL JOIN rsn_user NATURAL JOIN rsn_product WHERE rsn_user.userid = $1 ORDER BY wished_At DESC LIMIT 2',
                        [userDetails.userid]
                    )
                    const getLibrary = await pool.query(
                        'WITH allGames AS( SELECT productid FROM rsn_order NATURAL JOIN rsn_user NATURAL JOIN rsn_order_items WHERE userid = $1 GROUP BY productid) SELECT productid, title, filecover1 FROM allGames NATURAL JOIN rsn_product',
                        [userDetails.userid]
                    )
                    const library = getLibrary.rows
                    const responseData = [
                        userDetails,
                        wishNumb.rows[0],
                        wishDetails.rows,
                        library,
                    ]
                    res.json(responseData)
                }
                getUser()
            })
        }
    } catch (error) {
        console.log('Failed')
    }
})

app.post('/admin', async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, (err, adminDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validAdmin = jwt.decode(token)
                // console.log(validAdmin.email)

                const getAdmin = async () => {
                    const admin = await pool.query(
                        'SELECT adid, firstname, middlename, lastname, email, age, role_name FROM rsn_admin NATURAL JOIN rsn_role WHERE email = $1 AND role_id = role_id AND EXISTS (SELECT 1 FROM rsn_admin WHERE email = $1)',
                        [validAdmin.email]
                    )

                    adminDetails = admin.rows[0]

                    res.json(adminDetails)
                }

                getAdmin()
            })
        }
    } catch (error) {
        console.log('Failed to Fetch')
    }
})

//Update Admin Table

//Update an Admin

//Delete an Admin

// const loadProducts = () =>  JSON.parse(readFileSync('products.json'));

app.get('/', (req, res) => {
    res.send('RISEN BACKEND')
})

//Get Products

app.get('/api', async (req, res) => {
    try {
        const getProduct = async () => {
            const product = await pool.query('SELECT * FROM rsn_product')
            productDetails = product.rows
            res.json(productDetails)
        }

        getProduct()
    } catch (error) {
        console.log(error.message)
    }
})

//Get 5 Random Products

// app.post('/api/recommended', async (req,res) => {
//     try {
//         const getProduct = async () => {
//             const getSQL = "SELECT title, price, filecover1 FROM rsn_product ORDER BY RAND() LIMIT 5 "
//         }
//     } catch (error) {
//         console.log(error.message)
//     }
// })

app.get('/api/top/sellers', async (req, res) => {
    try {
        const query = await pool.query(
            'WITH topSellers AS ( SELECT COUNT(productid), productid FROM rsn_order NATURAL JOIN rsn_order_items GROUP BY productid) SELECT productid, title, price, filecover1, count FROM topSellers NATURAL JOIN rsn_product ORDER BY count DESC'
        )
        sellersList = query.rows
        res.json(sellersList)
    } catch (error) {
        console.log('fail')
    }
})

app.get('/api/top/wishlist', async (req, res) => {
    try {
        const query = await pool.query(
            'WITH topWish AS ( SELECT COUNT(productid), productid FROM rsn_wishlist GROUP BY productid) SELECT productid, title, price, filecover1, count FROM topWish NATURAL JOIN rsn_product ORDER BY count DESC'
        )
        wishList = query.rows
        res.json(wishList)
    } catch (error) {
        console.log('fail')
    }
})

app.post('/api/wishlist', async (req, res) => {
    try {
        const userID = req.body.userID
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, wishList) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const query = await pool.query(
                    'SELECT * FROM rsn_wishlist NATURAL JOIN rsn_product WHERE userid = $1',
                    [userID]
                )
                wishList = query.rows
                res.json(wishList)
            })
        }
    } catch (error) {
        console.log('fail')
    }
})

//Get a Product By Newest Date
app.get('/newest', async (req, res) => {
    try {
        const getDetails = async () => {
            const product = await pool.query(
                'SELECT * FROM rsn_product ORDER BY created_at ASC'
            )
            newproductDetails = product.rows[0]

            res.json(newproductDetails)
        }

        getDetails()
    } catch (error) {
        console.log(error.message)
    }
})

//Get a Product By ID

app.get('/api/:id', async (req, res) => {
    try {
        // console.log(req.params.id)
        const productID = req.params.id
        const getDetails = async () => {
            const product = await pool.query(
                'SELECT * FROM rsn_product where productid = $1',
                [productID]
            )
            const wishNumb = await pool.query(
                'SELECT COUNT (productid) FROM rsn_wishlist WHERE productid = $1',
                [productID]
            )
            const number = wishNumb.rows[0]
            // productDetails = product.rows[0]
            productDetails = [product.rows[0], number]
            // console.log(productDetails)
            res.json(productDetails)
        }

        getDetails()
    } catch (error) {
        console.log(error.message)
    }
})

app.get

//Add a Product
const IMAGE_UPLOAD_DIR = './public/images'
const IMAGE_BASE_URL = 'http://localhost:5000/images/'

app.use(express.static('public'))

app.post('/admin/addProduct', async (req, res) => {
    try {
        // const {title, genre, price, developer,
        //        publisher, date, descriptions} = req.body

        let form = new multiparty.Form({ uploadDir: IMAGE_UPLOAD_DIR })
        form.parse(req, async function (err, fields, files) {
            if (err) return res.send({ status: 'Error' })

            // console.log(`fields = ${(JSON.stringify(fields, null, 2))}`)
            // console.log(`files = ${(JSON.stringify(files, null, 2))}`)

            const uploadedImages = {
                cover1: files.fileCover1[0].path.slice(
                    files.fileCover1[0].path.lastIndexOf('\\') + 1
                ),
                cover2: files.fileCover2[0].path.slice(
                    files.fileCover2[0].path.lastIndexOf('\\') + 1
                ),
                banner: files.fileBanner[0].path.slice(
                    files.fileBanner[0].path.lastIndexOf('\\') + 1
                ),
                img1: files.fileImg1[0].path.slice(
                    files.fileImg1[0].path.lastIndexOf('\\') + 1
                ),
                img2: files.fileImg2[0].path.slice(
                    files.fileImg2[0].path.lastIndexOf('\\') + 1
                ),
                img3: files.fileImg3[0].path.slice(
                    files.fileImg3[0].path.lastIndexOf('\\') + 1
                ),
                img4: files.fileImg4[0].path.slice(
                    files.fileImg4[0].path.lastIndexOf('\\') + 1
                ),
            }

            const imagePaths = {
                fileCover1URL: IMAGE_BASE_URL + uploadedImages.cover1,
                fileCover2URL: IMAGE_BASE_URL + uploadedImages.cover2,
                fileBannerURL: IMAGE_BASE_URL + uploadedImages.banner,
                fileImg1URL: IMAGE_BASE_URL + uploadedImages.img1,
                fileImg2URL: IMAGE_BASE_URL + uploadedImages.img2,
                fileImg3URL: IMAGE_BASE_URL + uploadedImages.img3,
                fileImg4URL: IMAGE_BASE_URL + uploadedImages.img4,
            }

            // console.log(imagePaths)
            // const imagePath = files.fileCover1[0].path
            // const imageFileName = imagePath.slice(imagePath.lastIndexOf("\\") + 1)
            // const imageURL = IMAGE_BASE_URL + imageFileName
            // console.log(imageURL)

            const product = {
                title: fields.title[0],
                genre: fields.genre[0],
                price: fields.price[0],
                developer: fields.developer[0],
                publisher: fields.publisher[0],
                date: fields.date[0],
                descriptions: fields.descriptions[0],
                imagePaths: imagePaths,
            }

            // console.log(product)

            try {
                const newProduct = await pool.query(
                    'INSERT INTO rsn_product (title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
                    [
                        product.title,
                        product.genre,
                        product.price,
                        product.developer,
                        product.publisher,
                        product.date,
                        product.descriptions,
                        product.imagePaths.fileCover1URL,
                        product.imagePaths.fileCover2URL,
                        product.imagePaths.fileBannerURL,
                        product.imagePaths.fileImg1URL,
                        product.imagePaths.fileImg2URL,
                        product.imagePaths.fileImg3URL,
                        product.imagePaths.fileImg4URL,
                    ]
                )
                res.json({ status: 'added' })
                console.log('ok')
            } catch (error) {
                console.log('fail')
            }

            // res.send({status :"OK"})
        })
    } catch (error) {
        console.log('Fail')
    }
})

//Update a product
app.put('/admin/:id', async (req, res) => {
    try {
        const productID = req.params.id
        // console.log(productID)
        let form = new multiparty.Form({ uploadDir: IMAGE_UPLOAD_DIR })
        form.parse(req, async function (err, fields, files) {
            if (err) return res.send({ status: 'Error' })

            const uploadedImages = {
                cover1: files.fileCover1[0].path.slice(
                    files.fileCover1[0].path.lastIndexOf('\\') + 1
                ),
                cover2: files.fileCover2[0].path.slice(
                    files.fileCover2[0].path.lastIndexOf('\\') + 1
                ),
                banner: files.fileBanner[0].path.slice(
                    files.fileBanner[0].path.lastIndexOf('\\') + 1
                ),
                img1: files.fileImg1[0].path.slice(
                    files.fileImg1[0].path.lastIndexOf('\\') + 1
                ),
                img2: files.fileImg2[0].path.slice(
                    files.fileImg2[0].path.lastIndexOf('\\') + 1
                ),
                img3: files.fileImg3[0].path.slice(
                    files.fileImg3[0].path.lastIndexOf('\\') + 1
                ),
                img4: files.fileImg4[0].path.slice(
                    files.fileImg4[0].path.lastIndexOf('\\') + 1
                ),
            }

            const imagePaths = {
                fileCover1URL: IMAGE_BASE_URL + uploadedImages.cover1,
                fileCover2URL: IMAGE_BASE_URL + uploadedImages.cover2,
                fileBannerURL: IMAGE_BASE_URL + uploadedImages.banner,
                fileImg1URL: IMAGE_BASE_URL + uploadedImages.img1,
                fileImg2URL: IMAGE_BASE_URL + uploadedImages.img2,
                fileImg3URL: IMAGE_BASE_URL + uploadedImages.img3,
                fileImg4URL: IMAGE_BASE_URL + uploadedImages.img4,
            }

            const product = {
                title: fields.title[0],
                genre: fields.genre[0],
                price: fields.price[0],
                developer: fields.developer[0],
                publisher: fields.publisher[0],
                date: fields.date[0],
                descriptions: fields.descriptions[0],
                imagePaths: imagePaths,
            }

            const productFile = await pool.query(
                'SELECT productid, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4 FROM rsn_product WHERE productid = $1',
                [productID]
            )
            const productDetails = productFile.rows[0]

            const directoryPath1 = productDetails.filecover1.split('/')
            const directoryPath2 = productDetails.filecover2.split('/')
            const directoryPath3 = productDetails.filebanner.split('/')
            const directoryPath4 = productDetails.fileimg1.split('/')
            const directoryPath5 = productDetails.fileimg2.split('/')
            const directoryPath6 = productDetails.fileimg3.split('/')
            const directoryPath7 = productDetails.fileimg4.split('/')

            const deletePath1 = IMAGE_UPLOAD_DIR + '/' + directoryPath1[4]
            const deletePath2 = IMAGE_UPLOAD_DIR + '/' + directoryPath2[4]
            const deletePath3 = IMAGE_UPLOAD_DIR + '/' + directoryPath3[4]
            const deletePath4 = IMAGE_UPLOAD_DIR + '/' + directoryPath4[4]
            const deletePath5 = IMAGE_UPLOAD_DIR + '/' + directoryPath5[4]
            const deletePath6 = IMAGE_UPLOAD_DIR + '/' + directoryPath6[4]
            const deletePath7 = IMAGE_UPLOAD_DIR + '/' + directoryPath7[4]

            const deletePaths = [
                deletePath1,
                deletePath2,
                deletePath3,
                deletePath4,
                deletePath5,
                deletePath6,
                deletePath7,
            ]

            const deleteImgFiles = async (paths) => {
                try {
                    const promises = paths.map((img) => unlink(img))
                    await Promise.all(promises)
                    console.log('All images deleted successfully')
                } catch (error) {
                    console.log('Delete images failed')
                }
            }

            try {
                const newProduct = await pool.query(
                    'UPDATE rsn_product SET title = $1, genre = $2, price = $3, developer = $4, publisher = $5, date = $6, descriptions = $7, filecover1 = $8, filecover2 = $9, filebanner = $10, fileimg1 = $11, fileimg2 = $12, fileimg3 = $13, fileimg4 = $14 WHERE productid = $15',
                    [
                        product.title,
                        product.genre,
                        product.price,
                        product.developer,
                        product.publisher,
                        product.date,
                        product.descriptions,
                        product.imagePaths.fileCover1URL,
                        product.imagePaths.fileCover2URL,
                        product.imagePaths.fileBannerURL,
                        product.imagePaths.fileImg1URL,
                        product.imagePaths.fileImg2URL,
                        product.imagePaths.fileImg3URL,
                        product.imagePaths.fileImg4URL,
                        productID,
                    ]
                )

                deleteImgFiles(deletePaths)
                res.json({ status: 'updated' })
                console.log('ok')
            } catch (error) {
                console.log('fail')
            }
        })
        console.log('Update success')
    } catch (error) {
        console.log('Update failed')
    }
})

//Delete a product
app.delete('/api', async (req, res) => {
    try {
        const productID = req.body.productID
        const receivedToken = req.headers.authorization
        const token = receivedToken.slice(receivedToken.lastIndexOf(' ') + 1)

        const product = await pool.query(
            'SELECT productid, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4 FROM rsn_product WHERE productid = $1',
            [productID]
        )
        const productDetails = product.rows[0]

        const directoryPath1 = productDetails.filecover1.split('/')
        const directoryPath2 = productDetails.filecover2.split('/')
        const directoryPath3 = productDetails.filebanner.split('/')
        const directoryPath4 = productDetails.fileimg1.split('/')
        const directoryPath5 = productDetails.fileimg2.split('/')
        const directoryPath6 = productDetails.fileimg3.split('/')
        const directoryPath7 = productDetails.fileimg4.split('/')

        const deletePath1 = IMAGE_UPLOAD_DIR + '/' + directoryPath1[4]
        const deletePath2 = IMAGE_UPLOAD_DIR + '/' + directoryPath2[4]
        const deletePath3 = IMAGE_UPLOAD_DIR + '/' + directoryPath3[4]
        const deletePath4 = IMAGE_UPLOAD_DIR + '/' + directoryPath4[4]
        const deletePath5 = IMAGE_UPLOAD_DIR + '/' + directoryPath5[4]
        const deletePath6 = IMAGE_UPLOAD_DIR + '/' + directoryPath6[4]
        const deletePath7 = IMAGE_UPLOAD_DIR + '/' + directoryPath7[4]

        const deletePaths = [
            deletePath1,
            deletePath2,
            deletePath3,
            deletePath4,
            deletePath5,
            deletePath6,
            deletePath7,
        ]

        const deleteImgFiles = async (paths) => {
            try {
                const promises = paths.map((img) => unlink(img))
                await Promise.all(promises)
                console.log('All images deleted successfully')
            } catch (error) {
                console.log('Delete images failed')
            }
        }

        const deleteProduct = async () => {
            const deleteQuery = await pool.query(
                'DELETE FROM rsn_product WHERE productid = $1',
                [productID]
            )
            deleteImgFiles(deletePaths)
            res.json({ status: 'Success' })
        }

        deleteProduct()

        // fs.existsSync(IMAGE_UPLOAD_DIR, function(exists){

        // })

        // console.log(req.body)
    } catch (error) {
        console.log('Delete Fail')
    }
})

//Create a USER
app.post('/user/signup', async (req, res) => {
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

        const check = await pool.query(
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
            const newAdmin = await pool.query(
                'INSERT INTO rsn_user (firstname, middlename, lastname, email, age, password, role_id) VALUES($1, $2, $3, $4, $5, $6, 2) RETURNING *',
                [firstname, middlename, lastname, email, age, hashPwd]
            )

            // Insert the user's birthday into the rsn_user_birth table
            const newUserBirthday = await pool.query(
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

app.post('/refresh', (req, res) => {
    try {
        const authHeader = req.body.headers.authorization

        const token = authHeader.slice(authHeader.lastIndexOf(' ') + 1)
        console.log(token)
        if (!token) return res.status(401).json('You are not authenticated!')

        const getRefresh = async (token) => {
            try {
                const query = await pool.query(
                    'SELECT EXISTS (SELECT 1 FROM rsn_user WHERE refreshtk = $1)',
                    [token]
                )

                const userQuery = await pool.query(
                    'SELECT userid, email FROM rsn_user WHERE refreshtk = $1',
                    [token]
                )
                const user = userQuery.rows[0]
                console.log(user)
                if (query.rows[0].exists === false) {
                    const newAccessToken = generateAccessToken(user)
                    const newRefreshToken = generateRefreshToken(user)
                    addRefreshTK(newRefreshToken, user)
                    res.json({
                        isAuthenticated: true,
                        accessUserToken: newAccessToken,
                        refreshUserToken: newRefreshToken,
                    })
                } else {
                    const newAccessToken = generateAccessToken(user)
                    console.log('New: ', newAccessToken)
                    res.json({
                        isAuthenticated: true,
                        accessUserToken: newAccessToken,
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        getRefresh(token)
    } catch (error) {
        console.log(error)
    }
})

const generateAccessToken = (user) => {
    return jwt.sign(
        { email: user.email, id: user.userid },
        JWT_SECRET_KEY
        // {expiresIn: "10s"}
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { email: user.email, id: user.userid },
        JWT_SECRET_REFRESH
        // {expiresIn : "60s"}
    )
}

const addRefreshTK = async (token, user) => {
    const query = await pool.query(
        'UPDATE rsn_user SET refreshtk = $1 WHERE userid = $2',
        [token, user.userid]
    )
}

//User Sign In
app.post('/user/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await pool.query(
            'SELECT * FROM rsn_user WHERE email = $1 AND EXISTS (SELECT 1 FROM rsn_user WHERE email = $1)',
            [email]
        )

        const registeredUser = user.rows[0]

        if (!registeredUser) {
            res.json({ isAuthenticated: false })
            console.log('Login Failed') // no email
        } else {
            if (await bcrypt.compare(password, registeredUser.password)) {
                // console.log(req.body)
                const accessToken = generateAccessToken(registeredUser)
                const refreshToken = generateRefreshToken(registeredUser)

                addRefreshTK(refreshToken, registeredUser)
                res.json({
                    isAuthenticated: true,
                    accessUserToken: accessToken,
                    refreshUserToken: refreshToken,
                })
                console.log('User login Successful')
                console.log('AT: ', accessToken)
                console.log('RT: ', refreshToken)
                console.log('Decoded token: ', jwt.decode(accessToken))
            } else {
                res.json({ isAuthenticated: false })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
})

//Get orders
app.post('/get/orders', (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)
                const productid = req.body.productid
                const query = await pool
                    .query('SELECT userid FROM rsn_user WHERE email = $1', [
                        validUser.email,
                    ])
                    .then(async (query) => {
                        const userID = query.rows[0].userid
                        const getOrders = await pool
                            .query(
                                'SELECT orderid, totalprice, ordered_at FROM rsn_order WHERE userid = $1 ORDER BY ordered_at DESC',
                                [userID]
                            )
                            .then((query) => res.json(query.rows))
                    })
            })
        }
    } catch (error) {}
})

app.post('/get/order/id', (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const orderid = req.body.orderID
                const query = await pool
                    .query(
                        'SELECT orderid, totalprice, ordered_at FROM rsn_order WHERE orderid = $1',
                        [orderid]
                    )
                    .then((query) => res.json(query.rows))
            })
        }
    } catch (error) {}
})

app.post('/get/orders/details', (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const orderid = req.body.orderID
                const query = await pool
                    .query(
                        'SELECT productid, title, price, filecover1, code FROM rsn_order NATURAL JOIN rsn_order_items NATURAL JOIN rsn_product WHERE orderid = $1',
                        [orderid]
                    )
                    .then(async (query) => {
                        res.json(query.rows)
                    })
            })
        }
    } catch (error) {}
})

app.post('/get/order/activate', (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)
                const userQuery = await pool
                    .query('SELECT userid FROM rsn_user WHERE email = $1', [
                        validUser.email,
                    ])
                    .then(async (query) => {
                        const userid = query.rows[0].userid
                        const orderQuery = await pool.query(
                            'SELECT orderid, totalprice, ordered_at FROM rsn_user NATURAL JOIN rsn_order NATURAL JOIN rsn_order_items WHERE userid = $1 ORDER BY ordered_at DESC',
                            [userid]
                        )
                        const orderDetails = orderQuery.rows[0]
                        const itemsQuery = await pool.query(
                            'SELECT productid, code, itemid, title, price, filecover1 FROM rsn_order NATURAL JOIN rsn_order_items NATURAL JOIN rsn_product WHERE orderid = $1',
                            [orderDetails.orderid]
                        )
                        const itemDetails = itemsQuery.rows
                        const responseData = [orderDetails, itemDetails]
                        res.json(responseData)
                    })
                // const query = await pool.query("SELECT productid, title, price, filecover1, code FROM rsn_order NATURAL JOIN rsn_order_items NATURAL JOIN rsn_product WHERE orderid = $1", [orderid])
                // .then(async (query) => {
                //     res.json(query.rows)
                // })
            })
        }
    } catch (error) {}
})

//Get wishlist

app.post('/get/wishlist', (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)
                const productid = req.body.productid
                const query = await pool.query(
                    'SELECT userid FROM rsn_user WHERE email = $1',
                    [validUser.email]
                )
                const userID = query.rows[0].userid
                const getQuery = await pool.query(
                    'SELECT status FROM rsn_wishlist WHERE productid = $1 AND userid = $2',
                    [productid, userID]
                )
                const wishlist = getQuery.rows[0]
                res.json(wishlist)
            })
        }
    } catch (error) {
        console.log('Failed to Fetch')
    }
})

//Wishlist a Product

app.post('/wishlist', (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)
                const productid = req.body.productid
                const query = await pool.query(
                    'SELECT userid FROM rsn_user WHERE email = $1',
                    [validUser.email]
                )
                const userID = query.rows[0].userid
                const queryWish = await pool.query(
                    'INSERT INTO rsn_wishlist(productid, userid, status) VALUES ($1, $2 , true)',
                    [productid, userID]
                )
                res.json({ status: 'Wishlisted' })
                // console.log("Added wishlist")
            })
        }
    } catch (error) {
        console.log('Fail to wishlist')
    }
})

//Unwishlist Product

app.post('/unwishlist', (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)
                const productid = req.body.productid

                const query = await pool.query(
                    'SELECT userid FROM rsn_user WHERE email = $1',
                    [validUser.email]
                )
                const userID = query.rows[0].userid
                const queryUnwish = await pool.query(
                    'DELETE FROM rsn_wishlist WHERE productid = $1 AND userid = $2',
                    [productid, userID]
                )
                // console.log(productid)
                res.json({ status: 'Unwishlisted' })
                // console.log("Deleted wishlist")
            })
        }
    } catch (error) {
        console.log('Fail to Unwishlist')
    }
})

app.post('/cart', async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)
                const { productid, title, thumb, price, total, quantity } =
                    req.body
                const selectSQL = 'SELECT userid FROM rsn_user WHERE email = $1'
                const query = await pool.query(selectSQL, [validUser.email])
                const userID = query.rows[0].userid
                const checkQuery = await pool.query(
                    'SELECT EXISTS(SELECT userid FROM rsn_user NATURAL JOIN rsn_cart WHERE userid = $1)',
                    [userID]
                )
                const check = checkQuery.rows[0].exists
                if (!check) {
                    const insertSQL =
                        'INSERT INTO rsn_cart(userid, totalcart, quantity) VALUES ($1, $2, $3)'
                    const insertQuery = await pool
                        .query(insertSQL, [userID, total, quantity])
                        .then(async () => {
                            const cartQuery = await pool.query(
                                'SELECT cartid FROM rsn_user NATURAL JOIN rsn_cart where userid = $1',
                                [userID]
                            )
                            const cartID = cartQuery.rows[0].cartid
                            const insertSubSQL =
                                'INSERT INTO rsn_inventory(cartid, productid) VALUES ($1, $2)'
                            const insertSubQuery = await pool.query(
                                insertSubSQL,
                                [cartID, productid]
                            )
                        })
                        .then(res.json({ status: 'added' }))
                } else {
                    const cartQuery = await pool.query(
                        'SELECT cartid FROM rsn_user NATURAL JOIN rsn_cart where userid = $1',
                        [userID]
                    )
                    const cartID = cartQuery.rows[0].cartid
                    const updateSQL =
                        'UPDATE rsn_cart SET totalcart = $1, quantity = $2 WHERE cartid = $3'
                    const updateQuery = await pool
                        .query(updateSQL, [total, quantity, cartID])
                        .then(async () => {
                            const insertSubSQL =
                                'INSERT INTO rsn_inventory(cartid, productid) VALUES ($1, $2)'
                            const insertSubQuery = await pool.query(
                                insertSubSQL,
                                [cartID, productid]
                            )
                        })
                        .then(res.json({ status: 'updated' }))
                }

                // console.log(productid)

                // console.log("Deleted wishlist")
            })
        }
    } catch (error) {
        console.log('Add to cart failed')
    }
})

//Get Cart Info

app.post('/cart/info', async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, cartInfo) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)

                const selectSQL = 'SELECT userid FROM rsn_user WHERE email = $1'
                const query = await pool.query(selectSQL, [validUser.email])
                const userID = query.rows[0].userid

                const selectCartSQL =
                    'SELECT cartid, totalcart, quantity FROM rsn_user NATURAL JOIN rsn_cart WHERE userid = $1'
                const selectCartQuery = await pool.query(selectCartSQL, [
                    userID,
                ])
                res.json(selectCartQuery.rows[0])
            })
        }
    } catch (error) {
        console.log('failed')
    }
})

app.post('/cart/inventory/info', async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, cartInfo) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)

                const selectSQL =
                    'SELECT EXISTS (SELECT cartid FROM rsn_user NATURAL JOIN rsn_cart WHERE email = $1)'
                const query = await pool.query(selectSQL, [validUser.email])
                if (query.rows[0].exists === false) {
                    return
                } else {
                    const selectCart = await pool.query(
                        'SELECT cartid FROM rsn_user NATURAL JOIN rsn_cart WHERE email = $1',
                        [validUser.email]
                    )
                    const cartID = selectCart.rows[0].cartid
                    const selectInventSQL =
                        'SELECT inventid, productid, title, filecover1, price from rsn_product NATURAL JOIN rsn_inventory WHERE cartid = $1'
                    const selectInventQuery = await pool.query(
                        selectInventSQL,
                        [cartID]
                    )
                    res.json(selectInventQuery.rows)
                }
            })
        }
    } catch (error) {
        console.log('failed')
    }
})

//Remove Product from Cart

app.delete('/cart/remove', async (req, res) => {
    try {
        const removeProduct = async () => {
            const { price, inventid, cartid, quantity } = req.body
            const deleteQuery = await pool
                .query(
                    'DELETE FROM rsn_inventory WHERE inventid = $1 AND cartid = $2',
                    [inventid, cartid]
                )
                .then(async () => {
                    const updateQuery = await pool.query(
                        'UPDATE rsn_cart SET totalcart = totalcart - $1,  quantity = $2 WHERE cartid = $3',
                        [price, quantity, cartid]
                    )
                })
                .then(() => res.json({ status: 'Success' }))
        }
        removeProduct()
    } catch (error) {}
})

const generateCode = () => {
    var chars = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
    ]

    function generateString() {
        var result = ''
        for (var i = 0; i < 5; i++) {
            result += chars[Math.floor(Math.random() * 36)]
        }
        return result
    }

    var string = ''
    for (var i = 0; i < 3; i++) {
        if (string === '') {
            string += generateString()
        } else {
            string += '-' + generateString()
        }
    }

    return string
}

// cron.schedule("0 0 * * *", async () => {
//     console.log("Sending birthday discount emails...");
//     await sendBirthdayDiscount();
//     console.log("Birthday discount emails sent.");
// });

const dateTimeString = '2023-05-21T13:41:00.000+07:00'
const scheduledDate = new Date(dateTimeString)

const job = schedule.scheduleJob(scheduledDate, async () => {
    console.log('Sending birthday discount emails...')
    await sendBirthdayDiscount()
    console.log('Birthday discount emails sent.')
})

app.post('/pay', (req, res) => {
    try {
        const authHeader = req.headers.authorization

        const card = {
            cardNumb: req.body.creditNumb,
            cardName: req.body.creditName,
            cardDate: req.body.creditDate,
            cardCVC: req.body.creditCVC,
        }
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, JWT_SECRET_KEY, async (err, cartInfo) => {
                if (err) {
                    return res.status(401).json('Token is not valid.')
                }
                const validUser = jwt.decode(token)
                const checkCard = async () => {
                    try {
                        const checkQuery = await pool.query(
                            'SELECT EXISTS (SELECT 1 FROM rsn_credit WHERE creditnumber = $1 AND creditname = $2 AND creditdate = $3 AND creditcvc = $4)',
                            [
                                card.cardNumb,
                                card.cardName,
                                card.cardDate,
                                card.cardCVC,
                            ]
                        )
                        const result = checkQuery.rows[0].exists
                        console.log(result)
                        if (result === false) {
                            res.json({ status: 'invalid card' })
                        } else {
                            const price = req.body.totalPrice
                            const quantity = req.body.quantity

                            const transaction = async () => {
                                const amountQuery = await pool
                                    .query(
                                        'UPDATE rsn_credit SET amount = amount - $1',
                                        [price]
                                    )
                                    .then(async () => {
                                        const userQuery = await pool
                                            .query(
                                                'SELECT userid FROM rsn_user WHERE email = $1',
                                                [validUser.email]
                                            )
                                            .then(async (userQuery) => {
                                                const userid =
                                                    userQuery.rows[0].userid
                                                const insertOrder = await pool
                                                    .query(
                                                        'INSERT INTO rsn_order(userid, totalprice, quantity) VALUES ($1, $2, $3)',
                                                        [
                                                            userid,
                                                            price,
                                                            quantity,
                                                        ]
                                                    )
                                                    .then(async () => {
                                                        const getOrderDetails =
                                                            await pool.query(
                                                                'SELECT orderid FROM rsn_user NATURAL JOIN rsn_order where userid = $1 ORDER BY ordered_at DESC LIMIT 1',
                                                                [userid]
                                                            )
                                                        const orderID =
                                                            getOrderDetails
                                                                .rows[0].orderid
                                                        const items =
                                                            req.body.order
                                                        for (
                                                            let i = 0;
                                                            i < quantity;
                                                            i++
                                                        ) {
                                                            const code =
                                                                generateCode()
                                                            const insertItem =
                                                                async () => {
                                                                    const insertOrderItem =
                                                                        await pool.query(
                                                                            'INSERT INTO rsn_order_items (productid, orderid, code) VALUES ($1, $2, $3)',
                                                                            [
                                                                                items[
                                                                                    i
                                                                                ]
                                                                                    .productid,
                                                                                orderID,
                                                                                code,
                                                                            ]
                                                                        )
                                                                }
                                                            insertItem()
                                                        }
                                                    })
                                                    .then(async () => {
                                                        const getCart =
                                                            await pool
                                                                .query(
                                                                    'SELECT cartid FROM rsn_cart NATURAL JOIN rsn_user WHERE userid = $1',
                                                                    [userid]
                                                                )
                                                                .then(
                                                                    async (
                                                                        getCartQuery
                                                                    ) => {
                                                                        const cartID =
                                                                            getCartQuery
                                                                                .rows[0]
                                                                                .cartid
                                                                        const deleteInventoryQuery =
                                                                            await pool
                                                                                .query(
                                                                                    'DELETE FROM rsn_inventory WHERE cartid = $1',
                                                                                    [
                                                                                        cartID,
                                                                                    ]
                                                                                )
                                                                                .then(
                                                                                    async () => {
                                                                                        const deleteCartQuery =
                                                                                            await pool.query(
                                                                                                'DELETE FROM rsn_cart WHERE cartid = $1',
                                                                                                [
                                                                                                    cartID,
                                                                                                ]
                                                                                            )
                                                                                    }
                                                                                )
                                                                    }
                                                                )
                                                    })
                                            })
                                    })
                                    .then(() => {
                                        res.json({
                                            status: 'Purchased successfull!',
                                        })
                                    })
                            }
                            try {
                                const checkQuery = async () => {
                                    const checkAmountQuery = await pool
                                        .query(
                                            'SELECT amount FROM rsn_credit WHERE creditnumber = $1 AND creditname = $2 AND creditdate = $3 AND creditcvc = $4',
                                            [
                                                card.creditNumb,
                                                card.creditName,
                                                card.creditDate,
                                                card.creditCVC,
                                            ]
                                        )
                                        .then((check) => {
                                            const checkAmount =
                                                check.rows[0].amount - price

                                            if (checkAmount < 0) {
                                                res.json({
                                                    status: 'Insufficient fund',
                                                })
                                            } else {
                                                transaction()
                                            }
                                        })
                                }

                                transaction()
                            } catch (error) {}
                        }
                    } catch (error) {
                        console.log(error.message)
                    }
                }

                checkCard()
            })
        }
    } catch (error) {
        console.log('Failed to connect!')
    }
})

app.post('/sso', async (req, res) => {
    try {
        res.json({ status: 'fetched' })
        console.log(req.body)
    } catch (error) {
        console.log('Failed')
    }
})

app.listen(5000, () => {
    console.log('Server started on PORT 5000')
})
