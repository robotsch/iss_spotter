const request = require("request");

const fetchMyIP = function(cb) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return cb(Error(msg), null);
    }
    return cb(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, cb) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    // if request fails
    if (JSON.parse(body).status === "fail" || response.statusCode !== 200) {
      // Fail message
      const msg = `Failed when fetching coordinates. Response: ${body}`;
      // Remove Error() to remove useless stacktrace
      return cb(msg, null);
    }
    return cb(null, {
      latitude: JSON.parse(body).lat,
      longitude: JSON.parse(body).lon,
    });
  });
};

const fetchISSFlyOverTimes = function(coords, cb) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        cb(error, null);
        return;
      }
      // if request fails (status code)
      if (response.statusCode !== 200) {
        // Fail message
        const msg = `Status code ${response.statusCode} when fetching ISS flyover times, request failed`;
        // Remove Error() to remove useless stacktrace
        return cb(msg, null);
      }
      return cb(null, JSON.parse(body));
    }
  );
};

const nextISSTimesForMyLocation = function(cb) {
  fetchMyIP((error, ip) => {
    if (error) {
      return console.log("It didn't work!" , error);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return console.log("It didn't work ", error);
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return console.log("It didn't work:", error);
        }
        return cb(null, times.response);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};
