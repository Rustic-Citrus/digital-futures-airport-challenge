import Airport from "../src/Airport.js";
import Aircraft from "../src/Aircraft.js";
import airlines from "../data/airlines.json" assert { type: "json" };
import TestFramework from "../spec/TestFramework.js";

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

const airportTestSuite = new TestFramework();

airportTestSuite.addTest("The user can move specific aircraft to the airport.", () => {
  const airport = new Airport();
  const expectedAircraftId = "OF815";
  const aircraft = new Aircraft(expectedAircraftId);
  airport.moveAircraftToAirport(aircraft);

  let actualAircraftId = "";
  const actualAircraftIds = airport.getFlightNumbers();
  actualAircraftIds.forEach(id => {
    actualAircraftId = id;
  });

  airportTestSuite.assertEquals(actualAircraftId, expectedAircraftId)
});

airportTestSuite.addTest("The user can retrieve the total number of aircraft that are in the airport.", () => {
  const airport = new Airport();
  const expectedNumberOfAircraft = 15;

  const randomAircraft = generateRandomAircraft(15);
  randomAircraft.forEach((aircraft) => {
    airport.moveAircraftToAirport(aircraft);
  });

  const actualNumberOfAircraft = airport.getTotalGrounded();

  airportTestSuite.assertEquals(actualNumberOfAircraft, expectedNumberOfAircraft)
});

airportTestSuite.addTest("The user cannot change the capacity of the airport below 0.", () => {
  const airport = new Airport();
  const expectedCapacity = 10;
  
  airport.setCapacity(-5);
  const actualCapacity = airport.getCapacity();

  airportTestSuite.assertEquals(actualCapacity, expectedCapacity);
});

airportTestSuite.addTest("The user cannot change the capacity of the airport below the number of aircraft currently at the airport.", () => {
  const airport = new Airport();
  const expectedCapacity = 10;

  const randomAircraft = generateRandomAircraft(8);
  randomAircraft.forEach(vehicle => {
    airport.moveAircraftToAirport(vehicle);
  });
  airport.setCapacity(5);
  const actualCapacity = airport.getCapacity();

  airportTestSuite.assertEquals(actualCapacity, expectedCapacity);
});

airportTestSuite.addTest("The user cannot change the capacity of the airport above 50.", () => {
  const airport = new Airport();
  const expectedCapacity = 10;

  airport.setCapacity(100);
  const actualCapacity = airport.getCapacity();

  airportTestSuite.assertEquals(actualCapacity, expectedCapacity);
});

airportTestSuite.addTest("Airports can check the status of aircraft that are grounded.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  aircraft.enterAirspace(airport);
  airport.clearAircraftForLanding(aircraft);
  aircraft.land(airport);
  
  const expectedStatus = "grounded";

  const grounded = airport.getGrounded();
  const actualStatus = grounded[0].getStatus();

  airportTestSuite.assertEquals(actualStatus, expectedStatus);
});

airportTestSuite.addTest("Airports can check the status of aircraft that are in their airspace.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  aircraft.takeOff(airport);
  aircraft.enterAirspace(airport);
  
  const expectedStatus = "airborne";

  const airspace = airport.getAircraftInAirspace();
  const actualStatus = airspace[0].getStatus();

  airportTestSuite.assertEquals(actualStatus, expectedStatus);
});

airportTestSuite.addTest("Airports can clear valid aircraft for landing.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedClearance = true;

  aircraft.enterAirspace(airport);
  airport.clearAircraftForLanding(aircraft);

  const actualClearance = aircraft.checkLandingClearance();

  airportTestSuite.assertEquals(actualClearance, expectedClearance);
});

airportTestSuite.addTest("Airports cannot clear aircraft for landing if the capacity of the airport is full.", () => {
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

  airportTestSuite.assertEquals(actualGroundedLength, expectedGroundedLength);
});

airportTestSuite.addTest("Airports cannot clear aircraft for landing if the aircraft is not grounded.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedLandingClearance = false;

  airport.moveAircraftToAirport(aircraft);
  airport.clearAircraftForLanding(aircraft);

  const actualLandingClearance = aircraft.checkLandingClearance();

  airportTestSuite.assertEquals(actualLandingClearance, expectedLandingClearance);
});

airportTestSuite.addTest("Airports cannot clear aircraft for take off if the aircraft is not airborne.", () => {
  const airport = new Airport();
  const aircraft = new Aircraft("OA815");
  const expectedClearance = false;

  aircraft.enterAirspace(airport);
  airport.clearAircraftForTakeOff(aircraft);
  
  const actualClearance = aircraft.checkTakeOffClearance();

  airportTestSuite.assertEquals(actualClearance, expectedClearance);
});

airportTestSuite.addTest("All aircraft have their clearance to take off revoked if a weather check returns 'stormy'.", () => {
  const airport = new Airport();
  const randomAircraft = generateRandomAircraft(6);
  randomAircraft.forEach((vehicle, i) => {
    airport.moveAircraftToAirport(vehicle);
    airport.clearAircraftForTakeOff(airport.grounded[i]);
  });
  const expectedAircraftWithClearance = 0;

  airport.weatherIsStormy();
  airport.checkWeather();

  let actualAircraftWithClearance = 0;
  airport.grounded.forEach((vehicle) => {
    if (vehicle.checkTakeOffClearance()) actualAircraftWithClearance++;
  })

  airportTestSuite.assertEquals(actualAircraftWithClearance, expectedAircraftWithClearance);
});

export default airportTestSuite;
