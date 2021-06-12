const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forcast = require('../utils/forcast.js');
const geocode = require('../utils/geocode.js');


const app = express();
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Edward Nagai"
    });
})
app.get('/product', (req, res) => {
   if(!req.query.search) {
      return res.send({
           error: "You must provide a search term"
       });
   }
    res.send({
        product: []
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Edward Nagai"
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must enter an adress"
        });
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({error});
        }

        forcast(lat, long, (error, forcastData) => {
            if(error) {
                return res.send({error});
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        });
    })
    // res.send({
    //     "forecast": "Cloudy outside",
    //     "location": "Dodowa, Accra, Ghana",
    //     address: req.query.address
    // });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Edward Nagai",
        errorMessage: "Page not found"
    })
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})