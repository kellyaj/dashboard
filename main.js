kelvinToFahrenheit = function(kelvinTemp) {
  return Math.floor((kelvinTemp - 273) * 1.8 + 32);
};

$.ajax({
  url: "http://api.openweathermap.org/data/2.5/weather?q=chicago,il"
}).done(function(data) {
  var weatherInfo = data.weather[0];
  var description = weatherInfo.description;
  var kelvinTemp = data.main.temp;
  var fahrenheitTemp = kelvinToFahrenheit(kelvinTemp);
  var weatherIconUrl = "http://openweathermap.org/img/w/" + weatherInfo.icon + ".png";
  $('[data-id=weather-icon]').attr("src", weatherIconUrl);
  $('[data-id=temp]').html(fahrenheitTemp);
  $('[data-id=weather-description]').html(description);
});

