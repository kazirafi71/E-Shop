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
const paymentRoute=require('./route/paymentRoute')



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

// app.post("/checkout", async (req, res) => {
//     console.log("Request:", req.body);

    
//     try {
//         const {
//             product,
//             token
//         } = req.body;

//         console.log(product,token)

//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });

//         // const idempotency_key = uuid();
//         const charge = await stripe.charges.create({
//             amount: product * 100,
//             currency: "usd",
//             customer: customer.id,
//             receipt_email: token.email,
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                     line1: token.card.address_line1,
//                     line2: token.card.address_line2,
//                     city: token.card.address_city,
//                     country: token.card.address_country,
//                     postal_code: token.card.address_zip
//                 }
//             }
//         }, );
        
        
//     } catch (error) {
//         console.error("Error:", error);
       
//     }

//     res.json({
//         error,
//         status
//     });
// });

app.use('/auth', authRoute)
// app.use('/', fileRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/admin/product', productInfoRoute)
app.use('/cart', cartRoute)
app.use('/payment',paymentRoute)







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