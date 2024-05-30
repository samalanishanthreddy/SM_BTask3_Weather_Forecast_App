const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const apiKey = '68e2375dccd9569ea7a4805894502846'; // Replace with your actual API key

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await axios.get(currentWeatherUrl);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from OpenWeatherMap:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response received from OpenWeatherMap' });
        } else {
            res.status(500).json({ error: 'Error in setting up request to OpenWeatherMap' });
        }
    }
});

app.get('/forecast', async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        const response = await axios.get(forecastUrl);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from OpenWeatherMap:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response received from OpenWeatherMap' });
        } else {
            res.status(500).json({ error: 'Error in setting up request to OpenWeatherMap' });
        }
    }
});

app.get('/five-day-forecast', async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        const response = await axios.get(forecastUrl);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from OpenWeatherMap:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response received from OpenWeatherMap' });
        } else {
            res.status(500).json({ error: 'Error in setting up request to OpenWeatherMap' });
        }
    }
});

app.use(express.static('public')); // Serve static files from the 'public' directory

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
