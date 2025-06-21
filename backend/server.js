const express = require('express'); 
const app = express();
const cors = require('cors');
const port = 3000;
require('dotenv').config();

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
const FRONT_END_URL = process.env.FRONT_END_URL;

const corsOptions = {
  origin: [FRONT_END_URL],
  methods: ['GET'],
};

app.use(cors(corsOptions));



app.get('/weather/secrets', (req, res) => {
  res.json({
    baseUrl: baseUrl,
    apikey: apiKey
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});