const express = require('express'); 
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 3000;
require('dotenv').config();

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
const FRONT_END_URL = process.env.FRONT_END_URL;

app.use(express.json());

const corsOptions = {
  origin: [FRONT_END_URL],
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

app.post('/weather', async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    const response = await axios.get(baseUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: 'Failed to fetch weather data'
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});