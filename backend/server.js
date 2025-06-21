const express = require('express'); 
const app = express();
const cors = require('cors');
const port = 3000;
require('dotenv').config();

const corsOptions = {
  origin: ['http://127.0.0.1:5500'],
  methods: ['GET'],
};

app.use(cors(corsOptions));

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

app.get('/weather/secrets', (req, res) => {
  res.json({
    baseUrl: baseUrl,
    apikey: apiKey
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});