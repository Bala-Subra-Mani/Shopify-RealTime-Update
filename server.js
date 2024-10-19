const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware to verify Shopify webhook signature
const verifyShopifyWebhook = (req, res, next) => {
    const hmac = req.headers['x-shopify-hmac-sha256'];
    const generatedHash = crypto
        .createHmac('sha256', process.env.SHOPIFY_SECRET)
        .update(JSON.stringify(req.body))
        .digest('base64');

    if (generatedHash === hmac) {
        next();
    } else {
        return res.status(401).send('Unauthorized');
    }
};

// Webhook endpoint
app.post('/webhooks/orders/create', verifyShopifyWebhook, (req, res) => {
    console.log('Received order create webhook:', req.body);
    // Process the webhook data as needed
    res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
