const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mogin Daniloff'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mogin Daniloff'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat animi odio, ducimus id deserunt illo porro molestiae. Numquam, deleniti molestias.',
        name: 'Mogin Daniloff'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error!',
        errorMessage: 'Help article not found',
        name: 'Mogin Daniloff'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error!',
        errorMessage: 'Page not found',
        name: 'Mogin Daniloff'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});