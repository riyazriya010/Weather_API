require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3001;

//setting template engine
app.set('view engine', 'ejs');


//Serve the public folder as static folder
app.use(express.static('public'));


// Render the index template with default values for weather and error
app.get('/',(req,res) => {

    res.render('index',{weather: null, error: null});

});


// Handle the /weather route
app.get('/weather', async (req,res) => {

    // Get the city from the query parameters
    const city = req.query.city

    //Api key
    const apiKey = process.env.API_KEY;

    // Add your logic here to fetch weather data from the API
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    let weather;
    let error = null;

    try{
        //fetching data through api
        const response = await axios.get(apiUrl);

        weather = response.data;

       // console.log(weather);

    }catch (err) {

        if(err.response && err.response.status === 404){
            error = 'City not found'
        } else{
            error = 'Error fetching weather data, Please try again later'
        }
        console.log('Error:', error);

        weather = null;
       // error = 'Error, please try again';

    }
    console.log(error)
      // Render the index template with the weather data and error message
    res.render('index', {weather, error});
});


app.listen(PORT, (error) => {
    if(error) throw error;
    console.log(`Server is running on PORT ${PORT}`);
});