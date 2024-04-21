import Airport from "../src/airport.js";
import Aircraft from "../src/aircraft.js";
import airlines from "../data/airlines.json" assert { type: "json" };

function generateRandomAircraft(numOfAircraft) {
  const aircraftArray = new Array();

  for (let i = 0; i < numOfAircraft; i++) {
    const seedOne = Math.floor(Math.random() * airlines.length);
    const seedTwo = Math.floor(Math.random() * 900) + 100 // Random three-digit flight number
    const aircraftId = `${airlines[seedOne].prefix}${seedTwo}`;
    const aircraft = new Aircraft(aircraftId);

    aircraftArray.push(aircraft);
  }

  return aircraftArray;
}

export function testMoveAircraft() {
  console.log("TEST: The user can move specific aircraft to the airport.");
  const airport = new Airport();
  const expectedAircraftId = "OF815";
  const aircraft = new Aircraft(expectedAircraftId);
  airport.moveVehicleToAirport(aircraft);

  let actualAircraftId = "";
  const actualAircraftIds = airport.getFlightNumbers();
  actualAircraftIds.forEach(id => {
    actualAircraftId = id;
  });

  if (expectedAircraftId === actualAircraftId) {
    console.log("PASS");
  } else {
    console.log(`FAIL: Expected flight number of aircraft at airport to be ${expectedAircraftId}, but was actually ${actualAircraftId}`);
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

export function testSetCapacity() {
  console.log("TEST: The user can change the capacity of the airport.");
  const airport = new Airport();
  const expectedCapacity = 15;

  airport.setCapacity(15);
  const actualCapacity = airport.getCapacity();

  if (actualCapacity !== expectedCapacity) {
    console.log(`FAIL: Expected capacity to be ${expectedCapacity}, but was actually ${actualCapacity}.`);
  } else {
    console.log("PASS");
  }
}

export function testCapacityNotBelowZero() {
  console.log("TEST: The user cannot change the capacity of the airport below 0.");
  const airport = new Airport();
  const expectedCapacity = 10;
  
  airport.setCapacity(-5);
  const actualCapacity = airport.getCapacity();

  if (actualCapacity !== expectedCapacity) {
    console.log(`FAIL: Expected capacity to be ${expectedCapacity}, but was actually ${actualCapacity}.`);
  } else {
    console.log("PASS");
  }
}

export function testCapacityNotBelowOccupancy() {
  console.log("TEST: The user cannot change the capacity of the airport below the number of aircraft currently at the airport.");
  const airport = new Airport();
  const expectedCapacity = 10;

  const randomAircraft = generateRandomAircraft(8);
  randomAircraft.forEach(vehicle => {
    airport.moveVehicleToAirport(vehicle);
  });
  airport.setCapacity(5);
  const actualCapacity = airport.getCapacity();

  if (actualCapacity !== expectedCapacity) {
    console.log(`FAIL: Expected capacity to be ${expectedCapacity}, but was actually ${actualCapacity}.`);
  } else {
    console.log("PASS");
  }
}

export function testCapacityWithinLimits() {
  console.log("TEST: The user cannot change the capacity of the airport above 50.");
  const airport = new Airport();
  const expectedCapacity = 10;

  airport.setCapacity(100);
  const actualCapacity = airport.getCapacity();

  if (actualCapacity !== expectedCapacity) {
    console.log(`FAIL: Expected capacity to be ${expectedCapacity}, but was actually ${actualCapacity}.`);
  } else {
    console.log("PASS");
  }
}

const airportTests = [
  testTotalAircraft,
  testMoveAircraft,
  testSetCapacity,
  testCapacityNotBelowZero,
  testCapacityNotBelowOccupancy,
  testCapacityWithinLimits
];

export default airportTests;