// const launches = require("./launches.mongo");
const launches = new Map();

let latestFlightNumber = 1;

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
    })
  );
}

function abortsLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  abortsLaunchById,
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
};
