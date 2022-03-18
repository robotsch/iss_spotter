const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // All green, print times
  printPassTimes(passTimes);
});

const printPassTimes = function(timeArr) {
  for (const pass of timeArr) {
    // Apparently Javascript counts epoch in miliseconds? Thanks Denys @ StackOverflow
    console.log(`Next pass at ${new Date(pass.risetime * 1000)} for ${pass.duration} seconds!`);
  }
};