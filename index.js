
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
  
var Publishable_Key = 'pk_test_51IxnUXSAENKELn7ZkBzxEAJpLzMX6Egaus5tEppzbPFJa8k5OIJ1QAcs1u7tIoV1e8yzzzdUCgtJFc0EgLYboVlm006qjKkmpx'
var Secret_Key = 'sk_test_51IxnUXSAENKELn7ZwgGwtzlXCxL5wJyF0NZQT7AzHinyH1L2pcaq6ZPrJ060UGfk3wM1426Wl3JK8xJJqRXULNRn00Avcd16Ag'
  
const stripe = require('stripe')(Secret_Key)
  
const port = process.env.PORT || 3000
  
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
  
app.get('/', function(req, res){
    res.render('Home', {
       key: Publishable_Key
    })
})
  
app.post('/payment', function(req, res){
  
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        

        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Akhilesh Sharma',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Mohali',
            state: 'Punjab',
            country: 'India',
        }

        
    })
    .then((customer) => {
  
        return stripe.charges.create({
            amount: 2500,     // Charing Rs 25
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        console.log(charge,'charge')
        // res.send("Success")  // If no error occurs
        res.send(charge)  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
})
  
app.listen(port, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})