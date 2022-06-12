const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Abdullah Malik',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Abdullah Malik',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address',
    });
  }
  geocode(req.query.address, (locationError, { latitude, longitude, location } = {}) => {
    if (locationError) {
      return res.send(locationError);
    }

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send(forecastError);
      }
      return res.send({
        address: req.query.address,
        location,
        forecast: forecastData,
      });
    });
    return 0;
  });
  return 0;
});

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Abdullah Malik',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
