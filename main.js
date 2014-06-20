kelvinToFahrenheit = function(kelvinTemp) {
  return Math.floor((kelvinTemp - 273) * 1.8 + 32);
};

createSiteListItem = function(site) {
  var html = '<li class="site-list-item"> <a href="';
  html += site.url + '">' + site.title + '</a></li>';
  return html;
}

createNYTimesListItem = function(article) {
  var html = '<li class="nyt-list-item"><h2><a href="';
  html += article.url + '">' + article.title + '</a></h2><h3>' + article.abstract  + '</h3></li>';
  return html;
}

displayTopSites = function(data) {
  var sites = data.slice(0, 10);
  for (var i = 0; i < sites.length; i++) {
    $('[data-id=top-site-list]').append(createSiteListItem(sites[i]));
  }
};

displayMostVisitedNews = function(data) {
  var articles = data.results.slice(0, 15);
  for (var i = 0; i < articles.length; i++) {
    $('[data-id=news-list]').append(createNYTimesListItem(articles[i]));
  }
}

getMostViewedNews = function() {
  var ki = "ea0e2bd3b4b7853db2a2a28bb7d75817:5:69507214";
  var uri = "http://api.nytimes.com/svc/mostpopular/v2/mostemailed/all-sections/1.json?api-key=";
  $.ajax({
    url: uri + ki
  }).done(function(data) {
    displayMostVisitedNews(data);
  });
}

setFormattedDateTimes = function() {
  var currentDateTime = new Date();
  $('[data-id=local-date]').html(currentDateTime.toDateString());
  $('[data-id=local-time]').html(currentDateTime.toLocaleTimeString());
}

chrome.topSites.get(displayTopSites);
getMostViewedNews();
setFormattedDateTimes();
window.setInterval(setFormattedDateTimes, 1000);


navigator.geolocation.getCurrentPosition(function(position) {
  displayWeather(position.coords.latitude, position.coords.longitude);
});

displayWeather = function(latitude, longitude) {
  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude;
  $('[data-id=weather-description]').html("Loading...");
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
};
