var fetch = require('node-fetch');
var variables = require('./env.js');
var LAT = 43.6532;
var LONG = -79.3832;

function toJSON(res) {
  return res.json();
}

function getSummary(obj) {
  return obj.hourly.summary;

}

function postOnSlack(getMessage) {
  return function(obj) {
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'weatherbot',
        channel: '#weather',
        icon_emoji: ':sun_with_face:',
        'text': getMessage(obj)
      })
    };

    return fetch(variables.WEBHOOK_URL, options);
  }
}


fetch('https://api.darksky.net/forecast/' +
  variables.SECRET_KEY + '/' + LAT + ',' + LONG + '?units=si')
    .then(toJSON)
    .then(postOnSlack(getSummary));



