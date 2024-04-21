import Airport from "../src/airport.js";
import Aircraft from "../src/aircraft.js";
import airlines from "../data/airlines.json" assert { type: "json" };

function generateRandomAircraft(numOfAircraft) {
  const aircraftArray = new Array();

  for (let i = 0; i < numOfAircraft; i++) {
    const seedOne = Math.floor(Math.random() * airlines.length);
    const seedTwo = Math.floor(Math.random() * 900) + 100 // Random three-digit flight number
    const aircraft = new Aircraft(airlines[seedOne].name, `${airlines[seedOne].prefix}${seedTwo}`);

    aircraftArray.push(aircraft);
  }

  return aircraftArray;
}

export function testMoveAircraft() {
  console.log("TEST: The user can move specific aircraft to the airport.");
  const airport = new Airport();
  
  const randomAircraft = generateRandomAircraft(2);
  const expectedAircraftIds = new Array();

  randomAircraft.forEach(aircraft => {
    expectedAircraftIds.push(aircraft.getFlightNumber());
    airport.moveVehicleToAirport(aircraft);
  });

  const actualAircraftIds = airport.getFlightNumbers();
  
  if (actualAircraftIds !== expectedAircraftIds) {
    console.log(`FAIL: Expected flight numbers ${expectedAircraftIds}, but actual flight numbers were ${actualAircraftIds}.`);
  } else {
    console.log("PASS");
  }
}

export function testTotalAircraft() {
  console.log("TEST: The user can retrieve the total number of aircraft that are in the airport.");
  const airport = new Airport();
  const expectedNumberOfAircraft = 15;

  const randomAircraft = generateRandomAircraft(15);
  randomAircraft.forEach((aircraft) => {
    airport.moveVehicleToAirport(aircraft);
  });

  const actualNumberOfAircraft = airport.getTotalVehicles();

  if (actualNumberOfAircraft !== expectedNumberOfAircraft) {
    console.log(`FAIL: Expected ${expectedNumberOfAircraft} aircraft, but actual number was ${actualNumberOfAircraft}.`);
  } else {
    console.log("PASS");
  }
}

const airportTests = [
  testTotalAircraft,
  testMoveAircraft
];

export default airportTests;