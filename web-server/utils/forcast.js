const request = require('request');

const forcast = (lat, long, callback) => {
  const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ encodeURIComponent(lat)+"&lon="+encodeURIComponent(long)+"&%20exclude=hourly,daily&appid=8cf32592cbe1014b3d55d37707a9a9c5";

  request({ url, json: true}, (error, { body }) => {
      if(error){
          callback("Unabale to connect to weather services", undefined);
      } else if (body.error) {
          callback("Unable to find location, Try again!", undefined);
      } else {
          callback(undefined, `${body.daily[0].weather[0].description}, It is currently ${body.current.temp} degrees out. There is ${body.hourly[0].pop}% chance that it will rain`)
      }
  })
} 

module.exports = forcast;