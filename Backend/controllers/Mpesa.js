import axios from "axios";

// Step 1: get an access token from Safaricom (Daraja sandbox)
export const createToken = async (req, res, next) =>{
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        const response = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    authorization: `Basic ${auth}`
                }
            }
        );
        // pass the token to the next function (stkPush)
        req.mpesaToken = response.data.access_token;
        next();
    } catch (error) {
        res.status(400).json({msg: "Could not get M-Pesa token"});
    }
}

// Step 2: send the STK push (the pop-up on the member's phone asking for their PIN)
export const stkPush = async (req, res) =>{
    const {phone, amount} = req.body;
    if(!phone || !amount) return res.status(400).json({msg: "Phone and amount are required"});

    // change 0712345678 into 254712345678
    const phoneNumber = "254" + phone.substring(1);
    const shortCode = process.env.MPESA_SHORTCODE;
    const passKey = process.env.MPESA_PASSKEY;

    const date = new Date();
    const timeStamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const password = Buffer.from(shortCode + passKey + timeStamp).toString("base64");

    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "Group Savings",
        TransactionDesc: "Savings contribution"
    };

    try {
        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            data,
            {
                headers: {
                    authorization: `Bearer ${req.mpesaToken}`
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({msg: "STK push failed"});
    }
}
