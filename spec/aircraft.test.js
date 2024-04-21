import Airport from "../src/airport.js";
import Aircraft from "../src/aircraft.js";

export function testAircraftCanEnterAirspace() {
  console.log("TEST: Aircraft can enter the airspace of an airport.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedAirspace = [aircraft];

  aircraft.enterAirspace(airport);

  const actualAirspace = airport.getAircraftInAirspace();

  if (actualAirspace !== expectedAirspace) {
    console.log(`FAIL: Expected airspace to be ${expectedAirspace}, but was actually ${actualAirspace}.`);
  } else {
    console.log("PASS");
  }
}

const aircraftTests = [
  testAircraftCanEnterAirspace
];

export default aircraftTests;