import Airport from "../src/Airport.js";
import Aircraft from "../src/Aircraft.js";

export function testAircraftCanEnterAirspace() {
  console.log("TEST: Aircraft can enter the airspace of an airport.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedAircraftId = aircraft.getFlightNumber();

  aircraft.enterAirspace(airport);

  const airspace = airport.getAircraftInAirspace();
  const actualAircraftId = airspace[0].getFlightNumber();

  if (expectedAircraftId !== actualAircraftId) {
    console.log(`FAIL: Expected aircraft flight number to be ${expectedAircraftId}, but was actually ${actualAircraftId}.`);
  } else {
    console.log("PASS");
  }
}

const aircraftTests = [
  testAircraftCanEnterAirspace
];

export default aircraftTests;