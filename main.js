kelvinToFahrenheit = function(kelvinTemp) {
  return Math.floor((kelvinTemp - 273) * 1.8 + 32);
};

navigator.geolocation.getCurrentPosition(function(position) {
  requestWeather(position.coords.latitude, position.coords.longitude);
});

requestWeather = function(latitude, longitude) {
  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude;
  $.ajax({
    url: requestUrl
  }).done(function(data) {
    var weatherInfo = data.weather[0];
    var description = weatherInfo.description;
    var kelvinTemp = data.main.temp;
    var fahrenheitTemp = kelvinToFahrenheit(kelvinTemp);
    var weatherIconUrl = "http://openweathermap.org/img/w/" + weatherInfo.icon + ".png";
    var degreeHex = '\xB0';
  $('[data-id=weather-icon]').attr("src", weatherIconUrl);
  $('[data-id=temp]').html(fahrenheitTemp + degreeHex);
  $('[data-id=weather-description]').html(description.toUpperCase());
  })
}
