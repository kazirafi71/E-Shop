const stripe = require("stripe")("sk_test_51IdJvdBzZltJAI2j4CSp1uGNqeD2SFTDmm7V8mL2eLkpIZ1TAnPEXYTXIG4EBRcjHO40XWslh865Yi3jIR9HuZoE00hdNg2qAw");
const Payment=require('../models/paymentModel')

module.exports.checkOutController = async (req, res, next) => {

    try {

        const {
            token,
            price,
            product_info
        } = req.body
        // console.log(product_info)
        // console.log(token.email)
        // console.log(price)
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
          });

          const charge = await stripe.charges.create({
            amount: price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, );

        const info=new Payment({
            email: token.email,
            price,
            product_info
        })
        info.save()
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
        
        

    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: "Error Occurred"
        })

    }


}


module.exports.viewOrderController=async (req,res)=>{
    try {

        const order=await  Payment.find()
        return res.status(201).json({
            order
        })
        
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: "Error Occurred"
        })

    }
}