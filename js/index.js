function getWeather(json) {
  $("#location").html(JSON.stringify(json.current_observation.display_location.full).slice(1, -1));
  $(".icon").attr("src", "http://icons.wxug.com/i/c/a/" + JSON.stringify(json.current_observation.icon).slice(1, -1) + ".gif");
  $(".icon").attr("alt", JSON.stringify(json.current_observation.weather).slice(1, -1));
  $("#condition").html(JSON.stringify(json.current_observation.weather).slice(1, -1));
  $("#temp").html(JSON.stringify(json.current_observation.temp_f) + "°F");
  $("#humidity").html("Humidity: " + JSON.stringify(json.current_observation.relative_humidity).slice(1, -1));
  $("#dewpoint").html("Dewpoint: " + JSON.stringify(json.current_observation.dewpoint_f) + "°F");
  $("#wind").html("Wind: " + JSON.stringify(json.current_observation.wind_dir).slice(1, -1) + " " + JSON.stringify(json.current_observation.wind_mph) + " MPH");
  $("#visibility").html("Visibility: " + JSON.stringify(json.current_observation.visibility_mi).slice(1, -1) + " miles");
  $("#precip").html("Today's precipitation: " + JSON.stringify(json.current_observation.precip_today_in).slice(1, -1) + " in");
}

function switchUnits(json, imp) {
  //console.log(imp);
  if (imp) {
    $("#temp").html(JSON.stringify(json.current_observation.temp_f) + "°F");
    $("#dewpoint").html("Dewpoint: " + JSON.stringify(json.current_observation.dewpoint_f) + "°F");
    $("#wind").html("Wind: " + JSON.stringify(json.current_observation.wind_dir).slice(1, -1) + " " + JSON.stringify(json.current_observation.wind_mph) + " MPH");
    $("#visibility").html("Visibility: " + JSON.stringify(json.current_observation.visibility_mi).slice(1, -1) + " miles");
    $("#precip").html("Today's precipitation: " + JSON.stringify(json.current_observation.precip_today_in).slice(1, -1) + " in");
    return false;
  } else {
    $("#temp").html(JSON.stringify(json.current_observation.temp_c) + "°C");
    $("#dewpoint").html("Dewpoint: " + JSON.stringify(json.current_observation.dewpoint_c) + "°C");
    $("#wind").html("Wind: " + JSON.stringify(json.current_observation.wind_dir).slice(1, -1) + " " + JSON.stringify(json.current_observation.wind_kph) + " KPH");
    $("#visibility").html("Visibility: " + JSON.stringify(json.current_observation.visibility_km).slice(1, -1) + " km");
    $("#precip").html("Today's precipitation: " + JSON.stringify(json.current_observation.precip_today_metric).slice(1, -1) + " mm");
    return true;
  }
}

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var locLat = position.coords.latitude;
      var locLon = position.coords.longitude;
      //console.log(locLat);
      
      var myJson;
      var imp = false;
      $.ajax({
        url: "http://api.wunderground.com/api/**API KEY HERE**/geolookup/conditions/q/" + locLat + "," + locLon + ".json",
        async: false,
        dataType: 'json',
        success: function(data) {
          myJson = data;
        }
      });

      getWeather(myJson);
      $("#switch").on("click", function() {
        imp = switchUnits(myJson, imp);
      });
    });
  }

});