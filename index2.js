const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function (timeArr) {
  for (const pass of timeArr) {
    // Apparently Javascript counts epoch in miliseconds? Thanks Denys @ StackOverflow
    console.log(
      `Next pass at ${new Date(pass.risetime * 1000)} for ${
        pass.duration
      } seconds!`
    );
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
