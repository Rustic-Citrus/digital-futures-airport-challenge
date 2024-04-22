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

  airport.clearAircraftForLanding(aircraft);
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

function testClearanceRequiredForLanding() {
  console.log("TEST: Aircraft can only land if they have clearance for landing.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedGroundedLength = 0;

  aircraft.land(airport);

  const actualGroundedLength = airport.getGrounded().length;

  if (actualGroundedLength != expectedGroundedLength) {
    console.log(`FAIL: Expected length of grounded array to be ${expectedGroundedLength}, but was actually ${actualGroundedLength}.`);
  } else {
    console.log("PASS");
  }
}

const aircraftTests = [
  testAircraftCanEnterAirspace,
  testLandAtAirport,
  testClearanceRequiredForLanding
];

export default aircraftTests;