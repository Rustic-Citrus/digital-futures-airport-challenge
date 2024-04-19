import Airport from "../src/airport.js";
import Aircraft from "../src/aircraft.js";
import airlines from "../data/airlines.json" assert { type: "json" };

export function testTotalAircraft() {
  const airport = new Airport();
  const expectedNumberOfAircraft = 15;

  for (let i = 0; i < 15; i++) {
    const seedOne = Math.floor(Math.random() * airlines.length);
    const seedTwo = Math.floor(Math.random() * 10) // Number of flight numbers for each airline
    const aircraft = new Aircraft(airlines[seedOne].name, airlines[seedOne].flightNumbers[seedTwo]);

    airport.moveAircraftToAirport(aircraft);
  }

  const actualNumberOfAircraft = airport.getTotalAircraft();

  if (actualNumberOfAircraft !== expectedNumberOfAircraft) {
    console.log(`FAIL: Expected ${expectedNumberOfAircraft} aircraft, but actual number was ${actualNumberOfAircraft}.`);
  } else {
    console.log("PASS");
  }
}

const airportTests = [
  testTotalAircraft
];

export default airportTests;