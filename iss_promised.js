const request = require('request-promise-native')

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip
  return request(`http://ip-api.com/json/${ip}`)
}

const fetchISSFlyOverTimes = function(body) {
  const lat = JSON.parse(body).lat
  const lon = JSON.parse(body).lon
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => JSON.parse(body).response);
}

module.exports = { 
  nextISSTimesForMyLocation
};