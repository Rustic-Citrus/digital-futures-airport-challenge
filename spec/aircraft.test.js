import Airport from "../src/Airport.js";
import Aircraft from "../src/Aircraft.js";

function testAircraftCanEnterAirspace() {
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

function testLandAtAirport() {
  console.log("TEST: Aircraft can land at an airport.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedAircraftId = aircraft.getFlightNumber();

  aircraft.land(airport);

  const grounded = airport.getGrounded();
  let actualAircraftId = "";

  for (const vehicle of grounded) {
    actualAircraftId = vehicle.getFlightNumber();
    if (actualAircraftId === expectedAircraftId) {
      console.log("PASS");
      break;
    }
  }
  
  if (actualAircraftId != expectedAircraftId) console.log(`FAIL: Expected aircraft flight number to be ${expectedAircraftId}, but was actually ${actualAircraftId}.`);
}

const aircraftTests = [
  testAircraftCanEnterAirspace,
  testLandAtAirport
];

export default aircraftTests;