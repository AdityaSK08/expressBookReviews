const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Set up session management for customer routes
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
}));

// Middleware for authentication
app.use("/customer/auth/*", function auth(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header
    
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token required' });
    }

    // Verify the access token
    jwt.verify(accessToken, 'your_jwt_secret', (err, user) => { // Replace 'your_jwt_secret' with your secret key
        if (err) {
            return res.status(403).json({ message: 'Invalid access token' });
        }

        // Store user info in the session
        req.session.user = user; // Save user data to session
        next(); // Proceed to the next middleware/route handler
    });
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
