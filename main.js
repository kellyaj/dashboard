kelvinToFahrenheit = function(kelvin_temp) {
  return Math.floor((kelvin_temp - 273) * 1.8 + 32);
};

$.ajax({
  url: "http://api.openweathermap.org/data/2.5/weather?q=chicago,il"
}).done(function(data) {
  var weatherInfo = data.weather[0];
  var description = weatherInfo.description;
  var kelvin_temp = data.main.temp;
  var fahrenheit_temp = kelvinToFahrenheit(kelvin_temp);
  var weatherIconUrl = "http://openweathermap.org/img/w/" + weatherInfo.icon + ".png";
  $('[data-id=weather-icon]').attr("src", weatherIconUrl);
  $('[data-id=temp]').html(fahrenheit_temp);
  $('[data-id=weather-description]').html(description);
});

