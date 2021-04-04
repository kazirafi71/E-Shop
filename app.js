const express = require('express')
const mongoose = require('mongoose');
const {
    MONGO_URI
} = require('./config/keys');
var bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const authRoute = require('./route/authRoutes')
const fileRoute = require('./route/fileUpload')
const categoryRoute = require('./route/categoryRoute')
const productRoute = require('./route/productRoute')
const productInfoRoute = require('./route/productOperation')
const cartRoute = require('./route/cartRoute')



const app = express()
const PORT = process.env.PORT || 5000


//middleware

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

//routes

app.use('/auth', authRoute)
// app.use('/', fileRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/admin/product', productInfoRoute)
app.use('/cart', cartRoute)







//TODO: For deployment

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(() => {

        console.log('Database connected...')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(err => {
        // console.log(err)
        console.log('Error occurred')
    })