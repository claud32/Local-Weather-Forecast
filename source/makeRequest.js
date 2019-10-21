"strict mode";

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {

  //x is the input place 
  //z is the input after removing white space
	let apiKey = "1d3912305a9b007a0d346096f0b7dc78";
  var x = document.getElementById("inputPlace").value;
  var debug1 = document.getElementById("debug1");
  
  let k = x.indexOf(",");
  if (k == -1){
    x = x + ",US";
    x = x.replace(/\s/g, "");
  }
  else{
    x = x.substring(0,k) + ",US";
    x = x.replace(/\s/g, "");
  }

   let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q="+x+"&units=imperial&APPID=" + apiKey;
   // debug1.innerHTML =  url;
  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string 
      let object = JSON.parse(responseStr);  // turn it into an object
      let list = object["list"];

      var i;
      for (i = 0; i < 6; i++) { 
        let timeRaw = list[i]["dt_txt"].substring(11,13);
        //let temperatureFahrenheit = list[0]["main"]["temp"];
        let time = (parseInt(timeRaw) + 17) % 24;
        let timeString = time + " PM";
        let temperatureFahrenheit = list[i].main.temp + "°";
        let weatherIcon = "../assets/" + weatherIdMap(list[i].weather[0].icon) + ".svg";

        // console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted

        var Times= document.getElementsByClassName("time");
        var Icons= document.getElementsByClassName("icon");
        var Temperatures= document.getElementsByClassName("temperature");

        Times[i].innerHTML = timeString;
        Icons[i].src = weatherIcon;
        Temperatures[i].innerHTML = temperatureFahrenheit;
      }

  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}


function weatherIdMap(name){
  var iconName;
  switch(name){
    case "01d":
      iconName = "clearsky";
      break;
    case "01n":
      iconName = "clear-night";
      break;
    case "02d":
      iconName = "fewclouds-day";
      break;
    case "02n":
      iconName = "fewclouds-night";
      break;
    case "03d":
    case "03n":
      iconName = "scatteredclouds";
      break;
    case "10d":
      iconName = "rain-day";
      break;
    case "10n":
      iconName = "rain-night";
      break; 
    case "04d":
    case "04n":
      iconName = "brokencloud";
      break;
    case "09d":
    case "09n":
      iconName = "showerrain";
      break;
    case "13d":
    case "13n":
      iconName = "snow";
      break;
    case "11d":
    case "11n":
      iconName = "thunderstorms";
      break;
    case "50d":
    case "50n":
      iconName = "mist";
      break;
  }
  return iconName;
}
// run this code to make request when this script file gets executed 
// makeCorsRequest();
