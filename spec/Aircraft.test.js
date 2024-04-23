import Airport from "../src/Airport.js";
import Aircraft from "../src/Aircraft.js";
import TestFramework from "../spec/TestFramework.js";

const aircraftTestSuite = new TestFramework();

aircraftTestSuite.addTest("Valid aircraft can enter the airspace of an airport.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedAircraftId = aircraft.getFlightNumber();

  aircraft.enterAirspace(airport);

  const airspace = airport.getAircraftInAirspace();
  const actualAircraftId = airspace[0].getFlightNumber();

  aircraftTestSuite.assertEquals(actualAircraftId, expectedAircraftId);
});

aircraftTestSuite.addTest("Valid aircraft can land at an airport.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedAircraftId = aircraft.getFlightNumber();

  aircraft.enterAirspace(airport);
  airport.clearAircraftForLanding(aircraft);
  aircraft.land(airport);

  const grounded = airport.getGrounded();
  let actualAircraftId = "";

  for (const vehicle of grounded) {
    actualAircraftId = vehicle.getFlightNumber();
    if (actualAircraftId === expectedAircraftId) break;
  }

  aircraftTestSuite.assertEquals(actualAircraftId, expectedAircraftId);
});

aircraftTestSuite.addTest("Aircraft can only land if they have clearance for landing.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedGroundedLength = 0;

  aircraft.land(airport);

  const actualGroundedLength = airport.getGrounded().length;

  aircraftTestSuite.assertEquals(actualGroundedLength, expectedGroundedLength);
});

aircraftTestSuite.addTest("Valid aircraft can take off from an airport.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedGroundedLength = 0;

  airport.moveAircraftToAirport(aircraft);
  airport.clearAircraftForTakeOff(aircraft);
  aircraft.takeOff(airport);
  const actualGroundedLength = airport.getGrounded().length

  aircraftTestSuite.assertEquals(actualGroundedLength, expectedGroundedLength);
});

export default aircraftTestSuite;