const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

let payment_details = [];
let count = 0;
const tax_id = "txr_1MnaCAB1sRKdcQ9KcEPh9r6l";
const service_id = "txr_1MnaBaB1sRKdcQ9KJ6jkjHH4";

exports.checkout = async (req, res, next) => {
    try{
        let customers_emails = [];
        req.body.guest_info.map(guest => {
            customers_emails.push(guest.email);
        })
        let customers_name = [];
        req.body.guest_info.map(guest => {
            customers_name.push(guest.first_name + "+" + guest.last_name);
        })
        let customers_phone = [];
        req.body.guest_info.map(guest => {
            customers_phone.push(guest.phone_no);
        })
        let total_guests = [];
        req.body.guest_info.map(guest => {
            total_guests.push(guest.total_guests);
        })
        const session = await stripe.checkout.sessions.create({
            client_reference_id: req.body.user_id,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.guest_info.map(guest => {
                count += 1;  
                return{
                    quantity: 1,
                    price_data: {
                        currency: 'usd',
                        unit_amount: req.body.room_price * req.body.total_nights * 100,
                        product_data: {
                            name: 'Room ' + count,
                            description: guest.first_name + " " + guest.last_name + ", " + req.body.total_nights + " Nights",
                            images: [req.body.image]
                        },
                    },
                    tax_rates: [service_id, tax_id], 
                }
            }),
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                hotel_id: req.body.hotel_id,
                customers_emails: customers_emails.join("~"),
                customers_name: customers_name.join("~"),
                customers_phone: customers_phone.join("~"),
                checkin: req.body.checkin,
                checkout: req.body.checkout,
                total_guests: total_guests.join("~")
            },
            success_url: 'https://localhost:3000/success_url',
            cancel_url: 'https://localhost:3000/cancel_url',
        })
        res.json({url: session.url});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Checkout failed"});
    }
};

exports.pay = async (request, response, next) => {    
    count += 1;
    let event;
    try {
        const payloadString = JSON.stringify(request.body, null, 2);
        const secret = "whsec_260b6b845bb043a724ec5333a1f853b28d0b35859d958679dd27a10fa5743bdc";

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });
        event = stripe.webhooks.constructEvent(payloadString, header, secret);

    } catch (err) {
        response.status(400).json({"Webhook Error": err});
        return;
    }
    window.setTimeout(() => {}, 3000);
    switch (event.type) {
        case 'charge.succeeded':
            const chargeSucceeded = event.data.object;
            payment_details["amount"] = chargeSucceeded.amount;
            payment_details["charge_id"] = chargeSucceeded.id;
            payment_details["balance_transaction"] = chargeSucceeded.balance_transaction;
            payment_details["payment_intent"] = chargeSucceeded.payment_intent;
            payment_details["payment_method"] = chargeSucceeded.payment_method;
            payment_details["email"] = chargeSucceeded.billing_details.email;
            payment_details["name"] = chargeSucceeded.billing_details.name;
            payment_details["postal_code"] = chargeSucceeded.billing_details.address.postal_code;
            payment_details["card"] = chargeSucceeded.payment_method_details.card.last4;
            break;
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            payment_details["checkout_id"] = checkoutSessionCompleted.id;
            payment_details["user_id"] = checkoutSessionCompleted.client_reference_id;
            payment_details["guests_emails"] = checkoutSessionCompleted.metadata.customers_emails;
            payment_details["guests_name"] = checkoutSessionCompleted.metadata.customers_name;
            payment_details["guests_phone"] = checkoutSessionCompleted.metadata.customers_phone;
            payment_details["phone"] = checkoutSessionCompleted.customer_details.phone;
            break;
        case 'payment_intent.created':
            const paymentIntentCreated = event.data.object;
            break;
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    if(count == 4){
        console.log(payment_details);
        count = 0;
        payment_details = [];
    }
    response.status(200).json({event: event});
};