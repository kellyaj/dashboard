kelvinToFahrenheit = function(kelvin_temp) {
  return Math.floor((kelvin_temp - 273) * 1.8 + 32);
};

$.ajax({
  url: "http://api.openweathermap.org/data/2.5/weather?q=chicago,il"
}).done(function(data) {
  var kelvin_temp = data.main.temp;
  var fahrenheit_temp = kelvinToFahrenheit(kelvin_temp);
  $('[data-id=temp]').html("Temp: " + fahrenheit_temp)
});

