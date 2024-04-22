import Airport from "../src/Airport.js";
import Aircraft from "../src/Aircraft.js";
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

function testMoveAircraft() {
  console.log("TEST: The user can move specific aircraft to the airport.");
  const airport = new Airport();
  const expectedAircraftId = "OF815";
  const aircraft = new Aircraft(expectedAircraftId);
  airport.moveAircraftToAirport(aircraft);

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

function testTotalAircraft() {
  console.log("TEST: The user can retrieve the total number of aircraft that are in the airport.");
  const airport = new Airport();
  const expectedNumberOfAircraft = 15;

  const randomAircraft = generateRandomAircraft(15);
  randomAircraft.forEach((aircraft) => {
    airport.moveAircraftToAirport(aircraft);
  });

  const actualNumberOfAircraft = airport.getTotalGrounded();

  if (actualNumberOfAircraft !== expectedNumberOfAircraft) {
    console.log(`FAIL: Expected ${expectedNumberOfAircraft} aircraft, but actual number was ${actualNumberOfAircraft}.`);
  } else {
    console.log("PASS");
  }
}

function testSetCapacity() {
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

function testCapacityNotBelowZero() {
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

function testCapacityNotBelowOccupancy() {
  console.log("TEST: The user cannot change the capacity of the airport below the number of aircraft currently at the airport.");
  const airport = new Airport();
  const expectedCapacity = 10;

  const randomAircraft = generateRandomAircraft(8);
  randomAircraft.forEach(vehicle => {
    airport.moveAircraftToAirport(vehicle);
  });
  airport.setCapacity(5);
  const actualCapacity = airport.getCapacity();

  if (actualCapacity !== expectedCapacity) {
    console.log(`FAIL: Expected capacity to be ${expectedCapacity}, but was actually ${actualCapacity}.`);
  } else {
    console.log("PASS");
  }
}

function testCapacityWithinLimits() {
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

function testCheckAircraftStatusGrounded() {
  console.log("TEST: Airports can check the status of aircraft that are grounded.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  aircraft.enterAirspace(airport);
  airport.clearAircraftForLanding(aircraft);
  aircraft.land(airport);
  
  const expectedStatus = "grounded";

  const grounded = airport.getGrounded();
  const actualStatus = grounded[0].getStatus();

  if (actualStatus !== expectedStatus) {
    console.log(`FAIL: Expected status to be ${expectedStatus}, but was actually ${actualStatus}.`);
  } else {
    console.log("PASS");
  }
}

function testCheckAircraftStatusAirspace() {
  console.log("TEST: Airports can check the status of aircraft that are in their airspace.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  aircraft.takeOff(airport);
  aircraft.enterAirspace(airport);
  
  const expectedStatus = "airborne";

  const airspace = airport.getAircraftInAirspace();
  const actualStatus = airspace[0].getStatus();

  if (actualStatus !== expectedStatus) {
    console.log(`FAIL: Expected status to be ${expectedStatus}, but was actually ${actualStatus}.`);
  } else {
    console.log("PASS");
  }
}

function testClearAircraftForLanding() {
  console.log("TEST: Airports can clear aircraft for landing.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedClearance = true;

  aircraft.enterAirspace(airport);
  airport.clearAircraftForLanding(aircraft);

  const actualClearance = aircraft.checkLandingClearance();

  if (actualClearance !== expectedClearance) {
    console.log(`FAIL: Expected clearance to be ${expectedClearance}, but was actually ${actualClearance}.`);
  } else {
    console.log("PASS");
  }
}

function testAirportHasSpaceBeforeLandingClearance() {
  console.log("TEST: Airports can only clear aircraft for landing if there is at least 1 space at the airport.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedGroundedLength = 10;

  const randomAircraft = generateRandomAircraft(10);
  randomAircraft.forEach(vehicle => {
    airport.moveAircraftToAirport(vehicle);
  })
  airport.clearAircraftForLanding(aircraft);
  aircraft.land(airport);
  
  const actualGroundedLength = airport.getGrounded().length;

  if (actualGroundedLength !== expectedGroundedLength) {
    console.log(`FAIL: Expected number of grounded aircraft to be ${expectedGroundedLength}, but was actually ${actualGroundedLength}.`);
  } else {
    console.log("PASS");
  }
}

function testAircraftMustBeAirborneForLandingClearance() {
  console.log("TEST: Airports can only give an aircraft clearance for landing if the aircraft is not grounded.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedLandingClearance = false;

  airport.moveAircraftToAirport(aircraft);
  airport.clearAircraftForLanding(aircraft);

  const actualLandingClearance = aircraft.checkLandingClearance();

  if (actualLandingClearance !== expectedLandingClearance) {
    console.log(`FAIL: Expected aircraft landing clearance to be ${expectedLandingClearance}, but was actually ${actualLandingClearance}.`);
  } else {
    console.log("PASS");
  }
}

function testAircraftMustBeGroundedForTakeOffClearance() {
  console.log("TEST: Airports can only clear aircraft for take off if they are grounded.");
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedClearance = false;

  aircraft.enterAirspace(airport);
  airport.clearAircraftForTakeOff(aircraft);
  
  const actualClearance = aircraft.hasTakeOffClearance();

  if (actualClearance !== expectedClearance) {
    console.log(`FAIL: Expected aircraft take-off clearance to be ${expectedClearance}, but was actually ${actualClearance}.`);
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
  testCapacityWithinLimits,
  testCheckAircraftStatusGrounded,
  testCheckAircraftStatusAirspace,
  testClearAircraftForLanding,
  testAirportHasSpaceBeforeLandingClearance,
  testAircraftMustBeAirborneForLandingClearance,
  testAircraftMustBeGroundedForTakeOffClearance
];

export default airportTests;