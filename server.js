const express = require('express');
const request = require('request');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://cheerful-maamoul-ba5e46.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/bios/:username', (req, res) => {
  const { username } = req.params;
  const url = `https://torre.bio/api/bios/${username}`;
  request(url, (error, response, body) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: 'Error retrieving user data' });
    }
    const data = JSON.parse(body);
    res.status(200).send(data);
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
