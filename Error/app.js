// app.js
const express = require('express');
const app = express();
const expressError = require('./expressError.js');
const port = 3000;

// Route that intentionally throws an error
app.get('/err', (req, res, next) => {
    try {
        abc = abc
        // Intentional error to demonstrate custom error handling
        throw new expressError(401, 'Custom Error Message');
    } catch (err) {
        next(err); // Pass error to the next middleware
    }
});

// Catch-all route for undefined routes
app.use((req, res, next) => {
    const err = new expressError(404, 'Page Not Found');
    next(err); // Pass error to the error handling middleware
});

// Custom error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500; // Default to 500 if status is not set
    const message = err.message || 'Internal Server Error'; // Default message

    res.status(status).send(message); // Send the custom error message
});

// Start the server
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
