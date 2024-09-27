const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const min = 15;
    const max = 45;

    const notifications = Math.floor(Math.random() * (max - min + 1)) + min;
    const jobs = Math.floor(Math.random() * (max - min + 1)) + min;
    const messages = Math.floor(Math.random() * (max - min + 1)) + min;
    const networks = Math.floor(Math.random() * (max - min + 1)) + min;
    res.json({
        notifications: notifications,
        jobs: jobs,
        messages: messages,
        networks, networks
    });
});

module.exports = router;